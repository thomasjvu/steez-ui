"use client";

import React from "react";

import { useMotionActivity } from "../hooks/useMotionActivity.ts";
import { clampFinite } from "../utils/numbers.ts";
import styles from "./MarqueeStrip.module.css";

export interface MarqueeStripProps<T>
  extends React.HTMLAttributes<HTMLDivElement> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel?: string;
  /** Timing in milliseconds, consistent with other motion components. */
  durationMs?: number;
  paused?: boolean;
  gap?: number | string;
  pauseOnHover?: boolean;
  trackClassName?: string;
  itemClassName?: string;
}

export function MarqueeStrip<T>({
  items,
  renderItem,
  ariaLabel,
  durationMs = 24000,
  paused = false,
  gap = "0.7rem",
  pauseOnHover = false,
  className = "",
  trackClassName = "",
  itemClassName = "",
  style,
  ...props
}: MarqueeStripProps<T>) {
  const { ref, running } = useMotionActivity(paused);
  const doubledItems = [...items, ...items];
  const mergedStyle = {
    ...style,
    ["--marquee-duration" as string]: `${clampFinite(durationMs, 1000, 120000, 24000)}ms`,
    ["--marquee-gap" as string]: typeof gap === "number" ? `${gap}px` : gap,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-running={running ? "true" : "false"}
      className={`${styles.root} ${pauseOnHover ? styles.pauseOnHover : ""} ${className}`.trim()}
      aria-label={ariaLabel}
      style={mergedStyle}
      {...props}
    >
      <div className={`${styles.track} ${trackClassName}`.trim()}>
        {doubledItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${itemClassName}`.trim()}
            aria-hidden={index >= items.length}
            inert={index >= items.length}
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
