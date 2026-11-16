import { component, BUTTON_STYLES, STABLE_ID_HOOK, THEMED, THEMED_WITH_ICONS, colocated } from "./define.mjs";

/** @type {import("./define.mjs").ComponentManifestEntry[]} */
export const FEEDBACK_MANIFEST = [
  component({
    slug: "ascii-ripple-text",
    name: "AsciiRippleText",
    category: "feedback",
    title: "ASCII Ripple Text",
    description:
      "Hover-driven ASCII glitch ripple for editorial text links and mono-heavy navigation moments.",
    extraFiles: colocated("AsciiRippleText", ["waves"]),
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
    slug: "loading-screen",
    name: "LoadingScreen",
    category: "feedback",
    title: "Loading Screen",
    description:
      "Fullscreen or contained loading shell with progress, cross field, and neutral branding hooks.",
    exports: ["LoadingScreen", "useLoadingProgress"],
    extraFiles: colocated("LoadingScreen", ["audio", "crosses", "progress"]),
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
    extraFiles: colocated("HeartbeatPulse", ["geometry"]),
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
    slug: "status-message",
    name: "StatusMessage",
    category: "feedback",
    title: "Status Message",
    description: "Success, error, and info toast primitive.",
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
    slug: "kinetic-swipe-text",
    name: "KineticSwipeText",
    category: "feedback",
    title: "Kinetic Swipe Text",
    description:
      "Heavy display type that snaps through a looping horizontal or vertical split.",
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
];
