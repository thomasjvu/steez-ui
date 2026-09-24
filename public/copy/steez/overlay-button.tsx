/**
 * Standalone Steez UI copy of Overlay Button.
 *
 * Generated from packages/ui/src/components/OverlayButton.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_overlay_button_0: Record<string, string> = {
  "overlayBtn": "steez-overlay-button-0-overlayBtn",
  "overlayBtnActive": "steez-overlay-button-0-overlayBtnActive",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/OverlayButton.module.css */
.steez-overlay-button-0-overlayBtn {
  width: var(--overlay-btn-size, 2rem);
  height: var(--overlay-btn-size, 2rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-radius: var(--overlay-btn-radius, 0.5rem);
  background: color-mix(in srgb, var(--bg-primary, #010607) 72%, transparent);
  backdrop-filter: blur(2px);
  color: var(--text-secondary, #999999);
  cursor: pointer;
  opacity: 0.8;
  transition:
    opacity 150ms ease,
    background-color 150ms ease,
    color 150ms ease,
    border-color 150ms ease;
}

.steez-overlay-button-0-overlayBtn:hover {
  background: color-mix(in srgb, var(--bg-primary, #010607) 92%, transparent);
  color: var(--text-primary, #cbcbcc);
  opacity: 1;
}

.steez-overlay-button-0-overlayBtnActive,
.steez-overlay-button-0-overlayBtnActive:hover {
  background: var(--text-primary, #cbcbcc);
  border-color: var(--text-primary, #cbcbcc);
  color: var(--bg-primary, #010607);
}
`;
const __steezStandaloneStyleKey = "overlay-button";

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

export interface OverlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function OverlayButton({
  active,
  className = "",
  ...props
}: OverlayButtonProps) {
  const classes = `${__styles_steez_overlay_button_0.overlayBtn} ${
    active ? __styles_steez_overlay_button_0.overlayBtnActive : ""
  } ${className}`.trim();
  return <button type="button" className={classes} {...props} />;
}

export default OverlayButton;
