import { component, THEMED, THEMED_WITH_ICONS, colocated } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const LAYOUT_MANIFEST = [
  component({
    slug: "segmented-control",
    name: "SegmentedControl",
    category: "layout",
    title: "Segmented Control",
    description: "Shared segmented control for compact workspace switching.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "tabbed-panel",
    name: "TabbedPanel",
    category: "layout",
    title: "Tabbed Panel",
    description: "Simple tabbed panel for registry consumers.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "page-header",
    name: "PageHeader",
    category: "layout",
    title: "Page Header",
    description: "Neutral page header with optional icon, brand, and controls.",
    ...THEMED_WITH_ICONS,
  }),
  component({
    slug: "page-template",
    name: "PageTemplate",
    category: "layout",
    title: "Page Template",
    description:
      "Layout wrapper that composes the Steez page header and subtabs.",
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "page-header",
    ],
  }),
  component({
    slug: "notched-viewport-frame",
    name: "NotchedViewportFrame",
    category: "layout",
    title: "Notched Viewport Frame",
    description:
      "Unified notched outline shell for viewport framing and overlay chrome.",
    ...THEMED,
  }),
  component({
    slug: "radial-menu-overlay",
    name: "RadialMenuOverlay",
    category: "layout",
    title: "Radial Menu Overlay",
    description:
      "Full-screen radial navigation surface built around the notched viewport shell.",
    entrypoint: "@steez-ui/ui/blocks",
    extraFiles: colocated("RadialMenuOverlay", [
      "focus",
      "geometry",
      "rings.module.css",
      "stick.module.css",
    ]),
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "notched-viewport-frame",
    ],
  }),
  component({
    slug: "theme-toggle",
    name: "ThemeToggle",
    category: "layout",
    title: "Theme Toggle",
    description: "Shared dark and light theme toggle.",
    ...THEMED_WITH_ICONS,
  }),
  component({
    slug: "marquee-strip",
    name: "MarqueeStrip",
    category: "layout",
    title: "Marquee Strip",
    description:
      "Continuous horizontal marquee track for providers, skills, and launch lanes.",
    ...THEMED,
  }),
  component({
    slug: "section",
    name: "Section",
    category: "layout",
    title: "Section",
    description:
      "Simple content section with optional monospace title treatment.",
    ...THEMED,
  }),
  component({
    slug: "section-header",
    name: "SectionHeader",
    category: "layout",
    title: "Section Header",
    description:
      "Framed header row for settings and control panels with optional actions.",
    ...THEMED,
  }),
  component({
    slug: "stroked-text",
    name: "StrokedText",
    category: "layout",
    title: "Stroked Text",
    description:
      "Outlined accent text with an optional mount-time stroke-to-fill blink.",
    ...THEMED,
  }),
  component({
    slug: "runtime-orbit-diagram",
    name: "RuntimeOrbitDiagram",
    category: "layout",
    title: "Runtime Orbit Diagram",
    description:
      "Animated workspace topology diagram with icon nodes and moving path marker.",
    entrypoint: "@steez-ui/ui/blocks",
    ...THEMED_WITH_ICONS,
  }),
];
