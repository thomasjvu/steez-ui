/**
 * Standalone Steez UI copy of Kinetic Text Volume.
 *
 * Generated from packages/ui/src/components/KineticTextVolume.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

const __styles_steez_kinetic_text_volume_0: Record<string, string> = {
  "root": "steez-kinetic-text-volume-0-root",
  "scene": "steez-kinetic-text-volume-0-scene",
  "face": "steez-kinetic-text-volume-0-face",
  "line": "steez-kinetic-text-volume-0-line",
  "aperture": "steez-kinetic-text-volume-0-aperture",
  "apertureSide": "steez-kinetic-text-volume-0-apertureSide",
  "apertureRim": "steez-kinetic-text-volume-0-apertureRim",
  "apertureEdge": "steez-kinetic-text-volume-0-apertureEdge",
  "outline": "steez-kinetic-text-volume-0-outline",
  "centerLine": "steez-kinetic-text-volume-0-centerLine",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/KineticTextVolume.module.css */
.steez-kinetic-text-volume-0-root {
  container-type: inline-size;
  position: relative;
  display: grid;
  width: 100%;
  min-height: 16rem;
  aspect-ratio: 1;
  overflow: hidden;
  isolation: isolate;
  background: var(--kinetic-text-volume-background, #050505);
  color: var(--kinetic-text-volume-color, #f5f5f5);
}

.steez-kinetic-text-volume-0-scene {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.steez-kinetic-text-volume-0-face {
  fill: currentColor;
  opacity: 0.025;
}

.steez-kinetic-text-volume-0-line {
  fill: currentColor;
  font-family: "Arial Narrow", "Roboto Condensed", sans-serif;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 3px;
  opacity: 0.76;
  animation: steez-kinetic-text-volume-0-textVolumeWave var(--kinetic-text-volume-duration, 7200ms) ease-in-out
    infinite;
  transform-box: fill-box;
  transform-origin: center;
  will-change: transform, opacity;
}

.steez-kinetic-text-volume-0-line[data-face="right"] {
  opacity: 0.84;
}

.steez-kinetic-text-volume-0-line[data-face="floor"] {
  font-size: 8px;
  letter-spacing: 4px;
  opacity: 0.6;
}

.steez-kinetic-text-volume-0-root[data-direction="reverse"] .steez-kinetic-text-volume-0-line {
  animation-direction: reverse;
}

.steez-kinetic-text-volume-0-root[data-pause-on-hover="true"]:is(:hover, :focus-within) .steez-kinetic-text-volume-0-line {
  animation-play-state: paused;
}

.steez-kinetic-text-volume-0-aperture path {
  fill: var(--kinetic-text-volume-background, #050505);
  stroke: currentColor;
  stroke-width: 0.8;
  stroke-opacity: 0.24;
}

.steez-kinetic-text-volume-0-aperture .steez-kinetic-text-volume-0-apertureSide {
  fill: #101010;
  stroke-opacity: 0.15;
}

.steez-kinetic-text-volume-0-aperture .steez-kinetic-text-volume-0-apertureRim {
  fill: #080808;
  stroke-opacity: 0.34;
}

.steez-kinetic-text-volume-0-aperture .steez-kinetic-text-volume-0-apertureEdge {
  fill: none;
  stroke-width: 1;
  stroke-opacity: 0.42;
}

.steez-kinetic-text-volume-0-outline,
.steez-kinetic-text-volume-0-centerLine {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.8;
  stroke-opacity: 0.17;
}

.steez-kinetic-text-volume-0-centerLine {
  stroke-opacity: 0.08;
}

@keyframes steez-kinetic-text-volume-0-textVolumeWave {
  0%,
  100% {
    transform: translateY(calc(0px - var(--kinetic-text-volume-amplitude, 5px)))
      skewX(-1.5deg);
    opacity: 0.52;
  }

  50% {
    transform: translateY(var(--kinetic-text-volume-amplitude, 5px)) skewX(1.5deg);
    opacity: 0.94;
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-text-volume-0-line {
    animation: none;
    transform: none;
    will-change: auto;
  }
}

.steez-kinetic-text-volume-0-root[data-running="false"], .steez-kinetic-text-volume-0-root[data-running="false"] * { animation-play-state: paused !important; }
`;
const __steezStandaloneStyleKey = "kinetic-text-volume";

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

const QUERY = "(prefers-reduced-motion: reduce)";

/** Live `prefers-reduced-motion` value; false where matchMedia is unavailable. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia(QUERY);
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Shared lifecycle for ambient motion: explicit pause, visibility, and reduced motion. */
export function useMotionActivity<T extends HTMLElement = HTMLDivElement>(
  paused = false,
  visible = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const syncVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry) setInView(entry.isIntersecting);
          });
    if (ref.current) observer?.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);
  return {
    ref,
    running: visible && !paused && inView && pageVisible && !reduced,
  };
}

/** Clamp finite inputs; malformed values use the component's documented default. */
export function clampFinite(
  value: number,
  min: number,
  max: number,
  fallback: number,
) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/** Percentage shared by range inputs and progress displays. */
export function progressPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return clampFinite(((value - min) / (max - min)) * 100, 0, 100, 0);
}

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
      className={`${__styles_steez_kinetic_text_volume_0.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      role="img"
      aria-label={ariaLabel ?? label}
      style={volumeStyle}
    >
      <svg
        className={__styles_steez_kinetic_text_volume_0.scene}
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

        <g className={__styles_steez_kinetic_text_volume_0.faces} mask={`url(#${id}-mask)`}>
          <path className={__styles_steez_kinetic_text_volume_0.face} d="M38 136 210 70v216L38 350Z" />
          <path className={__styles_steez_kinetic_text_volume_0.face} d="m210 70 172 66v214l-172-64Z" />
          <path className={__styles_steez_kinetic_text_volume_0.face} d="m38 350 172-64 172 64-172 66Z" />

          <g clipPath={`url(#${id}-left)`}>
            {lineRows.map((index) => (
              <text
                key={`left-${index}`}
                className={__styles_steez_kinetic_text_volume_0.line}
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
                className={__styles_steez_kinetic_text_volume_0.line}
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
                className={__styles_steez_kinetic_text_volume_0.line}
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

        <g className={__styles_steez_kinetic_text_volume_0.aperture} aria-hidden="true">
          <path d="m210 174 68 32-68 33-68-33Z" />
          <path className={__styles_steez_kinetic_text_volume_0.apertureSide} d="m142 206 68 33v38l-68-35Z" />
          <path className={__styles_steez_kinetic_text_volume_0.apertureSide} d="m278 206-68 33v38l68-35Z" />
          <path
            className={__styles_steez_kinetic_text_volume_0.apertureRim}
            d="m142 206 68-32 68 32-68 33Z"
          />
          <path
            className={__styles_steez_kinetic_text_volume_0.apertureEdge}
            d="m142 206 68 33 68-33M210 239v38"
          />
        </g>

        <path
          className={__styles_steez_kinetic_text_volume_0.outline}
          d="M38 136 210 70l172 66v214l-172 66L38 350Z"
        />
        <path
          className={__styles_steez_kinetic_text_volume_0.centerLine}
          d="m38 350 172-64 172 64M210 70v216"
        />
      </svg>
    </div>
  );
}

export default KineticTextVolume;
