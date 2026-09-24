/**
 * Standalone Steez UI copy of Boiling Lines.
 *
 * Generated from packages/ui/src/components/BoilingLines.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_boiling_lines_0: Record<string, string> = {
  "root": "steez-boiling-lines-0-root",
  "filters": "steez-boiling-lines-0-filters",
  "content": "steez-boiling-lines-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/BoilingLines.module.css */
.steez-boiling-lines-0-root { position: relative; }
.steez-boiling-lines-0-filters { position: absolute; width: 0; height: 0; pointer-events: none; }
.steez-boiling-lines-0-content { animation: steez-boiling-lines-0-boil var(--boil-duration, 300ms) steps(1, end) infinite; }
.steez-boiling-lines-0-content[data-paused] { animation-play-state: paused; }
@keyframes steez-boiling-lines-0-boil {
  0%, 100% { filter: var(--boil-frame-0); }
  33.333% { filter: var(--boil-frame-1); }
  66.666% { filter: var(--boil-frame-2); }
}
@media (prefers-reduced-motion: reduce) {
  .steez-boiling-lines-0-content { animation: none; filter: none; }
}
`;
const __steezStandaloneStyleKey = "boiling-lines";

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

export interface BoilingLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Presets share one implementation; use scale to fine-tune displacement. */
  intensity?: "subtle" | "default" | "intense";
  /** Milliseconds per frame, clamped to at least 16ms. */
  speedMs?: number;
  scale?: number;
  paused?: boolean;
}

const scales = { subtle: 2, default: 4, intense: 8 };
const seeds = [1, 25, 45];

/** Wrap artwork, an SVG, or a decorative border. Keep long text outside the effect. */
export function BoilingLines({
  children, intensity = "default", speedMs = 100, scale, paused = false,
  className = "", style, ...props
}: BoilingLinesProps) {
  const id = `steez-boil-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const displacement = scale ?? scales[intensity];
  const effectStyle = {
    ...style,
    "--boil-duration": `${(Number.isFinite(speedMs) ? Math.max(16, speedMs) : 100) * 3}ms`,
    ...Object.fromEntries(seeds.map((_, i) => [`--boil-frame-${i}`, `url(#${id}-${i})`])),
  } as React.CSSProperties;

  return (
    <div {...props} className={`${__styles_steez_boiling_lines_0.root} ${className}`.trim()} style={effectStyle}>
      <svg className={__styles_steez_boiling_lines_0.filters} aria-hidden="true" focusable="false">
        <defs>
          {seeds.map((seed, i) => (
            <filter key={seed} id={`${id}-${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={2} seed={seed} result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale={Number.isFinite(displacement) ? Math.max(0, displacement) : 4} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          ))}
        </defs>
      </svg>
      <div className={__styles_steez_boiling_lines_0.content} data-paused={paused || undefined}>{children}</div>
    </div>
  );
}
