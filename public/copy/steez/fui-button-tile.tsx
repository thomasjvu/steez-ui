/**
 * Standalone Steez UI copy of FUI Button Tile.
 *
 * Generated from packages/ui/src/components/FUIButtonTile.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_fui_button_tile_0: Record<string, string> = {
  "root": "steez-fui-button-tile-0-root",
  "active": "steez-fui-button-tile-0-active",
  "content": "steez-fui-button-tile-0-content",
  "label": "steez-fui-button-tile-0-label",
  "icon": "steez-fui-button-tile-0-icon",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/FUIButtonTile.module.css */
.steez-fui-button-tile-0-root {
  appearance: none;
  width: var(--fui-tile-width, 120px);
  height: var(--fui-tile-height, 120px);
  min-width: var(--fui-tile-width, 120px);
  min-height: var(--fui-tile-height, 120px);
  flex-shrink: 0;
  background: transparent;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  color: var(--text-secondary, #999999);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  overflow: visible;
  font: inherit;
  text-align: center;
  transition:
    border-color 250ms ease-in-out,
    color 250ms ease-in-out;
}

.steez-fui-button-tile-0-root::after {
  content: "";
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
  border-left: 0.5rem solid currentColor;
  transform: rotate(45deg);
  position: absolute;
  bottom: -0.2rem;
  right: 0.03rem;
  transition: border-color 250ms ease-in-out;
}

.steez-fui-button-tile-0-root:hover,
.steez-fui-button-tile-0-root:focus-visible,
.steez-fui-button-tile-0-active {
  color: var(--accent-red, #ee1401);
  border-color: var(--accent-red, #ee1401);
}

.steez-fui-button-tile-0-root:focus {
  outline: none;
}

.steez-fui-button-tile-0-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0;
}

.steez-fui-button-tile-0-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  line-height: 1.2;
  font-weight: 700;
}

.steez-fui-button-tile-0-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.steez-fui-button-tile-0-icon :global(svg) {
  width: 32px;
  height: 32px;
}

@media (max-width: 768px) {
  .steez-fui-button-tile-0-root {
    --fui-tile-width: 90px;
    --fui-tile-height: 90px;
  }
}
`;
const __steezStandaloneStyleKey = "fui-button-tile";

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

export interface FUIButtonTileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
}

export function FUIButtonTile({
  icon,
  label,
  active = false,
  className = "",
  type = "button",
  ...props
}: FUIButtonTileProps) {
  return (
    <button
      type={type}
      className={`${__styles_steez_fui_button_tile_0.root} ${active ? __styles_steez_fui_button_tile_0.active : ""} ${className}`.trim()}
      {...props}
    >
      <div className={__styles_steez_fui_button_tile_0.content}>
        {icon ? <span className={__styles_steez_fui_button_tile_0.icon}>{icon}</span> : null}
        <strong className={__styles_steez_fui_button_tile_0.label}>{label}</strong>
      </div>
    </button>
  );
}

export default FUIButtonTile;
