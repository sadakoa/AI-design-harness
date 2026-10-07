// Checks that the harness still holds together. No dependencies.
// 1. Every file in product/ and design-system/ is in its INDEX.md, with the same "Answers" line
// 2. tokens.css matches tokens.json, and (with sync.json) both match your code
// 3. IDs aren't duplicated, the feedback log is valid, and IDs cited in work/features/ exist
// 4. CSS in screens and options has no hard-coded colors or unknown variables (R-01)
//    Errors in design-system/screens/, warnings in work/features/. Lines tagged with an FB ID are skipped.
// 5. product/ files have been reviewed in the last 90 days
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { renderCss, root, tokensCss, tokensJson } from "./build-tokens.mjs";
import { MissingSource, inventoryFile, readConfig, syncedInventory, syncedTokens } from "./sync.mjs";

const ds = join(root, "design-system");
const product = join(root, "product");
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

// --- 1. Indexes ---
const toRegExp = (pattern) =>
  new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]+")}$`);

function checkIndex(dir, isExempt) {
  const name = rel(dir);
  const indexFile = join(dir, "INDEX.md");
  if (!existsSync(indexFile)) {
    errors.push(`${name}/INDEX.md is missing`);
    return 0;
  }
  const rows = read(indexFile)
    .split("\n")
    .map((line) => line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]*?)\s*\|/))
    .filter(Boolean)
    .map(([, path, answers]) => ({ path, answers }));
  const findRow = (path) =>
    rows.find((row) => row.path === path) ??
    rows.find((row) => row.path.includes("*") && toRegExp(row.path).test(path));

  for (const row of rows) {
    if (!row.path.includes("*") && !existsSync(join(dir, row.path))) {
      errors.push(`${name}/INDEX.md lists ${row.path}, but it doesn't exist`);
    }
  }
  for (const file of walk(dir)) {
    const path = rel(file, dir);
    if (/(^|\/)(\.DS_Store|\.gitkeep)$/.test(path) || path.split("/").pop().startsWith("_") || isExempt(path)) continue;
    const row = findRow(path);
    if (!row) {
      errors.push(`${name}/${path} isn't in ${name}/INDEX.md — add a row saying what it answers and when to read it`);
      continue;
    }
    if (!path.endsWith(".md")) continue;
    const line = read(file).match(/^> Answers: (.+)$/m);
    if (!line) {
      errors.push(`${name}/${path} has no "> Answers:" line`);
    } else if (line[1].trim() !== row.answers.trim()) {
      errors.push(`${name}/${path} answers "${line[1].trim()}" but its INDEX.md says "${row.answers}" — make them the same`);
    }
  }
  return rows.length;
}
const indexRows =
  checkIndex(ds, (path) => path.startsWith("screens/") && path !== "screens/README.md") + checkIndex(product, () => false);

// --- 2. Tokens and sync ---
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

const config = existsSync(join(root, "sync.json")) ? readConfig() : null;
const syncCheck = (what, compare) => {
  try {
    if (!compare()) errors.push(`${what} doesn't match your code — run npm run sync`);
  } catch (error) {
    if (error instanceof MissingSource) warnings.push(`sync: ${error.message}, so ${what} wasn't compared`);
    else errors.push(`sync: ${error.message}`);
  }
};
if (config?.tokens) {
  syncCheck("tokens.json", () => {
    const current = JSON.parse(read(tokensJson));
    return JSON.stringify(syncedTokens(config, current)) === JSON.stringify(current);
  });
}
if (config?.components) {
  syncCheck("components/inventory.md", () => existsSync(inventoryFile) && read(inventoryFile) === syncedInventory(config));
}

// --- 3. IDs ---
const tableIds = (file, prefix) =>
  existsSync(file)
    ? read(file)
        .split("\n")
        .map((line) => line.match(new RegExp(`^\\|\\s*(${prefix}-\\d+)\\s*\\|(.*)$`)))
        .filter(Boolean)
        .map(([, id, rest]) => ({ id, cells: rest.split("|").map((cell) => cell.trim()) }))
    : [];
const headingIds = (file, prefix) =>
  existsSync(file) ? [...read(file).matchAll(new RegExp(`^###\\s+(${prefix}-\\d+)`, "gm"))].map((m) => m[1]) : [];

const ids = {
  P: headingIds(join(ds, "foundations/principles.md"), "P"),
  R: tableIds(join(ds, "foundations/rules.md"), "R").map((r) => r.id),
  D: tableIds(join(ds, "decisions.md"), "D").map((r) => r.id),
  PP: headingIds(join(product, "principles.md"), "PP"),
  U: tableIds(join(product, "users.md"), "U"),
  J: tableIds(join(product, "jobs.md"), "J"),
  CON: tableIds(join(product, "constraints.md"), "CON").map((r) => r.id),
  PD: tableIds(join(product, "decisions.md"), "PD").map((r) => r.id),
};
const CONFIDENCE = ["fact", "hypothesis", "open"];
for (const [prefix, file] of [["U", "users.md"], ["J", "jobs.md"]]) {
  for (const { id, cells } of ids[prefix]) {
    if (!cells.some((cell) => CONFIDENCE.includes(cell))) {
      errors.push(`${id} in product/${file} needs a confidence: ${CONFIDENCE.join(", ")}`);
    }
  }
  ids[prefix] = ids[prefix].map((r) => r.id);
}

