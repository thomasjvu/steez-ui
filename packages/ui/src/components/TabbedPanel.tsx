"use client";

import React from "react";

import { useRovingTabs } from "../hooks/useRovingTabs.js";
import { useStableId } from "../hooks/useStableId.js";
import styles from "./TabbedPanel.module.css";

export interface TabbedPanelTab {
  id: string;
  label: string;
  content?: React.ReactNode;
  panel?: React.ReactNode;
  disabled?: boolean;
}

export interface TabbedPanelProps {
  tabs: TabbedPanelTab[];
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  onChange?: (tabId: string) => void;
  label?: string;
  hint?: string;
  ariaLabel?: string;
  className?: string;
  navClassName?: string;
  panelClassName?: string;
}

export function TabbedPanel({
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  onChange,
  label,
  hint,
  ariaLabel,
  className = "",
  navClassName = "",
  panelClassName = "",
}: TabbedPanelProps) {
  const baseId = useStableId("tabbed-panel");
  const isControlled = typeof activeTab === "string";
  const initialTabId = defaultTab || activeTab || tabs[0]?.id || "";
  const [internalTabId, setInternalTabId] = React.useState(initialTabId);
  const currentTabId = isControlled ? activeTab || tabs[0]?.id || "" : internalTabId;
  const currentTab = tabs.find((tab) => tab.id === currentTabId) ?? tabs[0];

  const getTabDomId = React.useCallback(
    (tabId: string) => `${baseId}-tab-${tabId}`,
    [baseId],
  );
  const getPanelDomId = React.useCallback(
    (tabId: string) => `${baseId}-panel-${tabId}`,
    [baseId],
  );

  React.useEffect(() => {
    if (!tabs.length) {
      return;
    }

    if (tabs.some((tab) => tab.id === currentTabId)) {
      return;
    }

    const fallbackTabId = defaultTab || activeTab || tabs[0]?.id || "";
    if (!isControlled) {
      setInternalTabId(fallbackTabId);
    }
    onTabChange?.(fallbackTabId);
    onChange?.(fallbackTabId);
  }, [activeTab, currentTabId, defaultTab, isControlled, onChange, onTabChange, tabs]);

  const handleSelect = React.useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalTabId(tabId);
      }
      onTabChange?.(tabId);
      onChange?.(tabId);
    },
    [isControlled, onChange, onTabChange],
  );
  const { handleKeyDown: handleTabKeyDown, setTabRef } = useRovingTabs({
    tabs,
    onSelect: handleSelect,
  });

  const activePanelId = currentTab ? getPanelDomId(currentTab.id) : undefined;
  const activeTabDomId = currentTab ? getTabDomId(currentTab.id) : undefined;

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {label || hint ? (
        <div className={styles.header}>
          {label ? <div className={styles.label}>{label}</div> : null}
          {hint ? <div className={styles.hint}>{hint}</div> : null}
        </div>
      ) : null}
      <div className={`${styles.tabs} ${navClassName}`.trim()} role="tablist" aria-label={ariaLabel || label}>
        {tabs.map((tab) => {
          const isActive = tab.id === currentTab?.id;
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
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`.trim()}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={activePanelId}
        className={`${styles.panel} ${panelClassName}`.trim()}
        role="tabpanel"
        aria-labelledby={activeTabDomId}
        tabIndex={0}
      >
        <div className={styles.panelBody}>{currentTab?.content ?? currentTab?.panel ?? null}</div>
      </div>
    </div>
  );
}
