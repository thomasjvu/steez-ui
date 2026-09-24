/**
 * Standalone Steez UI copy of Cyberpunk Tile.
 *
 * Generated from packages/ui/src/components/CyberpunkTile.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_cyberpunk_tile_0: Record<string, string> = {
  "tile": "steez-cyberpunk-tile-0-tile",
  "tileInteractive": "steez-cyberpunk-tile-0-tileInteractive",
  "small": "steez-cyberpunk-tile-0-small",
  "big": "steez-cyberpunk-tile-0-big",
  "scrollable": "steez-cyberpunk-tile-0-scrollable",
  "ios": "steez-cyberpunk-tile-0-ios",
  "content": "steez-cyberpunk-tile-0-content",
  "centerContent": "steez-cyberpunk-tile-0-centerContent",
  "cornerAccent": "steez-cyberpunk-tile-0-cornerAccent",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkTile.module.css */
.steez-cyberpunk-tile-0-tile {
  --tile-padding: 1.5rem;
  --tile-edges: 20px;
  --tile-border-color: var(--color-border-light, rgba(203, 203, 204, 0.2));
  --tile-border-width: 1px;

  position: relative;
  background: var(--color-bg-tile, #0a0a0a);
  color: var(--text-primary, #cbcbcc);
  padding: var(--tile-padding);
  min-height: 60px;
  height: 100%;
  transition: background-color var(--transition-normal, 220ms ease);
  width: 100%;
  max-width: 100%;
  cursor: default;
  box-sizing: border-box;
  overflow: hidden;
  clip-path: polygon(
    0 0,
    calc(100% - var(--tile-edges)) 0,
    100% var(--tile-edges),
    100% 100%,
    var(--tile-edges) 100%,
    0 calc(100% - var(--tile-edges))
  );
}

.steez-cyberpunk-tile-0-tileInteractive {
  cursor: pointer;
}

.steez-cyberpunk-tile-0-tile::before,
.steez-cyberpunk-tile-0-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.steez-cyberpunk-tile-0-tile::before {
  background: var(--tile-border-color);
  clip-path: inherit;
  z-index: 0;
}

.steez-cyberpunk-tile-0-tile::after {
  background: var(--color-bg-tile, #0a0a0a);
  transition: background-color var(--transition-normal, 220ms ease);
  clip-path: polygon(
    var(--tile-border-width) var(--tile-border-width),
    calc(100% - var(--tile-edges) - var(--tile-border-width)) var(--tile-border-width),
    calc(100% - var(--tile-border-width)) calc(var(--tile-edges) + var(--tile-border-width)),
    calc(100% - var(--tile-border-width)) calc(100% - var(--tile-border-width)),
    calc(var(--tile-edges) + var(--tile-border-width)) calc(100% - var(--tile-border-width)),
    var(--tile-border-width) calc(100% - var(--tile-edges) - var(--tile-border-width))
  );
  z-index: 1;
}

.steez-cyberpunk-tile-0-tile:hover::after {
  background: var(--color-bg-tile-hover, #0f0f0f);
}

.steez-cyberpunk-tile-0-small {
  --tile-edges: 14px;
  --tile-padding: 1rem;
}

.steez-cyberpunk-tile-0-big {
  --tile-edges: 26px;
  --tile-padding: 2rem;
}

.steez-cyberpunk-tile-0-scrollable {
  max-height: 600px;
}

.steez-cyberpunk-tile-0-ios {
  --tile-padding: 12px;
  --tile-edges: 0;
  border-radius: 10px;
  clip-path: none;
}

.steez-cyberpunk-tile-0-ios::before,
.steez-cyberpunk-tile-0-ios::after {
  clip-path: none;
  border-radius: 10px;
}

.steez-cyberpunk-tile-0-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.steez-cyberpunk-tile-0-centerContent {
  align-items: center;
  justify-content: center;
}

.steez-cyberpunk-tile-0-cornerAccent {
  position: absolute;
  width: var(--tile-edges);
  height: var(--tile-edges);
  opacity: 0;
  transition: opacity var(--transition-fast, 150ms ease);
  pointer-events: none;
  z-index: 3;
}

.steez-cyberpunk-tile-0-cornerAccent[data-corner="top-right"] {
  top: 0;
  right: 0;
  background: var(--text-primary, #cbcbcc);
  clip-path: polygon(calc(100% - var(--tile-edges)) 0, 100% 0, 100% var(--tile-edges));
}

.steez-cyberpunk-tile-0-cornerAccent[data-corner="bottom-left"] {
  bottom: 0;
  left: 0;
  background: var(--text-primary, #cbcbcc);
  clip-path: polygon(0 calc(100% - var(--tile-edges)), 0 100%, var(--tile-edges) 100%);
}

.steez-cyberpunk-tile-0-big:hover .steez-cyberpunk-tile-0-cornerAccent {
  opacity: 1;
}

`;
const __steezStandaloneStyleKey = "cyberpunk-tile";

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

export interface CyberpunkTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "small" | "big" | "scrollable" | "ios";
  center?: boolean;
  contentClassName?: string;
}

export function CyberpunkTile({
  children,
  className = "",
  variant = "default",
  onClick,
  onKeyDown,
  style,
  center = false,
  contentClassName = "",
  ...props
}: CyberpunkTileProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={`${__styles_steez_cyberpunk_tile_0.tile} ${variant !== "default" ? __styles_steez_cyberpunk_tile_0[variant] : ""} ${onClick ? __styles_steez_cyberpunk_tile_0.tileInteractive : ""} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onClick || onKeyDown ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
      {...props}
    >
      <div className={`${__styles_steez_cyberpunk_tile_0.content} ${center ? __styles_steez_cyberpunk_tile_0.centerContent : ""} ${contentClassName}`.trim()}>
        {children}
      </div>
      <div className={__styles_steez_cyberpunk_tile_0.cornerAccent} data-corner="top-right" />
      <div className={__styles_steez_cyberpunk_tile_0.cornerAccent} data-corner="bottom-left" />
    </div>
  );
}
