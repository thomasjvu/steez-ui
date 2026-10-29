import type { ComponentDocDetails } from "../component-catalog";

export const SURFACE_DOCS = [
  {
    slug: "quartz-crystal",
    summary:
      "A floating quartz with nine animated facets, local layout, and optional parallax.",
    tags: ["crystal", "decorative", "motion", "parallax"],
  },
  {
    slug: "boiling-lines",
    summary:
      "Hand-drawn motion for artwork, SVG lines, and decorative borders.",
    tags: ["motion", "illustration", "hand-drawn"],
  },
  {
    slug: "avatar-stage",
    summary:
      "Framed avatar viewport with a stable shell, viewport width, and bottom divider.",
    tags: ["avatar", "stage", "shell"],
  },
  {
    slug: "kinetic-glyph",
    summary:
      "Nested contour animation for a letter, number, or icon with a soft displacement ripple.",
    tags: ["motion", "glyph", "type", "icon"],
  },
  {
    slug: "icon-background",
    summary: "A repeating icon grid that can rotate each cell toward the pointer.",
    tags: ["background", "grid", "pointer", "motion"],
  },
  {
    slug: "character-afterimage",
    summary:
      "Rainbow holographic silhouettes with an optional one-time entrance trail for character art.",
    tags: ["motion", "character", "holographic"],
  },
  {
    slug: "themed-card",
    summary:
      "Base content container with optional title and featured emphasis.",
    tags: ["card", "container"],
  },
  {
    slug: "cyberpunk-tile",
    summary:
      "Cut-corner tile with dual-layer border (top-right + bottom-left clips).",
    tags: ["tile", "grid", "cut-corner", "fui"],
  },
  {
    slug: "accordion-feature-card",
    summary:
      "Expandable feature card with media panel, vertical title, and collapsible body.",
    tags: ["card", "accordion", "feature", "media"],
  },
  {
    slug: "corner-bracket-card",
    summary:
      "Bracketed feature surface with accent corners for standout content.",
    tags: ["featured", "accent"],
  },
  {
    slug: "dotted-halo-card",
    summary:
      "Flat card with an outer dotted field that sits beyond the main border.",
    tags: ["card", "pattern", "editorial"],
  },
  {
    slug: "hexagon-grid",
    summary:
      "Animated hex field backdrop for avatars, launch surfaces, and atmospheric panels.",
    tags: ["backdrop", "canvas", "ambient"],
  },
  {
    slug: "quick-info-card",
    summary:
      "Compact multi-stat summary surface with an optional storage meter.",
    tags: ["summary", "stats", "status"],
  },
  {
    slug: "widget-card",
    summary:
      "Dashboard widget shell with grid-size presets, header slot, and overlay support.",
    tags: ["dashboard", "widget", "grid"],
  },
  {
    slug: "stat-card",
    summary: "Small numeric stat block with optional tone and subvalue.",
    tags: ["metric", "dashboard", "number"],
  },
] satisfies ComponentDocDetails[];
