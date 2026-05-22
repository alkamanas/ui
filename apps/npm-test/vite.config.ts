import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4327,
    strictPort: true,
    hmr: false,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  },
});
