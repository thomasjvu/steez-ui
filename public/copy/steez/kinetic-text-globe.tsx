/**
 * Standalone Steez UI copy of Kinetic Text Globe.
 *
 * Generated from packages/ui/src/components/KineticTextGlobe.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_kinetic_text_globe_0: Record<string, string> = {
  "root": "steez-kinetic-text-globe-0-root",
  "scene": "steez-kinetic-text-globe-0-scene",
  "orbit": "steez-kinetic-text-globe-0-orbit",
  "sphere": "steez-kinetic-text-globe-0-sphere",
  "textPath": "steez-kinetic-text-globe-0-textPath",
  "type": "steez-kinetic-text-globe-0-type",
  "meridian": "steez-kinetic-text-globe-0-meridian",
  "edge": "steez-kinetic-text-globe-0-edge",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/KineticTextGlobe.module.css */
.steez-kinetic-text-globe-0-root {
  container-type: inline-size;
  position: relative;
  display: grid;
  width: 100%;
  min-height: 16rem;
  aspect-ratio: 1;
  overflow: hidden;
  isolation: isolate;
  background: var(--kinetic-text-globe-background, #050505);
  color: var(--kinetic-text-globe-color, #fff);
}

.steez-kinetic-text-globe-0-scene {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.steez-kinetic-text-globe-0-orbit {
  transform-box: view-box;
  transform-origin: center;
  animation: steez-kinetic-text-globe-0-textGlobeSpin var(--kinetic-text-globe-duration, 18000ms) linear
    infinite;
  will-change: transform;
}

.steez-kinetic-text-globe-0-root[data-direction="counterclockwise"] .steez-kinetic-text-globe-0-orbit {
  animation-direction: reverse;
}

.steez-kinetic-text-globe-0-root[data-pause-on-hover="true"]:is(:hover, :focus-within) .steez-kinetic-text-globe-0-orbit {
  animation-play-state: paused;
}

.steez-kinetic-text-globe-0-sphere {
  fill: var(--kinetic-text-globe-background, #050505);
}

.steez-kinetic-text-globe-0-textPath {
  fill: none;
  stroke: none;
}

.steez-kinetic-text-globe-0-type {
  fill: currentColor;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(1.8rem, 13cqw, 4.2rem);
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.085em;
  text-transform: uppercase;
}

.steez-kinetic-text-globe-0-type[data-line="0"],
.steez-kinetic-text-globe-0-type[data-line="6"] {
  font-size: clamp(1.2rem, 8.5cqw, 2.8rem);
}

.steez-kinetic-text-globe-0-type[data-line="1"],
.steez-kinetic-text-globe-0-type[data-line="5"] {
  font-size: clamp(1.5rem, 10.5cqw, 3.4rem);
}

.steez-kinetic-text-globe-0-type[data-line="2"],
.steez-kinetic-text-globe-0-type[data-line="4"] {
  font-size: clamp(1.8rem, 12cqw, 3.8rem);
}

.steez-kinetic-text-globe-0-type[data-line="3"] {
  font-size: clamp(2rem, 14cqw, 4.5rem);
}

.steez-kinetic-text-globe-0-meridian {
  fill: none;
  stroke: var(--kinetic-text-globe-background, #050505);
  stroke-width: 8;
  opacity: 0.96;
}

.steez-kinetic-text-globe-0-edge {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  opacity: 0.2;
}

@keyframes steez-kinetic-text-globe-0-textGlobeSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-text-globe-0-orbit {
    animation: none;
    transform: none;
    will-change: auto;
  }
}

.steez-kinetic-text-globe-0-root[data-running="false"], .steez-kinetic-text-globe-0-root[data-running="false"] * { animation-play-state: paused !important; }
`;
const __steezStandaloneStyleKey = "kinetic-text-globe";

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

export type KineticTextGlobeDirection = "clockwise" | "counterclockwise";

export interface KineticTextGlobeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Word or short phrase projected across a rotating sphere. */
  children: string;
  /** Milliseconds for one full rotation. */
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
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
  paused = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: KineticTextGlobeProps) {
  const { ref, running } = useMotionActivity(paused);
  const id = `kinetic-text-globe-${safeId(React.useId())}`;
  const label = String(children).trim();
  const safeDuration = clampFinite(durationMs, 1000, 120000, 18000);
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
      ref={ref}
      data-running={running ? "true" : "false"}
      {...props}
      className={`${__styles_steez_kinetic_text_globe_0.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      role="img"
      aria-label={ariaLabel ?? label}
      style={mergedStyle}
    >
      <svg
        className={__styles_steez_kinetic_text_globe_0.scene}
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

        <g className={__styles_steez_kinetic_text_globe_0.orbit}>
          <circle className={__styles_steez_kinetic_text_globe_0.sphere} cx="200" cy="200" r="166" />
          <g clipPath={`url(#${id}-clip)`}>
            {TEXT_PATHS.map((path, index) => {
              const pathId = `${id}-line-${index}`;
              return (
                <React.Fragment key={pathId}>
                  <path className={__styles_steez_kinetic_text_globe_0.textPath} id={pathId} d={path} />
                  <text className={__styles_steez_kinetic_text_globe_0.type} data-line={index}>
                    <textPath href={`#${pathId}`}>{lineText}</textPath>
                  </text>
                </React.Fragment>
              );
            })}
            <ellipse
              className={__styles_steez_kinetic_text_globe_0.meridian}
              cx="200"
              cy="200"
              rx="116"
              ry="166"
            />
            <ellipse
              className={__styles_steez_kinetic_text_globe_0.meridian}
              cx="200"
              cy="200"
              rx="54"
              ry="166"
            />
            <circle cx="200" cy="200" r="166" fill={`url(#${id}-shade)`} />
          </g>
          <circle className={__styles_steez_kinetic_text_globe_0.edge} cx="200" cy="200" r="166" />
        </g>
      </svg>
    </div>
  );
}

export default KineticTextGlobe;
