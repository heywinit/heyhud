import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension from "@samrum/vite-plugin-web-extension";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: path.resolve(__dirname, "manifest.json"),
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
