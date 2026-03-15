import React from "react";

import styles from "./OverlayButton.module.css";

export interface OverlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function OverlayButton({
  active,
  className = "",
  ...props
}: OverlayButtonProps) {
  const classes = `${styles.overlayBtn} ${
    active ? styles.overlayBtnActive : ""
  } ${className}`.trim();
  return <button type="button" className={classes} {...props} />;
}

export default OverlayButton;
