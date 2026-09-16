import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(repoRoot, "public/r-steez");
const sampleDir = path.join(repoRoot, "tmp/registry-install-smoke");
const index = JSON.parse(await fs.readFile(path.join(registryDir, "index.json"), "utf8"));
const items = new Map(await Promise.all(index.map(async ({ name }) => [name,
  JSON.parse(await fs.readFile(path.join(registryDir, `${name}.json`), "utf8"))])));
const indexedNames = new Set();

for (const entry of index) {
  if (!entry?.name || indexedNames.has(entry.name)) {
    throw new Error(`Invalid or duplicate index entry: ${entry?.name || "<missing>"}`);
  }
  indexedNames.add(entry.name);
}

for (const file of await fs.readdir(registryDir)) {
  if (file === "index.json" || !file.endsWith(".json")) continue;
  const name = file.slice(0, -".json".length);
  if (!indexedNames.has(name)) {
    throw new Error(`Registry payload is missing from index: ${file}`);
  }
}

function dependencyBasename(dep) {
  const raw = String(dep).trim();
  const withoutQuery = raw.split("?")[0].split("#")[0];
  try {
    return path.basename(new URL(withoutQuery).pathname, ".json");
  } catch {
    return path.basename(withoutQuery, ".json");
  }
}

function validateItem(item) {
  if (
    !item ||
    typeof item.name !== "string" ||
    typeof item.type !== "string" ||
    !Array.isArray(item.files) ||
    !Array.isArray(item.dependencies) ||
    !Array.isArray(item.registryDependencies)
  ) {
    throw new Error(`Invalid registry item: ${item?.name || "<missing>"}`);
  }
  if (item.type === "registry:component" && item.files.length === 0) {
    throw new Error(`Registry component ${item.name} has no installable files`);
  }
}

for (const entry of index) {
  if (!entry?.name || items.get(entry.name)?.name !== entry.name) {
    throw new Error(`Index entry has no matching payload: ${entry?.name || "<missing>"}`);
  }
  validateItem(items.get(entry.name));
}

function closure(name, visiting = new Set(), found = new Map()) {
  if (visiting.has(name)) throw new Error(`Dependency cycle: ${[...visiting, name].join(" -> ")}`);
  if (found.has(name)) return found;
  const item = items.get(name);
  if (!item) throw new Error(`Missing dependency: ${name}`);
  visiting.add(name);
  for (const dep of item.registryDependencies) {
    closure(dependencyBasename(dep), visiting, found);
  }
  visiting.delete(name);
  found.set(name, item);
  return found;
}

await fs.rm(sampleDir, { recursive: true, force: true });
await fs.mkdir(sampleDir, { recursive: true });
for (const { name } of index) {
  const files = new Map();
  for (const item of closure(name).values()) {
    if (item.dependencies.some((dep) => dep.startsWith("@steez-ui/"))) {
      throw new Error(`${name} requires a Steez package`);
    }
    for (const file of item.files) {
      if (!file.target || file.target !== file.path || file.target.includes("..") || path.isAbsolute(file.target)) {
        throw new Error(`Invalid target in ${item.name}: ${file.target}`);
      }
      if (files.has(file.target)) throw new Error(`Duplicate installed file: ${file.target}`);
      if (file.content.includes("@steez-ui/")) throw new Error(`Package import in ${file.target}`);
      files.set(file.target, file.content);
    }
  }
  // Each item gets its own consumer directory: other components cannot hide missing dependencies.
  for (const [target, content] of files) {
    for (const match of content.matchAll(/(?:from\s+|import\s*(?:\(\s*)?|export\s+from\s*)["'](\.\.?\/[^"']+\.(?:cjs|jsx?|mjs))["']/gi)) {
      throw new Error(`${name}: non-portable relative import ${target} -> ${match[1]}`);
    }
    for (const match of content.matchAll(/(?:from\s*|import\s*)["'](\.[^"']+)["']/g)) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(target), match[1]));
      const candidates = [resolved, `${resolved}.ts`, `${resolved}.tsx`, resolved.replace(/\.js$/, ".ts"), resolved.replace(/\.js$/, ".tsx")];
      if (!candidates.some((candidate) => files.has(candidate))) {
        throw new Error(`${name}: unresolved import ${target} -> ${match[1]}`);
      }
    }
    const output = path.join(sampleDir, name, target);
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, content);
  }
}
await fs.writeFile(path.join(sampleDir, "global.d.ts"), 'declare module "*.module.css" { const classes: Record<string, string>; export default classes; }\n');
await fs.writeFile(path.join(sampleDir, "tsconfig.json"), JSON.stringify({
  compilerOptions: { target: "ES2022", module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, esModuleInterop: true, skipLibCheck: true },
  include: ["**/*.ts", "**/*.tsx"],
}, null, 2));
try {
  await promisify(execFile)(path.join(repoRoot, "node_modules/.bin/tsc"), ["--noEmit", "-p", path.join(sampleDir, "tsconfig.json")], { cwd: repoRoot });
} catch (error) {
  console.error(error.stdout || error.message);
  process.exit(1);
}
console.log(`Verified ${index.length} independent registry installs without workspace aliases.`);
