/**
 * Standalone Steez UI copy of Segmented Control.
 *
 * Generated from packages/ui/src/components/SegmentedControl.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const __styles_steez_segmented_control_0: Record<string, string> = {
  "wrapper": "steez-segmented-control-0-wrapper",
  "label": "steez-segmented-control-0-label",
  "hint": "steez-segmented-control-0-hint",
  "track": "steez-segmented-control-0-track",
  "trackCompact": "steez-segmented-control-0-trackCompact",
  "option": "steez-segmented-control-0-option",
  "optionCompact": "steez-segmented-control-0-optionCompact",
  "optionActive": "steez-segmented-control-0-optionActive",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/SegmentedControl.module.css */
.steez-segmented-control-0-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steez-segmented-control-0-label {
  color: var(--text-primary, #cbcbcc);
  font-size: 0.875rem;
  font-weight: 500;
}

.steez-segmented-control-0-hint {
  color: var(--text-secondary, #999999);
  font-size: 0.75rem;
}

.steez-segmented-control-0-track {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  background: color-mix(in srgb, var(--bg-secondary, #0a0a0a) 85%, transparent);
  border-radius: 999px;
}

.steez-segmented-control-0-trackCompact {
  padding: 2px;
}

.steez-segmented-control-0-option {
  border: none;
  background: transparent;
  color: var(--text-secondary, #999999);
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: color var(--transition-fast, 150ms ease), background-color var(--transition-fast, 150ms ease);
}

.steez-segmented-control-0-optionCompact {
  padding: 0.35rem 0.7rem;
}

.steez-segmented-control-0-optionActive {
  background: var(--interactive-primary-bg, #cbcbcc);
  color: var(--interactive-primary-fg, #010607);
}

`;
const __steezStandaloneStyleKey = "segmented-control";

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

/** Selection fallback is derived without emitting changes during rendering or effects. */
export function useTabSelection<T extends RovingTabItem>({
  tabs, value, defaultValue, onValueChange,
}: {
  tabs: readonly T[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const requested = value !== undefined ? value : internalValue;
  const selected = tabs.find((tab) => tab.id === requested && !tab.disabled)
    ?? tabs.find((tab) => !tab.disabled);
  const select = useCallback((id: string) => {
    if (id === selected?.id || !tabs.some((tab) => tab.id === id && !tab.disabled)) return;
    if (value === undefined) setInternalValue(id);
    onValueChange?.(id);
  }, [onValueChange, selected?.id, tabs, value]);
  return { selected, select };
}

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  value?: string;
  defaultValue?: string;
  options: SegmentedControlOption[];
  onValueChange?: (value: string) => void;
  label?: string;
  hint?: string;
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
}

export function SegmentedControl({
  value,
  defaultValue,
  options,
  onValueChange,
  label,
  hint,
  ariaLabel,
  className = "",
  compact = false,
}: SegmentedControlProps) {
  const items = options.map(option => ({ ...option, id: option.value }));
  const { selected, select } = useTabSelection({
    tabs: items, value, defaultValue, onValueChange: onValueChange,
  });
  const { setTabRef, handleKeyDown } = useRovingTabs({ tabs: items, onSelect: select });

  return (
    <div className={`${__styles_steez_segmented_control_0.wrapper} ${className}`.trim()}>
      {label ? <div className={__styles_steez_segmented_control_0.label}>{label}</div> : null}
      <div
        className={`${__styles_steez_segmented_control_0.track} ${compact ? __styles_steez_segmented_control_0.trackCompact : ""}`.trim()}
        role="radiogroup"
        aria-label={ariaLabel || label}
      >
        {options.map((option) => {
          const isActive = option.value === selected?.id;
          return (
            <button
              key={option.value}
              ref={(node) => setTabRef(option.value, node)}
              type="button"
              disabled={option.disabled}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`${__styles_steez_segmented_control_0.option} ${isActive ? __styles_steez_segmented_control_0.optionActive : ""} ${compact ? __styles_steez_segmented_control_0.optionCompact : ""}`.trim()}
              onClick={() => select(option.value)}
              onKeyDown={(event) => handleKeyDown(event, option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint ? <div className={__styles_steez_segmented_control_0.hint}>{hint}</div> : null}
    </div>
  );
}
