/**
 * Standalone Steez UI copy of Notched Viewport Frame.
 *
 * Generated from packages/ui/src/components/NotchedViewportFrame.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_notched_viewport_frame_0: Record<string, string> = {
  "root": "steez-notched-viewport-frame-0-root",
  "absolute": "steez-notched-viewport-frame-0-absolute",
  "fixed": "steez-notched-viewport-frame-0-fixed",
  "svg": "steez-notched-viewport-frame-0-svg",
  "segment": "steez-notched-viewport-frame-0-segment",
  "strong": "steez-notched-viewport-frame-0-strong",
  "content": "steez-notched-viewport-frame-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/NotchedViewportFrame.module.css */
.steez-notched-viewport-frame-0-root {
  pointer-events: none;
  isolation: isolate;
}

.steez-notched-viewport-frame-0-absolute {
  position: absolute;
  inset: 0;
}

.steez-notched-viewport-frame-0-fixed {
  position: fixed;
  inset: 0;
}

.steez-notched-viewport-frame-0-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.steez-notched-viewport-frame-0-segment {
  fill: none;
  stroke: color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 88%, transparent);
  stroke-linecap: square;
  stroke-width: 1.45;
  vector-effect: non-scaling-stroke;
}

.steez-notched-viewport-frame-0-strong .steez-notched-viewport-frame-0-segment {
  stroke: color-mix(in srgb, var(--text-primary, #cbcbcc) 38%, transparent);
}

.steez-notched-viewport-frame-0-content {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: auto;
}
`;
const __steezStandaloneStyleKey = "notched-viewport-frame";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

const FRAME_SEGMENTS = [
  "M14 38V24L24 14H40",
  "M68 14H392",
  "M392 14L424 46",
  "M424 46H576",
  "M576 46L608 14",
  "M608 14H932",
  "M960 14H976L986 24V38",
  "M14 66V934",
  "M986 66V934",
  "M14 962V976L24 986H40",
  "M68 986H932",
  "M960 986H976L986 976V962",
] as const;

export interface NotchedViewportFrameProps {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  fixed?: boolean;
  tone?: "default" | "strong";
}

export function NotchedViewportFrame({
  className = "",
  contentClassName = "",
  children,
  fixed = false,
  tone = "default",
}: NotchedViewportFrameProps) {
  return (
    <div
      className={`${__styles_steez_notched_viewport_frame_0.root} ${fixed ? __styles_steez_notched_viewport_frame_0.fixed : __styles_steez_notched_viewport_frame_0.absolute} ${
        tone === "strong" ? __styles_steez_notched_viewport_frame_0.strong : ""
      } ${className}`.trim()}
      aria-hidden={children ? undefined : "true"}
    >
      <svg
        className={__styles_steez_notched_viewport_frame_0.svg}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {FRAME_SEGMENTS.map((segment) => (
          <path key={segment} className={__styles_steez_notched_viewport_frame_0.segment} d={segment} />
        ))}
      </svg>
      {children ? (
        <div className={`${__styles_steez_notched_viewport_frame_0.content} ${contentClassName}`.trim()}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default NotchedViewportFrame;
