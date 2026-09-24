/**
 * Standalone Steez UI copy of Dotted Halo Card.
 *
 * Generated from packages/ui/src/components/DottedHaloCard.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_dotted_halo_card_0: Record<string, string> = {
  "body": "steez-dotted-halo-card-0-body",
};

const __styles_steez_dotted_halo_card_1: Record<string, string> = {
  "root": "steez-dotted-halo-card-1-root",
  "title": "steez-dotted-halo-card-1-title",
  "body": "steez-dotted-halo-card-1-body",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CardFrame.module.css */
.steez-dotted-halo-card-0-body {
  min-width: 0;
}


/* packages/ui/src/components/DottedHaloCard.module.css */
.steez-dotted-halo-card-1-root {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.5rem 2rem;
  border: 1px solid var(--text-primary, #cbcbcc);
  border-radius: 1rem;
  background: var(--bg-primary, #010607);
  color: var(--text-primary, #cbcbcc);
}

.steez-dotted-halo-card-1-root::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: calc(var(--dotted-halo-inset, 1.35rem) * -1);
  border-radius: calc(1rem + var(--dotted-halo-inset, 1.35rem));
  background-image: radial-gradient(
    color-mix(in srgb, var(--text-primary, #cbcbcc) 76%, transparent)
      var(--dotted-halo-dot-size, 1px),
    transparent 0
  );
  background-position: center;
  background-repeat: repeat;
  background-size: var(--dotted-halo-pattern-size, 5px)
    var(--dotted-halo-pattern-size, 5px);
  opacity: 0.7;
}

.steez-dotted-halo-card-1-title {
  margin: 0;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.steez-dotted-halo-card-1-body {
  color: var(--text-secondary, #999999);
  line-height: 1.7;
}
`;
const __steezStandaloneStyleKey = "dotted-halo-card";

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
      <div className={`${__styles_steez_dotted_halo_card_0.body} ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
}

export interface DottedHaloCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  bodyClassName?: string;
  patternInset?: string;
  patternSize?: string;
  patternDotSize?: string;
}

export function DottedHaloCard({
  title,
  children,
  className = "",
  bodyClassName = "",
  patternInset,
  patternSize,
  patternDotSize,
  style,
  ...props
}: DottedHaloCardProps) {
  return (
    <CardFrame
      className={`${__styles_steez_dotted_halo_card_1.root} ${className}`.trim()}
      title={title}
      titleAs="h3"
      titleClassName={__styles_steez_dotted_halo_card_1.title}
      bodyClassName={`${__styles_steez_dotted_halo_card_1.body} ${bodyClassName}`.trim()}
      style={
        {
          "--dotted-halo-inset": patternInset,
          "--dotted-halo-pattern-size": patternSize,
          "--dotted-halo-dot-size": patternDotSize,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </CardFrame>
  );
}

export default DottedHaloCard;
