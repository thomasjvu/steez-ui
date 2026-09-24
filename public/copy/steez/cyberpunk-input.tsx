/**
 * Standalone Steez UI copy of Cyberpunk Input.
 *
 * Generated from packages/ui/src/components/CyberpunkInput.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

const __styles_steez_cyberpunk_input_0: Record<string, string> = {
  "cyberInput": "steez-cyberpunk-input-0-cyberInput",
  "inputContainer": "steez-cyberpunk-input-0-inputContainer",
  "input": "steez-cyberpunk-input-0-input",
  "label": "steez-cyberpunk-input-0-label",
  "long": "steez-cyberpunk-input-0-long",
  "full": "steez-cyberpunk-input-0-full",
  "hasError": "steez-cyberpunk-input-0-hasError",
  "errorText": "steez-cyberpunk-input-0-errorText",
  "disabledContainer": "steez-cyberpunk-input-0-disabledContainer",
  "helperText": "steez-cyberpunk-input-0-helperText",
  "icon": "steez-cyberpunk-input-0-icon",
  "withIcon": "steez-cyberpunk-input-0-withIcon",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkInput.module.css */
.steez-cyberpunk-input-0-cyberInput {
  --input-width: 240px;
  --input-font-size: 1rem;
  --input-padding-top: 12px;
  --input-padding-right: 12px;
  --input-padding-bot: 12px;
  --input-padding-left: 12px;
  --focus-border-color: var(--color-accent-primary, var(--text-primary, #cbcbcc));
  --label-offset-top: -2px;
  --label-offset-left: 12px;
  --label-padding: 1px 8px;
  --label-font-size: 0.85rem;

  position: relative;
  margin-top: 10px;
  margin-bottom: 1rem;
  font-size: var(--input-font-size);
}

.steez-cyberpunk-input-0-inputContainer {
  position: relative;
  width: var(--input-width);
  border: 1px solid var(--color-border-default, #2a2a2a);
  background: var(--color-bg-tile, #0a0a0a);
  margin-top: 6px;
}

.steez-cyberpunk-input-0-input {
  width: 100%;
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: inherit;
  background: transparent;
  padding: var(--input-padding-top) var(--input-padding-right) var(--input-padding-bot) var(--input-padding-left);
  border: none;
  outline: none;
  box-sizing: border-box;
}

.steez-cyberpunk-input-0-cyberInput:focus-within .steez-cyberpunk-input-0-label {
  color: var(--focus-border-color);
}

.steez-cyberpunk-input-0-cyberInput:focus-within .steez-cyberpunk-input-0-inputContainer {
  border-color: var(--focus-border-color);
}

.steez-cyberpunk-input-0-label {
  position: absolute;
  top: var(--label-offset-top);
  left: var(--label-offset-left);
  background: var(--color-bg-tile, #0a0a0a);
  padding: var(--label-padding);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: var(--label-font-size);
  font-weight: 500;
  color: var(--text-secondary, #999999);
  z-index: 1;
  line-height: 1.2;
  transition: background-color var(--transition-normal, 220ms ease), color var(--transition-normal, 220ms ease);
}

.steez-cyberpunk-input-0-inputContainer:hover {
  border-color: var(--color-border-hover, #3a3a3a);
}

.steez-cyberpunk-input-0-cyberInput:focus-within .steez-cyberpunk-input-0-inputContainer:hover {
  border-color: var(--focus-border-color);
}

.steez-cyberpunk-input-0-long {
  --input-width: 360px;
}

.steez-cyberpunk-input-0-full {
  --input-width: 100%;
  width: 100%;
  display: block;
}

.steez-cyberpunk-input-0-hasError .steez-cyberpunk-input-0-inputContainer {
  border-color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-input-0-hasError .steez-cyberpunk-input-0-label {
  color: var(--danger, #ff5c5c);
}

.steez-cyberpunk-input-0-errorText {
  margin-top: 0.35rem;
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.8rem;
  color: var(--danger, #ff5c5c);
  line-height: 1.3;
}


.steez-cyberpunk-input-0-input:disabled,
.steez-cyberpunk-input-0-input[readonly] {
  opacity: 0.7;
  cursor: not-allowed;
}

.steez-cyberpunk-input-0-disabledContainer {
  background: var(--color-bg-secondary, #0a0a0a) !important;
  cursor: not-allowed;
}

.steez-cyberpunk-input-0-helperText {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
}

.steez-cyberpunk-input-0-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #999999);
  pointer-events: none;
  z-index: 1;
}

.steez-cyberpunk-input-0-withIcon .steez-cyberpunk-input-0-input {
  padding-right: 44px;
}

`;
const __steezStandaloneStyleKey = "cyberpunk-input";

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

export interface CyberpunkInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "helperText"> {
  label?: string;
  variant?: "default" | "long" | "full";
  helperText?: string;
  /** Field-level error message; sets aria-invalid and joins aria-describedby. */
  error?: string;
  icon?: ReactNode;
}

export function CyberpunkInput({
  label,
  variant = "default",
  className = "",
  id,
  disabled,
  readOnly,
  helperText,
  error,
  icon,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CyberpunkInputProps) {
  const inputId = useStableId("input", id);
  const isDisabledOrReadOnly = disabled || readOnly;
  const { errorId, hasError, helperId, describedBy } = useFieldDescription({
    prefix: "input",
    helperText,
    error,
    describedBy: ariaDescribedBy,
  });

  return (
    <div
      className={`${__styles_steez_cyberpunk_input_0.cyberInput} ${__styles_steez_cyberpunk_input_0[variant]} ${hasError ? __styles_steez_cyberpunk_input_0.hasError : ""} ${className}`.trim()}
    >
      {label ? (
        <label htmlFor={inputId} className={__styles_steez_cyberpunk_input_0.label}>
          {label}
        </label>
      ) : null}
      <div
        className={`${__styles_steez_cyberpunk_input_0.inputContainer} ${isDisabledOrReadOnly ? __styles_steez_cyberpunk_input_0.disabledContainer : ""} ${icon ? __styles_steez_cyberpunk_input_0.withIcon : ""}`.trim()}
      >
        {icon ? <div className={__styles_steez_cyberpunk_input_0.icon}>{icon}</div> : null}
        <input
          id={inputId}
          className={__styles_steez_cyberpunk_input_0.input}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
          aria-invalid={ariaInvalid ?? (hasError ? true : undefined)}
          aria-describedby={describedBy}
        />
      </div>
      {helperText ? (
        <div id={helperId} className={__styles_steez_cyberpunk_input_0.helperText}>
          {helperText}
        </div>
      ) : null}
      {hasError ? (
        <div id={errorId} className={__styles_steez_cyberpunk_input_0.errorText} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
