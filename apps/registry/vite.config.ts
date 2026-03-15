import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getComponentPageInputs() {
  const componentsRoot = path.resolve(__dirname, "components");

  if (!fs.existsSync(componentsRoot)) {
    return {};
  }

  const inputs: Record<string, string> = {
    components: path.resolve(componentsRoot, "index.html"),
  };

  for (const entry of fs.readdirSync(componentsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    inputs[`component-${entry.name}`] = path.resolve(componentsRoot, entry.name, "index.html");
  }

  return inputs;
}

const componentPageInputs = getComponentPageInputs();

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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        docs: path.resolve(__dirname, "docs/index.html"),
        ...componentPageInputs,
        packages: path.resolve(__dirname, "packages/index.html"),
        registry: path.resolve(__dirname, "registry/index.html"),
      },
    },
  },
});
