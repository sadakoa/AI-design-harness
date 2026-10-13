// Sets the harness up in another repo, adds to it, or updates it. No dependencies.
//
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo>                  set up, starting small
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo> --full           set up with every file
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo> --add <piece>…   add files when a task first needs them
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo> --update         refresh the harness's own files
//
//   --plugin   the skills come from the Claude Code plugin, so don't copy them
//   --dry-run  show what would happen
//
// Two kinds of files:
// - Content (product/, design-system/, work/) is copied once and then belongs to your team. A first setup
//   copies only what framing and review need; --add brings in the rest, a piece at a time.
// - Harness files (scripts, AGENTS.md, the CI workflow, and the skills unless --plugin) are recorded in
//   .harness.json, so --update can replace them. If you changed one, the new version is saved next to it
//   as <file>.harness-new instead.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, symlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const harness = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const dryRun = flag("--dry-run");
const update = flag("--update");
const addIndex = args.indexOf("--add");
const pieces = addIndex >= 0 ? args.slice(addIndex + 1).filter((a) => !a.startsWith("--")).flatMap((a) => a.split(",")) : [];
const targetArg = args.find((a, i) => !a.startsWith("--") && (addIndex < 0 || i < addIndex));

// Content added when a task first needs it. A first setup without --full copies only the starter set.
const PIECES = {
  principles: ["product/principles.md"],
  structure: ["product/concepts.md", "product/structure.md"],
  components: ["design-system/components/GUIDE.md", "design-system/components/_template.md"],
  screens: ["design-system/screens"],
};
const STARTER = [
  "product/INDEX.md", "product/users.md", "product/jobs.md", "product/constraints.md", "product/decisions.md", "product/sources.md",
  "design-system/INDEX.md", "design-system/tokens", "design-system/foundations", "design-system/decisions.md",
  "design-system/components/inventory.md", "design-system/patterns",
  "work",
];

if (!targetArg || (addIndex >= 0 && !pieces.length)) {
  console.log("Usage: node scripts/install.mjs <your-repo> [--full | --add <piece>… | --update] [--plugin] [--dry-run]");
  console.log(`Pieces: ${Object.keys(PIECES).join(", ")}, all`);
  process.exit(1);
}
const target = resolve(targetArg);
if (!existsSync(target) || !lstatSync(target).isDirectory()) {
  console.error(`error  ${targetArg} isn't a folder`);
  process.exit(1);
}
if (target === resolve(harness)) {
  console.error("error  that's the harness itself — point it at your product's repo");
  process.exit(1);
}

