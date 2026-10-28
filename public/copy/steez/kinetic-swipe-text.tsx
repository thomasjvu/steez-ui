/**
 * Standalone Steez UI copy of Kinetic Swipe Text.
 *
 * Generated from packages/ui/src/components/KineticSwipeText.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const __styles_steez_kinetic_swipe_text_0: Record<string, string> = {
  "root": "steez-kinetic-swipe-text-0-root",
  "word": "steez-kinetic-swipe-text-0-word",
  "base": "steez-kinetic-swipe-text-0-base",
  "slice": "steez-kinetic-swipe-text-0-slice",
  "firstSlice": "steez-kinetic-swipe-text-0-firstSlice",
  "secondSlice": "steez-kinetic-swipe-text-0-secondSlice",
  "srOnly": "steez-kinetic-swipe-text-0-srOnly",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/KineticSwipeText.module.css */
.steez-kinetic-swipe-text-0-root {
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 12rem;
  aspect-ratio: 1.42 / 1;
  overflow: hidden;
  padding: clamp(1.25rem, 6cqw, 4rem);
  background: #000;
  color: #f7f7f7;
  text-align: center;
  isolation: isolate;
}

.steez-kinetic-swipe-text-0-word {
  position: relative;
  display: inline-block;
  max-width: 100%;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(3rem, 23cqw, 20rem);
  font-style: italic;
  font-weight: 900;
  line-height: 0.86;
  letter-spacing: -0.075em;
  text-transform: uppercase;
  white-space: nowrap;
}

.steez-kinetic-swipe-text-0-base {
  display: block;
  visibility: hidden;
}

.steez-kinetic-swipe-text-0-slice {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
  transform: translate3d(0, 0, 0);
  will-change: transform, filter;
}

.steez-kinetic-swipe-text-0-root[data-direction="horizontal"] .steez-kinetic-swipe-text-0-firstSlice {
  clip-path: inset(0 0 50% 0);
}

.steez-kinetic-swipe-text-0-root[data-direction="horizontal"] .steez-kinetic-swipe-text-0-secondSlice {
  clip-path: inset(50% 0 0 0);
}

.steez-kinetic-swipe-text-0-root[data-direction="vertical"] .steez-kinetic-swipe-text-0-firstSlice {
  clip-path: inset(0 50% 0 0);
}

.steez-kinetic-swipe-text-0-root[data-direction="vertical"] .steez-kinetic-swipe-text-0-secondSlice {
  clip-path: inset(0 0 0 50%);
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"] .steez-kinetic-swipe-text-0-slice,
.steez-kinetic-swipe-text-0-root[data-trigger="mount"] .steez-kinetic-swipe-text-0-slice {
  animation-duration: var(--kinetic-swipe-duration, 2400ms);
  animation-delay: var(--kinetic-swipe-delay, 0ms);
  animation-timing-function: ease-in-out;
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"] .steez-kinetic-swipe-text-0-slice {
  animation-iteration-count: infinite;
}

.steez-kinetic-swipe-text-0-root[data-trigger="mount"] .steez-kinetic-swipe-text-0-slice {
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.steez-kinetic-swipe-text-0-root[data-trigger="hover"]:hover .steez-kinetic-swipe-text-0-slice,
.steez-kinetic-swipe-text-0-root[data-trigger="hover"]:focus-within .steez-kinetic-swipe-text-0-slice {
  animation-duration: var(--kinetic-swipe-duration, 2400ms);
  animation-delay: var(--kinetic-swipe-delay, 0ms);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"][data-direction="horizontal"] .steez-kinetic-swipe-text-0-firstSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="mount"][data-direction="horizontal"] .steez-kinetic-swipe-text-0-firstSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeHorizontalFirst;
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"][data-direction="horizontal"] .steez-kinetic-swipe-text-0-secondSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="mount"][data-direction="horizontal"] .steez-kinetic-swipe-text-0-secondSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeHorizontalSecond;
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"][data-direction="vertical"] .steez-kinetic-swipe-text-0-firstSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="mount"][data-direction="vertical"] .steez-kinetic-swipe-text-0-firstSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeVerticalFirst;
}

.steez-kinetic-swipe-text-0-root[data-trigger="always"][data-direction="vertical"] .steez-kinetic-swipe-text-0-secondSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="mount"][data-direction="vertical"] .steez-kinetic-swipe-text-0-secondSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeVerticalSecond;
}

.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="horizontal"]:hover .steez-kinetic-swipe-text-0-firstSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="horizontal"]:focus-within .steez-kinetic-swipe-text-0-firstSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeHorizontalFirst;
}

.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="horizontal"]:hover .steez-kinetic-swipe-text-0-secondSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="horizontal"]:focus-within .steez-kinetic-swipe-text-0-secondSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeHorizontalSecond;
}

