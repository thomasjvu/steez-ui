"use client";

import React, { useId } from "react";
import styles from "./BoilingLines.module.css";

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
    <div {...props} className={`${styles.root} ${className}`.trim()} style={effectStyle}>
      <svg className={styles.filters} aria-hidden="true" focusable="false">
        <defs>
          {seeds.map((seed, i) => (
            <filter key={seed} id={`${id}-${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={2} seed={seed} result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale={Number.isFinite(displacement) ? Math.max(0, displacement) : 4} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          ))}
        </defs>
      </svg>
      <div className={styles.content} data-paused={paused || undefined}>{children}</div>
    </div>
  );
}
