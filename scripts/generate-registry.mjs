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
import { generateStandaloneComponents } from "./generate-standalone.mjs";
import { COMPONENT_MANIFEST } from "../lib/docs/component-manifest.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(repoRoot, "public/r-steez");

const registryBaseUrl = (
  process.env.STEEZ_REGISTRY_BASE_URL?.trim() || DEFAULT_REGISTRY_BASE_URL
).replace(/\/$/, "");

const publicComponentDefinitions = COMPONENT_MANIFEST.map((component) => ({
  name: component.slug,
  type: "registry:component",
  title: component.title,
  description: component.description,
  dependencies: [...component.dependencies],
  registryDependencies: [...component.registryDependencies],
  files: component.registryFiles.map((file) => ({ ...file })),
}));

const itemDefinitions = [
  {
    name: "theme-tokens",
    type: "registry:style",
    title: "Theme Tokens",
    description: "Shared CSS tokens and compatibility aliases for Steez UI consumers.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: [],
    files: [
      { source: "packages/theme/src/tokens.css", target: "styles/steez/tokens.css", type: "registry:file" },
    ],
  },
  {
    name: "icon-provider",
    type: "registry:lib",
    title: "Icon Provider",
    description: "Shared icon provider and icon surface used by Steez primitives.",
    dependencies: ["@steez-ui/icons"],
    registryDependencies: [],
    files: [
      { source: "packages/icons/src/index.ts", target: "lib/steez/icons/index.ts", type: "registry:file" },
      { source: "packages/icons/src/Icon.tsx", target: "lib/steez/icons/Icon.tsx", type: "registry:file" },
      { source: "packages/icons/src/IconProvider.tsx", target: "lib/steez/icons/IconProvider.tsx", type: "registry:file" },
      { source: "packages/icons/src/icons.tsx", target: "lib/steez/icons/icons.tsx", type: "registry:file" },
      { source: "packages/icons/src/types.ts", target: "lib/steez/icons/types.ts", type: "registry:file" },
    ],
  },
  ...publicComponentDefinitions,
  {
    name: "foundation",
    type: "registry:block",
    title: "Foundation Preset",
    description: "Install theme tokens, icon provider, buttons, and core form primitives together.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: [
      "theme-tokens",
      "icon-provider",
      "button",
      "copy-button",
      "cyberpunk-input",
      "cyberpunk-select",
      "cyberpunk-textarea",
      "cyberpunk-checkbox",
      "cyberpunk-radio",
      "cyberpunk-slider",
    ],
    files: [],
  },
  {
    name: "phantasy-fui",
    type: "registry:block",
    title: "Phantasy FUI Preset",
    description: "Theme, tiles, and loading primitives used by Phantasy admin FUI chrome.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: [
      "theme-tokens",
      "icon-provider",
      "cyberpunk-tile",
      "fui-button-tile",
      "loading-progress-bar",
    ],
    files: [],
  },
  {
    name: "surfaces",
    type: "registry:block",
    title: "Surface Preset",
    description: "Signature tiles, quiet cards, and compact metrics for a coherent Steez surface language.",
    dependencies: [],
    registryDependencies: [
      "theme-tokens",
      "cyberpunk-tile",
      "themed-card",
      "corner-bracket-card",
      "dotted-halo-card",
      "stat-card",
      "widget-card",
    ],
    files: [],
  },
  {
    name: "motion",
    type: "registry:block",
    title: "Motion Preset",
    description: "Small, composable text and surface motion treatments with reduced-motion support.",
    dependencies: [],
    registryDependencies: [
      "theme-tokens",
      "boiling-lines",
      "ascii-ripple-text",
      "blink-text",
      "stroked-text",
      "heartbeat-pulse",
      "marquee-strip",
    ],
    files: [],
  },
  {
    name: "app-shell",
    type: "registry:block",
    title: "App Shell Preset",
    description: "Navigation, layout, feedback, and loading primitives for a complete Steez app shell.",
    dependencies: [],
    registryDependencies: [
      "theme-tokens",
      "icon-provider",
      "button",
      "page-header",
      "page-template",
      "section",
      "section-header",
      "tabbed-panel",
      "status-message",
      "error-message",
      "loading-progress-bar",
      "loading-screen",
    ],
    files: [],
  },
];

// Shared source has one owning item; consumers depend on it rather than copying it.
for (const [name, source, target] of [
  ["stable-id", "packages/ui/src/hooks/useStableId.ts", "components/hooks/useStableId.ts"],
  ["field-description", "packages/ui/src/hooks/useFieldDescription.ts", "components/hooks/useFieldDescription.ts"],
  ["roving-tabs", "packages/ui/src/hooks/useRovingTabs.ts", "components/hooks/useRovingTabs.ts"],
  ["button-styles", "packages/ui/src/styles/Buttons.module.css", "components/styles/Buttons.module.css"],
  ["card-frame", "packages/ui/src/components/CardFrame.tsx", "components/steez/CardFrame.tsx"],
  ["card-frame-styles", "packages/ui/src/components/CardFrame.module.css", "components/steez/CardFrame.module.css"],
  ["tab-list", "packages/ui/src/components/TabList.tsx", "components/steez/TabList.tsx"],
  ["tab-list-styles", "packages/ui/src/components/TabList.module.css", "components/steez/TabList.module.css"],
]) {
  for (const item of itemDefinitions) {
    if (item.files.some((file) => file.source === source)) {
      item.files = item.files.filter((file) => file.source !== source);
      item.registryDependencies.push(name);
    }
  }
  itemDefinitions.push({ name, type: "registry:lib", title: name, index: false,
    description: "Shared implementation dependency.", dependencies: [], registryDependencies: [],
    files: [{ source, target, type: "registry:file" }] });
}

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

async function readFileContent(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return {
    absolutePath,
    content: await fs.readFile(absolutePath, "utf8"),
  };
}

await fs.mkdir(registryDir, { recursive: true });

const indexItems = [];

for (const item of itemDefinitions) {
  validateItem(item);

  const files = [];

  for (const file of item.files) {
    const fileData = await readFileContent(file.source);
    files.push({
      path: file.target,
      type: "registry:file",
      target: file.target,
      content: makeRegistryContentPortable(
        fileData.content.replace(/(["'])@steez-ui\/icons\1/g, (_match, quote) => {
          let relative = path.posix.relative(path.posix.dirname(file.target), "lib/steez/icons/index");
          if (!relative.startsWith(".")) relative = `./${relative}`;
          return `${quote}${relative}${quote}`;
        }),
      ),
      source: file.source,
    });
  }

  const sourceContents = await Promise.all(
    item.files.map(async (file) => ({
      sourcePath: file.source,
      content: (await readFileContent(file.source)).content,
    })),
  );
  const registryDependencies = collectRegistryDependencies(item, sourceContents, owners);
  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies.filter((dep) => !dep.startsWith("@steez-ui/")),
    registryDependencies: registryDependencies.map((dependency) =>
      toAbsoluteRegistryDependency(dependency, registryBaseUrl),
    ),
    docs: "Files install at the project root. Import styles/steez/tokens.css once from your global stylesheet or root layout, then import components from components/steez. No Steez npm packages are required.",
    files,
  };

  await fs.writeFile(
    path.join(registryDir, `${item.name}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
  );

  if (item.index !== false) {
    indexItems.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    });
  }
}

await fs.writeFile(
  path.join(registryDir, "index.json"),
  `${JSON.stringify(indexItems, null, 2)}\n`,
);

await generateStandaloneComponents({ repoRoot });