.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="vertical"]:hover .steez-kinetic-swipe-text-0-firstSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="vertical"]:focus-within .steez-kinetic-swipe-text-0-firstSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeVerticalFirst;
}

.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="vertical"]:hover .steez-kinetic-swipe-text-0-secondSlice,
.steez-kinetic-swipe-text-0-root[data-trigger="hover"][data-direction="vertical"]:focus-within .steez-kinetic-swipe-text-0-secondSlice {
  animation-name: steez-kinetic-swipe-text-0-swipeVerticalSecond;
}

@keyframes steez-kinetic-swipe-text-0-swipeHorizontalFirst {
  0%,
  67%,
  100% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewX(0deg);
  }

  71% {
    filter: blur(0.012em);
    transform: translate3d(-0.15em, -0.035em, 0) skewX(-10deg);
  }

  76% {
    filter: blur(0.008em);
    transform: translate3d(0.11em, 0, 0) skewX(6deg);
  }

  82% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewX(0deg);
  }
}

@keyframes steez-kinetic-swipe-text-0-swipeHorizontalSecond {
  0%,
  67%,
  100% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewX(0deg);
  }

  71% {
    filter: blur(0.012em);
    transform: translate3d(0.13em, 0.035em, 0) skewX(9deg);
  }

  76% {
    filter: blur(0.008em);
    transform: translate3d(-0.1em, 0, 0) skewX(-6deg);
  }

  82% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewX(0deg);
  }
}

@keyframes steez-kinetic-swipe-text-0-swipeVerticalFirst {
  0%,
  67%,
  100% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewY(0deg);
  }

  71% {
    filter: blur(0.012em);
    transform: translate3d(-0.035em, -0.15em, 0) skewY(-10deg);
  }

  76% {
    filter: blur(0.008em);
    transform: translate3d(0, 0.11em, 0) skewY(6deg);
  }

  82% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewY(0deg);
  }
}

@keyframes steez-kinetic-swipe-text-0-swipeVerticalSecond {
  0%,
  67%,
  100% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewY(0deg);
  }

  71% {
    filter: blur(0.012em);
    transform: translate3d(0.035em, 0.13em, 0) skewY(9deg);
  }

  76% {
    filter: blur(0.008em);
    transform: translate3d(0, -0.1em, 0) skewY(-6deg);
  }

  82% {
    filter: blur(0);
    transform: translate3d(0, 0, 0) skewY(0deg);
  }
}

.steez-kinetic-swipe-text-0-srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-swipe-text-0-root .steez-kinetic-swipe-text-0-slice {
    animation: none !important;
    filter: none;
    transform: none;
    will-change: auto;
  }
}

.steez-kinetic-swipe-text-0-root[data-running="false"], .steez-kinetic-swipe-text-0-root[data-running="false"] * { animation-play-state: paused !important; }
`;
const __steezStandaloneStyleKey = "kinetic-swipe-text";

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

export type KineticSwipeTextTrigger = "always" | "hover" | "mount";
export type KineticSwipeTextDirection = "horizontal" | "vertical";

export interface KineticSwipeTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: string;
  direction?: KineticSwipeTextDirection;
  trigger?: KineticSwipeTextTrigger;
  durationMs?: number;
  /** Freeze motion; offscreen, hidden tabs, and reduced motion also pause it. */
  paused?: boolean;
  delayMs?: number;
}

export function KineticSwipeText({
  children,
  direction = "horizontal",
  trigger = "always",
  durationMs = 2400,
  delayMs = 0,
  paused = false,
  className = "",
  style,
  ...props
}: KineticSwipeTextProps) {
  const { ref, running } = useMotionActivity(paused);
  const safeDuration = clampFinite(durationMs, 1, 120000, 2400);
  const safeDelay = clampFinite(delayMs, -120000, 120000, 0);
  const mergedStyle = {
    ...style,
    ["--kinetic-swipe-duration" as string]: `${safeDuration}ms`,
    ["--kinetic-swipe-delay" as string]: `${safeDelay}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      className={`${__styles_steez_kinetic_swipe_text_0.root} ${className}`.trim()}
      data-direction={direction}
      data-trigger={trigger}
      style={mergedStyle}
      {...props}
    >
      <span className={__styles_steez_kinetic_swipe_text_0.srOnly}>{children}</span>
      <span className={__styles_steez_kinetic_swipe_text_0.word} aria-hidden="true">
        <span className={__styles_steez_kinetic_swipe_text_0.base}>{children}</span>
        <span className={`${__styles_steez_kinetic_swipe_text_0.slice} ${__styles_steez_kinetic_swipe_text_0.firstSlice}`}>
          {children}
        </span>
        <span className={`${__styles_steez_kinetic_swipe_text_0.slice} ${__styles_steez_kinetic_swipe_text_0.secondSlice}`}>
          {children}
        </span>
      </span>
    </div>
  );
}
