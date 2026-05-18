import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "registry", "registry.json");
const testPath = path.join(root, "packages", "ui", "src", "components", "ui", "components-smoke-a11y.test.tsx");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const testSource = fs.readFileSync(testPath, "utf8");

const registryNames = new Set((registry.items ?? []).map((item) => item.name));
const testedNames = new Set(
  Array.from(testSource.matchAll(/\[\s*\n?\s*["']([^"']+)["']\s*,/g), (match) => match[1]),
);

const missing = Array.from(registryNames).filter((name) => !testedNames.has(name)).sort();

if (missing.length > 0) {
  console.error("Missing smoke/a11y test cases for registry items:");
  for (const name of missing) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`All ${registryNames.size} registry items have smoke/a11y test cases.`);
