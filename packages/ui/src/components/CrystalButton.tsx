"use client";

import React from "react";

import styles from "./CrystalButton.module.css";

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
  const classes = `${styles.root} ${orientation === "vertical" ? styles.vertical : ""} ${tone === "loud" ? styles.loud : ""} ${className}`.trim();
  const content = <><span className={styles.shape} aria-hidden="true" /><span className={styles.content}>{children}</span></>;

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
