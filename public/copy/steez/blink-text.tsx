/**
 * Standalone Steez UI copy of Blink Text.
 *
 * Generated from packages/ui/src/components/BlinkText.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_blink_text_0: Record<string, string> = {
  "root": "steez-blink-text-0-root",
  "mount": "steez-blink-text-0-mount",
  "always": "steez-blink-text-0-always",
  "hover": "steez-blink-text-0-hover",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/BlinkText.module.css */
.steez-blink-text-0-root {
  display: inline-flex;
  align-items: center;
}

.steez-blink-text-0-mount {
  animation: steez-blink-text-0-blinkText var(--blink-duration, 420ms) steps(2, end)
    var(--blink-delay, 0ms) var(--blink-iterations, 3);
}

.steez-blink-text-0-always {
  animation: steez-blink-text-0-blinkText var(--blink-duration, 420ms) steps(2, end)
    var(--blink-delay, 0ms) infinite;
}

.steez-blink-text-0-hover:hover {
  animation: steez-blink-text-0-blinkText var(--blink-duration, 420ms) steps(2, end)
    var(--blink-delay, 0ms) var(--blink-iterations, 3);
}

@keyframes steez-blink-text-0-blinkText {
  0%,
  100% {
    opacity: 1;
  }

  20%,
  40%,
  60%,
  80% {
    opacity: var(--blink-dim-opacity, 0.12);
  }

  30%,
  50%,
  70%,
  90% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .steez-blink-text-0-mount,
  .steez-blink-text-0-always,
  .steez-blink-text-0-hover:hover {
    animation: none;
  }
}
`;
const __steezStandaloneStyleKey = "blink-text";

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

type BlinkTrigger = "mount" | "hover" | "always";

export interface BlinkTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  trigger?: BlinkTrigger;
  durationMs?: number;
  iterations?: number | "infinite";
  delayMs?: number;
  dimOpacity?: number;
}

export function BlinkText({
  children,
  trigger = "hover",
  durationMs = 420,
  iterations = 3,
  delayMs = 0,
  dimOpacity = 0.12,
  className = "",
  style,
  ...props
}: BlinkTextProps) {
  const mergedStyle = {
    ...style,
    ["--blink-duration" as string]: `${durationMs}ms`,
    ["--blink-iterations" as string]:
      iterations === "infinite" ? "infinite" : String(iterations),
    ["--blink-delay" as string]: `${delayMs}ms`,
    ["--blink-dim-opacity" as string]: String(dimOpacity),
  } as React.CSSProperties;

  return (
    <span
      className={`${__styles_steez_blink_text_0.root} ${__styles_steez_blink_text_0[trigger]} ${className}`.trim()}
      style={mergedStyle}
      {...props}
    >
      {children}
    </span>
  );
}
