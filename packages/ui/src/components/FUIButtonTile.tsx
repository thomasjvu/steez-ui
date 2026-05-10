import React from "react";

import styles from "./FUIButtonTile.module.css";

export interface FUIButtonTileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
}

export function FUIButtonTile({
  icon,
  label,
  active = false,
  className = "",
  type = "button",
  ...props
}: FUIButtonTileProps) {
  return (
    <button
      type={type}
      className={`${styles.root} ${active ? styles.active : ""} ${className}`.trim()}
      {...props}
    >
      <div className={styles.content}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <strong className={styles.label}>{label}</strong>
      </div>
    </button>
  );
}

export default FUIButtonTile;
