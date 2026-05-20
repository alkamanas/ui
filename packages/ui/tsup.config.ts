import { defineConfig } from "tsup";
import { getComponentEntryObject } from "./scripts/component-entries.mjs";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ...getComponentEntryObject(),
  },
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ["react", "react-dom", "lucide-react", "react-hook-form"],
  esbuildOptions(options) {
    options.banner = {
      js: "\"use client\";",
    };
  },
});
