import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 4317,
  },
  resolve: {
    alias: {
      "@alkamanas/ui": resolve(__dirname, "../../packages/ui/src/index.ts"),
      "@": resolve(__dirname, "../../packages/ui/src"),
    },
    preserveSymlinks: true,
  },
});
