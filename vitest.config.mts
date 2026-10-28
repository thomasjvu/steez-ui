import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Avoid project PostCSS/Tailwind pipeline under vitest; CSS modules only need class names.
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    // Keep local validation responsive alongside the dev server and desktop apps.
    maxWorkers: 1,
    // Node 22+ ships a global localStorage that shadows jsdom's and is undefined
    // without --localstorage-file. Turn it off so tests use jsdom storage.
    execArgv: ["--no-experimental-webstorage"],
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "packages/ui/src/**/*.test.ts",
      "packages/ui/src/**/*.test.tsx",
      "lib/**/*.test.ts",
      "lib/**/*.test.tsx",
      "scripts/**/*.test.mjs",
    ],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
      "@steez-ui/icons": path.resolve(
        import.meta.dirname,
        "packages/icons/src/index.ts",
      ),
      "@steez-ui/theme": path.resolve(
        import.meta.dirname,
        "packages/theme/src/index.ts",
      ),
      "@steez-ui/ui/blocks": path.resolve(
        import.meta.dirname,
        "packages/ui/src/blocks.ts",
      ),
      "@steez-ui/ui": path.resolve(
        import.meta.dirname,
        "packages/ui/src/index.ts",
      ),
    },
  },
});
