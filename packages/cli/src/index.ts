import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type RegistryItem = {
  name: string;
  version: string;
  type: string;
  description: string;
  source: string;
  hash: string;
};

type RegistryManifest = {
  name: string;
  version: string;
  items: RegistryItem[];
};

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(currentFile), "../../..");
const manifestPath = join(repoRoot, "registry/registry.json");

function readManifest(): RegistryManifest {
  return JSON.parse(readFileSync(manifestPath, "utf8")) as RegistryManifest;
}

function printHelp() {
  console.log(`alka

Usage:
  alka list
  alka info <component>
  alka add <component> [--cwd <path>]

The first CLI version records registry metadata and can copy component source
from this repo into ./components/alkamanas. Diff/update support will build on
the stored version and hash fields.`);
}

function getFlagValue(args: string[], flag: string) {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
}

function copyItem(item: RegistryItem, cwd: string) {
  const sourcePath = join(repoRoot, item.source);
  const targetPath = join(cwd, "components/alkamanas", `${item.name}.tsx`);

  if (!existsSync(sourcePath)) {
    throw new Error(`Registry source does not exist: ${item.source}`);
  }

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, readFileSync(sourcePath, "utf8"));

  const recordPath = join(cwd, "components/alkamanas/registry.json");
  let localRecords: RegistryItem[] = [];
  if (existsSync(recordPath)) {
    localRecords = JSON.parse(readFileSync(recordPath, "utf8")) as RegistryItem[];
  }
  const nextRecords = [...localRecords.filter((record) => record.name !== item.name), item];
  writeFileSync(recordPath, `${JSON.stringify(nextRecords, null, 2)}\n`);

  console.log(`Added ${item.name} to ${targetPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const [command, name] = args;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  const manifest = readManifest();

  if (command === "list") {
    manifest.items.forEach((item) => {
      console.log(`${item.name}\t${item.version}\t${item.type}\t${item.description}`);
    });
    return;
  }

  if (!name) {
    throw new Error(`${command} requires a component name.`);
  }

  const item = manifest.items.find((entry) => entry.name === name);
  if (!item) {
    throw new Error(`Unknown registry item: ${name}`);
  }

  if (command === "info") {
    console.log(JSON.stringify(item, null, 2));
    return;
  }

  if (command === "add") {
    copyItem(item, resolve(getFlagValue(args, "--cwd") ?? process.cwd()));
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
