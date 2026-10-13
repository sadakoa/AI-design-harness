// Makes a fresh copy of the harness for each eval scenario, with its inputs and a prompt. No dependencies.
//
//   node evals/prepare.mjs [--ref <commit>] [--out <folder>] [E01 E02 …]
//   node evals/prepare.mjs --clean <folder>
//
// Most scenarios run in a git worktree of --ref (default HEAD) without examples/ or evals/, so the agent
// can't read the rubric. Scenarios with a "repo" run in a product repo made from a fixture instead, with
// its own git history, next to a worktree of the harness to install from. Inputs and fixtures come from
// this checkout.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) => execFileSync("git", ["-C", root, ...args], { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

if (args.includes("--clean")) {
  const out = resolve(option("--clean") ?? "");
  if (!option("--clean") || !existsSync(out)) {
    console.error("Usage: node evals/prepare.mjs --clean <folder>");
    process.exit(1);
  }
  for (const name of readdirSync(out)) {
    const dir = join(out, name);
    if (existsSync(join(dir, ".git")) && lstatSync(join(dir, ".git")).isFile()) git("worktree", "remove", "--force", dir);
  }
  git("worktree", "prune");
  rmSync(out, { recursive: true, force: true });
  console.log(`Removed ${out}`);
  process.exit(0);
}

const ref = option("--ref") ?? "HEAD";
const commit = git("rev-parse", "--short", ref);
const ids = args.filter((a, i) => !a.startsWith("--") && !["--ref", "--out"].includes(args[i - 1]));
const { scenarios } = JSON.parse(readFileSync(join(root, "evals/scenarios.json"), "utf8"));
const chosen = ids.length ? scenarios.filter((s) => ids.includes(s.id)) : scenarios;
if (!chosen.length) {
  console.error(`No scenarios match ${ids.join(", ")}`);
  process.exit(1);
}

const out = resolve(option("--out") ?? join(tmpdir(), "harness-evals", `${new Date().toISOString().slice(0, 10)}-${commit}`));
mkdirSync(out, { recursive: true });
const template = readFileSync(join(root, "evals/prompt.md"), "utf8");

for (const s of chosen) {
  const dir = join(out, s.id);
  if (existsSync(dir)) {
    console.error(`${dir} already exists — use another --out, or --clean it first`);
    process.exit(1);
  }
  let harnessDir = "";
  if (s.repo) {
    // A product repo with its own history, and a copy of the harness next to it to install from
    harnessDir = join(out, `${s.id}-harness`);
    git("worktree", "add", "--detach", harnessDir, commit);
    cpSync(join(root, s.repo.from), dir, { recursive: true });
    const inRepo = (...a) => execFileSync("git", ["-C", dir, "-c", "user.name=Helpline team", "-c", "user.email=team@example.com", ...a], { stdio: "ignore" });
    inRepo("init", "-q", "-b", "main");
    inRepo("add", "-A");
    inRepo("commit", "-q", "-m", s.repo.commits[0]);
    for (const message of s.repo.commits.slice(1)) inRepo("commit", "-q", "--allow-empty", "-m", message);
    if (s.repo.install) {
      execFileSync("node", [join(harnessDir, "scripts/install.mjs"), dir, ...s.repo.install], { stdio: "ignore" });
      inRepo("add", "-A");
      inRepo("commit", "-q", "-m", "Set up the design harness");
    }
  } else {
    git("worktree", "add", "--detach", dir, commit);
    rmSync(join(dir, "examples"), { recursive: true, force: true });
    rmSync(join(dir, "evals"), { recursive: true, force: true });
  }
  for (const [to, from] of Object.entries(s.fixtures ?? {})) cpSync(join(root, from), join(dir, to), { recursive: true });
  for (const [to, from] of Object.entries(s.inputs ?? {})) {
    mkdirSync(dirname(join(dir, to)), { recursive: true });
    cpSync(join(root, from), join(dir, to));
  }
  const setting = s.repo
    ? `This is the repo of Helpline, a made-up help desk. You can use git here (branches, history), but don't push. The harness itself is at ${harnessDir}; there's no plugin in this run, so read and install from there, and leave that folder unchanged. If the harness is set up here already, its example content describes this same product; treat it as real.`
    : "Don't use git in it. `product/` and `design-system/` hold example content for a made-up help desk called Helpline; treat it as the real product.";
  const prompt = template
    .replaceAll("{{workspace}}", dir)
    .replaceAll("{{setting}}", setting)
    .replaceAll("{{who}}", s.who)
    .replaceAll("{{request}}", s.request)
    .replaceAll("{{answers}}", s.answers);
  writeFileSync(join(out, `${s.id}.prompt.md`), prompt);
}

console.log(`Prepared ${chosen.length} scenario(s) at ${commit} in ${out}`);
for (const s of chosen) console.log(`  ${s.id}  ${s.who} · ${s.kind}  →  ${s.id}.prompt.md`);
console.log(`\nWhen you're done: node evals/prepare.mjs --clean ${out}`);
