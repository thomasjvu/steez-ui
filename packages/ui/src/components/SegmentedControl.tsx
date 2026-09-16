"use client";

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
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div
        className={`${styles.track} ${compact ? styles.trackCompact : ""}`.trim()}
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
              className={`${styles.option} ${isActive ? styles.optionActive : ""} ${compact ? styles.optionCompact : ""}`.trim()}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
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
