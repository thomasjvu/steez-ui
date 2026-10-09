"use client";

import React, { useId } from "react";

import styles from "./DisplacementFilter.module.css";

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
      className={`${styles.root} ${className}`.trim()}
      style={effectStyle}
      data-trigger={trigger}
    >
      <svg className={styles.filters} aria-hidden="true" focusable="false">
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
      <div className={styles.content} data-paused={paused || undefined}>
        {children}
      </div>
    </div>
  );
}
