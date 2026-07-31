import React from "react";

import { useStableId } from "../hooks/useStableId.js";
import { PageHeader, type PageHeaderProps } from "./PageHeader.js";
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
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

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

  const focusTab = React.useCallback((tabId: string) => {
    tabRefs.current.get(tabId)?.focus();
  }, []);

  const handleTabKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
      if (!subTabs?.length) {
        return;
      }

      const currentIndex = subTabs.findIndex((tab) => tab.id === tabId);
      if (currentIndex === -1) {
        return;
      }

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % subTabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + subTabs.length) % subTabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = subTabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextTabId = subTabs[nextIndex]!.id;
      handleSelect(nextTabId);
      // Focus after selection so roving tabIndex updates before focus lands.
      queueMicrotask(() => focusTab(nextTabId));
    },
    [focusTab, handleSelect, subTabs],
  );

  const setTabRef = React.useCallback((tabId: string, node: HTMLButtonElement | null) => {
    if (node) {
      tabRefs.current.set(tabId, node);
    } else {
      tabRefs.current.delete(tabId);
    }
  }, []);

  const activePanelId = resolvedActiveTabId ? getPanelDomId(resolvedActiveTabId) : undefined;
  const activeTabDomId = resolvedActiveTabId ? getTabDomId(resolvedActiveTabId) : undefined;
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
        <div className={styles.subTabs} role="tablist" aria-label={`${title} sections`}>
          {subTabs!.map((tab) => {
            const isActive = tab.id === resolvedActiveTabId;
            return (
              <button
                key={tab.id}
                ref={(node) => setTabRef(tab.id, node)}
                id={getTabDomId(tab.id)}
                onClick={() => handleSelect(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                className={`${styles.subTabButton} ${isActive ? styles.subTabButtonActive : ""}`.trim()}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={getPanelDomId(tab.id)}
                tabIndex={isActive ? 0 : -1}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {hasContent ? (
        <div
          className={styles.content}
          {...(hasSubTabs
            ? {
                id: activePanelId,
                role: "tabpanel" as const,
                "aria-labelledby": activeTabDomId,
                tabIndex: 0,
              }
            : {})}
        >
          {loading ? <div className={styles.loading}>Loading...</div> : children ?? null}
        </div>
      ) : null}
    </div>
  );
}
