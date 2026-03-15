import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@steez-ui/theme": path.resolve(__dirname, "../../packages/theme/src"),
      "@steez-ui/icons": path.resolve(__dirname, "../../packages/icons/src"),
      "@steez-ui/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
