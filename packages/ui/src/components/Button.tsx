"use client";

import React from "react";
import styles from "../styles/Buttons.module.css";
import shapeStyles from "./ButtonShape.module.css";

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
  const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : "";
  const crystal = shape === "crystal";
  const shaped = shape !== "default";
  const corner = (name: typeof cutCorners[number]) => cutCorners.includes(name) ? `min(${cutSize}, 50%)` : "0px";
  const shapeStyle = { "--cut-tl": corner("top-left"), "--cut-tr": corner("top-right"), "--cut-br": corner("bottom-right"), "--cut-bl": corner("bottom-left"), ...style } as React.CSSProperties;
  const classes = `${styles[variant]} ${sizeClass} ${shaped ? shapeStyles.root : ""} ${crystal && orientation === "vertical" ? shapeStyles.vertical : ""} ${className}`.trim();
  const content = shaped ? <>
    <span className={shapeStyles.shape} aria-hidden="true" />
    <span className={shapeStyles.content} aria-hidden={iconOnly || undefined}>{children}</span>
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
