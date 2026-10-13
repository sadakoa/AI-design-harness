// Sets the harness up in another repo, or updates it there. No dependencies.
//
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo> [--plugin] [--update] [--dry-run]
//
//   --plugin   the skills come from the Claude Code plugin, so don't copy them
//   --update   refresh the harness's own files; never touches product/, design-system/ or work/
//
// Two kinds of files:
// - Content (product/, design-system/, work/) is copied once and then belongs to your team.
// - Harness files (scripts, AGENTS.md, the CI workflow, and the skills unless --plugin) are
//   recorded in .harness.json, so --update can replace them. If you changed one, the new version
//   is saved next to it as <file>.harness-new instead.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, symlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const harness = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const update = args.includes("--update");
const targetArg = args.find((a) => !a.startsWith("--"));

if (!targetArg) {
  console.log("Usage: node scripts/install.mjs <your-repo> [--plugin] [--update] [--dry-run]");
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
if (update && !manifest) {
  console.error("error  the harness isn't set up here yet (no .harness.json) — run without --update first");
  process.exit(1);
}
if (!update && manifest) {
  console.error("error  the harness is already set up here — run with --update to refresh it");
  process.exit(1);
}

const plugin = update ? manifest.mode === "plugin" : args.includes("--plugin");
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
const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    if (name === ".DS_Store") return [];
    const path = join(dir, name);
    return lstatSync(path).isDirectory() ? files(path) : [path];
  });

// --- Content: copied once, never overwritten ---
if (!update) {
  for (const dir of ["product", "design-system", "work"]) {
    for (const from of files(join(harness, dir))) {
      const to = join(target, relative(harness, from));
      if (existsSync(to)) skipped.push(show(to));
      else {
        if (!dryRun) {
          mkdirSync(dirname(to), { recursive: true });
          copyFileSync(from, to);
        }
        created.push(show(to));
      }
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

const harnessFiles = [
  ...SCRIPTS.map((f) => [`${scriptDir}/${f}`, join(harness, "scripts", f)]),
  [agentsFile, join(harness, "AGENTS.md")],
  [workflowFile, join(harness, ".github/workflows/check.yml")],
  ["sync.example.json", join(harness, "sync.example.json")],
  ...(plugin ? [] : files(join(harness, "skills")).map((from) => [`.claude/skills/${relative(join(harness, "skills"), from).split(sep).join("/")}`, from])),
];

const record = {};
for (const [path, from] of harnessFiles) {
  const to = join(target, path);
  const next = readFileSync(from);
  const nextHash = hash(next);
  if (!existsSync(to)) {
    write(to, next);
    created.push(path);
    record[path] = nextHash;
    continue;
  }
  const current = hash(readFileSync(to));
  if (!update) {
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

// --- Set up once: skills for Codex, owners, CLAUDE.md, npm scripts ---
if (!update) {
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

// npm scripts, on setup and on update in case they went missing
const scripts = { check: `node ${scriptDir}/check.mjs`, tokens: `node ${scriptDir}/build-tokens.mjs`, sync: `node ${scriptDir}/sync.mjs` };
const pkgPath = join(target, "package.json");
if (!existsSync(pkgPath)) {
  write(pkgPath, JSON.stringify({ name: basename(target).toLowerCase().replace(/[^a-z0-9-]+/g, "-"), private: true, scripts }, null, 2) + "\n");
  created.push("package.json");
} else {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.scripts ??= {};
  const added = [];
  for (const [name, command] of Object.entries(scripts)) {
    if (Object.values(pkg.scripts).includes(command)) continue;
    const key = pkg.scripts[name] ? `harness:${name}` : name;
    if (pkg.scripts[key]) continue;
    pkg.scripts[key] = command;
    added.push(key);
    if (key !== name) notes.push(`package.json already has a "${name}" script, so the harness's is "npm run ${key}". When the skills say "npm run ${name}", use that.`);
  }
  if (added.length) {
    write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    changed.push(`package.json (added ${added.join(", ")})`);
  }
}

write(manifestPath, JSON.stringify({ source, commit, mode: plugin ? "plugin" : "copy", updated: new Date().toISOString().slice(0, 10), scriptDir, agentsFile, workflowFile, files: record }, null, 2) + "\n");

// --- Report ---
const list = (title, items) => items.length && console.log(`\n${title} (${items.length})\n${items.map((i) => `  ${i}`).join("\n")}`);
console.log(dryRun ? "Dry run — nothing was written." : `${update ? "Updated" : "Set up"} the harness in ${target} (harness ${commit}${plugin ? ", skills from the plugin" : ""})`);
list("Added", created);
list("Updated", updated);
list("You changed these, so the new version is next to them as .harness-new", kept);
list("Changed", changed);
list("Skipped because they already exist", skipped);
for (const n of notes) console.log(`\nNote: ${n}`);
if (!update) {
  console.log(`
Next:
  1. ${plugin ? "Ask the agent to set the harness up for this repo." : "Open this repo in Claude Code and ask it to set the harness up (restart the session first if the skills aren't listed)."}
  2. Put your owners in .github/CODEOWNERS (the lines are commented out until you do).
  3. Run: npm run ${JSON.parse(existsSync(pkgPath) && !dryRun ? readFileSync(pkgPath, "utf8") : "{}").scripts?.["harness:check"] ? "harness:check" : "check"}`);
}
