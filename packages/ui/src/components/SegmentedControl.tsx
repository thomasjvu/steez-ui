"use client";

import React from "react";

import { useRovingTabs, useTabSelection } from "../hooks/useRovingTabs.ts";

import styles from "./SegmentedControl.module.css";

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
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div
        className={`${styles.track} ${compact ? styles.trackCompact : ""}`.trim()}
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
              className={`${styles.option} ${isActive ? styles.optionActive : ""} ${compact ? styles.optionCompact : ""}`.trim()}
              onClick={() => select(option.value)}
              onKeyDown={(event) => handleKeyDown(event, option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}
