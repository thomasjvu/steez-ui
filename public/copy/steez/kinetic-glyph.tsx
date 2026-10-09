/**
 * Standalone Steez UI copy of Kinetic Glyph.
 *
 * Generated from packages/ui/src/components/KineticGlyph.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";

const __styles_steez_kinetic_glyph_0: Record<string, string> = {
  "root": "steez-kinetic-glyph-0-root",
  "filters": "steez-kinetic-glyph-0-filters",
  "content": "steez-kinetic-glyph-0-content",
};

const __styles_steez_kinetic_glyph_1: Record<string, string> = {
  "effect": "steez-kinetic-glyph-1-effect",
  "root": "steez-kinetic-glyph-1-root",
  "filters": "steez-kinetic-glyph-1-filters",
  "canvas": "steez-kinetic-glyph-1-canvas",
  "contour": "steez-kinetic-glyph-1-contour",
  "artwork": "steez-kinetic-glyph-1-artwork",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/DisplacementFilter.module.css */
.steez-kinetic-glyph-0-root {
  position: relative;
}

.steez-kinetic-glyph-0-filters {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.steez-kinetic-glyph-0-content {
  width: 100%;
  animation: steez-kinetic-glyph-0-displace var(--displacement-duration, 2700ms) steps(1, end) infinite;
}

.steez-kinetic-glyph-0-content[data-paused] {
  animation-play-state: paused !important;
}

.steez-kinetic-glyph-0-root[data-trigger="hover"] .steez-kinetic-glyph-0-content {
  animation: none;
}

.steez-kinetic-glyph-0-root[data-trigger="hover"]:hover .steez-kinetic-glyph-0-content,
.steez-kinetic-glyph-0-root[data-trigger="hover"]:focus-within .steez-kinetic-glyph-0-content {
  animation: steez-kinetic-glyph-0-displace var(--displacement-duration, 2700ms) steps(1, end) infinite;
}

.steez-kinetic-glyph-0-root[data-trigger="static"] .steez-kinetic-glyph-0-content {
  animation: none;
  filter: var(--displacement-frame-0);
}

@keyframes steez-kinetic-glyph-0-displace {
  0%,
  100% {
    filter: var(--displacement-frame-0);
  }

  33.333% {
    filter: var(--displacement-frame-1);
  }

  66.666% {
    filter: var(--displacement-frame-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-glyph-0-content {
    animation: none !important;
    filter: none !important;
  }
}


/* packages/ui/src/components/KineticGlyph.module.css */
.steez-kinetic-glyph-1-effect {
  width: 100%;
}

.steez-kinetic-glyph-1-root {
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 12rem;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--kinetic-glyph-background, #f7f7f5);
  color: var(--kinetic-glyph-color, #101010);
  isolation: isolate;
}

.steez-kinetic-glyph-1-filters {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.steez-kinetic-glyph-1-canvas {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.steez-kinetic-glyph-1-contour {
  position: absolute;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: currentColor;
  filter: var(--glyph-outline);
  transform: scale(var(--glyph-scale));
  transform-origin: center;
  animation: steez-kinetic-glyph-1-glyphRipple var(--kinetic-glyph-duration, 4800ms) ease-in-out infinite;
  animation-delay: var(--glyph-delay, 0ms);
  will-change: transform;
}

.steez-kinetic-glyph-1-artwork {
  display: grid;
  place-items: center;
  max-width: 94%;
  max-height: 94%;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(4rem, 76cqw, 34rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: -0.065em;
  white-space: nowrap;
}

.steez-kinetic-glyph-1-artwork :global(svg) {
  display: block;
  width: min(72cqw, 28rem);
  height: min(72cqw, 28rem);
  overflow: visible;
}

.steez-kinetic-glyph-1-root[data-motion="static"] .steez-kinetic-glyph-1-contour {
  animation: none;
}

.steez-kinetic-glyph-1-root[data-motion="hover"] .steez-kinetic-glyph-1-contour {
  animation: none;
}

.steez-kinetic-glyph-1-root[data-motion="hover"]:hover .steez-kinetic-glyph-1-contour,
.steez-kinetic-glyph-1-root[data-motion="hover"]:focus-within .steez-kinetic-glyph-1-contour {
  animation: steez-kinetic-glyph-1-glyphRipple var(--kinetic-glyph-duration, 4800ms) ease-in-out infinite;
  animation-delay: var(--glyph-delay, 0ms);
}

@keyframes steez-kinetic-glyph-1-glyphRipple {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(var(--glyph-scale));
  }

  24% {
    transform: translate3d(1px, -1px, 0) scale(calc(var(--glyph-scale) + 0.008));
  }

  52% {
    transform: translate3d(-1px, 1px, 0) scale(var(--glyph-scale));
  }

  76% {
    transform: translate3d(1px, 0, 0) scale(calc(var(--glyph-scale) - 0.008));
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-kinetic-glyph-1-root .steez-kinetic-glyph-1-contour {
    animation: none !important;
    filter: none;
    transform: scale(var(--glyph-scale));
    will-change: auto;
  }
}
`;
const __steezStandaloneStyleKey = "kinetic-glyph";

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

export type DisplacementFilterTrigger = "always" | "hover" | "static";

export interface DisplacementFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Select how the turbulence field changes over time. */
  trigger?: DisplacementFilterTrigger;
  /** Milliseconds per turbulence frame. */
  speedMs?: number;
  /** Presets share one implementation; use scale to fine-tune displacement. */
  intensity?: "subtle" | "default" | "intense";
  scale?: number;
  paused?: boolean;
}

const scales = { subtle: 5, default: 12, intense: 24 };
const seeds = [3, 17, 41];

/** Apply a reusable SVG turbulence displacement to any React content. */
export function DisplacementFilter({
  children,
  trigger = "always",
  speedMs = 900,
  intensity = "default",
  scale,
  paused = false,
  className = "",
  style,
  ...props
}: DisplacementFilterProps) {
  const id = `steez-displace-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const displacement = scale ?? scales[intensity];
  const safeScale = Number.isFinite(displacement) ? Math.max(0, displacement) : scales.default;
  const safeSpeed = Number.isFinite(speedMs) ? Math.max(16, speedMs) : 900;
  const effectStyle = {
    ...style,
    "--displacement-duration": `${safeSpeed * seeds.length}ms`,
    ...Object.fromEntries(
      seeds.map((_, index) => [
        `--displacement-frame-${index}`,
        `url(#${id}-${index})`,
      ]),
    ),
  } as React.CSSProperties;

  return (
    <div
      {...props}
      className={`${__styles_steez_kinetic_glyph_0.root} ${className}`.trim()}
      style={effectStyle}
      data-trigger={trigger}
    >
      <svg className={__styles_steez_kinetic_glyph_0.filters} aria-hidden="true" focusable="false">
        <defs>
          {seeds.map((seed, index) => (
            <filter
              key={seed}
              id={`${id}-${index}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018"
                numOctaves={2}
                seed={seed}
                result="warp"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="warp"
                scale={safeScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          ))}
        </defs>
      </svg>
      <div className={__styles_steez_kinetic_glyph_0.content} data-paused={paused || undefined}>
        {children}
      </div>
    </div>
  );
}

export type KineticGlyphTrigger = "always" | "hover" | "static";

export interface KineticGlyphProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "role" | "aria-label"> {
  /** One character, number, or icon. Keep the content decorative and non-interactive. */
  children: React.ReactNode;
  /** Accessible name for an icon; text children supply their own name. */
  label?: string;
  /** Number of nested contour outlines, clamped from 1 to 12. */
  layers?: number;
  /** Milliseconds for one ripple cycle. */
  durationMs?: number;
  /** Displacement strength for the contour field. */
  displacementScale?: number;
  trigger?: KineticGlyphTrigger;
}

function clampLayers(layers: number) {
  return Number.isFinite(layers) ? Math.min(12, Math.max(1, Math.round(layers))) : 7;
}

/** Concentric, softly rippling contour type for a letter, number, or icon. */
export function KineticGlyph({
  children,
  label,
  layers = 7,
  durationMs = 4800,
  displacementScale = 8,
  trigger = "always",
  className = "",
  style,
  ...props
}: KineticGlyphProps) {
  const id = `steez-glyph-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const layerCount = clampLayers(layers);
  const safeDuration = Number.isFinite(durationMs) ? Math.max(1, durationMs) : 4800;
  const accessibleLabel = label ?? (typeof children === "string" ? children : undefined);
  const glyphStyle = {
    ...style,
    "--kinetic-glyph-duration": `${safeDuration}ms`,
  } as React.CSSProperties;

  return (
    <DisplacementFilter
      className={__styles_steez_kinetic_glyph_1.effect}
      intensity="subtle"
      scale={displacementScale}
      speedMs={1400}
      trigger={trigger}
    >
      <div
        {...props}
        className={`${__styles_steez_kinetic_glyph_1.root} ${className}`.trim()}
        style={glyphStyle}
        data-motion={trigger}
        role={accessibleLabel ? "img" : undefined}
        aria-label={accessibleLabel}
        aria-hidden={!accessibleLabel || undefined}
      >
        <svg className={__styles_steez_kinetic_glyph_1.filters} aria-hidden="true" focusable="false">
          <defs>
            <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius="1.2"
                result="expanded"
              />
              <feComposite
                in="expanded"
                in2="SourceAlpha"
                operator="out"
                result="outline"
              />
              <feFlood floodColor="currentColor" result="ink" />
              <feComposite in="ink" in2="outline" operator="in" />
            </filter>
          </defs>
        </svg>
        <span className={__styles_steez_kinetic_glyph_1.canvas} aria-hidden="true">
          {Array.from({ length: layerCount }, (_, index) => {
            const progress = layerCount === 1 ? 0.5 : index / (layerCount - 1);
            const contourStyle = {
              "--glyph-scale": 1.16 - progress * 0.72,
              "--glyph-delay": `${-index * 83}ms`,
              "--glyph-outline": `url(#${id})`,
            } as React.CSSProperties;

            return (
              <span key={index} className={__styles_steez_kinetic_glyph_1.contour} style={contourStyle}>
                <span className={__styles_steez_kinetic_glyph_1.artwork}>{children}</span>
              </span>
            );
          })}
        </span>
      </div>
    </DisplacementFilter>
  );
}
