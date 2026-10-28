/**
 * Standalone Steez UI copy of Kinetic Text Ring.
 *
 * Generated from packages/ui/src/components/KineticTextRing.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_kinetic_text_ring_0: Record<string, string> = {
  "root": "steez-kinetic-text-ring-0-root",
  "scene": "steez-kinetic-text-ring-0-scene",
  "ring": "steez-kinetic-text-ring-0-ring",
  "outline": "steez-kinetic-text-ring-0-outline",
  "label": "steez-kinetic-text-ring-0-label",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/KineticTextRing.module.css */
.steez-kinetic-text-ring-0-root {
  container-type: inline-size;
  display: grid;
  width: 100%;
  min-height: 13rem;
  aspect-ratio: 1.8 / 1;
  overflow: hidden;
  color: var(--text-primary, #171717);
  perspective: 900px;
}

.steez-kinetic-text-ring-0-scene {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.steez-kinetic-text-ring-0-ring {
  transform-box: view-box;
  transform-origin: center;
  transform-style: preserve-3d;
  animation: steez-kinetic-text-ring-0-kineticTextRingSpin var(--kinetic-text-ring-duration, 16000ms)
    linear infinite;
}

.steez-kinetic-text-ring-0-root[data-direction="counterclockwise"] .steez-kinetic-text-ring-0-ring {
  animation-direction: reverse;
}

.steez-kinetic-text-ring-0-root[data-pause-on-hover="true"]:hover .steez-kinetic-text-ring-0-ring {
  animation-play-state: paused;
}

.steez-kinetic-text-ring-0-outline {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  opacity: 0.13;
}

.steez-kinetic-text-ring-0-label {
  fill: currentColor;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(1.4rem, 7cqw, 2.8rem);
  font-weight: 900;
  letter-spacing: 0.075em;
}

@keyframes steez-kinetic-text-ring-0-kineticTextRingSpin {
  from {
    transform: rotateX(20deg) rotateZ(0deg);
  }

  to {
    transform: rotateX(20deg) rotateZ(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-text-ring-0-ring {
    animation: none;
    transform: none;
  }
}

.steez-kinetic-text-ring-0-root[data-running="false"], .steez-kinetic-text-ring-0-root[data-running="false"] * { animation-play-state: paused !important; }
`;
const __steezStandaloneStyleKey = "kinetic-text-ring";

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

/** Shared lifecycle for ambient motion: explicit pause, visibility, and reduced motion. */
export function useMotionActivity<T extends HTMLElement = HTMLDivElement>(
  paused = false,
  visible = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const syncMotion = () => setReduced(media?.matches ?? false);
    const syncVisibility = () =>
      setPageVisible(document.visibilityState !== "hidden");
    syncMotion();
    syncVisibility();
    media?.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            if (entry) setInView(entry.isIntersecting);
          });
    if (ref.current) observer?.observe(ref.current);
    return () => {
      media?.removeEventListener("change", syncMotion);
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

export type KineticTextRingDirection = "clockwise" | "counterclockwise";

export interface KineticTextRingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
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
  paused = false,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: KineticTextRingProps) {
  const { ref, running } = useMotionActivity(paused);
  const label = String(children).trim();
  const pathId = `kinetic-text-ring-${React.useId().replace(/:/g, "")}`;
  const safeDuration = clampFinite(durationMs, 1000, 120000, 16000);
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
      ref={ref}
      data-running={running ? "true" : "false"}
      className={`${__styles_steez_kinetic_text_ring_0.root} ${className}`.trim()}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
      style={mergedStyle}
      role="img"
      aria-label={ariaLabel ?? label}
      {...props}
    >
      <svg
        className={__styles_steez_kinetic_text_ring_0.scene}
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
        <g className={__styles_steez_kinetic_text_ring_0.ring}>
          <use href={`#${pathId}`} className={__styles_steez_kinetic_text_ring_0.outline} />
          <text
            className={__styles_steez_kinetic_text_ring_0.label}
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
