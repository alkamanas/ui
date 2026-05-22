import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const distDir = new URL("../dist/", import.meta.url);

for (const file of readdirSync(distDir)) {
  if (!file.endsWith(".js")) continue;

  const path = new URL(file, distDir);
  const source = readFileSync(path, "utf8");

  if (!source.startsWith("\"use client\";")) {
    writeFileSync(path, `"use client";\n${source}`);
  }
}
