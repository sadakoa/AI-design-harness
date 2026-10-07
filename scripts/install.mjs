// Copies the harness into another repo. No dependencies.
//
//   node path/to/AI-design-harness/scripts/install.mjs <your-repo> [--dry-run]
//
// It never overwrites anything. Files that already exist are skipped and listed,
// and your README, docs and other files are left alone.
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, symlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const harness = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const targetArg = args.find((a) => !a.startsWith("--"));

if (!targetArg) {
  console.log("Usage: node scripts/install.mjs <your-repo> [--dry-run]");
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

const created = [];
const skipped = [];
const changed = [];
const notes = [];
const show = (path) => relative(target, path) || ".";

const write = (path, content) => {
  if (!dryRun) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
};
const copyFile = (from, to) => {
  if (existsSync(to)) return skipped.push(show(to));
  if (!dryRun) {
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
  }
  created.push(show(to));
};
const copyDir = (from, to) => {
  for (const name of readdirSync(from)) {
    if (name === ".DS_Store") continue;
    const src = join(from, name);
    const dest = join(to, name);
    if (lstatSync(src).isDirectory()) copyDir(src, dest);
    else copyFile(src, dest);
  }
};

// 1. Folders and scripts
for (const dir of ["product", "design-system", "work", ".claude/skills"]) {
  copyDir(join(harness, dir), join(target, dir));
}
const SCRIPTS = ["check.mjs", "build-tokens.mjs", "sync.mjs"];
const scriptDir = SCRIPTS.some((f) => existsSync(join(target, "scripts", f))) ? "scripts/harness" : "scripts";
for (const file of SCRIPTS) copyFile(join(harness, "scripts", file), join(target, scriptDir, file));
copyFile(join(harness, "sync.example.json"), join(target, "sync.example.json"));
if (scriptDir === "scripts/harness") notes.push("Your scripts/ folder already has a file with the same name, so the harness scripts went into scripts/harness/.");
const workflow = join(target, ".github/workflows/check.yml");
copyFile(join(harness, ".github/workflows/check.yml"), existsSync(workflow) ? join(target, ".github/workflows/harness-check.yml") : workflow);

const codeowners = join(target, ".github/CODEOWNERS");
if (!existsSync(codeowners)) {
  write(codeowners, [
    "# Owners approve every change to these folders. Replace the names with GitHub usernames.",
    "# It only takes effect with branch protection's \"Require review from Code Owners\" turned on.",
    "# /product/          @product-owner",
    "# /design-system/    @design-owner",
    "",
  ].join("\n"));
  created.push(".github/CODEOWNERS");
} else {
  notes.push("You already have a .github/CODEOWNERS. Add owners for /product/ and /design-system/ to it.");
}

// 2. Codex reads skills from .agents/skills
const agentsSkills = join(target, ".agents/skills");
if (existsSync(agentsSkills)) {
  skipped.push(show(agentsSkills));
} else {
  if (!dryRun) {
    mkdirSync(dirname(agentsSkills), { recursive: true });
    try {
      symlinkSync("../.claude/skills", agentsSkills);
    } catch {
      copyDir(join(harness, ".claude/skills"), agentsSkills); // e.g. Windows without symlinks
    }
  }
  created.push(show(agentsSkills));
}

// 3. Agent instructions: never touch an existing AGENTS.md
const agentsMd = existsSync(join(target, "AGENTS.md")) ? "AGENTS.harness.md" : "AGENTS.md";
copyFile(join(harness, "AGENTS.md"), join(target, agentsMd));
if (agentsMd === "AGENTS.harness.md") {
  notes.push("You already have an AGENTS.md, so the harness's instructions went into AGENTS.harness.md. For Codex, add a line to your AGENTS.md pointing to it.");
}
const claudeMd = join(target, "CLAUDE.md");
if (!existsSync(claudeMd)) {
  write(claudeMd, `@${agentsMd}\n`);
  created.push("CLAUDE.md");
} else if (!readFileSync(claudeMd, "utf8").includes(`@${agentsMd}`)) {
  write(claudeMd, readFileSync(claudeMd, "utf8").replace(/\n*$/, "\n") + `\n@${agentsMd}\n`);
  changed.push(`CLAUDE.md (added @${agentsMd})`);
}

// 4. npm scripts
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
    if (pkg.scripts[name] === command) continue;
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

// --- Report ---
const list = (title, items) => items.length && console.log(`\n${title} (${items.length})\n${items.map((i) => `  ${i}`).join("\n")}`);
console.log(dryRun ? "Dry run — nothing was written." : `Installed the harness into ${target}`);
list("Added", created);
list("Changed", changed);
list("Skipped because they already exist", skipped);
for (const n of notes) console.log(`\nNote: ${n}`);
console.log(`
Next:
  1. Open ${basename(target)} in Claude Code and run: /bootstrap .
     (Restart the session first if /bootstrap isn't listed yet.)
  2. Put your owners in .github/CODEOWNERS (the lines are commented out until you do).
  3. Run: npm run ${existsSync(pkgPath) && JSON.parse(readFileSync(pkgPath, "utf8")).scripts?.["harness:check"] ? "harness:check" : "check"}`);
