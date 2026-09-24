/**
 * Standalone Steez UI copy of Avatar Stage.
 *
 * Generated from packages/ui/src/components/AvatarStage.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_avatar_stage_0: Record<string, string> = {
  "root": "steez-avatar-stage-0-root",
  "backdrop": "steez-avatar-stage-0-backdrop",
  "viewport": "steez-avatar-stage-0-viewport",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/AvatarStage.module.css */
.steez-avatar-stage-0-root {
  position: relative;
  display: grid;
  align-items: end;
  justify-items: center;
  min-height: var(--avatar-stage-height, 34rem);
  overflow: hidden;
  isolation: isolate;
}

.steez-avatar-stage-0-root::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  z-index: 2;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 78%, transparent);
  pointer-events: none;
}

.steez-avatar-stage-0-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.steez-avatar-stage-0-viewport {
  position: relative;
  z-index: 1;
  width: var(--avatar-stage-viewport-width, min(100%, 30rem));
  max-width: 100%;
  height: 100%;
  min-height: var(--avatar-stage-height, 34rem);
}
`;
const __steezStandaloneStyleKey = "avatar-stage";

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

export interface AvatarStageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backdrop?: React.ReactNode;
  stageHeight?: number | string;
  viewportWidth?: number | string;
  viewportClassName?: string;
}

export function AvatarStage({
  children,
  backdrop,
  stageHeight = "34rem",
  viewportWidth = "min(100%, 30rem)",
  className = "",
  viewportClassName = "",
  style,
  ...props
}: AvatarStageProps) {
  const mergedStyle = {
    ...style,
    ["--avatar-stage-height" as string]:
      typeof stageHeight === "number" ? `${stageHeight}px` : stageHeight,
    ["--avatar-stage-viewport-width" as string]:
      typeof viewportWidth === "number" ? `${viewportWidth}px` : viewportWidth,
  } as React.CSSProperties;

  return (
    <div className={`${__styles_steez_avatar_stage_0.root} ${className}`.trim()} style={mergedStyle} {...props}>
      {backdrop ? <div className={__styles_steez_avatar_stage_0.backdrop}>{backdrop}</div> : null}
      <div className={`${__styles_steez_avatar_stage_0.viewport} ${viewportClassName}`.trim()}>{children}</div>
    </div>
  );
}
