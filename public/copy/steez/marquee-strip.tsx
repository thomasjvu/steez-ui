/**
 * Standalone Steez UI copy of Marquee Strip.
 *
 * Generated from packages/ui/src/components/MarqueeStrip.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_marquee_strip_0: Record<string, string> = {
  "root": "steez-marquee-strip-0-root",
  "track": "steez-marquee-strip-0-track",
  "pauseOnHover": "steez-marquee-strip-0-pauseOnHover",
  "item": "steez-marquee-strip-0-item",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/MarqueeStrip.module.css */
.steez-marquee-strip-0-root {
  position: relative;
  overflow: hidden;
}

.steez-marquee-strip-0-track {
  display: flex;
  align-items: center;
  gap: var(--marquee-gap, 0.7rem);
  width: max-content;
  animation: steez-marquee-strip-0-marqueeStrip var(--marquee-duration, 24s) linear infinite;
}

.steez-marquee-strip-0-pauseOnHover:hover .steez-marquee-strip-0-track {
  animation-play-state: paused;
}

.steez-marquee-strip-0-item {
  flex: 0 0 auto;
}

@keyframes steez-marquee-strip-0-marqueeStrip {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - (var(--marquee-gap, 0.7rem) / 2)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-marquee-strip-0-track {
    animation: none;
  }
}
`;
const __steezStandaloneStyleKey = "marquee-strip";

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
      className={`${__styles_steez_marquee_strip_0.root} ${pauseOnHover ? __styles_steez_marquee_strip_0.pauseOnHover : ""} ${className}`.trim()}
      aria-label={ariaLabel}
      style={mergedStyle}
      {...props}
    >
      <div className={`${__styles_steez_marquee_strip_0.track} ${trackClassName}`.trim()}>
        {doubledItems.map((item, index) => (
          <div
            key={index}
            className={`${__styles_steez_marquee_strip_0.item} ${itemClassName}`.trim()}
            aria-hidden={index >= items.length}
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
