import React from "react";

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
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

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

  const focusTab = React.useCallback((tabId: string) => {
    tabRefs.current.get(tabId)?.focus();
  }, []);

  const handleTabKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
      const enabledTabs = tabs.filter((tab) => !tab.disabled);
      if (!enabledTabs.length) {
        return;
      }

      const currentIndex = enabledTabs.findIndex((tab) => tab.id === tabId);
      if (currentIndex === -1) {
        return;
      }

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = enabledTabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextTabId = enabledTabs[nextIndex]!.id;
      handleSelect(nextTabId);
      // Focus after selection so roving tabIndex updates before focus lands.
      queueMicrotask(() => focusTab(nextTabId));
    },
    [focusTab, handleSelect, tabs],
  );

  const setTabRef = React.useCallback((tabId: string, node: HTMLButtonElement | null) => {
    if (node) {
      tabRefs.current.set(tabId, node);
    } else {
      tabRefs.current.delete(tabId);
    }
  }, []);

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
