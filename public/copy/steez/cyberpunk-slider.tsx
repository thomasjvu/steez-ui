/**
 * Standalone Steez UI copy of Cyberpunk Slider.
 *
 * Generated from packages/ui/src/components/CyberpunkSlider.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

const __styles_steez_cyberpunk_slider_0: Record<string, string> = {
  "wrapper": "steez-cyberpunk-slider-0-wrapper",
  "label": "steez-cyberpunk-slider-0-label",
  "sliderContainer": "steez-cyberpunk-slider-0-sliderContainer",
  "track": "steez-cyberpunk-slider-0-track",
  "trackBase": "steez-cyberpunk-slider-0-trackBase",
  "fill": "steez-cyberpunk-slider-0-fill",
  "slider": "steez-cyberpunk-slider-0-slider",
  "value": "steez-cyberpunk-slider-0-value",
  "helperText": "steez-cyberpunk-slider-0-helperText",
  "hasError": "steez-cyberpunk-slider-0-hasError",
  "errorText": "steez-cyberpunk-slider-0-errorText",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkSlider.module.css */
.steez-cyberpunk-slider-0-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steez-cyberpunk-slider-0-label {
  font-size: 0.875rem;
  color: var(--text-primary, #cbcbcc);
  font-weight: 500;
}

.steez-cyberpunk-slider-0-sliderContainer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.steez-cyberpunk-slider-0-track {
  --thumb-size: 28px;
  position: relative;
  flex: 1;
  height: 32px;
  display: flex;
  align-items: center;
}

.steez-cyberpunk-slider-0-trackBase {
  position: absolute;
  inset-inline: 0;
  height: var(--thumb-size);
  border: 2px solid var(--border, #2a2a2a);
  border-radius: calc(var(--thumb-size) / 2);
  background: var(--bg-primary, #010607);
  pointer-events: none;
  transition: border-color var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-slider-0-fill {
  position: absolute;
  left: 0;
  height: var(--thumb-size);
  border-radius: calc(var(--thumb-size) / 2);
  background: var(--success, #00ff88);
  /* Meet the thumb center at every value — no gap, no overshoot past the knob. */
  width: calc(
    (var(--thumb-size) / 2) +
      (100% - var(--thumb-size)) * var(--slider-percentage, 0) / 100
  );
  pointer-events: none;
  transition: width var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-slider-0-slider {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
}

.steez-cyberpunk-slider-0-slider::-webkit-slider-runnable-track {
  height: var(--thumb-size);
  background: transparent;
  border: none;
}

.steez-cyberpunk-slider-0-slider::-webkit-slider-thumb {
  appearance: none;
  width: var(--thumb-size);
  height: var(--thumb-size);
  margin-top: 0;
  border-radius: 50%;
  background: var(--success, #00ff88);
  cursor: pointer;
  border: 2px solid color-mix(in srgb, var(--success, #00ff88) 35%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
  transition: box-shadow var(--transition-fast, 150ms ease), border-color var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-slider-0-slider::-moz-range-track {
  height: var(--thumb-size);
  background: transparent;
  border: none;
}

.steez-cyberpunk-slider-0-slider::-moz-range-thumb {
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background: var(--success, #00ff88);
  cursor: pointer;
  border: 2px solid color-mix(in srgb, var(--success, #00ff88) 35%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
  transition: box-shadow var(--transition-fast, 150ms ease), border-color var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-slider-0-track:hover .steez-cyberpunk-slider-0-trackBase {
  border-color: var(--success, #00ff88);
}

.steez-cyberpunk-slider-0-slider:focus-visible {
  box-shadow: none;
}

.steez-cyberpunk-slider-0-slider:focus-visible::-webkit-slider-thumb {
  box-shadow:
    0 0 0 2px var(--bg-primary, #010607),
    0 0 0 4px color-mix(in srgb, var(--success, #00ff88) 55%, transparent),
    0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
}

.steez-cyberpunk-slider-0-slider:focus-visible::-moz-range-thumb {
  box-shadow:
    0 0 0 2px var(--bg-primary, #010607),
    0 0 0 4px color-mix(in srgb, var(--success, #00ff88) 55%, transparent),
    0 0 10px color-mix(in srgb, var(--success, #00ff88) 40%, transparent);
}

.steez-cyberpunk-slider-0-slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.steez-cyberpunk-slider-0-track:has(.steez-cyberpunk-slider-0-slider:disabled) .steez-cyberpunk-slider-0-fill,
.steez-cyberpunk-slider-0-track:has(.steez-cyberpunk-slider-0-slider:disabled) .steez-cyberpunk-slider-0-trackBase {
  opacity: 0.5;
}

.steez-cyberpunk-slider-0-value {
  font-size: 0.875rem;
  color: var(--success, #00ff88);
  font-weight: 600;
  min-width: 3rem;
  text-align: center;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-cyberpunk-slider-0-helperText {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-cyberpunk-slider-0-hasError .steez-cyberpunk-slider-0-label {
  color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-slider-0-hasError .steez-cyberpunk-slider-0-trackBase {
  border-color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-slider-0-errorText {
  margin-top: 0.35rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8rem;
  color: var(--danger, #ff5c5c);
  line-height: 1.3;
}

@media (prefers-reduced-motion: reduce) {
  .steez-cyberpunk-slider-0-fill,
  .steez-cyberpunk-slider-0-trackBase,
  .steez-cyberpunk-slider-0-slider::-webkit-slider-thumb,
  .steez-cyberpunk-slider-0-slider::-moz-range-thumb {
    transition: none;
  }
}
`;
const __steezStandaloneStyleKey = "cyberpunk-slider";

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

export function useStableId(prefix: string, explicitId?: string): string {
  const reactId = useId().replace(/:/g, "");
  return explicitId || `${prefix}-${reactId}`;
}

export interface UseFieldDescriptionOptions {
  prefix: string;
  helperText?: string;
  error?: string;
  describedBy?: string;
}

export interface FieldDescriptionState {
  errorId: string;
  hasError: boolean;
  helperId: string;
  describedBy: string | undefined;
}

/**
 * Builds stable helper/error IDs and merges them with a consumer's
 * aria-describedby value without dropping any referenced description.
 */
export function useFieldDescription({
  prefix,
  helperText,
  error,
  describedBy: consumerDescribedBy,
}: UseFieldDescriptionOptions): FieldDescriptionState {
  const helperId = useStableId(`${prefix}-helper`);
  const errorId = useStableId(`${prefix}-error`);
  const hasError = Boolean(error);
  const describedBy = [
    consumerDescribedBy,
    helperText ? helperId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return { errorId, hasError, helperId, describedBy };
}

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
    <div className={`${__styles_steez_cyberpunk_slider_0.wrapper} ${hasError ? __styles_steez_cyberpunk_slider_0.hasError : ""} ${className}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className={__styles_steez_cyberpunk_slider_0.label}>
          {label}
        </label>
      ) : null}
      <div className={__styles_steez_cyberpunk_slider_0.sliderContainer}>
        <div
          className={__styles_steez_cyberpunk_slider_0.track}
          style={
            {
              ["--slider-percentage" as string]: percentage,
            } as React.CSSProperties
          }
        >
          <div className={__styles_steez_cyberpunk_slider_0.trackBase} aria-hidden="true" />
          <div className={__styles_steez_cyberpunk_slider_0.fill} aria-hidden="true" />
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            className={__styles_steez_cyberpunk_slider_0.slider}
            {...props}
            aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
            aria-describedby={describedBy}
          />
        </div>
        {showValue ? <span className={__styles_steez_cyberpunk_slider_0.value}>{value}</span> : null}
      </div>
      {helperText ? (
        <div id={helperId} className={__styles_steez_cyberpunk_slider_0.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={__styles_steez_cyberpunk_slider_0.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
