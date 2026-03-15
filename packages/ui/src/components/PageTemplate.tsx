import React from "react";

import { PageHeader, type PageHeaderProps } from "./PageHeader";
import styles from "./PageTemplate.module.css";

interface SubTab {
  id: string;
  label: string;
}

export interface PageTemplateProps
  extends Pick<
    PageHeaderProps,
    | "title"
    | "description"
    | "icon"
    | "onBack"
    | "onSettings"
    | "brand"
    | "onBrandClick"
    | "onViewerToggle"
    | "viewerVisible"
  > {
  actions?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  subTabs?: SubTab[];
  activeSubTab?: string;
  onSubTabChange?: (tabId: string) => void;
  children?: React.ReactNode;
  loading?: boolean;
  showTitle?: boolean;
}

export function PageTemplate({
  title,
  actions,
  extra,
  description,
  icon,
  subTabs,
  activeSubTab,
  onSubTabChange,
  onBack,
  onSettings,
  brand,
  onBrandClick,
  onViewerToggle,
  viewerVisible,
  children,
  loading,
  showTitle = true,
  className = "",
}: PageTemplateProps) {
  const headerExtra = extra ?? actions;

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {showTitle ? (
        <div className={styles.header}>
          <PageHeader
            title={title}
            description={description}
            icon={icon}
            extra={headerExtra}
            onBack={onBack}
            onSettings={onSettings}
            brand={brand}
            onBrandClick={onBrandClick}
            onViewerToggle={onViewerToggle}
            viewerVisible={viewerVisible}
          />
        </div>
      ) : null}

      {subTabs?.length ? (
        <div className={styles.subTabs} role="tablist" aria-label={`${title} sections`}>
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSubTabChange?.(tab.id)}
              className={`${styles.subTabButton} ${activeSubTab === tab.id ? styles.subTabButtonActive : ""}`.trim()}
              type="button"
              role="tab"
              aria-selected={activeSubTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.content}>
        {loading ? <div className={styles.loading}>Loading...</div> : children ?? null}
      </div>
    </div>
  );
}