const manifestPath = join(target, ".harness.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null;
const setup = !update && addIndex < 0;
if (!setup && !manifest) {
  console.error("error  the harness isn't set up here yet (no .harness.json) — set it up first");
  process.exit(1);
}
if (setup && manifest) {
  console.error("error  the harness is already set up here — use --update to refresh it, or --add to add a piece");
  process.exit(1);
}
const unknown = pieces.filter((p) => p !== "all" && !PIECES[p]);
if (unknown.length) {
  console.error(`error  unknown piece: ${unknown.join(", ")} — use ${Object.keys(PIECES).join(", ")} or all`);
  process.exit(1);
}

const plugin = setup ? flag("--plugin") : manifest.mode === "plugin";
const pluginJson = join(harness, ".claude-plugin/plugin.json");
const source = (existsSync(pluginJson) && JSON.parse(readFileSync(pluginJson, "utf8")).repository) || "https://github.com/sadakoa/AI-design-harness";
let commit = "unknown";
try {
  commit = execFileSync("git", ["-C", harness, "rev-parse", "--short", "HEAD"], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
} catch {}

const created = [];
const updated = [];
const kept = [];
const skipped = [];
const changed = [];
const notes = [];
const show = (path) => relative(target, path).split(sep).join("/") || ".";
const hash = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 16);
const write = (path, content) => {
  if (dryRun) return;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};
const files = (path) =>
  !existsSync(path)
    ? []
    : lstatSync(path).isDirectory()
    ? readdirSync(path).flatMap((name) => (name === ".DS_Store" ? [] : files(join(path, name))))
    : [path];
// A piece added to a product that's already set up comes without the Helpline examples
const blank = (text) => {
  const out = [];
  let skipping = false;
  for (const line of text.split("\n")) {
    if (/^#{2,3} /.test(line)) skipping = /\(example\)/.test(line);
    if (skipping) continue;
    if (/^\|/.test(line) && /\(example\)/.test(line)) continue;
    out.push(line.replace(/^> Reviewed: .*/, `> Reviewed: ${new Date().toISOString().slice(0, 10)}`));
  }
  return out.join("\n");
};
const copyContent = (rel, { examples = true } = {}) => {
  for (const from of files(join(harness, rel))) {
    const to = join(target, relative(harness, from));
    if (existsSync(to)) skipped.push(show(to));
    else {
      if (!dryRun) {
        mkdirSync(dirname(to), { recursive: true });
        if (examples || !from.endsWith(".md")) copyFileSync(from, to);
        else writeFileSync(to, blank(readFileSync(from, "utf8")));
      }
      created.push(show(to));
    }
  }
};

// --- INDEX rows: an INDEX lists only the files that are there ---
const ROW = /^\|\s*`([^`]+)`\s*\|/;
const rowExists = (folder, path) => (path.includes("*") ? existsSync(join(target, folder, dirname(path))) : existsSync(join(target, folder, path)));
// Drop rows for files that aren't there, and headings whose table ends up empty
function trimIndex(folder) {
  const indexPath = join(target, folder, "INDEX.md");
  if (dryRun || !existsSync(indexPath)) return;
  const lines = readFileSync(indexPath, "utf8").split("\n");
  const kept = lines.filter((line) => !(ROW.test(line) && !rowExists(folder, line.match(ROW)[1])));
  const out = [];
  for (let i = 0; i < kept.length; i++) {
    const isHeading = /^### /.test(kept[i]);
    if (isHeading) {
      let j = i + 1;
      while (j < kept.length && kept[j].trim() === "") j++;
      const header = /^\| File \|/.test(kept[j] ?? "") && /^\|---/.test(kept[j + 1] ?? "");
      if (header && !ROW.test(kept[j + 2] ?? "")) {
        i = j + 1; // skip the heading, the blank lines, the header and the separator
        while (i + 1 < kept.length && kept[i + 1].trim() === "") i++;
        continue;
      }
    }
    out.push(kept[i]);
  }
  writeFileSync(indexPath, out.join("\n"));
}
// Put back the harness's row for a file that was just added, under the same heading
function addIndexRows(folder, paths) {
  const indexPath = join(target, folder, "INDEX.md");
  if (dryRun || !existsSync(indexPath)) return;
  const source = readFileSync(join(harness, folder, "INDEX.md"), "utf8").split("\n");
  let lines = readFileSync(indexPath, "utf8").split("\n");
  for (const path of paths) {
    const at = source.findIndex((l) => ROW.test(l) && l.match(ROW)[1] === path);
    if (at < 0 || lines.some((l) => ROW.test(l) && l.match(ROW)[1] === path)) continue;
    let h = at;
    while (h >= 0 && !/^### /.test(source[h])) h--;
    const heading = h >= 0 ? source[h] : null;
    const header = source.slice(0, at).reverse().find((l) => /^\| File \|/.test(l));
    const sepLine = source[source.indexOf(header) + 1];
    const mine = heading ? lines.indexOf(heading) : -1;
    if (mine >= 0) {
      let end = mine + 1;
      while (end < lines.length && (lines[end].trim() === "" || /^\|/.test(lines[end]))) end++;
      while (end > mine && lines[end - 1].trim() === "") end--;
      lines.splice(end, 0, source[at]);
    } else {
      const before = lines.findIndex((l) => /^## When you write here/.test(l));
      const block = [heading ?? "### More", "", header, sepLine, source[at], ""].filter((l, i) => heading || i > 0);
      lines.splice(before >= 0 ? before : lines.length, 0, ...block);
    }
  }
  writeFileSync(indexPath, lines.join("\n"));
}

// --- Content ---
if (setup) {
  for (const rel of flag("--full") ? ["product", "design-system", "work"] : STARTER) copyContent(rel);
  if (!flag("--full")) {
    trimIndex("product");
    trimIndex("design-system");
  }
}
if (pieces.length) {
  const wanted = pieces.includes("all") ? Object.keys(PIECES) : pieces;
  for (const piece of wanted) {
    for (const rel of PIECES[piece]) copyContent(rel, { examples: false });
    const rows = PIECES[piece].flatMap((rel) => files(join(harness, rel)).map((f) => relative(harness, f).split(sep).join("/")));
    for (const folder of ["product", "design-system"]) {
      const mine = rows.filter((r) => r.startsWith(`${folder}/`)).map((r) => r.slice(folder.length + 1));
      const listed = mine.flatMap((r) => [r, r.replace(/[^/]+\.md$/, "*.md")]);
      if (mine.length) addIndexRows(folder, [...new Set(listed)]);
    }
  }
}

// --- Harness files: where each one goes in this repo ---
const SCRIPTS = ["check.mjs", "build-tokens.mjs", "sync.mjs"];
const scriptDir =
  manifest?.scriptDir ?? (SCRIPTS.some((f) => existsSync(join(target, "scripts", f))) ? "scripts/harness" : "scripts");
const agentsFile = manifest?.agentsFile ?? (existsSync(join(target, "AGENTS.md")) ? "AGENTS.harness.md" : "AGENTS.md");
const workflowFile =
  manifest?.workflowFile ?? (existsSync(join(target, ".github/workflows/check.yml")) ? ".github/workflows/harness-check.yml" : ".github/workflows/check.yml");

const pkgPath = join(target, "package.json");
const ownCheck = `node ${scriptDir}/check.mjs`;
const theirs = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, "utf8")).scripts ?? {} : {};
const ownScripts = { check: ownCheck, tokens: `node ${scriptDir}/build-tokens.mjs`, sync: `node ${scriptDir}/sync.mjs` };
// If a name is taken by the team's own script, the harness's goes under harness:<name>
const scriptNames = manifest?.scripts ?? Object.fromEntries(
  Object.entries(ownScripts).map(([name, command]) => [name, theirs[name] && theirs[name] !== command ? `harness:${name}` : name]),
);
const checkScript = scriptNames.check;
const workflowText = readFileSync(join(harness, ".github/workflows/check.yml"), "utf8").replace("npm run check", `npm run ${checkScript}`);
const templatePath = existsSync(join(target, ".github/pull_request_template.md")) && !manifest?.files?.[".github/pull_request_template.md"] ? null : ".github/pull_request_template.md";
if (!templatePath && !manifest?.templateNoted) notes.push("You already have a pull request template. Add a line to it: \"Sorted this feature's rows in work/feedback.md\".");

const harnessFiles = [
  ...SCRIPTS.map((f) => [`${scriptDir}/${f}`, join(harness, "scripts", f)]),
  [agentsFile, join(harness, "AGENTS.md")],
  [workflowFile, Buffer.from(workflowText)],
  ...(templatePath ? [[templatePath, join(harness, ".github/pull_request_template.md")]] : []),
  ["sync.example.json", join(harness, "sync.example.json")],
  ...(plugin ? [] : files(join(harness, "skills")).map((from) => [`.claude/skills/${relative(join(harness, "skills"), from).split(sep).join("/")}`, from])),
];

const record = { ...(manifest?.files ?? {}) };
if (setup || update) {
  for (const key of Object.keys(record)) delete record[key];
  for (const [path, from] of harnessFiles) {
    const to = join(target, path);
    const next = Buffer.isBuffer(from) ? from : readFileSync(from);
    const nextHash = hash(next);
    if (!existsSync(to)) {
      write(to, next);
      created.push(path);
      record[path] = nextHash;
      continue;
    }
    const current = hash(readFileSync(to));
    if (setup) {
      skipped.push(path); // a file with this name was already here and isn't ours
      continue;
    }
    if (current === nextHash) record[path] = nextHash;
    else if (current === manifest.files?.[path]) {
      write(to, next);
      updated.push(path);
      record[path] = nextHash;
    } else {
      write(`${to}.harness-new`, next);
      kept.push(path);
      record[path] = manifest.files?.[path] ?? current;
    }
  }
  for (const path of Object.keys(manifest?.files ?? {})) {
    if (!(path in record)) notes.push(`${path} is no longer part of the harness. Delete it if you don't need it.`);
  }
}

