import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(currentFile), "..");
const manifestPath = join(repoRoot, "registry/registry.json");
const globalsPath = join(repoRoot, "packages/ui/src/styles/globals.css");
const checkOnly = process.argv.includes("--check");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

function normalizeLineEndings(content) {
  return content.replace(/\r\n?/g, "\n");
}

function readCssGraph(path, seen = new Set()) {
  if (seen.has(path)) return "";
  seen.add(path);

  const source = normalizeLineEndings(readFileSync(path, "utf8"));
  return source.replace(/@import\s+["'](.+)["'];/g, (_match, importPath) => {
    return readCssGraph(join(dirname(path), importPath), seen);
  });
}

const globalsCss = readCssGraph(globalsPath);
let hasDrift = false;

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function extractTokens(content) {
  const tokenPattern = "--(?:alka-[a-z0-9-]+|success(?:-foreground)?|warning(?:-foreground)?|info(?:-foreground)?|chart-[1-5])";

  return uniqueSorted([
    ...Array.from(content.matchAll(new RegExp(`var\\(\\s*(${tokenPattern})`, "gi")), (match) => match[1]),
    ...Array.from(content.matchAll(new RegExp(`(?<![\\w-])(${tokenPattern})\\s*:`, "gi")), (match) => match[1]),
  ]);
}

function extractClassNames(content) {
  return uniqueSorted(Array.from(content.matchAll(/\balka-[a-z0-9-]+/gi), (match) => match[0]));
}

function getRelevantStyleContent(item, sourceContent) {
  const classes = extractClassNames(sourceContent);
  const nameNeedles = [
    `alka-${item.name}`,
    `--alka-${item.name}`,
  ];
  const needles = uniqueSorted([...classes, ...nameNeedles]);

  return globalsCss
    .split("}")
    .filter((block) => {
      if (block.includes(":root") || block.includes(".theme-dark") || block.includes(".theme-light")) {
        return false;
      }

      return needles.some((needle) => block.includes(needle));
    })
    .map((block) => `${block}}`)
    .join("\n");
}

const nextItems = manifest.items.map((item) => {
  const sourcePath = join(repoRoot, item.source);
  if (!existsSync(sourcePath)) {
    throw new Error(`Registry source does not exist: ${item.source}`);
  }

  const sourceContent = normalizeLineEndings(readFileSync(sourcePath, "utf8"));
  const hash = `sha256-${createHash("sha256").update(sourceContent).digest("base64")}`;
  const tokens = extractTokens(`${sourceContent}\n${getRelevantStyleContent(item, sourceContent)}`);
  if (item.hash !== hash) {
    hasDrift = true;
    console.error(`${item.name}: ${item.hash} -> ${hash}`);
  }
  if (JSON.stringify(item.tokens ?? []) !== JSON.stringify(tokens)) {
    hasDrift = true;
    console.error(`${item.name}: token metadata drift`);
  }
  if ("examples" in item) {
    hasDrift = true;
    console.error(`${item.name}: remove stale examples metadata`);
  }

  const { examples: _examples, ...itemWithoutExamples } = item;
  return {
    ...itemWithoutExamples,
    hash,
    tokens,
  };
});

if (checkOnly) {
  if (hasDrift) {
    console.error("Registry hash drift detected. Run `pnpm registry:update`.");
    process.exitCode = 1;
  }
} else {
  writeFileSync(manifestPath, `${JSON.stringify({ ...manifest, items: nextItems }, null, 2)}\n`);
}
