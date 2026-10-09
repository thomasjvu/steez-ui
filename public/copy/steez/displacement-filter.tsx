/**
 * Standalone Steez UI copy of Displacement Filter.
 *
 * Generated from packages/ui/src/components/DisplacementFilter.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_displacement_filter_0: Record<string, string> = {
  "root": "steez-displacement-filter-0-root",
  "filters": "steez-displacement-filter-0-filters",
  "content": "steez-displacement-filter-0-content",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/DisplacementFilter.module.css */
.steez-displacement-filter-0-root {
  position: relative;
}

.steez-displacement-filter-0-filters {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.steez-displacement-filter-0-content {
  width: 100%;
  animation: steez-displacement-filter-0-displace var(--displacement-duration, 2700ms) steps(1, end) infinite;
}

.steez-displacement-filter-0-content[data-paused] {
  animation-play-state: paused !important;
}

.steez-displacement-filter-0-root[data-trigger="hover"] .steez-displacement-filter-0-content {
  animation: none;
}

.steez-displacement-filter-0-root[data-trigger="hover"]:hover .steez-displacement-filter-0-content,
.steez-displacement-filter-0-root[data-trigger="hover"]:focus-within .steez-displacement-filter-0-content {
  animation: steez-displacement-filter-0-displace var(--displacement-duration, 2700ms) steps(1, end) infinite;
}

.steez-displacement-filter-0-root[data-trigger="static"] .steez-displacement-filter-0-content {
  animation: none;
  filter: var(--displacement-frame-0);
}

@keyframes steez-displacement-filter-0-displace {
  0%,
  100% {
    filter: var(--displacement-frame-0);
  }

  33.333% {
    filter: var(--displacement-frame-1);
  }

  66.666% {
    filter: var(--displacement-frame-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-displacement-filter-0-content {
    animation: none !important;
    filter: none !important;
  }
}
`;
const __steezStandaloneStyleKey = "displacement-filter";

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

export type DisplacementFilterTrigger = "always" | "hover" | "static";

export interface DisplacementFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Select how the turbulence field changes over time. */
  trigger?: DisplacementFilterTrigger;
  /** Milliseconds per turbulence frame. */
  speedMs?: number;
  /** Presets share one implementation; use scale to fine-tune displacement. */
  intensity?: "subtle" | "default" | "intense";
  scale?: number;
  paused?: boolean;
}

const scales = { subtle: 5, default: 12, intense: 24 };
const seeds = [3, 17, 41];

/** Apply a reusable SVG turbulence displacement to any React content. */
export function DisplacementFilter({
  children,
  trigger = "always",
  speedMs = 900,
  intensity = "default",
  scale,
  paused = false,
  className = "",
  style,
  ...props
}: DisplacementFilterProps) {
  const id = `steez-displace-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const displacement = scale ?? scales[intensity];
  const safeScale = Number.isFinite(displacement) ? Math.max(0, displacement) : scales.default;
  const safeSpeed = Number.isFinite(speedMs) ? Math.max(16, speedMs) : 900;
  const effectStyle = {
    ...style,
    "--displacement-duration": `${safeSpeed * seeds.length}ms`,
    ...Object.fromEntries(
      seeds.map((_, index) => [
        `--displacement-frame-${index}`,
        `url(#${id}-${index})`,
      ]),
    ),
  } as React.CSSProperties;

  return (
    <div
      {...props}
      className={`${__styles_steez_displacement_filter_0.root} ${className}`.trim()}
      style={effectStyle}
      data-trigger={trigger}
    >
      <svg className={__styles_steez_displacement_filter_0.filters} aria-hidden="true" focusable="false">
        <defs>
          {seeds.map((seed, index) => (
            <filter
              key={seed}
              id={`${id}-${index}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018"
                numOctaves={2}
                seed={seed}
                result="warp"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="warp"
                scale={safeScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          ))}
        </defs>
      </svg>
      <div className={__styles_steez_displacement_filter_0.content} data-paused={paused || undefined}>
        {children}
      </div>
    </div>
  );
}
