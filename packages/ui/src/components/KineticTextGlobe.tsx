"use client";

import React from "react";

import styles from "./KineticTextGlobe.module.css";

export type KineticTextGlobeDirection = "clockwise" | "counterclockwise";

export interface KineticTextGlobeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Word or short phrase projected across a rotating sphere. */
  children: string;
  /** Milliseconds for one full rotation. */
  durationMs?: number;
  direction?: KineticTextGlobeDirection;
  pauseOnHover?: boolean;
}

const TEXT_PATHS = [
  "M 85 91 C 153 58 247 58 315 91",
  "M 52 126 C 138 94 262 94 348 126",
  "M 36 163 C 130 145 270 145 364 163",
  "M 31 200 C 130 200 270 200 369 200",
  "M 36 237 C 130 255 270 255 364 237",
  "M 52 274 C 138 306 262 306 348 274",
  "M 85 309 C 153 342 247 342 315 309",
] as const;

function safeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Bold display type warped across a slowly rotating, high contrast globe. */
export function KineticTextGlobe({
  children,
  durationMs = 18000,
  direction = "clockwise",
  pauseOnHover = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: KineticTextGlobeProps) {
  const id = `kinetic-text-globe-${safeId(React.useId())}`;
  const label = String(children).trim();
  const safeDuration = Number.isFinite(durationMs)
    ? Math.min(Math.max(durationMs, 1000), 120000)
    : 18000;
  const repeatedLabel = `${label.toUpperCase()}  •  `;
  const lineText = repeatedLabel.repeat(
    Math.max(3, Math.ceil(42 / Math.max(repeatedLabel.length, 1))),
  );
  const mergedStyle = {
    ...style,
    ["--kinetic-text-globe-duration" as string]: `${safeDuration}ms`,
  } as React.CSSProperties;

  return (
    <div
      {...props}
      className={`${styles.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      role="img"
      aria-label={ariaLabel ?? label}
      style={mergedStyle}
    >
      <svg
        className={styles.scene}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle cx="200" cy="200" r="166" />
          </clipPath>
          <radialGradient id={`${id}-shade`} cx="42%" cy="34%" r="68%">
            <stop offset="0" stopColor="white" stopOpacity="0.1" />
            <stop offset="0.72" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="black" stopOpacity="0.32" />
          </radialGradient>
        </defs>

        <g className={styles.orbit}>
          <circle className={styles.sphere} cx="200" cy="200" r="166" />
          <g clipPath={`url(#${id}-clip)`}>
            {TEXT_PATHS.map((path, index) => {
              const pathId = `${id}-line-${index}`;
              return (
                <React.Fragment key={pathId}>
                  <path className={styles.textPath} id={pathId} d={path} />
                  <text className={styles.type} data-line={index}>
                    <textPath href={`#${pathId}`}>{lineText}</textPath>
                  </text>
                </React.Fragment>
              );
            })}
            <ellipse className={styles.meridian} cx="200" cy="200" rx="116" ry="166" />
            <ellipse className={styles.meridian} cx="200" cy="200" rx="54" ry="166" />
            <circle cx="200" cy="200" r="166" fill={`url(#${id}-shade)`} />
          </g>
          <circle className={styles.edge} cx="200" cy="200" r="166" />
        </g>
      </svg>
    </div>
  );
}

export default KineticTextGlobe;
