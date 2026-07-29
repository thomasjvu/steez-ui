import React from "react";

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
  const isControlled = typeof activeTab === "string";
  const initialTabId = defaultTab || activeTab || tabs[0]?.id || "";
  const [internalTabId, setInternalTabId] = React.useState(initialTabId);
  const currentTabId = isControlled ? activeTab || tabs[0]?.id || "" : internalTabId;
  const currentTab = tabs.find((tab) => tab.id === currentTabId) ?? tabs[0];

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
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`.trim()}
              onClick={() => handleSelect(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={`${styles.panel} ${panelClassName}`.trim()} role="tabpanel">
        <div className={styles.panelBody}>{currentTab?.content ?? currentTab?.panel ?? null}</div>
      </div>
    </div>
  );
}
