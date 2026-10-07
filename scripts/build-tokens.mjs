// Builds CSS variables from tokens.json (the only source of values). No dependencies.
// color.action.primary → --color-action-primary
// {color.primitive.blue.600} → var(--color-primitive-blue-600)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const tokensJson = join(root, "design-system/tokens/tokens.json");
export const tokensCss = join(root, "design-system/tokens/tokens.css");

const toName = (key) => `--${key.split(".").join("-")}`;
const refPattern = /\{([^{}]+)\}/g;

function collect(node, path, out) {
  if (node && typeof node === "object" && "$value" in node) {
    out.push({ key: path.join("."), value: node.$value, description: node.$description });
    return;
  }
  for (const [key, child] of Object.entries(node ?? {})) {
    if (!key.startsWith("$")) collect(child, [...path, key], out);
  }
}

export function renderCss(tokens) {
  const leaves = [];
  collect(tokens, [], leaves);

  const byKey = new Map();
  const byName = new Map();
  for (const leaf of leaves) {
    if (typeof leaf.value !== "string" && typeof leaf.value !== "number") {
      throw new Error(`${leaf.key}: $value must be a string or a number (got ${JSON.stringify(leaf.value)})`);
    }
    const name = toName(leaf.key);
    if (byName.has(name)) throw new Error(`${byName.get(name)} and ${leaf.key} both become ${name}`);
    byName.set(name, leaf.key);
    byKey.set(leaf.key, leaf);
  }

  const refsOf = (value) => (typeof value === "string" ? [...value.matchAll(refPattern)].map((m) => m[1]) : []);
  const visit = (key, trail) => {
    if (trail.includes(key)) throw new Error(`circular reference: ${[...trail, key].join(" → ")}`);
    for (const ref of refsOf(byKey.get(key).value)) {
      if (!byKey.has(ref)) throw new Error(`${key} points to {${ref}}, which doesn't exist`);
      visit(ref, [...trail, key]);
    }
  };
  for (const key of byKey.keys()) visit(key, []);

  const lines = leaves.map(({ key, value, description }) => {
    const css = String(value).replace(refPattern, (_, ref) => `var(${toName(ref)})`);
    const note = description ? ` /* ${description.replaceAll("*/", "")} */` : "";
    return `  ${toName(key)}: ${css};${note}`;
  });
  return [
    "/* Generated — don't edit. Change tokens.json and run npm run tokens. */",
    ":root {",
    ...lines,
    "}",
    "",
  ].join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const css = renderCss(JSON.parse(readFileSync(tokensJson, "utf8")));
    writeFileSync(tokensCss, css);
    console.log(`Wrote tokens.css (${css.split("\n").length - 4} variables)`);
  } catch (error) {
    console.error(`error  ${error.message}`);
    process.exit(1);
  }
}
