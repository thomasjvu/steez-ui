import React from "react";

import styles from "./SegmentedControl.module.css";

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
  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div
        className={`${styles.track} ${compact ? styles.trackCompact : ""}`.trim()}
        role="tablist"
        aria-label={ariaLabel || label}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.option} ${isActive ? styles.optionActive : ""} ${compact ? styles.optionCompact : ""}`.trim()}
              onClick={() => onChange(option.value)}
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

