"use client";

import React from "react";

import styles from "./TabList.module.css";

export interface TabListRecord {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabListProps {
  tabs: readonly TabListRecord[];
  activeTabId?: string;
  getTabDomId: (tabId: string) => string;
  getPanelDomId: (tabId: string) => string;
  setTabRef: (tabId: string, element: HTMLButtonElement | null) => void;
  onSelect: (tabId: string) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string,
  ) => void;
  tabListClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  panelClassName?: string;
  panelBodyClassName?: string;
  ariaLabel?: string;
  panelContent?: React.ReactNode;
  renderPanel?: boolean;
}

/**
 * Shared private tab list and panel renderer. Consumers own selection state,
 * ids, roving focus behavior, and variant-specific classes.
 */
export function TabList({
  tabs,
  activeTabId,
  getTabDomId,
  getPanelDomId,
  setTabRef,
  onSelect,
  onKeyDown,
  tabListClassName = "",
  tabClassName = "",
  activeTabClassName = "",
  panelClassName = "",
  panelBodyClassName = "",
  ariaLabel,
  panelContent,
  renderPanel = true,
}: TabListProps) {
  const resolvedActiveTabId =
    activeTabId || tabs[0]?.id || "";
  const activeTab = tabs.find((tab) => tab.id === resolvedActiveTabId);
  const activePanelId = activeTab ? getPanelDomId(activeTab.id) : undefined;
  const activeTabDomId = activeTab ? getTabDomId(activeTab.id) : undefined;

  return (
    <>
      <div
        className={`${styles.tabList} ${tabListClassName}`.trim()}
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;
          return (
            <button
              key={tab.id}
              ref={(node) => setTabRef(tab.id, node)}
              id={getTabDomId(tab.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={getPanelDomId(tab.id)}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              className={`${tabClassName} ${isActive ? activeTabClassName : ""}`.trim()}
              onClick={() => onSelect(tab.id)}
              onKeyDown={(event) => onKeyDown(event, tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {renderPanel ? (
        <div
          id={activePanelId}
          className={`${styles.panel} ${panelClassName}`.trim()}
          role="tabpanel"
          aria-labelledby={activeTabDomId}
          tabIndex={0}
        >
          {panelBodyClassName ? (
            <div className={`${styles.panelBody} ${panelBodyClassName}`.trim()}>
              {panelContent}
            </div>
          ) : (
            panelContent
          )}
        </div>
      ) : null}
    </>
  );
}
