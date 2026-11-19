/**
 * Standalone Steez UI copy of Card.
 *
 * Generated from packages/ui/src/components/Card.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_card_0: Record<string, string> = {
  "body": "steez-card-0-body",
  "header": "steez-card-0-header",
  "actions": "steez-card-0-actions",
};

const __styles_steez_card_1: Record<string, string> = {
  "brackets": "steez-card-1-brackets",
};

const __styles_steez_card_2: Record<string, string> = {
  "card": "steez-card-2-card",
  "featured": "steez-card-2-featured",
  "bracketed": "steez-card-2-bracketed",
  "ghost": "steez-card-2-ghost",
  "title": "steez-card-2-title",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CardFrame.module.css */
.steez-card-0-body {
  min-width: 0;
}

.steez-card-0-header { margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.steez-card-0-actions { display: flex; align-items: center; gap: 0.5rem; margin-inline-start: auto; }

.steez-card-0-header > :first-child { margin-block: 0; }


/* packages/ui/src/styles/CornerBrackets.module.css */
/*
 * Shared card treatment: offset L-brackets outside the top-left and
 * bottom-right corners. Used by Card (variant="brackets"), QuickInfoCard and
 * StatCard. Override --bracket-size / --bracket-color per surface.
 */
.steez-card-1-brackets {
  position: relative;
  overflow: visible;
}

.steez-card-1-brackets::before,
.steez-card-1-brackets::after {
  content: "";
  position: absolute;
  width: var(--bracket-size, 0.5rem);
  height: var(--bracket-size, 0.5rem);
  border: 0 solid var(--bracket-color, var(--border-color, rgba(203, 203, 204, 0.2)));
  pointer-events: none;
}

.steez-card-1-brackets::before {
  top: calc(var(--bracket-size, 0.5rem) * -1);
  left: calc(var(--bracket-size, 0.5rem) * -1);
  border-top-width: 1px;
  border-left-width: 1px;
}

.steez-card-1-brackets::after {
  right: calc(var(--bracket-size, 0.5rem) * -1);
  bottom: calc(var(--bracket-size, 0.5rem) * -1);
  border-right-width: 1px;
  border-bottom-width: 1px;
}


/* packages/ui/src/components/Card.module.css */
.steez-card-2-card {
  position: relative;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 88%, transparent);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.5));
}

.steez-card-2-featured {
  border-color: var(--accent-primary, #ee1401);
  box-shadow: var(--shadow-md, 0 4px 8px rgba(0, 0, 0, 0.5));
}

/* Square corners so the offset brackets read as part of the frame. */
.steez-card-2-bracketed {
  border-radius: 0;
  box-shadow: none;
}

.steez-card-2-ghost {
  border-style: dashed;
  background: transparent;
  box-shadow: none;
}

.steez-card-2-title {
  margin-bottom: 0.75rem;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 1rem;
  font-weight: 600;
}

`;
const __steezStandaloneStyleKey = "card";

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

export interface CardCompositionProps {
  title?: React.ReactNode;
  titleAs?: "div" | "h3";
  titleClassName?: string;
  bodyClassName?: string;
  actions?: React.ReactNode;
  headerClassName?: string;
}

export interface CardFrameProps extends CardCompositionProps,
  Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
  actions,
  headerClassName = "",
  className = "",
  children,
  ...props
}: CardFrameProps) {
  const Title = titleAs;

  const heading = title !== undefined && title !== null
    ? <Title className={titleClassName.trim()}>{title}</Title> : null;

  return (
    <div className={className.trim()} {...props}>
      {decoration}
      {actions !== undefined && actions !== null ? (
        <div className={`${__styles_steez_card_0.header} ${headerClassName}`.trim()}>
          {heading}
          <div className={__styles_steez_card_0.actions}>{actions}</div>
        </div>
      ) : heading}
      <div className={`${__styles_steez_card_0.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}

export type CardVariant = "default" | "featured" | "brackets" | "ghost";

export interface CardProps
  extends CardCompositionProps, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** `featured` adds accent emphasis, `brackets` offset corner brackets, `ghost` a dashed transparent outline. */
  variant?: CardVariant;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "",
  featured: __styles_steez_card_2.featured,
  brackets: `${__styles_steez_card_2.bracketed} ${__styles_steez_card_1.brackets}`,
  ghost: __styles_steez_card_2.ghost,
};

export function Card({
  title,
  titleAs,
  titleClassName = "",
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <CardFrame
      className={`${__styles_steez_card_2.card} ${VARIANT_CLASSES[variant] ?? ""} ${className}`}
      data-variant={variant}
      title={title}
      titleAs={titleAs}
      titleClassName={`${__styles_steez_card_2.title} ${titleClassName}`.trim()}
      {...props}
    >
      {children}
    </CardFrame>
  );
}
