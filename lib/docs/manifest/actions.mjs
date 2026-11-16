import { component, BUTTON_STYLES, THEMED, THEMED_WITH_ICONS } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const ACTION_MANIFEST = [
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
    slug: "copy-button",
    name: "CopyButton",
    category: "actions",
    title: "Copy Button",
    description: "Clipboard button with built-in success feedback.",
    ...THEMED_WITH_ICONS,
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
    slug: "overlay-button",
    name: "OverlayButton",
    category: "actions",
    title: "Overlay Button",
    description:
      "Compact floating control button for viewer and media overlays.",
    ...THEMED,
  }),
];
