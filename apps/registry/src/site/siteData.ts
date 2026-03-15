export const SITE_URL = "https://steez-ui-6v5.pages.dev";
export const REPOSITORY_URL = "https://github.com/thomasjvu/steez-ui";
export const NPM_THEME_URL = "https://www.npmjs.com/package/@steez-ui/theme";
export const NPM_ICONS_URL = "https://www.npmjs.com/package/@steez-ui/icons";
export const NPM_UI_URL = "https://www.npmjs.com/package/@steez-ui/ui";

export const SITE_NAV = [
  { key: "home", label: "Home", href: "/" },
  { key: "docs", label: "Docs", href: "/docs/" },
  { key: "components", label: "Components", href: "/components/" },
  { key: "packages", label: "Packages", href: "/packages/" },
  { key: "registry", label: "Registry", href: "/registry/" },
] as const;

export const VALUE_TILES = [
  {
    title: "One source tree",
    body: "Author tokens, icons, and primitives once in the workspace packages.",
  },
  {
    title: "Two install paths",
    body: "Use npm packages for shared updates or registry items for source-level installs.",
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
  { label: "Registry index", href: "/r/index.json" },
  { label: "Foundation preset", href: "/r/foundation.json" },
  { label: "Theme tokens", href: "/r/theme-tokens.json" },
  { label: "Button item", href: "/r/button.json" },
  { label: "Page template", href: "/r/page-template.json" },
  { label: "Segmented control", href: "/r/segmented-control.json" },
] as const;
