import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  // Keep peer deps external so consumers share one React
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Bundle runtime helpers so consumers don't need matching deps
  noExternal: [
    "@radix-ui/react-slot",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  async onSuccess() {
    // Ship CSS beside the bundle for reliable "@steez-ui/react/styles.css"
    mkdirSync(join(root, "dist"), { recursive: true });
    copyFileSync(
      join(root, "src/styles/steez.css"),
      join(root, "dist/styles.css"),
    );
  },
});
