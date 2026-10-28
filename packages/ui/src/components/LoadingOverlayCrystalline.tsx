"use client";

import React from "react";

import styles from "./LoadingOverlayCrystalline.module.css";

export interface LoadingOverlayCrystallineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  message: string;
  subtext?: string;
  icon?: React.ReactNode;
  showEffect?: boolean;
}

export function LoadingOverlayCrystalline({
  message,
  subtext,
  icon,
  showEffect = false,
  className = "",
  ...props
}: LoadingOverlayCrystallineProps) {
  return (
    <div {...props} role={props.role ?? "status"} aria-live={props["aria-live"] ?? "polite"} className={`${styles.root} ${showEffect ? "" : styles.noEffect} ${className}`.trim()}>
      <div className={styles.card}>
        {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
        <div>
          <div>{message}</div>
          {subtext ? <div className={styles.subtext}>{subtext}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlayCrystalline;
