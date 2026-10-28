/** @typedef {{source: string; target: string; type: string}} RegistryFile */
/** @typedef {"actions"|"forms"|"surfaces"|"layout"|"feedback"|"filters"} ComponentCategory */
/**
 * Canonical metadata for every public @steez-ui/ui registry component.
 *
 * @typedef {{
 *   slug: string;
 *   title: string;
 *   description: string;
 *   category: ComponentCategory;
 *   packageEntrypoint: string;
 *   packageExports: string[];
 *   registryFiles: RegistryFile[];
 *   dependencies: string[];
 *   registryDependencies: string[];
 *   previewLoader?: string;
 * }} ComponentManifestEntry
 */

/** @type {RegistryFile} */
const STABLE_ID_HOOK = {
  source: "packages/ui/src/hooks/useStableId.ts",
  target: "components/hooks/useStableId.ts",
  type: "registry:file",
};
/** Components styled with Steez theme tokens. */
const THEMED = {
  dependencies: ["@steez-ui/theme"],
  registryDependencies: ["theme-tokens"],
};
/** Themed components that also render Steez icons. */
const THEMED_WITH_ICONS = {
  dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
  registryDependencies: ["theme-tokens", "icon-provider"],
};
/** @type {RegistryFile} */
const BUTTON_STYLES = {
  source: "packages/ui/src/styles/Buttons.module.css",
  target: "components/styles/Buttons.module.css",
  type: "registry:style",
};

/**
 * One manifest entry. Defaults cover the common case: a single export from
 * @steez-ui/ui whose files are <Name>.tsx plus <Name>.module.css, previewed
 * by a loader named after the slug.
 * @param {{
 *   slug: string;
 *   name: string;
 *   category: ComponentCategory;
 *   title: string;
 *   description: string;
 *   exports?: string[];
 *   entrypoint?: string;
 *   css?: boolean;
 *   extraFiles?: RegistryFile[];
 *   files?: RegistryFile[];
 *   dependencies?: string[];
 *   registryDependencies?: string[];
 * }} options
 * @returns {ComponentManifestEntry}
 */
function component({
  slug,
  name,
  category,
  title,
  description,
  exports = [name],
  entrypoint = "@steez-ui/ui",
  css = true,
  extraFiles = [],
  files,
  dependencies = [],
  registryDependencies = [],
}) {
  const base = `packages/ui/src/components/${name}`;
  const target = `components/steez/${name}`;
  return {
    slug,
    title,
    description,
    category,
    packageEntrypoint: entrypoint,
    packageExports: exports,
    registryFiles: files ?? [
      {
        source: `${base}.tsx`,
        target: `${target}.tsx`,
        type: "registry:component",
      },
      ...(css
        ? [
            {
              source: `${base}.module.css`,
              target: `${target}.module.css`,
              type: "registry:style",
            },
          ]
        : []),
      ...extraFiles,
    ],
    dependencies,
    registryDependencies,
    previewLoader: slug,
  };
}

