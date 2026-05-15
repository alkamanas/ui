import { readFileSync, writeFileSync } from "node:fs";

const path = new URL("../dist/index.js", import.meta.url);
const source = readFileSync(path, "utf8");

if (!source.startsWith("\"use client\";")) {
  writeFileSync(path, `"use client";\n${source}`);
}
