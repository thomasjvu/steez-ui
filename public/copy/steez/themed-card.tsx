/**
 * Standalone Steez UI copy of Themed Card.
 *
 * Generated from packages/ui/src/components/ThemedCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_themed_card_0: Record<string, string> = {
  "body": "steez-themed-card-0-body",
};

const __styles_steez_themed_card_1: Record<string, string> = {
  "card": "steez-themed-card-1-card",
  "featured": "steez-themed-card-1-featured",
  "title": "steez-themed-card-1-title",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CardFrame.module.css */
.steez-themed-card-0-body {
  min-width: 0;
}


/* packages/ui/src/components/ThemedCard.module.css */
.steez-themed-card-1-card {
  position: relative;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 88%, transparent);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.5));
}

.steez-themed-card-1-featured {
  border-color: var(--accent-primary, #ee1401);
  box-shadow: var(--shadow-md, 0 4px 8px rgba(0, 0, 0, 0.5));
}

.steez-themed-card-1-title {
  margin-bottom: 0.75rem;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-primary, "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: 1rem;
  font-weight: 600;
}

`;
const __steezStandaloneStyleKey = "themed-card";

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
      <div className={`${__styles_steez_themed_card_0.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}

export interface ThemedCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  variant?: "default" | "featured";
}

export function ThemedCard({
  title,
  variant = "default",
  className = "",
  children,
  ...props
}: ThemedCardProps) {
  return (
    <CardFrame
      className={`${__styles_steez_themed_card_1.card} ${variant === "featured" ? __styles_steez_themed_card_1.featured : ""} ${className}`}
      title={title}
      titleClassName={__styles_steez_themed_card_1.title}
      {...props}
    >
      {children}
    </CardFrame>
  );
}
