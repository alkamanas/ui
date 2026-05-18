import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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
writeFileSync(outputPath, `${inlineImports(sourcePath).trim()}\n`);
