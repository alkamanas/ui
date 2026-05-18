import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4328,
  },
  resolve: {
    alias: [
      {
        find: /^@alkamanas\/ui$/,
        replacement: resolve(__dirname, "../../packages/ui/src/index.ts"),
      },
      {
        find: "@",
        replacement: resolve(__dirname, "../../packages/ui/src"),
      },
    ],
  },
});
