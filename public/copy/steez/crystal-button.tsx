/**
 * Standalone Steez UI copy of Crystal Button.
 *
 * Generated from packages/ui/src/components/CrystalButton.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_crystal_button_0: Record<string, string> = {
  "root": "steez-crystal-button-0-root",
  "shape": "steez-crystal-button-0-shape",
  "content": "steez-crystal-button-0-content",
  "loud": "steez-crystal-button-0-loud",
  "vertical": "steez-crystal-button-0-vertical",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CrystalButton.module.css */
.steez-crystal-button-0-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 44px;
  padding: .72rem 1.45rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--crystal-button-text, var(--color-text-on-accent, #050505));
  font: 700 .82rem/1.4 var(--font-sans, sans-serif);
  letter-spacing: .16em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  isolation: isolate;
  transition: transform 200ms ease;
}
.steez-crystal-button-0-shape {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--crystal-button-color, var(--color-accent, #ee1401));
  clip-path: polygon(var(--crystal-button-cut, .95rem) 0%, calc(100% - var(--crystal-button-cut, .95rem)) 0%, 100% 50%, calc(100% - var(--crystal-button-cut, .95rem)) 100%, var(--crystal-button-cut, .95rem) 100%, 0% 50%);
  box-shadow: 0 10px 24px rgb(0 0 0 / .18);
}
.steez-crystal-button-0-content { display: inline-flex; position: relative; align-items: center; justify-content: center; gap: .55rem; }
.steez-crystal-button-0-root:hover:not(:disabled):not([aria-disabled="true"]) { transform: scale(1.01); }
.steez-crystal-button-0-root:focus-visible { outline: 2px solid var(--crystal-button-focus, var(--color-border-focus, #5a6268)); outline-offset: 4px; }
.steez-crystal-button-0-root:disabled,
.steez-crystal-button-0-root[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.steez-crystal-button-0-loud .steez-crystal-button-0-shape { background: color-mix(in srgb, var(--crystal-button-color, var(--color-accent, #ee1401)) 82%, #fff 18%); }
.steez-crystal-button-0-loud:hover:not(:disabled):not([aria-disabled="true"]) .steez-crystal-button-0-shape,
.steez-crystal-button-0-loud:focus-visible .steez-crystal-button-0-shape { background: color-mix(in srgb, var(--crystal-button-color, var(--color-accent, #ee1401)) 88%, #fff 12%); }
.steez-crystal-button-0-vertical { width: 2.5rem; height: 6rem; min-height: 6rem; padding: 0; flex-shrink: 0; }
.steez-crystal-button-0-vertical .steez-crystal-button-0-shape {
  inset: auto;
  left: 50%;
  top: 50%;
  width: 6rem;
  height: 2.5rem;
  margin-left: -3rem;
  margin-top: -1.25rem;
  transform: rotate(90deg);
  clip-path: polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%);
}
.steez-crystal-button-0-vertical .steez-crystal-button-0-content > svg { width: 20px; height: 20px; }
.steez-crystal-button-0-vertical:hover:not(:disabled):not([aria-disabled="true"]) { transform: scale(1.03); }
@media (prefers-reduced-motion: reduce) {
  .steez-crystal-button-0-root { transition: none; }
  .steez-crystal-button-0-root:hover:not(:disabled):not([aria-disabled="true"]) { transform: none; }
}
`;
const __steezStandaloneStyleKey = "crystal-button";

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

type CrystalButtonAppearance = {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  tone?: "solid" | "loud";
  disabled?: boolean;
};

export type CrystalButtonProps = CrystalButtonAppearance & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

/** Six-point crystal action. Supply an accessible name for icon-only content. */
export function CrystalButton({
  children, orientation = "horizontal", tone = "solid", disabled = false,
  className = "", ...props
}: CrystalButtonProps) {
  const classes = `${__styles_steez_crystal_button_0.root} ${orientation === "vertical" ? __styles_steez_crystal_button_0.vertical : ""} ${tone === "loud" ? __styles_steez_crystal_button_0.loud : ""} ${className}`.trim();
  const content = <><span className={__styles_steez_crystal_button_0.shape} aria-hidden="true" /><span className={__styles_steez_crystal_button_0.content}>{children}</span></>;

  if (props.href !== undefined) {
    const { href, onClick, ...linkProps } = props;
    return (
      <a {...linkProps} href={disabled ? undefined : href} className={classes}
        role={disabled ? "link" : linkProps.role}
        aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : linkProps.tabIndex}
        onClick={(event) => {
          if (disabled) { event.preventDefault(); return; }
          onClick?.(event);
        }}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props;
  return <button {...buttonProps} type={type} className={classes} disabled={disabled}>{content}</button>;
}
