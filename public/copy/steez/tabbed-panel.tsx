/**
 * Standalone Steez UI copy of Tabbed Panel.
 *
 * Generated from packages/ui/src/components/TabbedPanel.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useCallback, useId, useRef } from "react";
import type { KeyboardEvent } from "react";

const __styles_steez_tabbed_panel_0: Record<string, string> = {
  "tabList": "steez-tabbed-panel-0-tabList",
  "panel": "steez-tabbed-panel-0-panel",
  "panelBody": "steez-tabbed-panel-0-panelBody",
};

const __styles_steez_tabbed_panel_1: Record<string, string> = {
  "root": "steez-tabbed-panel-1-root",
  "header": "steez-tabbed-panel-1-header",
  "label": "steez-tabbed-panel-1-label",
  "hint": "steez-tabbed-panel-1-hint",
  "tabs": "steez-tabbed-panel-1-tabs",
  "tab": "steez-tabbed-panel-1-tab",
  "tabActive": "steez-tabbed-panel-1-tabActive",
  "panel": "steez-tabbed-panel-1-panel",
  "panelBody": "steez-tabbed-panel-1-panelBody",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/TabList.module.css */
.steez-tabbed-panel-0-tabList {
  position: relative;
}

.steez-tabbed-panel-0-panel {
  min-width: 0;
}

.steez-tabbed-panel-0-panelBody {
  min-width: 0;
}


/* packages/ui/src/components/TabbedPanel.module.css */
.steez-tabbed-panel-1-root {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.steez-tabbed-panel-1-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.steez-tabbed-panel-1-label {
  color: var(--text-primary, #cbcbcc);
  font-size: 0.875rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.steez-tabbed-panel-1-hint {
  color: var(--text-secondary, #999999);
  font-size: 0.8125rem;
}

.steez-tabbed-panel-1-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
}

.steez-tabbed-panel-1-tab {
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: transparent;
  color: var(--text-secondary, #999999);
  padding: 0.5rem 0.875rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
}

.steez-tabbed-panel-1-tabActive {
  background: var(--interactive-primary-bg, #cbcbcc);
  color: var(--interactive-primary-fg, #010607);
  border-color: var(--interactive-primary-border, #cbcbcc);
}

.steez-tabbed-panel-1-panel {
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 88%, transparent);
  padding: 1rem;
}

.steez-tabbed-panel-1-panelBody {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
`;
const __steezStandaloneStyleKey = "tabbed-panel";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

export interface RovingTabItem {
  id: string;
  disabled?: boolean;
}

export interface UseRovingTabsOptions<T extends RovingTabItem> {
  tabs: readonly T[];
  onSelect: (tabId: string) => void;
}

/**
 * Provides the shared keyboard and focus behavior for tab lists that use a
 * roving tab index. Disabled tabs are omitted from keyboard navigation.
 */
export function useRovingTabs<T extends RovingTabItem>({
  tabs,
  onSelect,
}: UseRovingTabsOptions<T>) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const focusTab = useCallback((tabId: string) => {
    tabRefs.current.get(tabId)?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
      const enabledTabs = tabs.filter((tab) => !tab.disabled);
      const currentIndex = enabledTabs.findIndex((tab) => tab.id === tabId);

      if (currentIndex === -1 || enabledTabs.length === 0) {
        return;
      }

      let nextIndex: number | undefined;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex =
            (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
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

      const nextTab = enabledTabs[nextIndex];
      if (!nextTab) {
        return;
      }

      event.preventDefault();
      onSelect(nextTab.id);
      queueMicrotask(() => focusTab(nextTab.id));
    },
    [focusTab, onSelect, tabs],
  );

  const setTabRef = useCallback(
    (tabId: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabRefs.current.set(tabId, element);
      } else {
        tabRefs.current.delete(tabId);
      }
    },
    [],
  );

  return { handleKeyDown, setTabRef };
}

export function useStableId(prefix: string, explicitId?: string): string {
  const reactId = useId().replace(/:/g, "");
  return explicitId || `${prefix}-${reactId}`;
}

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
        className={`${__styles_steez_tabbed_panel_0.tabList} ${tabListClassName}`.trim()}
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
          className={`${__styles_steez_tabbed_panel_0.panel} ${panelClassName}`.trim()}
          role="tabpanel"
          aria-labelledby={activeTabDomId}
          tabIndex={0}
        >
          {panelBodyClassName ? (
            <div className={`${__styles_steez_tabbed_panel_0.panelBody} ${panelBodyClassName}`.trim()}>
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
    <div className={`${__styles_steez_tabbed_panel_1.root} ${className}`.trim()}>
      {label || hint ? (
        <div className={__styles_steez_tabbed_panel_1.header}>
          {label ? <div className={__styles_steez_tabbed_panel_1.label}>{label}</div> : null}
          {hint ? <div className={__styles_steez_tabbed_panel_1.hint}>{hint}</div> : null}
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
        tabListClassName={`${__styles_steez_tabbed_panel_1.tabs} ${navClassName}`}
        tabClassName={__styles_steez_tabbed_panel_1.tab}
        activeTabClassName={__styles_steez_tabbed_panel_1.tabActive}
        panelClassName={`${__styles_steez_tabbed_panel_1.panel} ${panelClassName}`}
        panelBodyClassName={__styles_steez_tabbed_panel_1.panelBody}
        ariaLabel={ariaLabel || label}
        panelContent={currentTab?.content ?? currentTab?.panel ?? null}
      />
    </div>
  );
}
