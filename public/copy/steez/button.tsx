/**
 * Standalone Steez UI copy of Button.
 *
 * Generated from packages/ui/src/components/Button.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_button_0: Record<string, string> = {
  "primary": "steez-button-0-primary",
  "secondary": "steez-button-0-secondary",
  "danger": "steez-button-0-danger",
  "cyberpunk3": "steez-button-0-cyberpunk3",
  "cyberpunk6": "steez-button-0-cyberpunk6",
  "toolbarButton": "steez-button-0-toolbarButton",
  "small": "steez-button-0-small",
  "large": "steez-button-0-large",
};

const __styles_steez_button_1: Record<string, string> = {
  "root": "steez-button-1-root",
  "shape": "steez-button-1-shape",
  "content": "steez-button-1-content",
  "vertical": "steez-button-1-vertical",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/styles/Buttons.module.css */
.steez-button-0-primary,
.steez-button-0-secondary,
.steez-button-0-danger,
.steez-button-0-cyberpunk3,
.steez-button-0-cyberpunk6 {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 8px 16px;
  cursor: pointer;
  transition:
    color var(--transition-fast, 150ms ease),
    background-color var(--transition-fast, 150ms ease),
    border-color var(--transition-fast, 150ms ease),
    transform var(--transition-fast, 150ms ease);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
}

