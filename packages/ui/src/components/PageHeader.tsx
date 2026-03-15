import React, { ReactNode } from "react";

import { EyeIcon, Icon, SlidersIcon } from "@steez-ui/icons";
import type { SteezIconName } from "@steez-ui/icons";

import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: SteezIconName;
  extra?: ReactNode;
  className?: string;
  brand?: ReactNode;
  onBrandClick?: () => void;
  onBack?: () => void;
  onSettings?: () => void;
  onViewerToggle?: () => void;
  viewerVisible?: boolean;
}

export function PageHeader({
  title,
  description,
  icon,
  extra,
  className = "",
  brand,
  onBrandClick,
  onBack,
  onSettings,
  onViewerToggle,
  viewerVisible,
}: PageHeaderProps) {
  return (
    <div className={`${styles.header} ${className}`.trim()}>
      <div className={styles.headerRow}>
        <div className={styles.brandCluster}>
          {brand || onBrandClick ? (
            <button type="button" className={styles.brandButton} onClick={onBrandClick}>
              <span className={styles.brandVisual}>{brand ?? title.slice(0, 1)}</span>
            </button>
          ) : null}
          <div className={styles.headerContent}>
            <h2>
              {icon ? (
                <span className={styles.titleIcon}>
                  <Icon icon={icon} width={18} height={18} />
                </span>
              ) : null}
              {title}
            </h2>
            {description ? <p>{description}</p> : null}
          </div>
        </div>
        <div className={styles.headerExtra}>
          {extra}
          {onBack ? (
            <button type="button" className={styles.iconButton} onClick={onBack} aria-label="Go back">
              <Icon icon="chevronLeft" width={18} height={18} />
            </button>
          ) : null}
          {onSettings ? (
            <button type="button" className={styles.iconButton} onClick={onSettings} aria-label="Open settings">
              <SlidersIcon width={18} height={18} />
            </button>
          ) : null}
          {onViewerToggle ? (
            <button
              type="button"
              className={styles.iconButton}
              onClick={onViewerToggle}
              aria-label={viewerVisible ? "Hide viewer" : "Show viewer"}
            >
              <EyeIcon width={18} height={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

