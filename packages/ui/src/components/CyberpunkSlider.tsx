import React, { InputHTMLAttributes } from "react";

import { useStableId } from "../hooks/useStableId.js";
import styles from "./CyberpunkSlider.module.css";

export interface CyberpunkSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "helperText"> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  helperText?: string;
}

/** Fill percentage for the track; 0 when max===min or non-finite. Clamped to [0, 100]. */
export function sliderPercentage(
  value: number | string,
  min: number,
  max: number,
): number {
  const range = max - min;
  const percentage = range === 0 ? 0 : ((Number(value) - min) / range) * 100;
  return Number.isFinite(percentage)
    ? Math.min(100, Math.max(0, percentage))
    : 0;
}

export function CyberpunkSlider({
  label,
  className = "",
  id,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  value = 0,
  helperText,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CyberpunkSliderProps) {
  const inputId = useStableId("slider", id);
  const helperId = useStableId("slider-helper");
  const percentage = sliderPercentage(value as number | string, min, max);
  const describedBy =
    [ariaDescribedBy, helperText ? helperId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.sliderContainer}>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={styles.slider}
          style={
            {
              ["--slider-percentage" as string]: `${percentage}%`,
            } as React.CSSProperties
          }
          {...props}
          aria-describedby={describedBy}
        />
        {showValue ? <span className={styles.value}>{value}</span> : null}
      </div>
      {helperText ? (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
