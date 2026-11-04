import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  DEFAULT_REGISTRY_BASE_URL,
  buildSourceOwners,
  collectRegistryDependencies,
  makeRegistryContentPortable,
  toAbsoluteRegistryDependency,
} from "./lib/registry-transform.mjs";
import { buildRegistryItems } from "./lib/registry-items.mjs";
import { generateStandaloneComponents } from "./generate-standalone.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(repoRoot, "public/r-steez");

const registryBaseUrl = (
  process.env.STEEZ_REGISTRY_BASE_URL?.trim() || DEFAULT_REGISTRY_BASE_URL
).replace(/\/$/, "");

const INSTALL_DOCS =
  "Files install at the project root. Import styles/steez/tokens.css once from your global stylesheet or root layout, then import components from components/steez. No Steez npm packages are required.";

const itemDefinitions = buildRegistryItems();
const owners = buildSourceOwners(itemDefinitions);

function validateItem(item) {
  if (
    !item.name ||
    !item.type ||
    !Array.isArray(item.files) ||
    !Array.isArray(item.dependencies) ||
    !Array.isArray(item.registryDependencies)
  ) {
    throw new Error(`Invalid registry item: ${item.name || "<missing>"}`);
  }
  if (item.type === "registry:component" && item.files.length === 0) {
    throw new Error(`Registry component ${item.name} must own at least one file`);
  }
}

/** Point bare @steez-ui/icons imports at the installed icon provider. */
function localizeIconImports(content, target) {
  return content.replace(/(["'])@steez-ui\/icons\1/g, (_match, quote) => {
    let relative = path.posix.relative(path.posix.dirname(target), "lib/steez/icons/index");
    if (!relative.startsWith(".")) relative = `./${relative}`;
    return `${quote}${relative}${quote}`;
  });
}

async function buildPayload(item) {
  const sources = await Promise.all(
    item.files.map(async (file) => ({
      file,
      content: await fs.readFile(path.join(repoRoot, file.source), "utf8"),
    })),
  );
  const registryDependencies = collectRegistryDependencies(
    item,
    sources.map(({ file, content }) => ({ sourcePath: file.source, content })),
    owners,
  );
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies.filter((dep) => !dep.startsWith("@steez-ui/")),
    registryDependencies: registryDependencies.map((dependency) =>
      toAbsoluteRegistryDependency(dependency, registryBaseUrl),
    ),
    docs: INSTALL_DOCS,
    files: sources.map(({ file, content }) => ({
      path: file.target,
      type: "registry:file",
      target: file.target,
      content: makeRegistryContentPortable(localizeIconImports(content, file.target)),
      source: file.source,
    })),
  };
}

const writeJson = (name, value) =>
  fs.writeFile(path.join(registryDir, name), `${JSON.stringify(value, null, 2)}\n`);

await fs.mkdir(registryDir, { recursive: true });

for (const item of itemDefinitions) {
  validateItem(item);
  await writeJson(`${item.name}.json`, await buildPayload(item));
}

await writeJson(
  "index.json",
  itemDefinitions
    .filter((item) => item.index !== false)
    .map(({ name, type, title, description }) => ({ name, type, title, description })),
);

// Generated payloads have no compatibility aliases; prune removed/renamed items.
const expectedPayloads = new Set(["index.json", ...itemDefinitions.map((item) => `${item.name}.json`)]);
for (const file of await fs.readdir(registryDir)) {
  if (file.endsWith(".json") && !expectedPayloads.has(file)) {
    await fs.rm(path.join(registryDir, file));
  }
}

await generateStandaloneComponents({ repoRoot });
