/**
 * Standalone Steez UI copy of Corner Bracket Card.
 *
 * Generated from packages/ui/src/components/CornerBracketCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_corner_bracket_card_0: Record<string, string> = {
  "body": "steez-corner-bracket-card-0-body",
};

const __styles_steez_corner_bracket_card_1: Record<string, string> = {
  "card": "steez-corner-bracket-card-1-card",
  "featured": "steez-corner-bracket-card-1-featured",
  "title": "steez-corner-bracket-card-1-title",
  "corner": "steez-corner-bracket-card-1-corner",
  "cornerTopLeft": "steez-corner-bracket-card-1-cornerTopLeft",
  "cornerBottomLeft": "steez-corner-bracket-card-1-cornerBottomLeft",
  "cornerTopRight": "steez-corner-bracket-card-1-cornerTopRight",
  "cornerBottomRight": "steez-corner-bracket-card-1-cornerBottomRight",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CardFrame.module.css */
.steez-corner-bracket-card-0-body {
  min-width: 0;
}


/* packages/ui/src/components/CornerBracketCard.module.css */
.steez-corner-bracket-card-1-card {
  position: relative;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 88%, transparent);
  padding: 1rem;
}

.steez-corner-bracket-card-1-featured {
  border-color: var(--accent-primary, #ee1401);
}

.steez-corner-bracket-card-1-title {
  margin-bottom: 0.75rem;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-primary, "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: 1rem;
  font-weight: 600;
}

.steez-corner-bracket-card-1-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.steez-corner-bracket-card-1-corner::before,
.steez-corner-bracket-card-1-corner::after {
  content: "";
  position: absolute;
  background: var(--accent-primary, #ee1401);
}

.steez-corner-bracket-card-1-cornerTopLeft {
  top: -1px;
  left: -1px;
}

.steez-corner-bracket-card-1-cornerTopLeft::before,
.steez-corner-bracket-card-1-cornerBottomLeft::before,
.steez-corner-bracket-card-1-cornerTopRight::before,
.steez-corner-bracket-card-1-cornerBottomRight::before {
  width: 12px;
  height: 1px;
}

.steez-corner-bracket-card-1-cornerTopLeft::after,
.steez-corner-bracket-card-1-cornerBottomLeft::after,
.steez-corner-bracket-card-1-cornerTopRight::after,
.steez-corner-bracket-card-1-cornerBottomRight::after {
  width: 1px;
  height: 12px;
}

.steez-corner-bracket-card-1-cornerTopLeft::before {
  top: 0;
  left: 0;
}

.steez-corner-bracket-card-1-cornerTopLeft::after {
  top: 0;
  left: 0;
}

.steez-corner-bracket-card-1-cornerTopRight {
  top: -1px;
  right: -1px;
}

.steez-corner-bracket-card-1-cornerTopRight::before {
  top: 0;
  right: 0;
}

.steez-corner-bracket-card-1-cornerTopRight::after {
  top: 0;
  right: 0;
}

.steez-corner-bracket-card-1-cornerBottomLeft {
  bottom: -1px;
  left: -1px;
}

.steez-corner-bracket-card-1-cornerBottomLeft::before {
  bottom: 0;
  left: 0;
}

.steez-corner-bracket-card-1-cornerBottomLeft::after {
  bottom: 0;
  left: 0;
}

.steez-corner-bracket-card-1-cornerBottomRight {
  bottom: -1px;
  right: -1px;
}

.steez-corner-bracket-card-1-cornerBottomRight::before {
  bottom: 0;
  right: 0;
}

.steez-corner-bracket-card-1-cornerBottomRight::after {
  bottom: 0;
  right: 0;
}

`;
const __steezStandaloneStyleKey = "corner-bracket-card";

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

export interface CardFrameProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  titleAs?: "div" | "h3";
  titleClassName?: string;
  bodyClassName?: string;
  decoration?: React.ReactNode;
}

/**
 * Shared private frame for cards with an optional title, body, and decoration.
 * Public cards supply their own root/title/body classes so each visual variant
 * keeps its existing CSS contract.
 */
export function CardFrame({
  title,
  titleAs = "div",
  titleClassName = "",
  bodyClassName = "",
  decoration,
  className = "",
  children,
  ...props
}: CardFrameProps) {
  const Title = titleAs;

  return (
    <div className={className.trim()} {...props}>
      {decoration}
      {title ? <Title className={titleClassName.trim()}>{title}</Title> : null}
      <div className={`${__styles_steez_corner_bracket_card_0.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}

export interface CornerBracketCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  variant?: "default" | "featured";
}

export function CornerBracketCard({
  title,
  variant = "default",
  className = "",
  children,
  ...props
}: CornerBracketCardProps) {
  return (
    <CardFrame
      className={`${__styles_steez_corner_bracket_card_1.card} ${variant === "featured" ? __styles_steez_corner_bracket_card_1.featured : ""} ${className}`}
      title={title}
      titleClassName={__styles_steez_corner_bracket_card_1.title}
      decoration={
        <>
          <span className={`${__styles_steez_corner_bracket_card_1.corner} ${__styles_steez_corner_bracket_card_1.cornerTopLeft}`} aria-hidden="true" />
          <span className={`${__styles_steez_corner_bracket_card_1.corner} ${__styles_steez_corner_bracket_card_1.cornerTopRight}`} aria-hidden="true" />
          <span className={`${__styles_steez_corner_bracket_card_1.corner} ${__styles_steez_corner_bracket_card_1.cornerBottomLeft}`} aria-hidden="true" />
          <span className={`${__styles_steez_corner_bracket_card_1.corner} ${__styles_steez_corner_bracket_card_1.cornerBottomRight}`} aria-hidden="true" />
        </>
      }
      {...props}
    >
      {children}
    </CardFrame>
  );
}
