import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
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
