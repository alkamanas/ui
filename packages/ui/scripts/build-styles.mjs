import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

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

const inputCss = [
  '@import "tailwindcss/theme.css" layer(theme);',
  '@import "tailwindcss/utilities.css" layer(utilities);',
  '@source "../";',
  inlineImports(sourcePath).trim(),
].join("\n");

const result = await postcss([tailwindcss({ optimize: true })]).process(inputCss, {
  from: join(packageRoot, "src/styles/__alka-package-styles.css"),
});

const defaultColorTokenPattern =
  /--color-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+:[^;]+;/g;

const css = result.css.replace(defaultColorTokenPattern, "").trim();

writeFileSync(outputPath, `${css}\n`);
