"use client";

import React from "react";

import type { IconActionProps } from "./Button.tsx";

import styles from "./OverlayButton.module.css";

export type OverlayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IconActionProps & {
  active?: boolean;
};

export function OverlayButton({
  active,
  iconOnly,
  children,
  className = "",
  ...props
}: OverlayButtonProps) {
  const classes = `${styles.overlayBtn} ${
    active ? styles.overlayBtnActive : ""
  } ${className}`.trim();
  return <button type="button" className={classes} {...props}>
    {iconOnly ? <span aria-hidden="true">{children}</span> : children}
  </button>;
}

export default OverlayButton;
