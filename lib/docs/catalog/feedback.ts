import type { ComponentDocDetails } from "../component-catalog";

export const FEEDBACK_DOCS = [
  {
    slug: "ascii-ripple-text",
    summary:
      "Hover-driven glitch ripple that scrambles characters outward from the cursor position.",
    tags: ["motion", "text", "editorial"],
  },
  {
    slug: "blink-text",
    summary:
      "Minimal blink treatment for hover or mount-triggered attention cues.",
    tags: ["motion", "text"],
  },
  {
    slug: "loading-progress-bar",
    summary:
      "Segmented loading bar for build, deploy, and initialization progress.",
    tags: ["progress", "loading"],
  },
  {
    slug: "loading-screen",
    summary:
      "Fullscreen or contained loading shell with progress, cross field, and optional branding slots.",
    tags: ["loading", "shell", "progress"],
  },
  {
    slug: "loading-overlay-crystalline",
    summary:
      "Compact centered loading card for viewers, canvases, and media shells.",
    tags: ["overlay", "loading", "viewer"],
  },
  {
    slug: "status-message",
    summary:
      "Inline success, info, and error status surface with shared icon treatment.",
    tags: ["success", "info", "error"],
  },
  {
    slug: "error-message",
    summary:
      "Inline, card, and full-screen error surfaces with optional actions.",
    tags: ["failure", "retry"],
  },
  {
    slug: "heartbeat-pulse",
    summary:
      "Orb and line heartbeat indicators for wake-up loops, sync state, and background activity.",
    tags: ["heartbeat", "status", "activity"],
  },
  {
    slug: "pixel-tooltip",
    summary:
      "Compact hover tooltip with crisp monospace styling for short contextual hints.",
    tags: ["tooltip", "hover", "hint"],
  },
] satisfies ComponentDocDetails[];
