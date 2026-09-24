"use client";

import React, { InputHTMLAttributes } from "react";

import { useFieldDescription } from "../hooks/useFieldDescription.ts";
import { useStableId } from "../hooks/useStableId.ts";
import styles from "./CyberpunkSlider.module.css";

export interface CyberpunkSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "helperText"> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  helperText?: string;
  error?: string;
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
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkSliderProps) {
  const inputId = useStableId("slider", id);
  const percentage = sliderPercentage(value as number | string, min, max);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "slider",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div className={`${styles.wrapper} ${hasError ? styles.hasError : ""} ${className}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.sliderContainer}>
        <div
          className={styles.track}
          style={
            {
              ["--slider-percentage" as string]: percentage,
            } as React.CSSProperties
          }
        >
          <div className={styles.trackBase} aria-hidden="true" />
          <div className={styles.fill} aria-hidden="true" />
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            className={styles.slider}
            {...props}
            aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
            aria-describedby={describedBy}
          />
        </div>
        {showValue ? <span className={styles.value}>{value}</span> : null}
      </div>
      {helperText ? (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={styles.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
