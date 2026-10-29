import type { ComponentDocDetails } from "../component-catalog";

export const FILTER_DOCS = [
  {
    slug: "chromatic-aberration-filter",
    summary: "Separate red and cyan channels around text, icons, images, or interactive content.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "glow-filter",
    summary: "Alpha-derived colored halo with a crisp content layer.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "duotone-filter",
    summary: "Map luminance to a two-color palette while preserving transparency.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "posterize-filter",
    summary: "Reduce continuous colors to distinct stepped bands.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "emboss-filter",
    summary: "Raise diagonal edges into a textured relief while preserving transparency.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "grain-filter",
    summary: "Monochrome film grain clipped to the content alpha, with optional animated seeds.",
    tags: ["filter", "composition", "svg"],
  },
  {
    slug: "displacement-filter",
    summary:
      "Reusable animated SVG displacement that can wrap text, icons, or any component.",
    tags: ["filter", "displacement", "motion", "composition"],
  },
] satisfies ComponentDocDetails[];
