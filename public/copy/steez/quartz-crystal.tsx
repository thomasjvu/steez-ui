/**
 * Standalone Steez UI copy of Quartz Crystal.
 *
 * Generated from packages/ui/src/components/QuartzCrystal.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_quartz_crystal_0: Record<string, string> = {
  "root": "steez-quartz-crystal-0-root",
  "offset": "steez-quartz-crystal-0-offset",
  "filters": "steez-quartz-crystal-0-filters",
  "quartz": "steez-quartz-crystal-0-quartz",
  "left": "steez-quartz-crystal-0-left",
  "center": "steez-quartz-crystal-0-center",
  "right": "steez-quartz-crystal-0-right",
  "upTriLeft": "steez-quartz-crystal-0-upTriLeft",
  "upTriCenter": "steez-quartz-crystal-0-upTriCenter",
  "upTriRight": "steez-quartz-crystal-0-upTriRight",
  "downTriLeft": "steez-quartz-crystal-0-downTriLeft",
  "downTriCenter": "steez-quartz-crystal-0-downTriCenter",
  "downTriRight": "steez-quartz-crystal-0-downTriRight",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/QuartzCrystal.module.css */
.steez-quartz-crystal-0-root {
  position: relative;
  display: inline-block;
  width: var(--quartz-width);
  height: calc(var(--quartz-height) + var(--quartz-width) + var(--quartz-float-distance) * 2);
  pointer-events: none;
  flex-shrink: 0;
}
.steez-quartz-crystal-0-root[data-visible="false"] { opacity: 0; }
.steez-quartz-crystal-0-offset { position: absolute; inset: 0; }
.steez-quartz-crystal-0-filters { position: absolute; width: 0; height: 0; overflow: hidden; }
.steez-quartz-crystal-0-quartz {
  width: var(--quartz-width);
  height: var(--quartz-height);
  position: absolute;
  top: calc(var(--quartz-width) / 2 + var(--quartz-float-distance));
  left: 0;
  filter: var(--quartz-distortion)
          drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.5))
          drop-shadow(0px 0px 20px color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 30%, transparent));
  animation: steez-quartz-crystal-0-float calc(var(--quartz-speed) * 2) ease-in-out 0s infinite,
             steez-quartz-crystal-0-hologram-flicker 4s ease-in-out infinite;
  transform: rotate(-180deg);
  opacity: 1;
}

@keyframes steez-quartz-crystal-0-hologram-flicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.92;
  }
}

@keyframes steez-quartz-crystal-0-float {
  0%, 100% {
    transform: rotate(-180deg) translateY(0px);
  }
  50% {
    transform: rotate(-180deg) translateY(calc(-1 * var(--quartz-float-distance)));
  }
}

.steez-quartz-crystal-0-left {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 60%, #000) 0%,
    color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 75%, #000) 50%,
    color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 60%, #000) 100%);
  opacity: 0.85;
}

