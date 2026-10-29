import type { ComponentDocDetails } from "../component-catalog";

export const LAYOUT_DOCS = [
  {
    slug: "segmented-control",
    summary: "Compact tab-like control for mode switches and view filters.",
    tags: ["filters", "switcher"],
  },
  {
    slug: "tabbed-panel",
    summary: "Simple tabbed container for grouped content and install flows.",
    tags: ["tabs", "panels"],
  },
  {
    slug: "page-header",
    summary:
      "Neutral page header with title, brand slot, and optional controls.",
    tags: ["header", "brand", "shell"],
  },
  {
    slug: "page-template",
    summary:
      "Page wrapper that composes the header, subtabs, and content area.",
    tags: ["layout", "shell"],
  },
  {
    slug: "notched-viewport-frame",
    summary:
      "Bitkraft-style notched outline shell for viewport framing and overlay chrome.",
    tags: ["frame", "viewport", "shell"],
  },
  {
    slug: "radial-menu-overlay",
    summary:
      "Full-screen radial navigation surface built around the notched viewport shell.",
    tags: ["overlay", "menu", "navigation"],
  },
  {
    slug: "theme-toggle",
    summary:
      "Shared light and dark mode switch with document-level persistence.",
    tags: ["theme", "light", "dark"],
  },
  {
    slug: "marquee-strip",
    summary:
      "Continuous horizontal marquee for providers, extensions, or launch lanes.",
    tags: ["marquee", "motion", "track"],
  },
  {
    slug: "section",
    summary: "Simple content section with optional monospace title treatment.",
    tags: ["group", "layout", "content"],
  },
  {
    slug: "section-header",
    summary:
      "Framed header row for settings and control panels with optional actions.",
    tags: ["header", "settings", "actions"],
  },
  {
    slug: "stroked-text",
    summary:
      "Outlined accent text with optional stroke-to-fill blink on mount.",
    tags: ["headline", "outline"],
  },
  {
    slug: "runtime-orbit-diagram",
    summary:
      "Animated path diagram for workspace systems, flows, and runtime maps.",
    tags: ["diagram", "topology", "animation"],
  },
] satisfies ComponentDocDetails[];
