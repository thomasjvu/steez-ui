/**
 * Standalone Steez UI copy of Stroked Text.
 *
 * Generated from packages/ui/src/components/StrokedText.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_stroked_text_0: Record<string, string> = {
  "root": "steez-stroked-text-0-root",
  "animateOnMount": "steez-stroked-text-0-animateOnMount",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/StrokedText.module.css */
.steez-stroked-text-0-root {
  display: inline-flex;
  align-items: center;
  color: transparent;
  -webkit-text-stroke: var(--stroked-text-width, 1px)
    var(--stroked-text-color, var(--accent-primary, #ee1401));
  paint-order: stroke fill;
  white-space: nowrap;
}

.steez-stroked-text-0-animateOnMount {
  animation: steez-stroked-text-0-strokedTextBlink 1s steps(1, end)
    var(--stroked-text-delay, 0.18s) both;
}

@supports not (-webkit-text-stroke: 1px black) {
  .steez-stroked-text-0-root {
    color: var(--stroked-text-color, var(--accent-primary, #ee1401));
  }

  .steez-stroked-text-0-animateOnMount {
    animation: steez-stroked-text-0-strokedTextFallbackBlink 1s steps(1, end)
      var(--stroked-text-delay, 0.18s) both;
  }
}

@keyframes steez-stroked-text-0-strokedTextBlink {
  0%,
  14%,
  32%,
  50%,
  68%,
  100% {
    color: transparent;
    -webkit-text-stroke-color: var(--stroked-text-color, var(--accent-primary, #ee1401));
  }

  18%,
  36%,
  54%,
  72%,
  90% {
    color: var(--stroked-text-color, var(--accent-primary, #ee1401));
    -webkit-text-stroke-color: transparent;
  }
}

@keyframes steez-stroked-text-0-strokedTextFallbackBlink {
  0%,
  14%,
  32%,
  50%,
  68%,
  100% {
    opacity: var(--stroked-text-fallback-opacity, 0.18);
  }

  18%,
  36%,
  54%,
  72%,
  90% {
    opacity: 1;
  }
}
`;
const __steezStandaloneStyleKey = "stroked-text";

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

export interface StrokedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number | string;
  animateOnMount?: boolean;
  animationDelay?: number | string;
  fallbackOpacity?: number;
}

export function StrokedText({
  children,
  color,
  strokeWidth = "clamp(1px, 0.11vw, 1.8px)",
  animateOnMount = false,
  animationDelay = "0.18s",
  fallbackOpacity = 0.18,
  className = "",
  style,
  ...props
}: StrokedTextProps) {
  const mergedStyle = {
    ...style,
    ["--stroked-text-color" as string]: color,
    ["--stroked-text-width" as string]:
      typeof strokeWidth === "number" ? `${strokeWidth}px` : strokeWidth,
    ["--stroked-text-delay" as string]:
      typeof animationDelay === "number" ? `${animationDelay}ms` : animationDelay,
    ["--stroked-text-fallback-opacity" as string]: String(fallbackOpacity),
  } as React.CSSProperties;

  return (
    <span
      className={`${__styles_steez_stroked_text_0.root} ${animateOnMount ? __styles_steez_stroked_text_0.animateOnMount : ""} ${className}`.trim()}
      style={mergedStyle}
      {...props}
    >
      {children}
    </span>
  );
}
