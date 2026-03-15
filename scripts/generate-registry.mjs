import fs from "fs/promises";
import path from "path";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const registryDir = path.join(repoRoot, "apps/registry/public/r");

const itemDefinitions = [
  {
    name: "theme-tokens",
    type: "registry:style",
    title: "Theme Tokens",
    description: "Shared Phantasy-compatible CSS tokens for Steez UI consumers.",
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
  {
    name: "button",
    type: "registry:component",
    title: "Button",
    description: "Core button primitive with primary, secondary, and danger variants.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/Button.tsx", target: "components/steez/Button.tsx", type: "registry:component" },
      { source: "packages/ui/src/styles/Buttons.module.css", target: "components/styles/Buttons.module.css", type: "registry:style" },
    ],
  },
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description: "Clipboard button with built-in success feedback.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "button"],
    files: [
      { source: "packages/ui/src/components/CopyButton.tsx", target: "components/steez/CopyButton.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CopyButton.module.css", target: "components/steez/CopyButton.module.css", type: "registry:style" },
    ],
  },
  {
    name: "cyberpunk-input",
    type: "registry:component",
    title: "Cyberpunk Input",
    description: "Monospace input with shared Steez form framing.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkInput.tsx", target: "components/steez/CyberpunkInput.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkInput.module.css", target: "components/steez/CyberpunkInput.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-select",
    type: "registry:component",
    title: "Cyberpunk Select",
    description: "Select primitive with the shared Steez framing and arrow treatment.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkSelect.tsx", target: "components/steez/CyberpunkSelect.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkSelect.module.css", target: "components/steez/CyberpunkSelect.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-textarea",
    type: "registry:component",
    title: "Cyberpunk Textarea",
    description: "Textarea primitive with the shared Steez form framing.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkTextarea.tsx", target: "components/steez/CyberpunkTextarea.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkTextarea.module.css", target: "components/steez/CyberpunkTextarea.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-checkbox",
    type: "registry:component",
    title: "Cyberpunk Checkbox",
    description: "Checkbox primitive for Steez forms.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkCheckbox.tsx", target: "components/steez/CyberpunkCheckbox.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkCheckbox.module.css", target: "components/steez/CyberpunkCheckbox.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-radio",
    type: "registry:component",
    title: "Cyberpunk Radio",
    description: "Radio and radio group primitives.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkRadio.tsx", target: "components/steez/CyberpunkRadio.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkRadio.module.css", target: "components/steez/CyberpunkRadio.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-slider",
    type: "registry:component",
    title: "Cyberpunk Slider",
    description: "Slider primitive with Steez progress styling.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkSlider.tsx", target: "components/steez/CyberpunkSlider.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkSlider.module.css", target: "components/steez/CyberpunkSlider.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "themed-card",
    type: "registry:component",
    title: "Themed Card",
    description: "Default Steez card surface.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/ThemedCard.tsx", target: "components/steez/ThemedCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ThemedCard.module.css", target: "components/steez/ThemedCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "cyberpunk-tile",
    type: "registry:component",
    title: "Cyberpunk Tile",
    description: "Angular tile surface shared between landing and admin shells.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkTile.tsx", target: "components/steez/CyberpunkTile.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkTile.module.css", target: "components/steez/CyberpunkTile.module.css", type: "registry:style" },
    ],
  },
  {
    name: "corner-bracket-card",
    type: "registry:component",
    title: "Corner Bracket Card",
    description: "Bracketed featured surface with accent corners.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CornerBracketCard.tsx", target: "components/steez/CornerBracketCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CornerBracketCard.module.css", target: "components/steez/CornerBracketCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "segmented-control",
    type: "registry:component",
    title: "Segmented Control",
    description: "Shared segmented control for compact workspace switching.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/SegmentedControl.tsx", target: "components/steez/SegmentedControl.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/SegmentedControl.module.css", target: "components/steez/SegmentedControl.module.css", type: "registry:style" },
    ],
  },
  {
    name: "tabbed-panel",
    type: "registry:component",
    title: "Tabbed Panel",
    description: "Simple tabbed panel for registry consumers.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/TabbedPanel.tsx", target: "components/steez/TabbedPanel.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/TabbedPanel.module.css", target: "components/steez/TabbedPanel.module.css", type: "registry:style" },
    ],
  },
  {
    name: "page-header",
    type: "registry:component",
    title: "Page Header",
    description: "Neutral page header with optional icon, brand, and controls.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/PageHeader.tsx", target: "components/steez/PageHeader.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/PageHeader.module.css", target: "components/steez/PageHeader.module.css", type: "registry:style" },
    ],
  },
  {
    name: "page-template",
    type: "registry:component",
    title: "Page Template",
    description: "Layout wrapper that composes the Steez page header and subtabs.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "page-header"],
    files: [
      { source: "packages/ui/src/components/PageTemplate.tsx", target: "components/steez/PageTemplate.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/PageTemplate.module.css", target: "components/steez/PageTemplate.module.css", type: "registry:style" },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:component",
    title: "Theme Toggle",
    description: "Shared dark and light theme toggle.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/ThemeToggle.tsx", target: "components/steez/ThemeToggle.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ThemeToggle.module.css", target: "components/steez/ThemeToggle.module.css", type: "registry:style" },
    ],
  },
  {
    name: "loading-progress-bar",
    type: "registry:component",
    title: "Loading Progress Bar",
    description: "Progress bar with segmented loading bars.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/LoadingProgressBar.tsx", target: "components/steez/LoadingProgressBar.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/LoadingProgressBar.module.css", target: "components/steez/LoadingProgressBar.module.css", type: "registry:style" },
    ],
  },
  {
    name: "status-message",
    type: "registry:component",
    title: "Status Message",
    description: "Success, error, and info toast primitive.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/StatusMessage.tsx", target: "components/steez/StatusMessage.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/StatusMessage.module.css", target: "components/steez/StatusMessage.module.css", type: "registry:style" },
    ],
  },
  {
    name: "error-message",
    type: "registry:component",
    title: "Error Message",
    description: "Inline, card, and fullscreen error message surface.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "button"],
    files: [
      { source: "packages/ui/src/components/ErrorMessage.tsx", target: "components/steez/ErrorMessage.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ErrorMessage.module.css", target: "components/steez/ErrorMessage.module.css", type: "registry:style" },
      { source: "packages/ui/src/styles/Buttons.module.css", target: "components/styles/Buttons.module.css", type: "registry:style" },
    ],
  },
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
      "cyberpunk-slider"
    ],
    files: []
  },
];

function validateItem(item) {
  if (!item.name || !item.type || !Array.isArray(item.files) || !Array.isArray(item.dependencies)) {
    throw new Error(`Invalid registry item: ${item.name || "<missing>"}`);
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
      type: file.type,
      content: fileData.content,
      source: file.source,
    });
  }

  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files,
  };

  await fs.writeFile(
    path.join(registryDir, `${item.name}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
  );

  indexItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
  });
}

await fs.writeFile(
  path.join(registryDir, "index.json"),
  `${JSON.stringify(indexItems, null, 2)}\n`,
);
