import React from "react";

import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${styles.sectionHeader} ${className}`.trim()}>
      <div className={styles.headerContent}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
}

export default SectionHeader;