/** @type {readonly ComponentManifestEntry[]} */
export const COMPONENT_MANIFEST = [
  component({
    slug: "quartz-crystal",
    name: "QuartzCrystal",
    category: "surfaces",
    title: "Quartz Crystal",
    description:
      "Decorative nine-facet crystal with slow floating motion, rotating faces, optional bounded pointer parallax, and reduced-motion support.",
    ...THEMED,
  }),
  component({
    slug: "ascii-ripple-text",
    name: "AsciiRippleText",
    category: "feedback",
    title: "ASCII Ripple Text",
    description:
      "Hover-driven ASCII glitch ripple for editorial text links and mono-heavy navigation moments.",
    ...THEMED,
  }),
  component({
    slug: "avatar-stage",
    name: "AvatarStage",
    category: "surfaces",
    title: "Avatar Stage",
    description:
      "Stable avatar viewport shell with backdrop and bottom divider support.",
    ...THEMED,
  }),
  component({
    slug: "blink-text",
    name: "BlinkText",
    category: "feedback",
    title: "Blink Text",
    description:
      "Hover and mount-triggered blink text treatment for small attention cues.",
    ...THEMED,
  }),
  component({
    slug: "button",
    name: "Button",
    category: "actions",
    title: "Button",
    description:
      "Native button or link with shared variants and an optional crystal shape.",
    css: false,
    extraFiles: [BUTTON_STYLES],
    ...THEMED_WITH_ICONS,
  }),
  component({
    slug: "character-afterimage",
    name: "CharacterAfterimage",
    category: "surfaces",
    title: "Character Afterimage",
    description:
      "Character artwork with cycling holographic silhouettes and an optional entrance trail.",
  }),
  component({
    slug: "copy-button",
    name: "CopyButton",
    category: "actions",
    title: "Copy Button",
    description: "Clipboard button with built-in success feedback.",
    ...THEMED_WITH_ICONS,
  }),
  component({
    slug: "input",
    name: "Input",
    category: "forms",
    title: "Input",
    description: "Monospace input with shared Steez form framing.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "select",
    name: "Select",
    category: "forms",
    title: "Select",
    description:
      "Native browser selection with optional cut label, icon stack, helper text, and validation.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "textarea",
    name: "Textarea",
    category: "forms",
    title: "Textarea",
    description: "Native multiline input with a plain or notched label.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED_WITH_ICONS,
    registryDependencies: [
      ...THEMED_WITH_ICONS.registryDependencies,
      "field-frame",
    ],
  }),
  component({
    slug: "checkbox",
    name: "Checkbox",
    category: "forms",
    title: "Checkbox",
    description: "Checkbox primitive for Steez forms.",
    css: false,
    extraFiles: [STABLE_ID_HOOK],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "radio",
    name: "RadioGroup",
    category: "forms",
    title: "Radio",
    description: "Radio and radio group primitives.",
    files: [
      {
        source: "packages/ui/src/components/Radio.tsx",
        target: "components/steez/Radio.tsx",
        type: "registry:component",
      },
      {
        source: "packages/ui/src/components/Radio.module.css",
        target: "components/steez/Radio.module.css",
        type: "registry:style",
      },
      {
        source: "packages/ui/src/hooks/useStableId.ts",
        target: "components/hooks/useStableId.ts",
        type: "registry:file",
      },
    ],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "slider",
    name: "Slider",
    category: "forms",
    title: "Slider",
    description:
      "Native range input with progress and value display. The diamond variant has a slim track and a solid square thumb that rotates while held; both variants retain native keyboard controls.",
    extraFiles: [STABLE_ID_HOOK],
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "themed-card",
    name: "ThemedCard",
    category: "surfaces",
    title: "Themed Card",
    description: "Default Steez card surface.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "cyberpunk-tile",
    name: "CyberpunkTile",
    category: "surfaces",
    title: "Cyberpunk Tile",
    description: "Angular tile surface for dashboards, docs, and launch pages.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "fui-button-tile",
    name: "FUIButtonTile",
    category: "actions",
    title: "FUI Button Tile",
    description:
      "Square HUD tile button with icon, label, and corner chevron for launcher grids and tool pickers.",
    ...THEMED,
  }),
  component({
    slug: "accordion-feature-card",
    name: "AccordionFeatureCard",
    category: "surfaces",
    title: "Accordion Feature Card",
    description:
      "Expandable feature card with media panel, vertical title, and collapsible body.",
    entrypoint: "@steez-ui/ui/blocks",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED,
  }),
  component({
    slug: "corner-bracket-card",
    name: "CornerBracketCard",
    category: "surfaces",
    title: "Corner Bracket Card",
    description: "Bracketed featured surface with accent corners.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "dotted-halo-card",
    name: "DottedHaloCard",
    category: "surfaces",
    title: "Dotted Halo Card",
    description:
      "Flat content card with a dotted field extending beyond the main border.",
    ...THEMED,
  }),
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
    slug: "loading-screen",
    name: "LoadingScreen",
    category: "feedback",
    title: "Loading Screen",
    description:
      "Fullscreen or contained loading shell with progress, cross field, and neutral branding hooks.",
    exports: ["LoadingScreen", "useLoadingProgress"],
    ...THEMED_WITH_ICONS,
  }),
  component({
    slug: "loading-overlay-crystalline",
    name: "LoadingOverlayCrystalline",
    category: "feedback",
    title: "Loading Overlay Crystalline",
    description:
      "Compact centered loading overlay for viewer and media surfaces.",
    entrypoint: "@steez-ui/ui/blocks",
    ...THEMED,
  }),
  component({
    slug: "loading-progress-bar",
    name: "LoadingProgressBar",
    category: "feedback",
    title: "Loading Progress Bar",
    description: "Progress bar with segmented loading bars.",
    ...THEMED,
  }),
  component({
    slug: "heartbeat-pulse",
    name: "HeartbeatPulse",
    category: "feedback",
    title: "Heartbeat Pulse",
    description:
      "Orb and line heartbeat indicators for recurring runtime activity.",
    ...THEMED,
  }),
  component({
    slug: "hexagon-grid",
    name: "HexagonGrid",
    category: "surfaces",
    title: "Hexagon Grid",
    description:
      "Animated hex field backdrop for avatars, hero surfaces, and ambient panels.",
    entrypoint: "@steez-ui/ui/hexagon-grid",
    ...THEMED,
  }),
  component({
    slug: "overlay-button",
    name: "OverlayButton",
    category: "actions",
    title: "Overlay Button",
    description:
      "Compact floating control button for viewer and media overlays.",
    ...THEMED,
  }),
  component({
    slug: "pixel-tooltip",
    name: "PixelTooltip",
    category: "feedback",
    title: "Pixel Tooltip",
    description: "Compact hover tooltip for terse control hints.",
    extraFiles: [STABLE_ID_HOOK],
    ...THEMED,
  }),
  component({
    slug: "quick-info-card",
    name: "QuickInfoCard",
    category: "surfaces",
    title: "Quick Info Card",
    description:
      "Compact multi-stat summary surface with an optional storage meter.",
    entrypoint: "@steez-ui/ui/blocks",
    ...THEMED,
  }),
  component({
    slug: "widget-card",
    name: "WidgetCard",
    category: "surfaces",
    title: "Widget Card",
    description:
      "Dashboard widget shell with size presets and optional overlay content.",
    entrypoint: "@steez-ui/ui/blocks",
    ...THEMED,
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
    slug: "stat-card",
    name: "StatCard",
    category: "surfaces",
    title: "Stat Card",
    description: "Compact metric surface with optional tone and subvalue.",
    ...THEMED,
  }),
  component({
    slug: "status-message",
    name: "StatusMessage",
    category: "feedback",
    title: "Status Message",
    description: "Success, error, and info toast primitive.",
    ...THEMED_WITH_ICONS,
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
  component({
    slug: "error-message",
    name: "ErrorMessage",
    category: "feedback",
    title: "Error Message",
    description: "Inline, card, and fullscreen error message surface.",
    extraFiles: [BUTTON_STYLES],
    ...THEMED_WITH_ICONS,
    registryDependencies: [...THEMED_WITH_ICONS.registryDependencies, "button"],
  }),
  component({
    slug: "boiling-lines",
    name: "BoilingLines",
    category: "surfaces",
    title: "Boiling Lines",
    description:
      "Hand-drawn line motion with subtle, default, and intense presets.",
    files: [
      {
        source: "packages/ui/src/components/BoilingLines.tsx",
        target: "components/steez/BoilingLines.tsx",
        type: "registry:file",
      },
      {
        source: "packages/ui/src/components/BoilingLines.module.css",
        target: "components/steez/BoilingLines.module.css",
        type: "registry:file",
      },
    ],
    registryDependencies: ["theme-tokens"],
  }),
  component({
    slug: "kinetic-swipe-text",
    name: "KineticSwipeText",
    category: "feedback",
    title: "Kinetic Swipe Text",
    description:
      "Heavy display type that snaps through a looping horizontal or vertical split.",
  }),
  component({
    slug: "displacement-filter",
    name: "DisplacementFilter",
    category: "filters",
    title: "Displacement Filter",
    description:
      "Reusable SVG turbulence displacement for text, icons, and component content.",
    css: false,
  }),
  component({
    slug: "kinetic-glyph",
    name: "KineticGlyph",
    category: "surfaces",
    title: "Kinetic Glyph",
    description:
      "Nested contour animation for a letter, number, or icon with a soft displacement ripple.",
    registryDependencies: ["displacement-filter"],
  }),
  component({
    slug: "kinetic-text-ramp",
    name: "KineticTextRamp",
    category: "feedback",
    title: "Kinetic Text Ramp",
    description:
      "Oversized repeated type moves across a receding perspective plane with a hard extruded edge.",
  }),
  component({
    slug: "kinetic-text-ring",
    name: "KineticTextRing",
    category: "feedback",
    title: "Kinetic Text Ring",
    description:
      "Repeated display type follows a rotating elliptical path using SVG and CSS.",
  }),
  component({
    slug: "kinetic-text-globe",
    name: "KineticTextGlobe",
    category: "feedback",
    title: "Kinetic Text Globe",
    description:
      "Bold display type wraps around a rotating, high contrast sphere.",
  }),
  component({
    slug: "kinetic-text-volume",
    name: "KineticTextVolume",
    category: "feedback",
    title: "Kinetic Text Volume",
    description:
      "Repeated type ripples across the three faces of a perspective text volume.",
  }),
  component({
    slug: "chromatic-aberration-filter",
    name: "ChromaticAberrationFilter",
    category: "filters",
    title: "Chromatic Aberration Filter",
    description:
      "Separate red and cyan channels around text, icons, images, or interactive content.",
    css: false,
  }),
  component({
    slug: "glow-filter",
    name: "GlowFilter",
    category: "filters",
    title: "Glow Filter",
    description: "Alpha-derived colored halo with a crisp content layer.",
    css: false,
  }),
  component({
    slug: "grain-filter",
    name: "GrainFilter",
    category: "filters",
    title: "Grain Filter",
    description:
      "Monochrome film grain clipped to the content alpha, with optional animated seeds.",
    css: false,
  }),
  component({
    slug: "duotone-filter",
    name: "DuotoneFilter",
    category: "filters",
    title: "Duotone Filter",
    description:
      "Map luminance to a two-color palette while preserving transparency.",
    css: false,
  }),
  component({
    slug: "posterize-filter",
    name: "PosterizeFilter",
    category: "filters",
    title: "Posterize Filter",
    description: "Reduce continuous colors to distinct stepped bands.",
    css: false,
  }),
  component({
    slug: "emboss-filter",
    name: "EmbossFilter",
    category: "filters",
    title: "Emboss Filter",
    description:
      "Raise diagonal edges into a textured relief while preserving transparency.",
    css: false,
  }),
  component({
    slug: "icon-background",
    name: "IconBackground",
    category: "surfaces",
    title: "Icon Background",
    description:
      "A decorative icon grid with optional pointer-facing magnetic rotation.",
  }),
];
