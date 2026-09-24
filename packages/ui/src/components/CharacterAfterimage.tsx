"use client";

import React from "react";

import styles from "./CharacterAfterimage.module.css";

const TRAIL_COUNT = 8;
const GHOST_OPACITIES = [0.25, 0.35, 0.45];

export interface CharacterAfterimageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "className" | "src" | "style"
> {
  src: string;
  alt: string;
  /** Class and inline styles applied to the effect wrapper. */
  className?: string;
  style?: React.CSSProperties;
  /** Optional class and inline styles for the solid foreground image. */
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
      className={`${styles.root} ${className}`.trim()}
      data-entrance={entrance ? "true" : "false"}
      data-pixelated={pixelated ? "true" : "false"}
      style={mergedStyle}
    >
      {entrance
        ? Array.from({ length: TRAIL_COUNT }, (_, index) => index).map((index) => (
            <img
              {...decorativeImageProps}
              key={`trail-${index}`}
              className={styles.trail}
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
            className={styles.ghost}
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
        className={`${styles.character} ${imageClassName}`.trim()}
        style={imageStyle}
      />
    </span>
  );
}
