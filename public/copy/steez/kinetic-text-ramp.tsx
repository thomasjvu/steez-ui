/**
 * Standalone Steez UI copy of Kinetic Text Ramp.
 *
 * Generated from packages/ui/src/components/KineticTextRamp.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_kinetic_text_ramp_0: Record<string, string> = {
  "root": "steez-kinetic-text-ramp-0-root",
  "viewport": "steez-kinetic-text-ramp-0-viewport",
  "plane": "steez-kinetic-text-ramp-0-plane",
  "track": "steez-kinetic-text-ramp-0-track",
  "loop": "steez-kinetic-text-ramp-0-loop",
  "row": "steez-kinetic-text-ramp-0-row",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/KineticTextRamp.module.css */
.steez-kinetic-text-ramp-0-root {
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: block;
  width: 100%;
  min-height: 14rem;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #1738ef;
  color: #fff;
  isolation: isolate;
}

.steez-kinetic-text-ramp-0-viewport {
  position: absolute;
  inset: -11% -17% -33%;
  overflow: hidden;
  perspective: 34rem;
  perspective-origin: 50% 10%;
}

.steez-kinetic-text-ramp-0-plane {
  position: absolute;
  inset: 0;
  transform: rotateX(48deg) scale(1.22);
  transform-origin: 50% 4%;
  transform-style: preserve-3d;
}

.steez-kinetic-text-ramp-0-track {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  flex-direction: column;
  height: 200%;
  animation-duration: var(--kinetic-text-ramp-duration, 9000ms);
  animation-delay: var(--kinetic-text-ramp-delay, 0ms);
  animation-timing-function: linear;
  animation-fill-mode: both;
  will-change: transform;
}

.steez-kinetic-text-ramp-0-root[data-trigger="always"] .steez-kinetic-text-ramp-0-track,
.steez-kinetic-text-ramp-0-root[data-trigger="mount"] .steez-kinetic-text-ramp-0-track {
  animation-name: steez-kinetic-text-ramp-0-textRampScroll;
}

.steez-kinetic-text-ramp-0-root[data-trigger="always"] .steez-kinetic-text-ramp-0-track {
  animation-iteration-count: infinite;
}

.steez-kinetic-text-ramp-0-root[data-trigger="mount"] .steez-kinetic-text-ramp-0-track {
  animation-iteration-count: 1;
}

.steez-kinetic-text-ramp-0-root[data-trigger="hover"]:hover .steez-kinetic-text-ramp-0-track,
.steez-kinetic-text-ramp-0-root[data-trigger="hover"]:focus-within .steez-kinetic-text-ramp-0-track {
  animation-name: steez-kinetic-text-ramp-0-textRampScroll;
  animation-iteration-count: infinite;
}

.steez-kinetic-text-ramp-0-loop {
  display: grid;
  flex: 0 0 50%;
  grid-template-rows: repeat(var(--kinetic-text-ramp-rows, 8), minmax(0, 1fr));
}

.steez-kinetic-text-ramp-0-row {
  display: grid;
  place-items: center;
  overflow: hidden;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(2.4rem, 14cqw, 10rem);
  font-style: italic;
  font-weight: 900;
  line-height: 0.86;
  letter-spacing: -0.065em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow:
    0.035em 0.035em 0 #101116,
    0.07em 0.07em 0 #101116,
    0.105em 0.105em 0 #101116,
    0.14em 0.14em 0 #101116,
    0.175em 0.175em 0 #101116;
}

@keyframes steez-kinetic-text-ramp-0-textRampScroll {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -50%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-text-ramp-0-track {
    animation: none !important;
    transform: none;
    will-change: auto;
  }
}

.steez-kinetic-text-ramp-0-root[data-running="false"], .steez-kinetic-text-ramp-0-root[data-running="false"] * { animation-play-state: paused !important; }
`;
const __steezStandaloneStyleKey = "kinetic-text-ramp";

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

export type KineticTextRampTrigger = "always" | "hover" | "mount";

export interface KineticTextRampProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  trigger?: KineticTextRampTrigger;
  rows?: number;
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
  delayMs?: number;
}

export function KineticTextRamp({
  children,
  trigger = "always",
  rows = 8,
  durationMs = 9000,
  delayMs = 0,
  paused = false,
  className = "",
  style,
  ...props
}: KineticTextRampProps) {
  const { ref, running } = useMotionActivity(paused);
  const safeRows = Math.floor(clampFinite(rows, 4, 14, 8));
  const safeDuration = clampFinite(durationMs, 1, 120000, 9000);
  const safeDelay = clampFinite(delayMs, -120000, 120000, 0);
  const mergedStyle = {
    ...style,
    ["--kinetic-text-ramp-rows" as string]: safeRows,
    ["--kinetic-text-ramp-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-text-ramp-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      {...props}
      className={`${__styles_steez_kinetic_text_ramp_0.root} ${className}`.trim()}
      data-trigger={trigger}
      role="img"
      aria-label={props["aria-label"] ?? children}
      style={mergedStyle}
    >
      <div className={__styles_steez_kinetic_text_ramp_0.viewport} aria-hidden="true">
        <div className={__styles_steez_kinetic_text_ramp_0.plane}>
          <div className={__styles_steez_kinetic_text_ramp_0.track}>
            {[0, 1].map((loop) => (
              <div className={__styles_steez_kinetic_text_ramp_0.loop} key={loop}>
                {Array.from({ length: safeRows }, (_, index) => (
                  <span className={__styles_steez_kinetic_text_ramp_0.row} key={index}>
                    {children}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
