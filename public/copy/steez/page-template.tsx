/**
 * Standalone Steez UI copy of Page Template.
 *
 * Generated from packages/ui/src/components/PageTemplate.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { createContext, useCallback, useContext, useId, useRef } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode, SVGProps } from "react";

const __styles_steez_page_template_0: Record<string, string> = {
  "header": "steez-page-template-0-header",
  "headerRow": "steez-page-template-0-headerRow",
  "brandCluster": "steez-page-template-0-brandCluster",
  "brandButton": "steez-page-template-0-brandButton",
  "brandVisual": "steez-page-template-0-brandVisual",
  "headerContent": "steez-page-template-0-headerContent",
  "titleIcon": "steez-page-template-0-titleIcon",
  "headerExtra": "steez-page-template-0-headerExtra",
  "iconButton": "steez-page-template-0-iconButton",
};

const __styles_steez_page_template_1: Record<string, string> = {
  "root": "steez-page-template-1-root",
  "header": "steez-page-template-1-header",
  "subTabs": "steez-page-template-1-subTabs",
  "subTabButton": "steez-page-template-1-subTabButton",
  "subTabButtonActive": "steez-page-template-1-subTabButtonActive",
  "content": "steez-page-template-1-content",
  "loading": "steez-page-template-1-loading",
};

const __styles_steez_page_template_2: Record<string, string> = {
  "tabList": "steez-page-template-2-tabList",
  "panel": "steez-page-template-2-panel",
  "panelBody": "steez-page-template-2-panelBody",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/PageHeader.module.css */
