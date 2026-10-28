import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@steez-ui/theme/tokens.css",
        replacement: path.resolve("packages/theme/src/tokens.css"),
      },
      {
        find: "@steez-ui/ui/hexagon-grid",
        replacement: path.resolve("packages/ui/src/components/HexagonGrid.tsx"),
      },
      {
        find: "@steez-ui/ui/blocks",
        replacement: path.resolve("packages/ui/src/blocks.ts"),
      },
      {
        find: "@steez-ui/ui",
        replacement: path.resolve("packages/ui/src/index.ts"),
      },
      {
        find: "@steez-ui/icons",
        replacement: path.resolve("packages/icons/src/index.ts"),
      },
      {
        find: "@steez-ui/theme",
        replacement: path.resolve("packages/theme/src/index.ts"),
      },
      { find: "@", replacement: path.resolve(".") },
    ],
    dedupe: ["react", "react-dom"],
  },
  server: {
    watch: {
      ignored: [
        "**/.cache/**", "**/tmp/**", "**/dist/**", "**/.site-ssr/**",
        "**/public/copy/**", "**/public/r-steez/**", "**/registry/**",
      ],
    },
  },
  css: { postcss: { plugins: [] } },
  build: { outDir: "dist" },
});
