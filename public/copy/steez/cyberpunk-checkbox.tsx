/**
 * Standalone Steez UI copy of Cyberpunk Checkbox.
 *
 * Generated from packages/ui/src/components/CyberpunkCheckbox.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

const __styles_steez_cyberpunk_checkbox_0: Record<string, string> = {
  "wrapper": "steez-cyberpunk-checkbox-0-wrapper",
  "checkbox": "steez-cyberpunk-checkbox-0-checkbox",
  "label": "steez-cyberpunk-checkbox-0-label",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkCheckbox.module.css */
.steez-cyberpunk-checkbox-0-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.steez-cyberpunk-checkbox-0-checkbox {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border, #2a2a2a);
  border-radius: 3px;
  appearance: none;
  outline: none;
  margin: 0;
  cursor: pointer;
  position: relative;
  background-color: var(--bg-primary, #010607);
  transition: all var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-checkbox-0-checkbox::before {
  content: "";
  width: 16px;
  height: 16px;
  background-color: var(--success, #00ff88);
  position: absolute;
  top: 4px;
  left: 4px;
  display: block;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
}

.steez-cyberpunk-checkbox-0-checkbox:checked::before {
  transform: scale(1);
}

.steez-cyberpunk-checkbox-0-checkbox:hover {
  border-color: var(--success, #00ff88);
}

.steez-cyberpunk-checkbox-0-checkbox:focus-visible {
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.steez-cyberpunk-checkbox-0-checkbox:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.steez-cyberpunk-checkbox-0-label {
  font-size: 0.875rem;
  color: var(--text-primary, #cbcbcc);
}

`;
const __steezStandaloneStyleKey = "cyberpunk-checkbox";

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

export interface CyberpunkCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  label?: string;
  onChange?: (checked: boolean) => void;
}

export function CyberpunkCheckbox({
  label,
  className = "",
  id,
  onChange,
  ...props
}: CyberpunkCheckboxProps) {
  const inputId = useStableId("checkbox", id);

  return (
    <label htmlFor={inputId} className={`${__styles_steez_cyberpunk_checkbox_0.wrapper} ${className}`.trim()}>
      <input
        id={inputId}
        type="checkbox"
        className={__styles_steez_cyberpunk_checkbox_0.checkbox}
        onChange={(event) => onChange?.(event.target.checked)}
        {...props}
      />
      {label ? <span className={__styles_steez_cyberpunk_checkbox_0.label}>{label}</span> : null}
    </label>
  );
}
