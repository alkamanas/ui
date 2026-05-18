import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const packageRoot = resolve(dirname(currentFile), "..");
const repoRoot = resolve(packageRoot, "../..");
const sourceRegistryDir = join(repoRoot, "registry");
const sourceManifestPath = join(sourceRegistryDir, "registry.json");
const outputRegistryDir = join(packageRoot, "registry");
const outputSourcesDir = join(outputRegistryDir, "sources");

if (!existsSync(sourceManifestPath)) {
  throw new Error(`Registry manifest does not exist: ${sourceManifestPath}`);
}

const manifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));

rmSync(outputRegistryDir, { recursive: true, force: true });
mkdirSync(outputSourcesDir, { recursive: true });

const packagedItems = manifest.items.map((item) => {
  const sourcePath = join(repoRoot, item.source);
  if (!existsSync(sourcePath)) {
    throw new Error(`Registry source does not exist: ${item.source}`);
  }

  const extension = extname(item.source) || ".tsx";
  const targetFileName = `${item.name}${extension}`;
  const packagedSource = `registry/sources/${targetFileName}`;
  writeFileSync(join(outputSourcesDir, targetFileName), readFileSync(sourcePath));

  return {
    ...item,
    source: packagedSource,
  };
});

if (existsSync(join(sourceRegistryDir, "components"))) {
  cpSync(join(sourceRegistryDir, "components"), join(outputRegistryDir, "components"), {
    recursive: true,
  });
}

writeFileSync(
  join(outputRegistryDir, "registry.json"),
  `${JSON.stringify({ ...manifest, items: packagedItems }, null, 2)}\n`,
);
