import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { COMPONENT_MANIFEST } from "../lib/docs/component-manifest.mjs";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDirectory = path.join(repoRoot, "public/copy/steez");
const index = JSON.parse(
  await fs.readFile(path.join(standaloneDirectory, "index.json"), "utf8"),
);

const expectedNames = new Set(COMPONENT_MANIFEST.map((component) => component.slug));
const generatedFiles = (await fs.readdir(standaloneDirectory))
  .filter((file) => file.endsWith(".tsx"))
  .sort();
const generatedNames = new Set(generatedFiles.map((file) => file.replace(/\.tsx$/, "")));
const indexedNames = new Set(index.map((entry) => entry.name));

if (index.length !== expectedNames.size) {
  throw new Error(`Standalone index has ${index.length} items; expected ${expectedNames.size}.`);
}

if (
  generatedNames.size !== expectedNames.size ||
  [...expectedNames].some((name) => !generatedNames.has(name)) ||
  indexedNames.size !== expectedNames.size ||
  [...expectedNames].some((name) => !indexedNames.has(name))
) {
  throw new Error("Standalone component files do not match the component manifest.");
}

for (const file of generatedFiles) {
  const filePath = path.join(standaloneDirectory, file);
  const source = await fs.readFile(filePath, "utf8");

  if (source.includes("@steez-ui/")) {
    throw new Error(`Standalone copy keeps a Steez package import: ${file}`);
  }

  if (/\b(?:from|import)\s*["']\.[^"']+["']/.test(source)) {
    throw new Error(`Standalone copy keeps a relative import: ${file}`);
  }

  if (/\b(?:from|import)\s*["'][^"']*\.module\.css["']/.test(source)) {
    throw new Error(`Standalone copy keeps a CSS module import: ${file}`);
  }

  for (const match of source.matchAll(/(?:from\s+|import\s*)["']([^"']+)["']/g)) {
    if (match[1] !== "react") {
      throw new Error(`Standalone copy has an unexpected external import (${match[1]}): ${file}`);
    }
  }
}

const tscPath = path.join(repoRoot, "node_modules/.bin/tsc");
try {
  await execFileAsync(tscPath, [
    "--noEmit",
    "--target",
    "ES2022",
    "--module",
    "ESNext",
    "--moduleResolution",
    "Bundler",
    "--jsx",
    "react-jsx",
    "--strict",
    "--esModuleInterop",
    "--allowSyntheticDefaultImports",
    "--skipLibCheck",
    ...generatedFiles.map((file) => path.join(standaloneDirectory, file)),
  ], { cwd: repoRoot });
} catch (error) {
  console.error(error.stdout || error.message);
  process.exit(1);
}

console.log(`Verified ${generatedFiles.length} standalone component copies without Steez package imports.`);