const log = tableIds(logFile, "FB").map(({ id, cells }) => ({ id, layer: cells[1], type: cells[2], status: cells[6], result: cells[7] }));
const defined = new Set([...Object.values(ids).flat(), ...log.map((r) => r.id)]);

for (const [prefix, list] of [...Object.entries(ids), ["FB", log.map((r) => r.id)]]) {
  const seen = new Set();
  for (const id of list) {
    if (seen.has(id)) errors.push(`${id} is used twice — give the newer one the next free ${prefix} number`);
    seen.add(id);
  }
}

const LAYERS = ["product", "design"];
const TYPES = ["deviation", "missing", "bug", "insight", "observation"];
const STATUSES = ["open", "adopted", "screen-only", "dropped"];
for (const { id, layer, type, status, result } of log) {
  if (!LAYERS.includes(layer)) errors.push(`${id} in work/feedback.md has layer "${layer}" — use ${LAYERS.join(" or ")}`);
  if (!TYPES.includes(type)) errors.push(`${id} in work/feedback.md has type "${type}" — use one of: ${TYPES.join(", ")}`);
  if (!STATUSES.includes(status)) {
    errors.push(`${id} in work/feedback.md has status "${status}" — use one of: ${STATUSES.join(", ")}`);
  } else if (status === "adopted") {
    const decision = layer === "product" ? ids.PD : ids.D;
    if (!decision.includes(result)) {
      const where = layer === "product" ? "a PD-xx from product/decisions.md" : "a D-xx from design-system/decisions.md";
      errors.push(`${id} in work/feedback.md is adopted, so its result should be ${where}`);
    }
  }
}
const statusOf = new Map(log.map((r) => [r.id, r.status]));

// IDs cited in feature work must exist
const ID_REF = /\b(PP|PD|CON|U|J|P|R|D)-\d+\b/g;
for (const file of walk(join(root, "work/features")).filter((f) => /\.(md|html)$/.test(f))) {
  const unknown = [...new Set(read(file).match(ID_REF) ?? [])].filter((id) => !defined.has(id));
  if (unknown.length) warnings.push(`${rel(file)} cites ${unknown.join(", ")}, which don't exist`);
}

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
    if (/\/(proposal\.html|framing\.md)$/.test(path) && /\{\{/.test(read(file))) {
      warnings.push(`${path} still has unfilled {{ }}`);
    }
    if (/\/framing\.md$/.test(path) && !/^- \*\*Verdict:\*\* (go|decide first|stop)\s*$/m.test(read(file))) {
      warnings.push(`${path} needs a verdict line: go, decide first or stop`);
    }
    if (!/\.(html|css)$/.test(file)) continue;
    const text = read(file);
    const lines = text.split("\n");
    const lineOf = (at) => text.slice(0, at).split("\n").length;

    for (const id of new Set(text.match(/FB-\d+/g) ?? [])) {
      if (!statusOf.has(id)) {
        bucket.push(`${path} mentions ${id}, which isn't in work/feedback.md`);
      } else if (approved && !["adopted", "screen-only"].includes(statusOf.get(id))) {
        bucket.push(`${path} uses ${id}, which is still "${statusOf.get(id)}" — approved screens need it adopted or screen-only`);
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

// --- 5. Product context freshness ---
const DAY = 24 * 60 * 60 * 1000;
for (const file of walk(product).filter((f) => f.endsWith(".md") && !f.endsWith("INDEX.md"))) {
  const reviewed = read(file).match(/^> Reviewed: (\d{4}-\d{2}-\d{2})/m);
  if (!reviewed) warnings.push(`${rel(file)} has no "> Reviewed: YYYY-MM-DD" line`);
  else if (Date.now() - Date.parse(reviewed[1]) > 90 * DAY) warnings.push(`${rel(file)} was last reviewed on ${reviewed[1]} — check it's still true`);
}

// --- Example content still in place ---
const examples = [...walk(ds), ...walk(product), logFile]
  .filter((file) => file.endsWith(".md") && existsSync(file))
  .reduce((sum, file) => sum + (read(file).match(/\(example\)/g) ?? []).length, 0);
if (examples) warnings.push(`${examples} "(example)" entries left — see docs/adopting.md`);

// --- Result ---
for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);
if (errors.length) process.exit(1);
console.log(`ok       indexes (${indexRows} rows), tokens, IDs and screen CSS look fine${warnings.length ? ` — ${warnings.length} warning(s)` : ""}`);
