export const SITE_URL = "https://steez-ui-6v5.pages.dev";
export const REPOSITORY_URL = "https://github.com/thomasjvu/steez-ui";
export const NPM_THEME_URL = "https://www.npmjs.com/package/@steez-ui/theme";
export const NPM_ICONS_URL = "https://www.npmjs.com/package/@steez-ui/icons";
export const NPM_UI_URL = "https://www.npmjs.com/package/@steez-ui/ui";

export const SITE_NAV = [
  { key: "components", label: "Components", href: "/components" },
  { key: "docs", label: "Docs", href: "/docs" },
  { key: "packages", label: "Packages", href: "/packages" },
  { key: "registry", label: "Registry", href: "/registry" },
] as const;

export const VALUE_TILES = [
  {
    title: "One source tree",
    body: "Author tokens, icons, and primitives once in the workspace packages.",
  },
  {
    title: "Three install paths",
    body: "Use npm packages for shared updates, registry items for source installs, or standalone files for one-paste ownership.",
  },
  {
    title: "Flat system",
    body: "Steez stays minimal: CSS modules, token aliases, and low-ceremony primitives.",
  },
] as const;

export const PACKAGE_ITEMS = [
  {
    title: "@steez-ui/theme",
    href: NPM_THEME_URL,
    body: "Shared design tokens, alias compatibility, and the Tailwind compatibility preset.",
  },
  {
    title: "@steez-ui/icons",
    href: NPM_ICONS_URL,
    body: "Icon exports and the provider layer used by the shared primitives.",
  },
  {
    title: "@steez-ui/ui",
    href: NPM_UI_URL,
    body: "React primitives authored in `.tsx` and `.module.css`, then published and generated.",
  },
] as const;

export const REGISTRY_ITEMS = [
  { label: "Registry index", href: "/r-steez/index.json" },
  { label: "Standalone copy index", href: "/copy/steez/index.json" },
  { label: "Foundation preset (forms)", href: "/r-steez/foundation.json" },
  { label: "Cyberpunk tile", href: "/r-steez/cyberpunk-tile.json" },
  { label: "Boiling lines", href: "/r-steez/boiling-lines.json" },
  { label: "Theme tokens", href: "/r-steez/theme-tokens.json" },
  { label: "Button item", href: "/r-steez/button.json" },
  { label: "Page template", href: "/r-steez/page-template.json" },
  { label: "Segmented control", href: "/r-steez/segmented-control.json" },
  { label: "Phantasy FUI preset (optional)", href: "/r-steez/phantasy-fui.json" },
  { label: "Surface preset", href: "/r-steez/surfaces.json" },
  { label: "Motion preset", href: "/r-steez/motion.json" },
  { label: "App shell preset", href: "/r-steez/app-shell.json" },
] as const;
