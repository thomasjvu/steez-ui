"use client";

import React, { useId } from "react";

import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";

import styles from "./KineticTextVolume.module.css";

export type KineticTextVolumeDirection = "forward" | "reverse";

export interface KineticTextVolumeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Short word or phrase repeated across the perspective field. */
  children: string;
  /** Number of animated rows on the side faces. */
  rows?: number;
  /** Duration of one wave cycle in milliseconds. */
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
  /** Maximum vertical travel for each line, in SVG units. */
  amplitude?: number;
  direction?: KineticTextVolumeDirection;
  pauseOnHover?: boolean;
}

/** Repeated type ripples across the three faces of a perspective text volume. */
export function KineticTextVolume({
  children,
  rows = 9,
  durationMs = 7200,
  amplitude = 5,
  direction = "forward",
  pauseOnHover = false,
  paused = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: KineticTextVolumeProps) {
  const { ref, running } = useMotionActivity(paused);
  const id = `kinetic-text-volume-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const label = String(children).trim();
  const safeRows = Math.round(clampFinite(rows, 5, 16, 9));
  const safeDuration = clampFinite(durationMs, 1200, 60000, 7200);
  const safeAmplitude = clampFinite(amplitude, 0, 16, 5);
  const repeatedLabel = `${label.toUpperCase()}  ·  `;
  const lineText = repeatedLabel.repeat(
    Math.max(
      3,
      Math.min(18, Math.ceil(70 / Math.max(repeatedLabel.length, 1))),
    ),
  );
  const lineRows = Array.from({ length: safeRows }, (_, index) => index);
  const floorRows = Array.from(
    { length: Math.max(4, Math.round(safeRows * 0.65)) },
    (_, index) => index,
  );
  const volumeStyle = {
    ...style,
    ["--kinetic-text-volume-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-text-volume-amplitude" as string]: `${safeAmplitude}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      {...props}
      className={`${styles.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      role="img"
      aria-label={ariaLabel ?? label}
      style={volumeStyle}
    >
      <svg
        className={styles.scene}
        viewBox="0 0 420 420"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={`${id}-left`}>
            <path d="M38 136 210 70v216L38 350Z" />
          </clipPath>
          <clipPath id={`${id}-right`}>
            <path d="m210 70 172 66v214l-172-64Z" />
          </clipPath>
          <clipPath id={`${id}-floor`}>
            <path d="m38 350 172-64 172 64-172 66Z" />
          </clipPath>
          <radialGradient id={`${id}-fade`} cx="50%" cy="44%" r="68%">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="0.78" stopColor="white" stopOpacity="0.88" />
            <stop offset="1" stopColor="white" stopOpacity="0.2" />
          </radialGradient>
          <mask id={`${id}-mask`}>
            <rect width="420" height="420" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>

        <g className={styles.faces} mask={`url(#${id}-mask)`}>
          <path className={styles.face} d="M38 136 210 70v216L38 350Z" />
          <path className={styles.face} d="m210 70 172 66v214l-172-64Z" />
          <path className={styles.face} d="m38 350 172-64 172 64-172 66Z" />

          <g clipPath={`url(#${id}-left)`}>
            {lineRows.map((index) => (
              <text
                key={`left-${index}`}
                className={styles.line}
                data-face="left"
                x="18"
                y={132 + index * 21}
                transform="matrix(1 -0.36 0 1 0 0)"
                style={{ animationDelay: `${-index * 115}ms` }}
              >
                {lineText}
              </text>
            ))}
          </g>
          <g clipPath={`url(#${id}-right)`}>
            {lineRows.map((index) => (
              <text
                key={`right-${index}`}
                className={styles.line}
                data-face="right"
                x="210"
                y={70 + index * 21}
                transform="matrix(1 0.36 0 1 0 0)"
                style={{ animationDelay: `${-index * 115 - 380}ms` }}
              >
                {lineText}
              </text>
            ))}
          </g>
          <g clipPath={`url(#${id}-floor)`}>
            {floorRows.map((index) => (
              <text
                key={`floor-${index}`}
                className={styles.line}
                data-face="floor"
                x="-8"
                y={334 + index * 12}
                style={{ animationDelay: `${-index * 95 - 740}ms` }}
              >
                {lineText}
              </text>
            ))}
          </g>
        </g>

        <g className={styles.aperture} aria-hidden="true">
          <path d="m210 174 68 32-68 33-68-33Z" />
          <path className={styles.apertureSide} d="m142 206 68 33v38l-68-35Z" />
          <path className={styles.apertureSide} d="m278 206-68 33v38l68-35Z" />
          <path
            className={styles.apertureRim}
            d="m142 206 68-32 68 32-68 33Z"
          />
          <path
            className={styles.apertureEdge}
            d="m142 206 68 33 68-33M210 239v38"
          />
        </g>

        <path
          className={styles.outline}
          d="M38 136 210 70l172 66v214l-172 66L38 350Z"
        />
        <path
          className={styles.centerLine}
          d="m38 350 172-64 172 64M210 70v216"
        />
      </svg>
    </div>
  );
}

export default KineticTextVolume;
