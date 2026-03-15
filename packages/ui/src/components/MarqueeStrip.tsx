import React from "react";

import styles from "./MarqueeStrip.module.css";

export interface MarqueeStripProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel?: string;
  durationSeconds?: number;
  gap?: number | string;
  pauseOnHover?: boolean;
  trackClassName?: string;
  itemClassName?: string;
}

export function MarqueeStrip<T>({
  items,
  renderItem,
  ariaLabel,
  durationSeconds = 24,
  gap = "0.7rem",
  pauseOnHover = false,
  className = "",
  trackClassName = "",
  itemClassName = "",
  style,
  ...props
}: MarqueeStripProps<T>) {
  const doubledItems = [...items, ...items];
  const mergedStyle = {
    ...style,
    ["--marquee-duration" as string]: `${durationSeconds}s`,
    ["--marquee-gap" as string]:
      typeof gap === "number" ? `${gap}px` : gap,
  } as React.CSSProperties;

  return (
    <div
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
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
