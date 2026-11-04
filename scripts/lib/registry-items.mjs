/**
 * Every r-steez registry item, in index order: foundation libraries, the
 * public components from the manifest, install presets, then one item per
 * shared helper. Pure data; generate-registry.mjs reads, transforms and
 * writes the files.
 */
import { COMPONENT_MANIFEST } from "../../lib/docs/component-manifest.mjs";
import { SHARED_REGISTRY_HELPERS } from "../../lib/docs/registry-helpers.mjs";

const file = (source, target) => ({ source, target, type: "registry:file" });

const ICON_FILES = ["index.ts", "Icon.tsx", "IconProvider.tsx", "icons.tsx", "icons.data.ts", "types.ts"];

const FOUNDATION_ITEMS = [
  {
    name: "theme-tokens",
    type: "registry:style",
    title: "Theme Tokens",
    description: "Shared CSS tokens and compatibility aliases for Steez UI consumers.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: [],
    files: [file("packages/theme/src/tokens.css", "styles/steez/tokens.css")],
  },
  {
    name: "icon-provider",
    type: "registry:lib",
    title: "Icon Provider",
    description: "Shared icon provider and icon surface used by Steez primitives.",
    dependencies: ["@steez-ui/icons"],
    registryDependencies: [],
    files: ICON_FILES.map((name) => file(`packages/icons/src/${name}`, `lib/steez/icons/${name}`)),
  },
  {
    name: "field-frame",
    index: false,
    type: "registry:lib",
    title: "Field Frame",
    description: "Shared field label, control frame, and validation descriptions.",
    dependencies: [],
    registryDependencies: ["field-description", "theme-tokens"],
    files: ["Field.tsx", "Field.module.css"].map((name) =>
      file(`packages/ui/src/components/${name}`, `components/steez/${name}`),
    ),
  },
];

const THEME_AND_ICONS = ["@steez-ui/theme", "@steez-ui/icons"];

/** Install-together bundles; they own no files of their own. */
const PRESETS = [
  ["foundation", "Foundation Preset",
    "Install theme tokens, icon provider, buttons, and core form primitives together.",
    THEME_AND_ICONS,
    ["theme-tokens", "icon-provider", "button", "copy-button", "input", "select", "textarea", "checkbox", "radio", "slider"]],
  ["phantasy-fui", "Phantasy FUI Preset",
    "Theme, tiles, and loading primitives used by Phantasy admin FUI chrome.",
    THEME_AND_ICONS,
    ["theme-tokens", "icon-provider", "cyberpunk-tile", "fui-button-tile", "loading-progress-bar"]],
  ["surfaces", "Surface Preset",
    "Signature tiles, quiet cards, and compact metrics for a coherent Steez surface language.",
    [],
    ["theme-tokens", "cyberpunk-tile", "themed-card", "corner-bracket-card", "dotted-halo-card", "stat-card", "widget-card"]],
  ["motion", "Motion Preset",
    "Small, composable text and surface motion treatments with reduced-motion support.",
    [],
    ["quartz-crystal", "theme-tokens", "boiling-lines", "displacement-filter", "ascii-ripple-text", "blink-text",
      "kinetic-glyph", "kinetic-swipe-text", "kinetic-text-ramp", "kinetic-text-ring", "kinetic-text-globe",
      "kinetic-text-volume", "stroked-text", "heartbeat-pulse", "marquee-strip"]],
  ["app-shell", "App Shell Preset",
    "Navigation, layout, feedback, and loading primitives for a complete Steez app shell.",
    [],
    ["theme-tokens", "icon-provider", "button", "page-header", "page-template", "section", "section-header",
      "tabbed-panel", "status-message", "error-message", "loading-progress-bar", "loading-screen"]],
].map(([name, title, description, dependencies, registryDependencies]) => ({
  name, type: "registry:block", title, description, dependencies, registryDependencies, files: [],
}));

const componentItems = () =>
  COMPONENT_MANIFEST.map((component) => ({
    name: component.slug,
    type: "registry:component",
    title: component.title,
    description: component.description,
    dependencies: [...component.dependencies],
    registryDependencies: [...component.registryDependencies],
    files: component.registryFiles.map((entry) => ({ ...entry })),
  }));

/**
 * Shared source has one owning item: strip it from every other item, depend
 * on the owner instead, and append the owner.
 */
function withSharedHelpers(items) {
  for (const { name, source, target } of SHARED_REGISTRY_HELPERS) {
    for (const item of items) {
      if (item.files.some((entry) => entry.source === source)) {
        item.files = item.files.filter((entry) => entry.source !== source);
        item.registryDependencies.push(name);
      }
    }
    items.push({ name, type: "registry:lib", title: name, index: false,
      description: "Shared implementation dependency.", dependencies: [], registryDependencies: [],
      files: [file(source, target)] });
  }
  return items;
}

/** Fresh, mutable item definitions for one generator run. */
export function buildRegistryItems() {
  const copy = (item) => ({ ...item, dependencies: [...item.dependencies],
    registryDependencies: [...item.registryDependencies], files: item.files.map((entry) => ({ ...entry })) });
  return withSharedHelpers([
    ...FOUNDATION_ITEMS.map(copy),
    ...componentItems(),
    ...PRESETS.map(copy),
  ]);
}
