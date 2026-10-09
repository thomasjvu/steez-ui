"use client";

import React from "react";

import styles from "./KineticTextRing.module.css";

export type KineticTextRingDirection = "clockwise" | "counterclockwise";

export interface KineticTextRingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  durationMs?: number;
  direction?: KineticTextRingDirection;
  pauseOnHover?: boolean;
}

const TARGET_GLYPH_COUNT = 60;
const MIN_REPEAT_COUNT = 3;
const MAX_REPEAT_COUNT = 16;

export function KineticTextRing({
  children,
  durationMs = 16000,
  direction = "clockwise",
  pauseOnHover = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: KineticTextRingProps) {
  const label = String(children).trim();
  const pathId = `kinetic-text-ring-${React.useId().replace(/:/g, "")}`;
  const safeDuration = Number.isFinite(durationMs)
    ? Math.min(Math.max(durationMs, 1000), 120000)
    : 16000;
  const visualLabel = label.toUpperCase();
  const repeatedLabel = `${visualLabel}  •  `;
  const repeatCount = Math.min(
    MAX_REPEAT_COUNT,
    Math.max(
      MIN_REPEAT_COUNT,
      Math.ceil(TARGET_GLYPH_COUNT / Math.max(repeatedLabel.length, 1)),
    ),
  );
  const mergedStyle = {
    ...style,
    ["--kinetic-text-ring-duration" as string]: `${safeDuration}ms`,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      style={mergedStyle}
      role="img"
      aria-label={ariaLabel ?? label}
      {...props}
    >
      <svg
        className={styles.scene}
        viewBox="0 0 600 320"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <path
            id={pathId}
            d="M 300 42 C 450 42 566 93 566 160 C 566 227 450 278 300 278 C 150 278 34 227 34 160 C 34 93 150 42 300 42"
          />
        </defs>
        <g className={styles.ring}>
          <use href={`#${pathId}`} className={styles.outline} />
          <text
            className={styles.label}
            textLength="1280"
            lengthAdjust="spacing"
          >
            <textPath href={`#${pathId}`}>
              {repeatedLabel.repeat(repeatCount)}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}

export default KineticTextRing;
