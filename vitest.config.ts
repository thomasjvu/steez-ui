import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@steez-ui/theme": path.resolve(__dirname, "./packages/theme/src"),
      "@steez-ui/icons": path.resolve(__dirname, "./packages/icons/src"),
      "@steez-ui/ui": path.resolve(__dirname, "./packages/ui/src"),
    },
  },
  test: {
    environment: "node",
    include: ["./tests/**/*.test.ts?(x)"],
  },
});
