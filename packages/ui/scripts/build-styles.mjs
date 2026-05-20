import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { getComponentEntries, toStyleSourceDirective } from "./component-entries.mjs";

const currentDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(currentDir, "..");
const sourcePath = join(packageRoot, "src/styles/globals.css");
const outputPath = join(packageRoot, "dist/styles.css");

function inlineImports(path, seen = new Set()) {
  if (seen.has(path)) return "";
  seen.add(path);

  const source = readFileSync(path, "utf8");
  return source.replace(/@import\s+["'](.+)["'];/g, (_, importPath) => {
    return inlineImports(join(dirname(path), importPath), seen).trim();
  });
}

mkdirSync(dirname(outputPath), { recursive: true });

const defaultColorTokenPattern =
  /--color-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+:[^;]+;/g;

function splitSelectorList(selector) {
  const selectors = [];
  let depth = 0;
  let current = "";

  for (const char of selector) {
    if (char === "(" || char === "[") depth += 1;
    if (char === ")" || char === "]") depth -= 1;

    if (char === "," && depth === 0) {
      selectors.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) selectors.push(current.trim());
  return selectors;
}

function removeGenericThemeAliases(root) {
  root.walkRules((rule) => {
    const selectors = splitSelectorList(rule.selector)
      .map((selector) =>
        selector
          .replace(/:root:not\(\.theme-dark\):not\(\.alka-theme-dark\)/g, ":root:not(.alka-theme-dark)")
          .replace(/:root:not\(\.theme-light\):not\(\.alka-theme-light\)/g, ":root:not(.alka-theme-light)"),
      )
      .filter((selector) => !/(^|[\s:(),])\.theme-(?:light|dark)\b/.test(selector));

    if (selectors.length === 0) {
      rule.remove();
      return;
    }

    rule.selector = selectors.join(",\n");
  });
}

async function buildCss({ output, from, sourceDirectives, styleImports }) {
  const inputCss = [
    '@import "tailwindcss/theme.css" layer(theme);',
    '@import "tailwindcss/utilities.css" layer(utilities);',
    ...sourceDirectives,
    ...styleImports.map((path) => inlineImports(path).trim()),
  ].join("\n");

  const result = await postcss([
    tailwindcss({ optimize: true }),
    {
      postcssPlugin: "alka-namespace-theme-output",
      Once(root) {
        removeGenericThemeAliases(root);
      },
    },
  ]).process(inputCss, {
    from,
  });

  const css = result.css.replace(defaultColorTokenPattern, "").trim();
  writeFileSync(output, `${css}\n`);
}

const fullSourceDirectives = ['@source "../";'];

await buildCss({
  output: outputPath,
  from: join(packageRoot, "src/styles/__alka-package-styles.css"),
  sourceDirectives: fullSourceDirectives,
  styleImports: [sourcePath],
});

for (const entry of getComponentEntries()) {
  await buildCss({
    output: join(packageRoot, "dist", `${entry.name}.css`),
    from: join(packageRoot, "src/styles", `__alka-${entry.name}.css`),
    sourceDirectives: entry.cssSources.map((source) => toStyleSourceDirective(source)),
    styleImports: [sourcePath],
  });
}