// --- Set up once: skills for Codex, owners, CLAUDE.md ---
if (setup) {
  if (agentsFile === "AGENTS.harness.md") notes.push("You already have an AGENTS.md, so the harness's instructions went into AGENTS.harness.md. For Codex, add a line to your AGENTS.md pointing to it.");
  if (scriptDir === "scripts/harness") notes.push("Your scripts/ folder already has a file with the same name, so the harness scripts went into scripts/harness/.");

  if (!plugin) {
    const agentsSkills = join(target, ".agents/skills");
    if (existsSync(agentsSkills)) skipped.push(".agents/skills");
    else {
      if (!dryRun) {
        mkdirSync(dirname(agentsSkills), { recursive: true });
        try {
          symlinkSync("../.claude/skills", agentsSkills); // Codex reads skills from .agents/skills
        } catch {
          for (const from of files(join(harness, "skills"))) write(join(agentsSkills, relative(join(harness, "skills"), from)), readFileSync(from));
        }
      }
      created.push(".agents/skills");
    }
  }

  const codeowners = join(target, ".github/CODEOWNERS");
  if (!existsSync(codeowners)) {
    write(codeowners, [
      "# Owners approve every change to these folders. Replace the names with GitHub usernames.",
      "# It only takes effect with branch protection's \"Require review from Code Owners\" turned on.",
      "# /product/          @product-owner",
      "# /design-system/    @design-owner",
      "# Structure is shared, so it needs both:",
      "# /product/structure.md    @product-owner @design-owner",
      "",
    ].join("\n"));
    created.push(".github/CODEOWNERS");
  } else {
    notes.push("You already have a .github/CODEOWNERS. Add owners for /product/ and /design-system/ to it.");
  }

  const claudeMd = join(target, "CLAUDE.md");
  if (!existsSync(claudeMd)) {
    write(claudeMd, `@${agentsFile}\n`);
    created.push("CLAUDE.md");
  } else if (!readFileSync(claudeMd, "utf8").includes(`@${agentsFile}`)) {
    write(claudeMd, readFileSync(claudeMd, "utf8").replace(/\n*$/, "\n") + `\n@${agentsFile}\n`);
    changed.push(`CLAUDE.md (added @${agentsFile})`);
  }
}

