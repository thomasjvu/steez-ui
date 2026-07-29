import React from "react";

import styles from "./LoadingOverlayCrystalline.module.css";

export interface LoadingOverlayCrystallineProps {
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
}: LoadingOverlayCrystallineProps) {
  return (
    <div className={`${styles.root} ${showEffect ? "" : styles.noEffect}`.trim()}>
      <div className={styles.card}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <div>
          <div>{message}</div>
          {subtext ? <div className={styles.subtext}>{subtext}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlayCrystalline;