.steez-page-template-0-header {
  padding: 16px 24px;
  background: var(--bg-secondary, #0a0a0a);
}

.steez-page-template-0-headerRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.steez-page-template-0-brandCluster {
  display: flex;
  align-items: center;
  gap: 12px;
}

.steez-page-template-0-brandButton {
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.steez-page-template-0-brandButton:focus-visible {
  outline: 2px solid var(--color-border-hover, #3a3a3a);
  outline-offset: 2px;
  border-radius: 6px;
}

.steez-page-template-0-brandVisual {
  height: 48px;
  width: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default, #2a2a2a);
  border-radius: 6px;
  color: var(--text-primary, #cbcbcc);
  background: color-mix(in srgb, var(--bg-primary, #010607) 90%, transparent);
}

.steez-page-template-0-headerContent {
  line-height: normal;
}

.steez-page-template-0-headerContent h2 {
  margin: 0;
  font-size: 32px;
  font-weight: 400;
  font-family: var(--font-display, "BBH Bartle", "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  letter-spacing: 0.03em;
  color: var(--color-text-primary, #cbcbcc);
}

.steez-page-template-0-titleIcon {
  display: inline-flex;
  margin-right: 8px;
  vertical-align: middle;
}

.steez-page-template-0-headerContent p {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary, #999999);
}

.steez-page-template-0-headerExtra {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.steez-page-template-0-iconButton {
  border: none;
  background: transparent;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: var(--color-text-secondary, #999999);
  transition: color var(--transition-fast, 150ms ease);
}

.steez-page-template-0-iconButton:hover {
  color: var(--color-text-primary, #cbcbcc);
}

.steez-page-template-0-iconButton:focus-visible {
  outline: 2px solid var(--color-border-hover, #3a3a3a);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 767px) {
  .steez-page-template-0-header {
    padding: 12px 16px;
  }

  .steez-page-template-0-brandVisual {
    height: 32px;
    width: 32px;
  }

  .steez-page-template-0-headerContent h2 {
    font-size: 22px;
  }

  .steez-page-template-0-headerContent p {
    display: none;
  }
}



/* packages/ui/src/components/PageTemplate.module.css */
.steez-page-template-1-root {
  display: flex;
  flex-direction: column;
}

.steez-page-template-1-header {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.steez-page-template-1-subTabs {
  display: flex;
  gap: 4px;
  padding: 0 24px 16px;
  border-bottom: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  flex-shrink: 0;
}

.steez-page-template-1-subTabButton {
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary, #999999);
  cursor: pointer;
  font-size: 13px;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all var(--transition-fast, 150ms ease);
}

.steez-page-template-1-subTabButtonActive {
  border-bottom-color: var(--accent-primary, #ee1401);
  color: var(--text-primary, #cbcbcc);
  font-weight: 800;
}

.steez-page-template-1-content {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.steez-page-template-1-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: var(--text-secondary, #999999);
}



/* packages/ui/src/components/TabList.module.css */
.steez-page-template-2-tabList {
  position: relative;
}

.steez-page-template-2-panel {
  min-width: 0;
}

.steez-page-template-2-panelBody {
  min-width: 0;
}
`;
const __steezStandaloneStyleKey = "page-template";

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

export interface SteezIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export type SteezIconName =
  | "copy"
  | "check"
  | "error"
  | "info"
  | "warning"
  | "refresh"
  | "close"
  | "menu"
  | "chevronLeft"
  | "sliders"
  | "eye"
  | "sun"
  | "moon"
  | "lightCross"
  | "github"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "companion"
  | "globe"
  | "integrationsTile"
  | "status"
  | "workflowsTile";

interface IconProviderValue {
  size: number;
  strokeWidth: number;
}

const DEFAULT_VALUE: IconProviderValue = {
  size: 16,
  strokeWidth: 2,
};

const IconProviderContext = createContext<IconProviderValue>(DEFAULT_VALUE);

export interface SteezIconProviderProps {
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}

export function SteezIconProvider({
  size = DEFAULT_VALUE.size,
  strokeWidth = DEFAULT_VALUE.strokeWidth,
  children,
}: SteezIconProviderProps) {
  return (
    <IconProviderContext.Provider value={{ size, strokeWidth }}>
      {children}
    </IconProviderContext.Provider>
  );
}

export function useSteezIconDefaults() {
  return useContext(IconProviderContext);
}

function createIcon(
  render: (
    props: Required<Pick<SteezIconProps, "width" | "height" | "color">> & SteezIconProps,
    strokeWidth: number,
  ) => React.ReactElement,
) {
  return function SteezIcon({
    width,
    height,
    color = "currentColor",
    ...props
  }: SteezIconProps) {
    const defaults = useSteezIconDefaults();
    return render(
      {
        width: width ?? defaults.size,
        height: height ?? defaults.size,
        color,
        ...props,
      },
      defaults.strokeWidth,
    );
  };
}

export const CopyIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
));

export const CheckIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
));

export const ErrorIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
));

export const InfoIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
));

export const WarningIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
));

export const RefreshIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
  </svg>
));

export const CloseIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));

export const MenuIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
));

export const ChevronLeftIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
));

export const SlidersIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
));

export const EyeIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));

export const SunIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
));

export const MoonIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
    style={style}
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
  </svg>
));

export const GlobeIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
));

export const CompanionIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="m12 2.8 2.5 5.06 5.58.81-4.04 3.94.95 5.56L12 15.55 7 18.17l.95-5.56-4.04-3.94 5.58-.81Z" />
  </svg>
));

export const StatusIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8Z" />
    <path d="M7 12h2.4l1.35-2.4 2.5 5 1.3-2.6H17" />
  </svg>
));

export const IntegrationsTileIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 12h4" />
    <path d="M14.5 10.6 16.7 8.4" />
    <path d="M14.5 13.4 16.7 15.6" />
  </svg>
));

export const WorkflowsTileIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M8 6h4a4 4 0 0 1 4 4v0" />
    <path d="M8 18h4a4 4 0 0 0 4-4v0" />
  </svg>
));

export function GitHubIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4c-.5-1.4-1.3-1.8-1.3-1.8c-1.1-.7.1-.7.1-.7c1.2.1 1.9 1.2 1.9 1.2c1.1 1.9 2.9 1.4 3.6 1.1c.1-.8.4-1.4.7-1.7c-2.6-.3-5.4-1.3-5.4-5.9c0-1.3.5-2.4 1.2-3.2c-.1-.3-.5-1.5.1-3.1c0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2c.7 1.6.3 2.8.1 3.1c.8.9 1.2 1.9 1.2 3.2c0 4.6-2.8 5.6-5.5 5.9c.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function TwitterIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function InstagramIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

export function YouTubeIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

export function TikTokIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      />
    </svg>
  );
}

export function LightCrossIcon({
  width = 116,
  height = 384,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 116 384"
      fill="none"
      className={className}
      style={style}
      {...props}
    >
      <path
        d="M35.84 60.42C40.6422 60.7874 45.1351 62.9314 48.4413 66.4336C51.7475 69.9358 53.6295 74.5446 53.72 79.36L57.71 383.88L61.71 79.36C61.8005 74.5446 63.6825 69.9358 66.9887 66.4336C70.2949 62.9314 74.7878 60.7873 79.59 60.42L115.43 57.69L78.35 54.88C73.7394 54.5319 69.4063 52.5427 66.1368 49.2732C62.8673 46.0037 60.8781 41.6706 60.53 37.06L57.71 2.52302e-06L54.89 37.06C54.5376 41.6708 52.5457 46.0029 49.2749 49.2718C46.0042 52.5407 41.671 54.5302 37.06 54.88L2.52171e-06 57.69L35.84 60.42Z"
        fill={color}
      />
    </svg>
  );
}

const ICONS: Record<SteezIconName, React.ComponentType<SteezIconProps>> = {
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  close: CloseIcon,
  companion: CompanionIcon,
  copy: CopyIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  github: GitHubIcon,
  globe: GlobeIcon,
  info: InfoIcon,
  instagram: InstagramIcon,
  integrationsTile: IntegrationsTileIcon,
  lightCross: LightCrossIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  refresh: RefreshIcon,
  sliders: SlidersIcon,
  status: StatusIcon,
  sun: SunIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
  warning: WarningIcon,
  workflowsTile: WorkflowsTileIcon,
  youtube: YouTubeIcon,
};

export interface IconProps extends SteezIconProps {
  icon: SteezIconName;
}

export function Icon({ icon, ...props }: IconProps) {
  const Component = ICONS[icon];
  return <Component {...props} />;
}

export interface PageHeaderProps {
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
}: PageHeaderProps) {
  const viewerLabel = viewerVisible ? viewerHideLabel : viewerShowLabel;

  return (
    <div className={`${__styles_steez_page_template_0.header} ${className}`.trim()}>
      <div className={__styles_steez_page_template_0.headerRow}>
        <div className={__styles_steez_page_template_0.brandCluster}>
          {brand || onBrandClick ? (
            <button
              type="button"
              className={__styles_steez_page_template_0.brandButton}
              onClick={onBrandClick}
              title={brandTitle}
              aria-label={brandAriaLabel}
            >
              <span className={__styles_steez_page_template_0.brandVisual}>{brand ?? title.slice(0, 1)}</span>
            </button>
          ) : null}
          <div className={__styles_steez_page_template_0.headerContent}>
            <h2>
              {icon ? (
                <span className={__styles_steez_page_template_0.titleIcon}>
                  <Icon icon={icon} width={18} height={18} />
                </span>
              ) : null}
              {title}
            </h2>
            {description ? <p>{description}</p> : null}
          </div>
        </div>
        <div className={__styles_steez_page_template_0.headerExtra}>
          {extra}
          {onBack ? (
            <button type="button" className={__styles_steez_page_template_0.iconButton} onClick={onBack} aria-label="Go back">
              <Icon icon="chevronLeft" width={18} height={18} />
            </button>
          ) : null}
          {onSettings ? (
            <button type="button" className={__styles_steez_page_template_0.iconButton} onClick={onSettings} aria-label="Open settings">
              <SlidersIcon width={18} height={18} />
            </button>
          ) : null}
          {onViewerToggle ? (
            <button
              type="button"
              className={__styles_steez_page_template_0.iconButton}
              onClick={onViewerToggle}
              aria-label={viewerLabel}
              title={viewerLabel}
            >
              <EyeIcon width={18} height={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
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
        className={`${__styles_steez_page_template_2.tabList} ${tabListClassName}`.trim()}
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
          className={`${__styles_steez_page_template_2.panel} ${panelClassName}`.trim()}
          role="tabpanel"
          aria-labelledby={activeTabDomId}
          tabIndex={0}
        >
          {panelBodyClassName ? (
            <div className={`${__styles_steez_page_template_2.panelBody} ${panelBodyClassName}`.trim()}>
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
    <div className={`${__styles_steez_page_template_1.root} ${className}`.trim()}>
      {showTitle ? (
        <div className={__styles_steez_page_template_1.header}>
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
          tabListClassName={__styles_steez_page_template_1.subTabs}
          tabClassName={__styles_steez_page_template_1.subTabButton}
          activeTabClassName={__styles_steez_page_template_1.subTabButtonActive}
          panelClassName={__styles_steez_page_template_1.content}
          ariaLabel={`${title} sections`}
          renderPanel={hasContent}
          panelContent={loading ? <div className={__styles_steez_page_template_1.loading}>Loading...</div> : children ?? null}
        />
      ) : hasContent ? (
        <div className={__styles_steez_page_template_1.content}>
          {loading ? <div className={__styles_steez_page_template_1.loading}>Loading...</div> : children ?? null}
        </div>
      ) : null}
    </div>
  );
}
