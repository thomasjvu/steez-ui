import { component } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const FILTER_MANIFEST = [
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
];
