"use client";

import React from "react";

import { useRovingTabs } from "../hooks/useRovingTabs.ts";
import { useStableId } from "../hooks/useStableId.ts";
import { TabList } from "./TabList.tsx";
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

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {label || hint ? (
        <div className={styles.header}>
          {label ? <div className={styles.label}>{label}</div> : null}
          {hint ? <div className={styles.hint}>{hint}</div> : null}
        </div>
      ) : null}
      <TabList
        tabs={tabs}
        activeTabId={currentTab?.id}
        getTabDomId={getTabDomId}
        getPanelDomId={getPanelDomId}
        setTabRef={setTabRef}
        onSelect={handleSelect}
        onKeyDown={handleTabKeyDown}
        tabListClassName={`${styles.tabs} ${navClassName}`}
        tabClassName={styles.tab}
        activeTabClassName={styles.tabActive}
        panelClassName={`${styles.panel} ${panelClassName}`}
        panelBodyClassName={styles.panelBody}
        ariaLabel={ariaLabel || label}
        panelContent={currentTab?.content ?? currentTab?.panel ?? null}
      />
    </div>
  );
}
