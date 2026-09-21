"use client";

import React from "react";

import { useRovingTabs } from "../hooks/useRovingTabs.js";
import { useStableId } from "../hooks/useStableId.js";
import { PageHeader, type PageHeaderProps } from "./PageHeader.js";
import styles from "./PageTemplate.module.css";
import { TabList } from "./TabList.js";

interface SubTab {
  id: string;
  label: string;
  disabled?: boolean;
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
  brandTitle?: string;
  brandAriaLabel?: string;
  viewerShowLabel?: string;
  viewerHideLabel?: string;
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
  brandTitle,
  brandAriaLabel,
  viewerShowLabel,
  viewerHideLabel,
  children,
  loading,
  showTitle = true,
  className = "",
}: PageTemplateProps) {
  const baseId = useStableId("page-template");
  const headerExtra = extra ?? actions;
  const hasContent = loading || React.Children.count(children) > 0;

  const getTabDomId = React.useCallback(
    (tabId: string) => `${baseId}-tab-${tabId}`,
    [baseId],
  );
  const getPanelDomId = React.useCallback(
    (tabId: string) => `${baseId}-panel-${tabId}`,
    [baseId],
  );

  const resolvedActiveTabId =
    subTabs?.some((tab) => tab.id === activeSubTab) ? activeSubTab : subTabs?.[0]?.id;

  const handleSelect = React.useCallback(
    (tabId: string) => {
      onSubTabChange?.(tabId);
    },
    [onSubTabChange],
  );
  const { handleKeyDown: handleTabKeyDown, setTabRef } = useRovingTabs({
    tabs: subTabs ?? [],
    onSelect: handleSelect,
  });

  const hasSubTabs = Boolean(subTabs?.length);

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
            brandTitle={brandTitle}
            brandAriaLabel={brandAriaLabel}
            onViewerToggle={onViewerToggle}
            viewerVisible={viewerVisible}
            viewerShowLabel={viewerShowLabel}
            viewerHideLabel={viewerHideLabel}
          />
        </div>
      ) : null}

      {hasSubTabs ? (
        <TabList
          tabs={subTabs!}
          activeTabId={resolvedActiveTabId}
          getTabDomId={getTabDomId}
          getPanelDomId={getPanelDomId}
          setTabRef={setTabRef}
          onSelect={handleSelect}
          onKeyDown={handleTabKeyDown}
          tabListClassName={styles.subTabs}
          tabClassName={styles.subTabButton}
          activeTabClassName={styles.subTabButtonActive}
          panelClassName={styles.content}
          ariaLabel={`${title} sections`}
          renderPanel={hasContent}
          panelContent={loading ? <div className={styles.loading}>Loading...</div> : children ?? null}
        />
      ) : hasContent ? (
        <div className={styles.content}>
          {loading ? <div className={styles.loading}>Loading...</div> : children ?? null}
        </div>
      ) : null}
    </div>
  );
}
