/** @typedef {import("./manifest/define.mjs").RegistryFile} RegistryFile */
/** @typedef {import("./manifest/define.mjs").ComponentCategory} ComponentCategory */
/** @typedef {import("./manifest/define.mjs").ComponentManifestEntry} ComponentManifestEntry */

// Canonical metadata for every public @steez-ui/ui registry component, split by
// catalog category under lib/docs/manifest/ (mirrors lib/docs/catalog/).
import { ACTION_MANIFEST } from "./manifest/actions.mjs";
import { FORM_MANIFEST } from "./manifest/forms.mjs";
import { SURFACE_MANIFEST } from "./manifest/surfaces.mjs";
import { LAYOUT_MANIFEST } from "./manifest/layout.mjs";
import { FEEDBACK_MANIFEST } from "./manifest/feedback.mjs";
import { FILTER_MANIFEST } from "./manifest/filters.mjs";

/**
 * Public registry order. Generated registry indexes and standalone copies list
 * components in this order, so keep it stable and append new slugs at the end.
 */
const REGISTRY_ORDER = [
  "quartz-crystal", "ascii-ripple-text", "avatar-stage", "blink-text", "button",
  "character-afterimage", "copy-button", "input", "select", "textarea", "checkbox",
  "radio", "slider", "themed-card", "cyberpunk-tile", "fui-button-tile",
  "accordion-feature-card", "corner-bracket-card", "dotted-halo-card", "segmented-control",
  "tabbed-panel", "page-header", "page-template", "notched-viewport-frame",
  "theme-toggle", "loading-screen", "loading-overlay-crystalline",
  "loading-progress-bar", "heartbeat-pulse", "hexagon-grid", "overlay-button",
  "pixel-tooltip", "quick-info-card", "widget-card", "marquee-strip", "section",
  "section-header", "stat-card", "status-message", "stroked-text", "runtime-orbit-diagram",
  "error-message", "boiling-lines", "kinetic-swipe-text", "displacement-filter",
  "kinetic-glyph", "kinetic-text-ramp", "kinetic-text-ring", "kinetic-text-globe",
  "kinetic-text-volume", "chromatic-aberration-filter", "glow-filter", "grain-filter",
  "duotone-filter", "posterize-filter", "emboss-filter", "icon-background",
];

const entries = [
  ...ACTION_MANIFEST,
  ...FORM_MANIFEST,
  ...SURFACE_MANIFEST,
  ...LAYOUT_MANIFEST,
  ...FEEDBACK_MANIFEST,
  ...FILTER_MANIFEST,
];
const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
const ordered = new Set(REGISTRY_ORDER);
if (
  bySlug.size !== entries.length ||
  ordered.size !== REGISTRY_ORDER.length ||
  ordered.size !== bySlug.size ||
  REGISTRY_ORDER.some((slug) => !bySlug.has(slug))
) {
  throw new Error("REGISTRY_ORDER must list every manifest slug exactly once");
}

/** @type {readonly ComponentManifestEntry[]} */
export const COMPONENT_MANIFEST = REGISTRY_ORDER.map((slug) => bySlug.get(slug));
