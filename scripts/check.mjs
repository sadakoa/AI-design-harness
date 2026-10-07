// Checks that the design system still holds together. No dependencies.
// 1. Every file in design-system/ is in INDEX.md, with the same "Answers" line
// 2. tokens.css matches tokens.json
// 3. IDs (P- R- D- FB-) aren't duplicated, and the feedback log points to real decisions
// 4. CSS in screens and options has no hard-coded colors or unknown variables (R-01)
//    Errors in design-system/screens/, warnings in work/features/. Lines tagged with an FB ID are skipped.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCss, tokensCss, tokensJson } from "./build-tokens.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ds = join(root, "design-system");
const logFile = join(root, "work/feedback.md");
const errors = [];
const warnings = [];

const read = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const rel = (path, base = root) => relative(base, path).split(sep).join("/");
const SKIP_DIRS = new Set([".git", "node_modules", "_inputs", "research"]);
const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((name) => {
        if (SKIP_DIRS.has(name)) return [];
        const path = join(dir, name);
        return statSync(path).isDirectory() ? walk(path) : [path];
      })
    : [];

// --- 1. Index ---
const rows = read(join(ds, "INDEX.md"))
  .split("\n")
  .map((line) => line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]*?)\s*\|/))
  .filter(Boolean)
  .map(([, path, answers]) => ({ path, answers }));

const toRegExp = (pattern) =>
  new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]+")}$`);
const findRow = (path) =>
  rows.find((row) => row.path === path) ??
  rows.find((row) => row.path.includes("*") && toRegExp(row.path).test(path));
const isExempt = (path) =>
  /(^|\/)(\.DS_Store|\.gitkeep)$/.test(path) ||
  path.split("/").pop().startsWith("_") || // templates
  (path.startsWith("screens/") && path !== "screens/README.md"); // screen files are checked in step 4

for (const row of rows) {
  if (!row.path.includes("*") && !existsSync(join(ds, row.path))) {
    errors.push(`INDEX.md lists ${row.path}, but it doesn't exist`);
  }
}
for (const file of walk(ds)) {
  const path = rel(file, ds);
  if (isExempt(path)) continue;
  const row = findRow(path);
  if (!row) {
    errors.push(`${path} isn't in INDEX.md — add a row saying what it answers and when to read it`);
    continue;
  }
  if (!path.endsWith(".md")) continue;
  const line = read(file).match(/^> Answers: (.+)$/m);
  if (!line) {
    errors.push(`${path} has no "> Answers:" line`);
  } else if (line[1].trim() !== row.answers.trim()) {
    errors.push(`${path} answers "${line[1].trim()}" but INDEX.md says "${row.answers}" — make them the same`);
  }
}

// --- 2. Tokens ---
let tokenNames = new Set();
try {
  const css = renderCss(JSON.parse(read(tokensJson)));
  tokenNames = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
  if (!existsSync(tokensCss) || read(tokensCss) !== css) {
    errors.push("tokens.css is out of date — run npm run tokens");
  }
} catch (error) {
  errors.push(`tokens.json: ${error.message}`);
}

// --- 3. IDs ---
const idRows = (file, prefix) =>
  existsSync(file)
    ? read(file)
        .split("\n")
        .map((line) => line.match(new RegExp(`^\\|\\s*(${prefix}-\\d+)\\s*\\|(.*)$`)))
        .filter(Boolean)
        .map(([, id, rest]) => ({ id, cells: rest.split("|").map((cell) => cell.trim()) }))
    : [];
