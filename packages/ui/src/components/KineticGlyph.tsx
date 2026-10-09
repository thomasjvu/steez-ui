"use client";

import React, { useId } from "react";

import { DisplacementFilter } from "./DisplacementFilter.tsx";
import styles from "./KineticGlyph.module.css";

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
      className={styles.effect}
      intensity="subtle"
      scale={displacementScale}
      speedMs={1400}
      trigger={trigger}
    >
      <div
        {...props}
        className={`${styles.root} ${className}`.trim()}
        style={glyphStyle}
        data-motion={trigger}
        role={accessibleLabel ? "img" : undefined}
        aria-label={accessibleLabel}
        aria-hidden={!accessibleLabel || undefined}
      >
        <svg className={styles.filters} aria-hidden="true" focusable="false">
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
        <span className={styles.canvas} aria-hidden="true">
          {Array.from({ length: layerCount }, (_, index) => {
            const progress = layerCount === 1 ? 0.5 : index / (layerCount - 1);
            const contourStyle = {
              "--glyph-scale": 1.16 - progress * 0.72,
              "--glyph-delay": `${-index * 83}ms`,
              "--glyph-outline": `url(#${id})`,
            } as React.CSSProperties;

            return (
              <span key={index} className={styles.contour} style={contourStyle}>
                <span className={styles.artwork}>{children}</span>
              </span>
            );
          })}
        </span>
      </div>
    </DisplacementFilter>
  );
}