.steez-quartz-crystal-0-center {
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0;
  left: 50%;
  background: var(--quartz-color, var(--color-accent, #ee1401));
  animation: steez-quartz-crystal-0-middle-center var(--quartz-speed) linear 0s infinite;
}

@keyframes steez-quartz-crystal-0-middle-center {
  from {
    background: linear-gradient(90deg,
      var(--quartz-color, var(--color-accent, #ee1401)) 0%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 85%, #fff) 50%,
      var(--quartz-color, var(--color-accent, #ee1401)) 100%);
    left: 50%;
    width: 50%;
    opacity: 0.95;
  }
  to {
    background: linear-gradient(90deg,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 60%, #000) 0%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 75%, #000) 50%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 60%, #000) 100%);
    left: 0;
    width: 100%;
    opacity: 0.85;
  }
}

.steez-quartz-crystal-0-right {
  height: 100%;
  width: 1px;
  top: 0;
  left: 100%;
  position: absolute;
  background: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 70%, #fff);
  animation: steez-quartz-crystal-0-middle-right var(--quartz-speed) linear 0s infinite;
}

@keyframes steez-quartz-crystal-0-middle-right {
  from {
    background: linear-gradient(180deg,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 90%, #fff) 0%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 95%, #fff) 50%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 90%, #fff) 100%);
    left: 100%;
    width: 0;
    opacity: 1;
  }
  to {
    background: linear-gradient(180deg,
      var(--quartz-color, var(--color-accent, #ee1401)) 0%,
      color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 85%, #fff) 50%,
      var(--quartz-color, var(--color-accent, #ee1401)) 100%);
    left: 50%;
    width: 50%;
    opacity: 0.95;
  }
}

.steez-quartz-crystal-0-upTriLeft {
  position: absolute;
  top: calc(var(--quartz-width) * -0.5);
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 calc(var(--quartz-width) * 0.25) calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5);
  border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 70%, #000) transparent;
  opacity: 0.8;
}

.steez-quartz-crystal-0-upTriCenter {
  position: absolute;
  top: calc(var(--quartz-width) * -0.5);
  left: calc(var(--quartz-width) * 0.5);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5) 0;
  border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 85%, #fff) transparent;
  animation: steez-quartz-crystal-0-top-center var(--quartz-speed) linear 0s infinite;
  opacity: 0.9;
}

@keyframes steez-quartz-crystal-0-top-center {
  0% {
    left: calc(var(--quartz-width) * 0.5);
    border-width: 0 calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5) 0;
    border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 85%, #fff) transparent;
    opacity: 0.9;
  }
  100% {
    left: 0;
    border-width: 0 calc(var(--quartz-width) * 0.25) calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5);
    border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 70%, #000) transparent;
    opacity: 0.85;
  }
}

.steez-quartz-crystal-0-upTriRight {
  position: absolute;
  top: calc(var(--quartz-width) * -0.5);
  left: calc(var(--quartz-width) * 0.8);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 calc(var(--quartz-width) * 0.6) 0;
  border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 95%, #fff) transparent;
  transform: rotate(-45deg);
  animation: steez-quartz-crystal-0-top-right var(--quartz-speed) linear 0s infinite;
  opacity: 0.95;
}

@keyframes steez-quartz-crystal-0-top-right {
  from {
    left: calc(var(--quartz-width) * 0.8);
    border-width: 0 1px calc(var(--quartz-width) * 0.6) 0;
    transform: rotate(-45deg);
    border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 95%, #fff) transparent;
    opacity: 0.95;
  }
  to {
    left: calc(var(--quartz-width) * 0.5);
    border-width: 0 calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.53) 0;
    transform: rotate(0deg);
    border-color: transparent transparent color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 85%, #fff) transparent;
    opacity: 0.9;
  }
}

.steez-quartz-crystal-0-downTriLeft {
  position: absolute;
  bottom: calc(var(--quartz-width) * -0.5);
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.25) 0 calc(var(--quartz-width) * 0.5);
  border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 55%, #000) transparent transparent transparent;
  opacity: 0.75;
}

.steez-quartz-crystal-0-downTriCenter {
  position: absolute;
  bottom: calc(var(--quartz-width) * -0.5);
  left: calc(var(--quartz-width) * 0.5);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5) 0 0;
  border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 75%, #000) transparent transparent transparent;
  animation: steez-quartz-crystal-0-bottom-center var(--quartz-speed) linear 0s infinite;
  opacity: 0.8;
}

@keyframes steez-quartz-crystal-0-bottom-center {
  from {
    left: calc(var(--quartz-width) * 0.5);
    border-width: calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.5) 0 0;
    border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 75%, #000) transparent transparent transparent;
    opacity: 0.8;
  }
  to {
    left: 0;
    border-width: calc(var(--quartz-width) * 0.5) calc(var(--quartz-width) * 0.25) 0 calc(var(--quartz-width) * 0.5);
    border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 55%, #000) transparent transparent transparent;
    opacity: 0.75;
  }
}

.steez-quartz-crystal-0-downTriRight {
  position: absolute;
  bottom: calc(var(--quartz-width) * -0.5);
  left: calc(var(--quartz-width) * 0.8);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: calc(var(--quartz-width) * 0.6) calc(var(--quartz-width) * 0.01) 0 0;
  border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 80%, #fff) transparent transparent transparent;
  transform: rotate(-45deg);
  animation: steez-quartz-crystal-0-bottom-right var(--quartz-speed) linear 0s infinite;
  opacity: 0.9;
}

@keyframes steez-quartz-crystal-0-bottom-right {
  from {
    left: calc(var(--quartz-width) * 0.8);
    border-width: calc(var(--quartz-width) * 0.6) 1px 0 0;
    transform: rotate(45deg);
    border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 80%, #fff) transparent transparent transparent;
    opacity: 0.9;
  }
  to {
    left: calc(var(--quartz-width) * 0.5);
    border-width: calc(var(--quartz-width) * 0.53) calc(var(--quartz-width) * 0.5) 0 0;
    transform: rotate(0deg);
    border-color: color-mix(in srgb, var(--quartz-color, var(--color-accent, #ee1401)) 75%, #000) transparent transparent transparent;
    opacity: 0.8;
  }
}

.steez-quartz-crystal-0-root[data-running="false"] .steez-quartz-crystal-0-quartz,
.steez-quartz-crystal-0-root[data-running="false"] .steez-quartz-crystal-0-quartz > div { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .steez-quartz-crystal-0-quartz, .steez-quartz-crystal-0-quartz > div { animation: none; }
  .steez-quartz-crystal-0-offset { transform: none !important; }
}
`;
const __steezStandaloneStyleKey = "quartz-crystal";

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

export interface QuartzCrystalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color" | "role" | "aria-hidden" | "tabIndex"> {
  color?: string;
  /** Width of the body in pixels; the pointed tips each add width / 2 to its height. */
  width?: number;
  /** Height of the body, excluding the tips. */
  height?: number;
  durationMs?: number;
  floatDistance?: number;
  /** Optional liquid distortion from 0 to 500; defaults to crisp facets. */
  distortion?: number;
  paused?: boolean;
  visible?: boolean;
  /** Pointer parallax is opt-in, bounded, and disabled for reduced motion. */
  parallax?: boolean | { strength?: number; maxX?: number; maxY?: number };
}

function bounded(value: number, min: number, max: number, fallback: number) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

/** Decorative nine-facet quartz, with local layout and no app-specific page positioning. */
export function QuartzCrystal({
  color, width = 120, height = 240, durationMs = 5000, floatDistance = 15,
  distortion = 0, paused = false, visible = true, parallax = false,
  className = "", style, ...props
}: QuartzCrystalProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef<HTMLDivElement>(null);
  const filterId = `quartz-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [inView, setInView] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);
  const [reduced, setReduced] = React.useState(false);
  const safeWidth = bounded(width, 1, 1000, 120);
  const safeHeight = bounded(height, 1, 2000, 240);
  const safeFloat = bounded(floatDistance, 0, 100, 15);
  const safeDistortion = bounded(distortion, 0, 500, 0);
  const running = visible && !paused && inView && pageVisible && !reduced;
  const parallaxEnabled = Boolean(parallax);
  const config = typeof parallax === "object" ? parallax : {};
  const strength = bounded(config.strength ?? .03, 0, 1, .03);
  const maxX = bounded(config.maxX ?? 60, 0, 200, 60);
  const maxY = bounded(config.maxY ?? 40, 0, 200, 40);

  React.useEffect(() => {
    const media = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const syncMotion = () => setReduced(media?.matches ?? false);
    const syncVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    syncMotion();
    syncVisibility();
    media?.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
    );
    if (rootRef.current) observer?.observe(rootRef.current);
    return () => {
      media?.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!parallaxEnabled || !running) return;
    let frame: number | null = null;
    let pointer = { x: 0, y: 0 };
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const root = rootRef.current;
        const offset = offsetRef.current;
        if (!root || !offset) return;
        const rect = root.getBoundingClientRect();
        const x = Math.max(-maxX, Math.min(maxX, (pointer.x - rect.left - rect.width / 2) * strength));
        const y = Math.max(-maxY, Math.min(maxY, (pointer.y - rect.top - rect.height / 2) * strength));
        offset.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    const offset = offsetRef.current;
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame !== null) cancelAnimationFrame(frame);
      if (offset) offset.style.transform = "";
    };
  }, [parallaxEnabled, running, strength, maxX, maxY]);

  return (
    <div {...props} ref={rootRef} className={`${__styles_steez_quartz_crystal_0.root} ${className}`.trim()} aria-hidden="true"
      data-running={running ? "true" : "false"} data-visible={visible ? "true" : "false"}
      style={{
        ...style,
        ...(color ? { "--quartz-color": color } : {}),
        "--quartz-width": `${safeWidth}px`,
        "--quartz-height": `${safeHeight}px`,
        "--quartz-speed": `${bounded(durationMs, 1000, 120000, 5000)}ms`,
        "--quartz-float-distance": `${safeFloat}px`,
        "--quartz-distortion": safeDistortion > 0 ? `url(#${filterId})` : "blur(0px)",
      } as React.CSSProperties}>
      {safeDistortion > 0 && <svg className={__styles_steez_quartz_crystal_0.filters} focusable="false" aria-hidden="true"><defs>
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves={1} seed={17} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale={safeDistortion} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs></svg>}
      <div ref={offsetRef} className={__styles_steez_quartz_crystal_0.offset}>
        <div className={__styles_steez_quartz_crystal_0.quartz}>
          <div className={__styles_steez_quartz_crystal_0.upTriLeft} /><div className={__styles_steez_quartz_crystal_0.upTriCenter} /><div className={__styles_steez_quartz_crystal_0.upTriRight} />
          <div className={__styles_steez_quartz_crystal_0.downTriLeft} /><div className={__styles_steez_quartz_crystal_0.downTriCenter} /><div className={__styles_steez_quartz_crystal_0.downTriRight} />
          <div className={__styles_steez_quartz_crystal_0.left} /><div className={__styles_steez_quartz_crystal_0.center} /><div className={__styles_steez_quartz_crystal_0.right} />
        </div>
      </div>
    </div>
  );
}