const checkDuplicates = (ids, where) => {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${id} appears twice in ${where} — give the newer one the next free number`);
    seen.add(id);
  }
};

const principlesFile = join(ds, "foundations/principles.md");
const principleIds = existsSync(principlesFile)
  ? [...read(principlesFile).matchAll(/^###\s+(P-\d+)/gm)].map((m) => m[1])
  : [];
const decisionIds = idRows(join(ds, "decisions.md"), "D").map((r) => r.id);
const log = idRows(logFile, "FB").map(({ id, cells }) => ({ id, status: cells[5], result: cells[6] }));
checkDuplicates(principleIds, "principles.md");
checkDuplicates(idRows(join(ds, "foundations/rules.md"), "R").map((r) => r.id), "rules.md");
checkDuplicates(decisionIds, "decisions.md");
checkDuplicates(log.map((r) => r.id), "work/feedback.md");

const STATUSES = ["open", "adopted", "local", "dropped"];
for (const { id, status, result } of log) {
  if (!STATUSES.includes(status)) {
    errors.push(`${id} in work/feedback.md has status "${status}" — use one of: ${STATUSES.join(", ")}`);
  } else if (status === "adopted" && !decisionIds.includes(result)) {
    errors.push(`${id} in work/feedback.md is adopted, so its result should be a D-xx from decisions.md`);
  }
}
const statusOf = new Map(log.map((r) => [r.id, r.status]));

// --- 4. CSS in screens and options ---
const COLOR =
  /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|\b(?:white|black|red|green|blue|gray|grey|orange|yellow|purple|pink|brown|navy|silver)\b/i;

const cssChunks = (text, isCss) => {
  if (isCss) return [{ css: text, offset: 0, inline: false }];
  const chunks = [];
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    chunks.push({ css: m[1], offset: m.index + m[0].indexOf(m[1]), inline: false });
  }
  for (const m of text.matchAll(/\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const body = m[1] ?? m[2];
    chunks.push({ css: body, offset: m.index + m[0].lastIndexOf(body), inline: true });
  }
  return chunks;
};
// Only declarations inside { }, never selectors
const declarations = ({ css, offset, inline }) => {
  const bodies = inline
    ? [{ body: css, start: offset }]
    : [...css.matchAll(/\{([^{}]*)\}/g)].map((m) => ({ body: m[1], start: offset + m.index + 1 }));
  return bodies.flatMap(({ body, start }) => {
    const out = [];
    let pos = 0;
    for (const part of body.split(";")) {
      const m = part.match(/^((?:\s|\/\*[\s\S]*?\*\/)*)(--[\w-]+|[a-zA-Z-]+)\s*:([\s\S]*)$/);
      if (m) out.push({ prop: m[2], value: m[3], at: start + pos + m[1].length });
      pos += part.length + 1;
    }
    return out;
  });
};

const scan = (dir, bucket, approved) => {
  for (const file of walk(dir)) {
    const path = rel(file);
    if (/\/proposal\.html$/.test(path) && /\{\{/.test(read(file))) {
      warnings.push(`${path} still has unfilled {{ }}`);
    }
    if (!/\.(html|css)$/.test(file)) continue;
    const text = read(file);
    const lines = text.split("\n");
    const lineOf = (at) => text.slice(0, at).split("\n").length;

    for (const id of new Set(text.match(/FB-\d+/g) ?? [])) {
      if (!statusOf.has(id)) {
        bucket.push(`${path} mentions ${id}, which isn't in work/feedback.md`);
      } else if (approved && !["adopted", "local"].includes(statusOf.get(id))) {
        bucket.push(`${path} uses ${id}, which is still "${statusOf.get(id)}" — approved screens need it adopted or local`);
      }
    }

    const chunks = cssChunks(text, file.endsWith(".css"));
    const localNames = new Set(chunks.flatMap(({ css }) => [...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])));
    for (const decl of chunks.flatMap(declarations)) {
      const lineNo = lineOf(decl.at);
      if (/FB-\d+/.test(lines[lineNo - 1])) continue;
      const value = decl.value.replace(/\/\*[\s\S]*?\*\//g, "").trim();
      const bare = value.replace(/var\([^)]*\)|url\([^)]*\)|"[^"]*"|'[^']*'/g, " ");
      if (COLOR.test(bare)) {
        bucket.push(`${path}:${lineNo} ${decl.prop}: ${value} — hard-coded color (R-01; tag the line with an FB ID if it's on purpose)`);
      }
      for (const [, name] of value.matchAll(/var\(\s*(--[\w-]+)/g)) {
        if (!tokenNames.has(name) && !localNames.has(name)) {
          bucket.push(`${path}:${lineNo} ${name} isn't in tokens.css`);
        }
      }
    }
  }
};
scan(join(ds, "screens"), errors, true);
scan(join(root, "work/features"), warnings, false);

// --- Example content still in place ---
const examples = [...walk(ds), logFile]
  .filter((file) => file.endsWith(".md") && existsSync(file))
  .reduce((sum, file) => sum + (read(file).match(/\(example\)/g) ?? []).length, 0);
if (examples) warnings.push(`${examples} "(example)" entries left — see "Getting started" in the README`);

// --- Result ---
for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);
if (errors.length) process.exit(1);
console.log(`ok       index (${rows.length} rows), tokens, IDs and screen CSS look fine${warnings.length ? ` — ${warnings.length} warning(s)` : ""}`);
