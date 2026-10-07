// 正本の形が崩れていないかを見る。依存パッケージなし。
// 1. design-system/ のファイルが INDEX.md に載っていて、「答える問い」が INDEX と同じ文か
// 2. tokens.css が tokens.json から作り直されているか
// 3. ID（P- R- D- FB-）が重複していないか、台帳と決定ログがつながっているか
// 4. 画面と案の CSS に色の直書きや存在しない CSS 変数が無いか（rules.md R-01）
//    design-system/screens/ はエラー、work/features/ は注意。FB の ID を書いた行は数えない
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCss, tokensCss, tokensJson } from "./build-tokens.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ds = join(root, "design-system");
const ledgerFile = join(root, "work/feedback.md");
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

// --- 1. 索引 ---
const rows = read(join(ds, "INDEX.md"))
  .split("\n")
  .map((line) => line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]*?)\s*\|/))
  .filter(Boolean)
  .map(([, path, question]) => ({ path, question }));

const toRegExp = (pattern) =>
  new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]+")}$`);
const findRow = (path) =>
  rows.find((row) => row.path === path) ??
  rows.find((row) => row.path.includes("*") && toRegExp(row.path).test(path));
const isExempt = (path) =>
  /(^|\/)(\.DS_Store|\.gitkeep)$/.test(path) ||
  path.split("/").pop().startsWith("_") || // 雛形
  (path.startsWith("screens/") && path !== "screens/README.md"); // 画面の中身は 4 で見る
const sameQuestion = (a, b) => a.trim().replace(/。$/, "") === b.trim().replace(/。$/, "");

for (const row of rows) {
  if (!row.path.includes("*") && !existsSync(join(ds, row.path))) {
    errors.push(`INDEX.md に載っている ${row.path} がありません`);
  }
}
for (const file of walk(ds)) {
  const path = rel(file, ds);
  if (isExempt(path)) continue;
  const row = findRow(path);
  if (!row) {
    errors.push(`${path} が INDEX.md に載っていません（答える問いと読むタイミングを1行足す）`);
    continue;
  }
  if (!path.endsWith(".md")) continue;
  const line = read(file).match(/^> 答える問い：(.+)$/m);
  if (!line) {
    errors.push(`${path} に「> 答える問い：」の行がありません`);
  } else if (!sameQuestion(line[1], row.question)) {
    errors.push(`${path} の答える問い「${line[1]}」が INDEX.md の「${row.question}」と違います（同じ文にする）`);
  }
}

// --- 2. トークン ---
let tokenNames = new Set();
try {
  const css = renderCss(JSON.parse(read(tokensJson)));
  tokenNames = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]));
  if (!existsSync(tokensCss) || read(tokensCss) !== css) {
    errors.push("tokens.css が tokens.json と合っていません（npm run tokens を実行する）");
  }
} catch (error) {
  errors.push(`tokens.json：${error.message}`);
}

// --- 3. ID ---
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
    if (seen.has(id)) errors.push(`${where} で ${id} が重複しています（後から足した方に新しい番号を振る）`);
    seen.add(id);
  }
};

const principleIds = existsSync(join(ds, "foundations/principles.md"))
  ? [...read(join(ds, "foundations/principles.md")).matchAll(/^###\s+(P-\d+)/gm)].map((m) => m[1])
  : [];
const decisionIds = idRows(join(ds, "decisions.md"), "D").map((r) => r.id);
const ledger = idRows(ledgerFile, "FB").map(({ id, cells }) => ({ id, status: cells[5], result: cells[6] }));
checkDuplicates(principleIds, "principles.md");
checkDuplicates(idRows(join(ds, "foundations/rules.md"), "R").map((r) => r.id), "rules.md");
checkDuplicates(decisionIds, "decisions.md");
checkDuplicates(ledger.map((r) => r.id), "work/feedback.md");

const STATUSES = ["未判断", "採用", "画面だけ", "取り下げ"];
for (const { id, status, result } of ledger) {
  if (!STATUSES.includes(status)) {
    errors.push(`work/feedback.md の ${id} の状態「${status}」は ${STATUSES.join("・")} のどれかにする`);
  } else if (status === "採用" && !decisionIds.includes(result)) {
    errors.push(`work/feedback.md の ${id} は「採用」なので、結果に decisions.md の ID（D-xx）を書く`);
  }
}
const ledgerStatus = new Map(ledger.map((r) => [r.id, r.status]));

// --- 4. 画面と案の CSS ---
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
// セレクタではなく、{ } の中の宣言だけを取り出す
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

const scan = (dir, bucket, inScreens) => {
  for (const file of walk(dir)) {
    const path = rel(file);
    if (/\/proposal\.html$/.test(path) && /\{\{/.test(read(file))) {
      warnings.push(`${path} に埋めていない {{ }} が残っています`);
    }
    if (!/\.(html|css)$/.test(file)) continue;
    const text = read(file);
    const lines = text.split("\n");
    const lineOf = (at) => text.slice(0, at).split("\n").length;

    for (const id of new Set(text.match(/FB-\d+/g) ?? [])) {
      if (!ledgerStatus.has(id)) {
        bucket.push(`${path} の ${id} が work/feedback.md にありません`);
      } else if (inScreens && !["採用", "画面だけ"].includes(ledgerStatus.get(id))) {
        bucket.push(`${path} の ${id} は台帳で「${ledgerStatus.get(id)}」です。確定画面に入れるのは「採用」か「画面だけ」になってから`);
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
        bucket.push(`${path}:${lineNo} ${decl.prop}: ${value} — 色の直書き（R-01。外すなら行に FB の ID）`);
      }
      for (const [, name] of value.matchAll(/var\(\s*(--[\w-]+)/g)) {
        if (!tokenNames.has(name) && !localNames.has(name)) {
          bucket.push(`${path}:${lineNo} ${name} は tokens.css にありません`);
        }
      }
    }
  }
};
scan(join(ds, "screens"), errors, true);
scan(join(root, "work/features"), warnings, false);

// --- 例のままの箇所 ---
const leftovers = [...walk(ds), ledgerFile]
  .filter((file) => file.endsWith(".md") && existsSync(file))
  .reduce((sum, file) => sum + (read(file).match(/（例）/g) ?? []).length, 0);
if (leftovers) warnings.push(`「（例）」が ${leftovers} か所残っています（README の「はじめ方」）`);

// --- 結果 ---
for (const w of warnings) console.warn(`注意  ${w}`);
for (const e of errors) console.error(`NG    ${e}`);
if (errors.length) process.exit(1);
console.log(`OK    索引 ${rows.length} 行・トークン・ID・画面の CSS を確かめました${warnings.length ? `（注意 ${warnings.length} 件）` : ""}`);
