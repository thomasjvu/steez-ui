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

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  value: string;
  options: SegmentedControlOption[];
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
}

export function SegmentedControl({
  value,
  options,
  onChange,
  label,
  hint,
  ariaLabel,
  className = "",
  compact = false,
}: SegmentedControlProps) {
  const optionRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const setOptionRef = React.useCallback((optionValue: string, node: HTMLButtonElement | null) => {
    if (node) {
      optionRefs.current.set(optionValue, node);
    } else {
      optionRefs.current.delete(optionValue);
    }
  }, []);

  const focusOption = React.useCallback((optionValue: string) => {
    optionRefs.current.get(optionValue)?.focus();
  }, []);

  const handleOptionKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, optionValue: string) => {
      if (!options.length) {
        return;
      }

      const currentIndex = options.findIndex((option) => option.value === optionValue);
      if (currentIndex === -1) {
        return;
      }

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % options.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + options.length) % options.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = options.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextValue = options[nextIndex]!.value;
      onChange(nextValue);
      queueMicrotask(() => focusOption(nextValue));
    },
    [focusOption, onChange, options],
  );

  return (
    <div className={`${__styles_steez_segmented_control_0.wrapper} ${className}`.trim()}>
      {label ? <div className={__styles_steez_segmented_control_0.label}>{label}</div> : null}
      <div
        className={`${__styles_steez_segmented_control_0.track} ${compact ? __styles_steez_segmented_control_0.trackCompact : ""}`.trim()}
        role="radiogroup"
        aria-label={ariaLabel || label}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              ref={(node) => setOptionRef(option.value, node)}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`${__styles_steez_segmented_control_0.option} ${isActive ? __styles_steez_segmented_control_0.optionActive : ""} ${compact ? __styles_steez_segmented_control_0.optionCompact : ""}`.trim()}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
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
