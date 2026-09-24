/**
 * Standalone Steez UI copy of Character Afterimage.
 *
 * Generated from packages/ui/src/components/CharacterAfterimage.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_character_afterimage_0: Record<string, string> = {
  "root": "steez-character-afterimage-0-root",
  "character": "steez-character-afterimage-0-character",
  "ghost": "steez-character-afterimage-0-ghost",
  "trail": "steez-character-afterimage-0-trail",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CharacterAfterimage.module.css */
.steez-character-afterimage-0-root {
  position: relative;
  display: inline-block;
  max-width: 100%;
  overflow: visible;
  isolation: isolate;
  line-height: 0;
  vertical-align: middle;
}

.steez-character-afterimage-0-character,
.steez-character-afterimage-0-ghost,
.steez-character-afterimage-0-trail {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  image-rendering: pixelated;
}

.steez-character-afterimage-0-character {
  position: relative;
  z-index: 20;
}

.steez-character-afterimage-0-ghost,
.steez-character-afterimage-0-trail {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.steez-character-afterimage-0-ghost {
  z-index: var(--ghost-layer, 1);
  transform: translateX(var(--ghost-offset, -4px));
  opacity: var(--ghost-opacity, 0.35);
  animation: steez-character-afterimage-0-holographic-shift var(--afterimage-cycle-duration, 3000ms) ease-in-out infinite;
  animation-delay: var(--ghost-delay, 0ms);
}

.steez-character-afterimage-0-trail {
  z-index: var(--trail-layer, 1);
  opacity: 0;
  animation:
    trail-ghost var(--afterimage-entrance-duration, 4000ms) ease-out forwards,
    steez-character-afterimage-0-holographic-shift 1500ms ease-in-out infinite;
}

.steez-character-afterimage-0-trail:nth-of-type(1) {
  animation-name: steez-character-afterimage-0-trail-ghost-1, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(2) {
  animation-name: steez-character-afterimage-0-trail-ghost-2, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(3) {
  animation-name: steez-character-afterimage-0-trail-ghost-3, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(4) {
  animation-name: steez-character-afterimage-0-trail-ghost-4, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(5) {
  animation-name: steez-character-afterimage-0-trail-ghost-5, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(6) {
  animation-name: steez-character-afterimage-0-trail-ghost-6, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(7) {
  animation-name: steez-character-afterimage-0-trail-ghost-7, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-trail:nth-of-type(8) {
  animation-name: steez-character-afterimage-0-trail-ghost-8, steez-character-afterimage-0-holographic-shift;
}

.steez-character-afterimage-0-root[data-entrance="true"] .steez-character-afterimage-0-ghost {
  opacity: 0;
  animation:
    steez-character-afterimage-0-stationary-ghost-fade-in var(--afterimage-entrance-duration, 4000ms) ease-out forwards,
    steez-character-afterimage-0-holographic-shift var(--afterimage-cycle-duration, 3000ms) ease-in-out infinite;
  animation-delay: 0ms, var(--ghost-delay, 0ms);
}

.steez-character-afterimage-0-root[data-entrance="true"] .steez-character-afterimage-0-character {
  animation: steez-character-afterimage-0-character-slide-in var(--afterimage-entrance-duration, 4000ms)
    cubic-bezier(0.22, 1, 0.36, 1) both;
}

.steez-character-afterimage-0-root[data-pixelated="false"] .steez-character-afterimage-0-character,
.steez-character-afterimage-0-root[data-pixelated="false"] .steez-character-afterimage-0-ghost,
.steez-character-afterimage-0-root[data-pixelated="false"] .steez-character-afterimage-0-trail {
  image-rendering: auto;
}

@keyframes steez-character-afterimage-0-holographic-shift {
  0% {
    filter: hue-rotate(0deg) saturate(1.8) brightness(1.1);
  }
  16% {
    filter: hue-rotate(60deg) saturate(2) brightness(1.2);
  }
  33% {
    filter: hue-rotate(120deg) saturate(1.8) brightness(1.1);
  }
  50% {
    filter: hue-rotate(180deg) saturate(2) brightness(1.15);
  }
  66% {
    filter: hue-rotate(240deg) saturate(1.8) brightness(1.2);
  }
  83% {
    filter: hue-rotate(300deg) saturate(2) brightness(1.1);
  }
  100% {
    filter: hue-rotate(360deg) saturate(1.8) brightness(1.1);
  }
}

@keyframes steez-character-afterimage-0-character-slide-in {
  0% {
    transform: translateX(-100vw);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  75%,
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes steez-character-afterimage-0-trail-ghost-1 {
  0% {
    transform: translateX(-100vw);
    opacity: 0;
  }
  10% {
    transform: translateX(-85vw);
    opacity: 0.65;
  }
  50% {
    transform: translateX(-85vw);
    opacity: 0.5;
  }
  100% {
    transform: translateX(-85vw);
    opacity: 0;
  }
}

@keyframes steez-character-afterimage-0-trail-ghost-2 {
  0% { transform: translateX(-100vw); opacity: 0; }
  18% { transform: translateX(-70vw); opacity: 0.6; }
  55% { transform: translateX(-70vw); opacity: 0.45; }
  100% { transform: translateX(-70vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-3 {
  0% { transform: translateX(-100vw); opacity: 0; }
  26% { transform: translateX(-55vw); opacity: 0.55; }
  60% { transform: translateX(-55vw); opacity: 0.4; }
  100% { transform: translateX(-55vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-4 {
  0% { transform: translateX(-100vw); opacity: 0; }
  34% { transform: translateX(-40vw); opacity: 0.5; }
  65% { transform: translateX(-40vw); opacity: 0.35; }
  100% { transform: translateX(-40vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-5 {
  0% { transform: translateX(-100vw); opacity: 0; }
  42% { transform: translateX(-28vw); opacity: 0.45; }
  70% { transform: translateX(-28vw); opacity: 0.3; }
  100% { transform: translateX(-28vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-6 {
  0% { transform: translateX(-100vw); opacity: 0; }
  50% { transform: translateX(-18vw); opacity: 0.4; }
  75% { transform: translateX(-18vw); opacity: 0.25; }
  100% { transform: translateX(-18vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-7 {
  0% { transform: translateX(-100vw); opacity: 0; }
  58% { transform: translateX(-10vw); opacity: 0.35; }
  80% { transform: translateX(-10vw); opacity: 0.2; }
  100% { transform: translateX(-10vw); opacity: 0; }
}

@keyframes steez-character-afterimage-0-trail-ghost-8 {
  0% { transform: translateX(-100vw); opacity: 0; }
  66% { transform: translateX(-5vw); opacity: 0.3; }
  85% { transform: translateX(-5vw); opacity: 0.15; }
  100% {
    transform: translateX(-5vw);
    opacity: 0;
  }
}

@keyframes steez-character-afterimage-0-stationary-ghost-fade-in {
  0%,
  90% {
    opacity: 0;
  }
  100% {
    opacity: var(--ghost-opacity, 0.35);
  }
}

@media (max-width: 768px) {
  .steez-character-afterimage-0-trail {
    display: none;
  }

  .steez-character-afterimage-0-ghost {
    transform: translateX(var(--ghost-offset-mobile, -3px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-character-afterimage-0-character,
  .steez-character-afterimage-0-ghost,
  .steez-character-afterimage-0-trail,
  .steez-character-afterimage-0-root[data-entrance="true"] .steez-character-afterimage-0-character,
  .steez-character-afterimage-0-root[data-entrance="true"] .steez-character-afterimage-0-ghost {
    animation: none;
  }

  .steez-character-afterimage-0-trail {
    display: none;
  }

  .steez-character-afterimage-0-ghost,
  .steez-character-afterimage-0-root[data-entrance="true"] .steez-character-afterimage-0-ghost {
    opacity: var(--ghost-opacity, 0.35);
    filter: none;
  }

  .steez-character-afterimage-0-character {
    opacity: 1;
    transform: none;
  }
}
`;
const __steezStandaloneStyleKey = "character-afterimage";

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

const TRAIL_COUNT = 8;
const GHOST_OPACITIES = [0.25, 0.35, 0.45];

export interface CharacterAfterimageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "className" | "src" | "style"
> {
  src: string;
  alt: string;
  /** Class and inline __styles_steez_character_afterimage_0 applied to the effect wrapper. */
  className?: string;
  style?: React.CSSProperties;
  /** Optional class and inline __styles_steez_character_afterimage_0 for the solid foreground image. */
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  /** Number of persistent holographic silhouettes, from zero to three. */
  ghostCount?: number;
  /** Horizontal distance in pixels between each persistent silhouette. */
  ghostOffset?: number;
  /** Rainbow color-cycle duration in milliseconds. */
  cycleDurationMs?: number;
  /** Play the slide-in and transient trail on mount. */
  entrance?: boolean;
  /** Entrance and trail duration in milliseconds. */
  entranceDurationMs?: number;
  /** Use pixel-art sampling for the character and its silhouettes. */
  pixelated?: boolean;
}

/**
 * Layers a character image with animated holographic afterimages. Set
 * `entrance` to add a one-time slide-in and fading trail.
 */
export function CharacterAfterimage({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  crossOrigin,
  referrerPolicy,
  className = "",
  style,
  imageClassName = "",
  imageStyle,
  ghostCount = 3,
  ghostOffset = 4,
  cycleDurationMs = 3000,
  entrance = false,
  entranceDurationMs = 4000,
  pixelated = true,
  ...imageProps
}: CharacterAfterimageProps) {
  const visibleGhostCount = Math.max(0, Math.min(3, Math.floor(ghostCount)));
  const safeGhostOffset = Math.max(0, ghostOffset);
  const mergedStyle = {
    ...style,
    ["--afterimage-cycle-duration" as string]: `${Math.max(1, cycleDurationMs)}ms`,
    ["--afterimage-entrance-duration" as string]: `${Math.max(1, entranceDurationMs)}ms`,
  } as React.CSSProperties;
  const decorativeImageProps = {
    src,
    srcSet,
    sizes,
    width,
    height,
    crossOrigin,
    referrerPolicy,
    decoding: "async" as const,
    alt: "",
    "aria-hidden": true as const,
  };

  return (
    <span
      className={`${__styles_steez_character_afterimage_0.root} ${className}`.trim()}
      data-entrance={entrance ? "true" : "false"}
      data-pixelated={pixelated ? "true" : "false"}
      style={mergedStyle}
    >
      {entrance
        ? Array.from({ length: TRAIL_COUNT }, (_, index) => index).map((index) => (
            <img
              {...decorativeImageProps}
              key={`trail-${index}`}
              className={__styles_steez_character_afterimage_0.trail}
              style={{
                ["--trail-layer" as string]: index + 1,
              } as React.CSSProperties}
            />
          ))
        : null}
      {GHOST_OPACITIES.slice(3 - visibleGhostCount).map((opacity, index) => {
        const ghostIndex = index + 1;
        const offset = safeGhostOffset * (visibleGhostCount - index);

        return (
          <img
            {...decorativeImageProps}
            key={`ghost-${ghostIndex}`}
            className={__styles_steez_character_afterimage_0.ghost}
            style={{
              ["--ghost-opacity" as string]: opacity,
              ["--ghost-offset" as string]: `-${offset}px`,
              ["--ghost-offset-mobile" as string]: `-${offset * 0.7}px`,
              ["--ghost-layer" as string]: ghostIndex,
              ["--ghost-delay" as string]: `${index * -180}ms`,
            } as React.CSSProperties}
          />
        );
      })}
      <img
        {...imageProps}
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcSet={srcSet}
        sizes={sizes}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        className={`${__styles_steez_character_afterimage_0.character} ${imageClassName}`.trim()}
        style={imageStyle}
      />
    </span>
  );
}