// --- npm scripts, in case they went missing ---
if (!existsSync(pkgPath)) {
  write(pkgPath, JSON.stringify({ name: basename(target).toLowerCase().replace(/[^a-z0-9-]+/g, "-"), private: true, scripts: ownScripts }, null, 2) + "\n");
  created.push("package.json");
} else {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.scripts ??= {};
  const added = [];
  for (const [name, command] of Object.entries(ownScripts)) {
    const key = scriptNames[name];
    if (pkg.scripts[key] === command) continue;
    if (pkg.scripts[key]) {
      notes.push(`package.json's "${key}" isn't the harness's any more. Point it back at ${command} if you can.`);
      continue;
    }
    pkg.scripts[key] = command;
    added.push(key);
    if (key !== name) notes.push(`package.json already has a "${name}" script, so the harness's is "npm run ${key}". It's recorded in .harness.json, and agents use it.`);
  }
  if (added.length) {
    write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    changed.push(`package.json (added ${added.join(", ")})`);
  }
}

const profile = setup ? (flag("--full") ? "full" : "starter") : manifest.profile ?? "full";
const added = [...new Set([...(manifest?.added ?? []), ...(pieces.includes("all") ? Object.keys(PIECES) : pieces)])];
write(manifestPath, JSON.stringify({ source, commit: pieces.length ? manifest.commit : commit, mode: plugin ? "plugin" : "copy", profile, added, updated: new Date().toISOString().slice(0, 10), scriptDir, agentsFile, workflowFile, checkScript, scripts: scriptNames, templateNoted: !templatePath || undefined, files: record }, null, 2) + "\n");

// --- Report ---
const list = (title, items) => items.length && console.log(`\n${title} (${items.length})\n${items.map((i) => `  ${i}`).join("\n")}`);
const did = setup ? `Set up (${profile})` : update ? "Updated" : `Added ${pieces.join(", ")} to`;
console.log(dryRun ? "Dry run — nothing was written." : `${did} the harness in ${target} (harness ${commit}${plugin ? ", skills from the plugin" : ""})`);
list("Added", created);
list("Updated", updated);
list("You changed these, so the new version is next to them as .harness-new", kept);
list("Changed", changed);
list("Skipped because they already exist", skipped);
for (const n of notes) console.log(`\nNote: ${n}`);
if (setup && profile === "starter") {
  const rest = Object.keys(PIECES).join(", ");
  console.log(`\nStarted small: the files framing and review need. Add more pieces when you want them (${rest}): ask the agent, or run --add.`);
}
if (setup) {
  console.log(`
Next:
  1. ${plugin ? "Ask the agent to set the harness up for this repo." : "Open this repo in Claude Code and ask it to set the harness up (restart the session first if the skills aren't listed)."}
  2. Put your owners in .github/CODEOWNERS (the lines are commented out until you do).
  3. Run: npm run ${JSON.parse(existsSync(pkgPath) && !dryRun ? readFileSync(pkgPath, "utf8") : "{}").scripts?.["harness:check"] ? "harness:check" : "check"}`);
}
