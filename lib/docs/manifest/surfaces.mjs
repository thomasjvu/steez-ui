import { component, STABLE_ID_HOOK, THEMED, colocated } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const SURFACE_MANIFEST = [
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
    slug: "avatar-stage",
    name: "AvatarStage",
    category: "surfaces",
    title: "Avatar Stage",
    description:
      "Stable avatar viewport shell with backdrop and bottom divider support.",
    ...THEMED,
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
    slug: "hexagon-grid",
    name: "HexagonGrid",
    category: "surfaces",
    title: "Hexagon Grid",
    description:
      "Animated hex field backdrop for avatars, hero surfaces, and ambient panels.",
    entrypoint: "@steez-ui/ui/hexagon-grid",
    extraFiles: colocated("HexagonGrid", ["model", "paint"]),
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
    slug: "stat-card",
    name: "StatCard",
    category: "surfaces",
    title: "Stat Card",
    description: "Compact metric surface with optional tone and subvalue.",
    ...THEMED,
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
    slug: "kinetic-glyph",
    name: "KineticGlyph",
    category: "surfaces",
    title: "Kinetic Glyph",
    description:
      "Nested contour animation for a letter, number, or icon with a soft displacement ripple.",
    registryDependencies: ["displacement-filter"],
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
