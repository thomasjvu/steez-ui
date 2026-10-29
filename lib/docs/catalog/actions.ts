import type { ComponentDocDetails } from "../component-catalog";

export const ACTION_DOCS = [
  {
    slug: "button",
    summary:
      "Primary, secondary, and danger actions with shared Steez button styling.",
    tags: ["primary", "secondary", "danger"],
  },
  {
    slug: "copy-button",
    summary: "Clipboard action with built-in copied state and icon feedback.",
    tags: ["clipboard", "feedback"],
  },
  {
    slug: "fui-button-tile",
    summary: "Square HUD tile button with icon, label, and corner chevron.",
    tags: ["fui", "tile", "hud", "icon"],
  },
  {
    slug: "overlay-button",
    summary:
      "Compact floating control button for viewer tools and absolute-positioned UI.",
    tags: ["overlay", "viewer", "control"],
  },
] satisfies ComponentDocDetails[];
