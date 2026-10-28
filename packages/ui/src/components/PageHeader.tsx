"use client";

import React, { ReactNode } from "react";

import { EyeIcon, Icon, SlidersIcon } from "@steez-ui/icons";
import type { SteezIconName } from "@steez-ui/icons";

import styles from "./PageHeader.module.css";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  description?: string;
  icon?: SteezIconName;
  extra?: ReactNode;
  className?: string;
  brand?: ReactNode;
  onBrandClick?: () => void;
  brandTitle?: string;
  brandAriaLabel?: string;
  onBack?: () => void;
  onSettings?: () => void;
  onViewerToggle?: () => void;
  viewerVisible?: boolean;
  viewerShowLabel?: string;
  viewerHideLabel?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  extra,
  className = "",
  brand,
  onBrandClick,
  brandTitle,
  brandAriaLabel,
  onBack,
  onSettings,
  onViewerToggle,
  viewerVisible,
  viewerShowLabel = "Show viewer",
  viewerHideLabel = "Hide viewer",
  ...props
}: PageHeaderProps) {
  const Brand = onBrandClick ? "button" : "span";
  const viewerLabel = viewerVisible ? viewerHideLabel : viewerShowLabel;

  return (
    <div {...props} className={`${styles.header} ${className}`.trim()}>
      <div className={styles.headerRow}>
        <div className={styles.brandCluster}>
          {brand !== undefined && brand !== null || onBrandClick ? (
            <Brand
              type={onBrandClick ? "button" : undefined}
              className={styles.brandButton}
              onClick={onBrandClick}
              title={brandTitle}
              aria-label={onBrandClick ? brandAriaLabel ?? brandTitle ?? title : undefined}
            >
              <span className={styles.brandVisual} aria-hidden={onBrandClick ? true : undefined}>{brand ?? title.slice(0, 1)}</span>
            </Brand>
          ) : null}
          <div className={styles.headerContent}>
            <h2>
              {icon ? (
                <span className={styles.titleIcon} aria-hidden="true">
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
              <Icon icon="chevronLeft" width={18} height={18} aria-hidden="true" />
            </button>
          ) : null}
          {onSettings ? (
            <button type="button" className={styles.iconButton} onClick={onSettings} aria-label="Open settings">
              <SlidersIcon width={18} height={18} aria-hidden="true" />
            </button>
          ) : null}
          {onViewerToggle ? (
            <button
              type="button"
              className={styles.iconButton}
              onClick={onViewerToggle}
              aria-label={viewerLabel}
              title={viewerLabel}
              aria-pressed={Boolean(viewerVisible)}
            >
              <EyeIcon width={18} height={18} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
