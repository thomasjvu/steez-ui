/**
 * Standalone Steez UI copy of Cyberpunk Select.
 *
 * Generated from packages/ui/src/components/CyberpunkSelect.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

const __styles_steez_cyberpunk_select_0: Record<string, string> = {
  "cyberSelect": "steez-cyberpunk-select-0-cyberSelect",
  "select": "steez-cyberpunk-select-0-select",
  "label": "steez-cyberpunk-select-0-label",
  "arrow": "steez-cyberpunk-select-0-arrow",
  "long": "steez-cyberpunk-select-0-long",
  "full": "steez-cyberpunk-select-0-full",
  "helperText": "steez-cyberpunk-select-0-helperText",
  "hasError": "steez-cyberpunk-select-0-hasError",
  "errorText": "steez-cyberpunk-select-0-errorText",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkSelect.module.css */
.steez-cyberpunk-select-0-cyberSelect {
  --select-width: 240px;
  --select-font-size: 1rem;
  --select-padding-top: 0.75rem;
  --select-padding-right: 2.5rem;
  --select-padding-bot: 0.75rem;
  --select-padding-left: 1rem;

  font-size: var(--select-font-size);
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  background: transparent;
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-radius: 6px;
  max-width: 100%;
  overflow: hidden;
  transition: all var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-select-0-select {
  width: var(--select-width);
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: inherit;
  font-weight: 500;
  background-color: transparent;
  padding: var(--select-padding-top) var(--select-padding-right) var(--select-padding-bot) var(--select-padding-left);
  border: none;
  outline: none;
  cursor: pointer;
  appearance: none;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
}

.steez-cyberpunk-select-0-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #999999);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.steez-cyberpunk-select-0-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary, #999999);
  z-index: 10;
  transition: color var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-select-0-label ~ .steez-cyberpunk-select-0-arrow {
  top: calc(50% + 0.875rem);
}

.steez-cyberpunk-select-0-long {
  --select-width: 360px;
}

.steez-cyberpunk-select-0-full {
  --select-width: 100%;
  width: 100%;
  max-width: 100%;
  display: block;
}

.steez-cyberpunk-select-0-full .steez-cyberpunk-select-0-select {
  max-width: 100%;
}

.steez-cyberpunk-select-0-cyberSelect:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}

.steez-cyberpunk-select-0-cyberSelect:hover .steez-cyberpunk-select-0-arrow {
  color: var(--text-primary, #cbcbcc);
}

.steez-cyberpunk-select-0-cyberSelect:focus-within {
  border-color: var(--accent-primary, #ee1401);
}

.steez-cyberpunk-select-0-cyberSelect:focus-within .steez-cyberpunk-select-0-arrow {
  color: var(--accent-primary, #ee1401);
}

.steez-cyberpunk-select-0-cyberSelect:has(select:disabled) {
  opacity: 0.5;
}

.steez-cyberpunk-select-0-cyberSelect select:disabled {
  color: var(--text-muted, #666666);
  cursor: not-allowed;
}

.steez-cyberpunk-select-0-cyberSelect select option {
  background-color: var(--bg-primary, #010607);
  color: var(--text-primary, #cbcbcc);
  padding: 0.5rem;
}

.steez-cyberpunk-select-0-helperText {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-cyberpunk-select-0-hasError .steez-cyberpunk-select-0-select {
  border-color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-select-0-hasError .steez-cyberpunk-select-0-label {
  color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-select-0-errorText {
  margin-top: 0.35rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8rem;
  color: var(--danger, #ff5c5c);
  line-height: 1.3;
}


`;
const __steezStandaloneStyleKey = "cyberpunk-select";

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

export interface CyberpunkSelectOption {
  value: string;
  label: string;
}

export interface CyberpunkSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "helperText"> {
  label?: string;
  variant?: "default" | "long" | "full";
  options?: CyberpunkSelectOption[];
  helperText?: string;
  error?: string;
}

export function CyberpunkSelect({
  label,
  variant = "default",
  options = [],
  className = "",
  id,
  value,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkSelectProps) {
  const selectId = useStableId("select", id);
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "select",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${__styles_steez_cyberpunk_select_0.cyberSelect} ${__styles_steez_cyberpunk_select_0[variant]} ${hasError ? __styles_steez_cyberpunk_select_0.hasError : ""} ${className}`.trim()}
    >
      {label ? (
        <label htmlFor={selectId} className={__styles_steez_cyberpunk_select_0.label}>
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={__styles_steez_cyberpunk_select_0.select}
        value={value}
        {...props}
        aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
        aria-describedby={describedBy}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={__styles_steez_cyberpunk_select_0.arrow}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {helperText ? (
        <div id={helperId} className={__styles_steez_cyberpunk_select_0.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={__styles_steez_cyberpunk_select_0.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