.steez-button-0-primary {
  background: var(--interactive-primary-bg, #cbcbcc);
  color: var(--interactive-primary-fg, #010607);
  border: 1px solid var(--interactive-primary-border, #cbcbcc);
  border-radius: 6px;
}

.steez-button-0-primary:hover:not(:disabled) {
  background: var(--interactive-primary-bg-hover, color-mix(in srgb, #cbcbcc 90%, #ee1401 10%));
  border-color: var(--interactive-primary-border, #cbcbcc);
}

.steez-button-0-secondary {
  background: var(--interactive-secondary-bg, #010607);
  color: var(--interactive-secondary-fg, #cbcbcc);
  border: 1px solid var(--interactive-secondary-border, rgba(203, 203, 204, 0.2));
  border-radius: 6px;
}

.steez-button-0-secondary:hover:not(:disabled) {
  color: var(--interactive-secondary-fg, #cbcbcc);
  background: var(--interactive-secondary-bg-hover, #0f0f0f);
  border-color: var(--interactive-secondary-border-hover, #cbcbcc);
}

.steez-button-0-toolbarButton {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: var(--interactive-secondary-bg, #010607);
  color: var(--interactive-secondary-fg, #cbcbcc);
  border: 1px solid var(--interactive-secondary-border, rgba(203, 203, 204, 0.2));
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.steez-button-0-toolbarButton:hover:not(:disabled) {
  background: var(--interactive-primary-bg, #cbcbcc);
  border-color: var(--interactive-primary-border, #cbcbcc);
  color: var(--interactive-primary-fg, #010607);
}

.steez-button-0-danger {
  background: var(--danger-bg, rgba(238, 20, 1, 0.15));
  color: var(--danger, #ee1401);
  border: 1px solid var(--danger, #ee1401);
  border-radius: 6px;
}

.steez-button-0-danger:hover:not(:disabled) {
  background: var(--danger, #ee1401);
  color: var(--text-on-accent, #010607);
}

.steez-button-0-cyberpunk3 {
  padding: 0.625rem 1rem 0.75rem;
  background: transparent;
  color: var(--accent-primary, #ee1401);
  border: 0;
  border-bottom: 1px solid currentColor;
  border-radius: 0;
  overflow: visible;
}

.steez-button-0-cyberpunk3::before {
  content: "";
  position: absolute;
  top: calc(100% + 1px);
  right: 0;
  width: 32%;
  height: 0.55rem;
  background: currentColor;
  transition:
    width var(--transition-fast, 150ms ease),
    transform var(--transition-fast, 150ms ease);
}

.steez-button-0-cyberpunk3::after {
  content: "";
  position: absolute;
  top: calc(100% + 1px);
  right: 32%;
  width: 0;
  height: 0;
  border-top: 0.55rem solid currentColor;
  border-left: 0.55rem solid transparent;
  transition:
    right var(--transition-fast, 150ms ease),
    transform var(--transition-fast, 150ms ease);
}

.steez-button-0-cyberpunk3:hover:not(:disabled) {
  color: color-mix(in srgb, var(--accent-primary, #ee1401) 84%, var(--text-primary, #cbcbcc));
}

.steez-button-0-cyberpunk3:hover:not(:disabled)::before {
  width: 66%;
}

.steez-button-0-cyberpunk3:hover:not(:disabled)::after {
  right: 66%;
}

.steez-button-0-cyberpunk6 {
  padding: 0.625rem 1rem;
  background: transparent;
  color: var(--interactive-primary-bg, #cbcbcc);
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  border-right: 0;
  border-radius: 0;
  overflow: visible;
}

.steez-button-0-cyberpunk6::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 100%;
  width: 1.25rem;
  height: calc(100% + 4px);
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: skewX(-27deg);
  transform-origin: top right;
  transition:
    background-color var(--transition-fast, 150ms ease),
    border-color var(--transition-fast, 150ms ease);
}

.steez-button-0-cyberpunk6::after {
  content: "";
  position: absolute;
  top: -2px;
  left: calc(100% + 1.25rem);
  width: 2px;
  height: calc(100% + 4px);
  background: currentColor;
  transform: skewX(-27deg);
  border-right: 0.625rem solid var(--bg-primary, #010607);
  box-shadow: 2px 0 0 0 currentColor;
  transition:
    left var(--transition-fast, 150ms ease),
    border-right-width var(--transition-fast, 150ms ease),
    background-color var(--transition-fast, 150ms ease);
}

.steez-button-0-cyberpunk6:hover:not(:disabled) {
  background: currentColor;
  color: var(--text-on-accent, #010607);
}

.steez-button-0-cyberpunk6:hover:not(:disabled)::before {
  background: currentColor;
}

.steez-button-0-cyberpunk6:hover:not(:disabled)::after {
  left: calc(100% + 1.55rem);
  border-right-width: 0.95rem;
}

.steez-button-0-small {
  padding: 4px 10px;
  font-size: 0.75rem;
}

.steez-button-0-large {
  padding: 12px 24px;
  font-size: 1rem;
}

.steez-button-0-primary:disabled,
.steez-button-0-secondary:disabled,
.steez-button-0-toolbarButton:disabled,
.steez-button-0-danger:disabled,
.steez-button-0-cyberpunk3:disabled,
.steez-button-0-cyberpunk6:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


/* packages/ui/src/components/ButtonShape.module.css */
.steez-button-1-root:is([data-shape="crystal"], [data-shape="cut"]) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--crystal-button-text, var(--interactive-primary-fg, #010607));
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  isolation: isolate;
  box-shadow: none;
  filter: none;
}
.steez-button-1-shape {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--crystal-button-color, var(--interactive-primary-bg, #cbcbcc));
  clip-path: polygon(var(--crystal-button-cut, .95rem) 0%, calc(100% - var(--crystal-button-cut, .95rem)) 0%, 100% 50%, calc(100% - var(--crystal-button-cut, .95rem)) 100%, var(--crystal-button-cut, .95rem) 100%, 0% 50%);
  box-shadow: none;
}
.steez-button-1-content { display: inline-flex; position: relative; align-items: center; justify-content: center; gap: .55rem; }
.steez-button-1-root:is([data-shape="crystal"], [data-shape="cut"]):hover,
.steez-button-1-root:is([data-shape="crystal"], [data-shape="cut"]):active { background: transparent; border: 0; box-shadow: none; filter: none; transform: none; }
.steez-button-1-root:focus-visible { outline: 2px solid var(--crystal-button-focus, var(--color-border-focus, #5a6268)); outline-offset: 4px; }
.steez-button-1-root:disabled,
.steez-button-1-root[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.steez-button-1-vertical { width: 2.5rem; height: 6rem; min-height: 6rem; padding: 0; flex-shrink: 0; }
.steez-button-1-vertical .steez-button-1-shape {
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
.steez-button-1-vertical .steez-button-1-content > svg { width: 20px; height: 20px; }

.steez-button-1-root[data-variant="secondary"] { color: var(--interactive-secondary-fg, #cbcbcc); }
.steez-button-1-root[data-variant="secondary"] .steez-button-1-shape { background: var(--interactive-secondary-bg, #010607); }
.steez-button-1-root[data-variant="danger"] { color: var(--danger, #ee1401); }
.steez-button-1-root[data-variant="danger"] .steez-button-1-shape { background: var(--danger-bg, rgba(238, 20, 1, 0.15)); }

.steez-button-1-root:is([data-shape="crystal"], [data-shape="cut"])::before, .steez-button-1-root:is([data-shape="crystal"], [data-shape="cut"])::after { content: none; }

.steez-button-1-root[data-shape="cut"] .steez-button-1-shape {
  clip-path: polygon(var(--cut-tl) 0, calc(100% - var(--cut-tr)) 0, 100% var(--cut-tr), 100% calc(100% - var(--cut-br)), calc(100% - var(--cut-br)) 100%, var(--cut-bl) 100%, 0 calc(100% - var(--cut-bl)), 0 var(--cut-tl));
}
.steez-button-1-root[data-shape="cut"][data-variant="secondary"] .steez-button-1-shape { background: var(--color-border-default, #2a2a2a); }
.steez-button-1-root[data-shape="cut"][data-variant="secondary"] .steez-button-1-shape::after {
  content: ""; position: absolute; inset: 1px; background: var(--interactive-secondary-bg, #010607); clip-path: inherit;
}
`;
const __steezStandaloneStyleKey = "button";

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

type ButtonVariant = "primary" | "secondary" | "danger" | "cyberpunk3" | "cyberpunk6";
type ButtonSize = "small" | "medium" | "large";
export type IconActionProps =
  | { iconOnly?: false }
  | ({ iconOnly: true } & ({ "aria-label": string } | { "aria-labelledby": string }));
type ButtonAppearance = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: "default" | "crystal" | "cut";
  cutCorners?: readonly ("top-left" | "top-right" | "bottom-right" | "bottom-left")[];
  cutSize?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  disabled?: boolean;
};
export type ButtonProps = ButtonAppearance & IconActionProps & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

/** Native action or link; crystal is a shape of the same button. */
export function Button({
  variant = "primary", size = "medium", shape = "default",
  orientation = "horizontal", cutCorners = ["top-right", "bottom-left"], cutSize = "12px", style, className = "", children, iconOnly,
  disabled = false, ...props
}: ButtonProps) {
  const sizeClass = size === "small" ? __styles_steez_button_0.small : size === "large" ? __styles_steez_button_0.large : "";
  const crystal = shape === "crystal";
  const shaped = shape !== "default";
  const corner = (name: typeof cutCorners[number]) => cutCorners.includes(name) ? `min(${cutSize}, 50%)` : "0px";
  const shapeStyle = { "--cut-tl": corner("top-left"), "--cut-tr": corner("top-right"), "--cut-br": corner("bottom-right"), "--cut-bl": corner("bottom-left"), ...style } as React.CSSProperties;
  const classes = `${__styles_steez_button_0[variant]} ${sizeClass} ${shaped ? __styles_steez_button_1.root : ""} ${crystal && orientation === "vertical" ? __styles_steez_button_1.vertical : ""} ${className}`.trim();
  const content = shaped ? <>
    <span className={__styles_steez_button_1.shape} aria-hidden="true" />
    <span className={__styles_steez_button_1.content} aria-hidden={iconOnly || undefined}>{children}</span>
  </> : iconOnly ? <span aria-hidden="true">{children}</span> : children;
  const appearance = { className: classes, style: shapeStyle, "data-shape": shape, "data-variant": variant };
  if (props.href !== undefined) {
    const { href, onClick, ...linkProps } = props;
    return <a {...linkProps} {...appearance} href={disabled ? undefined : href}
      role={disabled ? "link" : linkProps.role}
      aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : linkProps.tabIndex}
      onClick={event => {
        if (disabled) { event.preventDefault(); return; }
        onClick?.(event);
      }}>{content}</a>;
  }
  const { type = "button", ...buttonProps } = props;
  return <button {...buttonProps} {...appearance} type={type} disabled={disabled}>{content}</button>;
}
export default Button;
