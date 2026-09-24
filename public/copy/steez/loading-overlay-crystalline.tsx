/**
 * Standalone Steez UI copy of Loading Overlay Crystalline.
 *
 * Generated from packages/ui/src/components/LoadingOverlayCrystalline.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_loading_overlay_crystalline_0: Record<string, string> = {
  "root": "steez-loading-overlay-crystalline-0-root",
  "noEffect": "steez-loading-overlay-crystalline-0-noEffect",
  "card": "steez-loading-overlay-crystalline-0-card",
  "icon": "steez-loading-overlay-crystalline-0-icon",
  "subtext": "steez-loading-overlay-crystalline-0-subtext",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/LoadingOverlayCrystalline.module.css */
.steez-loading-overlay-crystalline-0-root {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-viewer-quick-tools);
  background: transparent;
}

.steez-loading-overlay-crystalline-0-noEffect {
  background: transparent;
}

.steez-loading-overlay-crystalline-0-card {
  position: relative;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: color-mix(in srgb, var(--bg-primary, #010607) 85%, transparent);
  border: 1px solid color-mix(in srgb, var(--text-primary, #cbcbcc) 14%, transparent);
  border-radius: 10px;
  color: var(--text-primary, #cbcbcc);
  font-size: 14px;
  font-weight: 600;
}

.steez-loading-overlay-crystalline-0-icon {
  opacity: 0.9;
}

.steez-loading-overlay-crystalline-0-subtext {
  margin-top: 2px;
  color: color-mix(in srgb, var(--text-secondary, #999999) 92%, transparent);
  font-size: 12px;
  font-weight: 500;
}
`;
const __steezStandaloneStyleKey = "loading-overlay-crystalline";

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

export interface LoadingOverlayCrystallineProps {
  message: string;
  subtext?: string;
  icon?: React.ReactNode;
  showEffect?: boolean;
}

export function LoadingOverlayCrystalline({
  message,
  subtext,
  icon,
  showEffect = false,
}: LoadingOverlayCrystallineProps) {
  return (
    <div className={`${__styles_steez_loading_overlay_crystalline_0.root} ${showEffect ? "" : __styles_steez_loading_overlay_crystalline_0.noEffect}`.trim()}>
      <div className={__styles_steez_loading_overlay_crystalline_0.card}>
        {icon ? <span className={__styles_steez_loading_overlay_crystalline_0.icon}>{icon}</span> : null}
        <div>
          <div>{message}</div>
          {subtext ? <div className={__styles_steez_loading_overlay_crystalline_0.subtext}>{subtext}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlayCrystalline;
