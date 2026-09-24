/**
 * Standalone Steez UI copy of Cyberpunk Radio.
 *
 * Generated from packages/ui/src/components/CyberpunkRadio.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

const __styles_steez_cyberpunk_radio_0: Record<string, string> = {
  "wrapper": "steez-cyberpunk-radio-0-wrapper",
  "radio": "steez-cyberpunk-radio-0-radio",
  "label": "steez-cyberpunk-radio-0-label",
  "radioGroup": "steez-cyberpunk-radio-0-radioGroup",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/CyberpunkRadio.module.css */
.steez-cyberpunk-radio-0-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.steez-cyberpunk-radio-0-radio {
  width: 28px;
  height: 28px;
  border: 2px solid var(--border, #2a2a2a);
  border-radius: 50%;
  appearance: none;
  outline: none;
  margin: 0;
  cursor: pointer;
  position: relative;
  background-color: var(--bg-primary, #010607);
  transition: all var(--transition-fast, 150ms ease);
}

.steez-cyberpunk-radio-0-radio::before {
  content: "";
  width: 16px;
  height: 16px;
  background-color: var(--success, #00ff88);
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
  display: block;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
}

.steez-cyberpunk-radio-0-radio:checked::before {
  transform: scale(1);
}

.steez-cyberpunk-radio-0-radio:hover {
  border-color: var(--success, #00ff88);
}

.steez-cyberpunk-radio-0-radio:focus-visible {
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.steez-cyberpunk-radio-0-radio:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.steez-cyberpunk-radio-0-label {
  font-size: 0.875rem;
  color: var(--text-primary, #cbcbcc);
}

.steez-cyberpunk-radio-0-radioGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

`;
const __steezStandaloneStyleKey = "cyberpunk-radio";

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

export interface CyberpunkRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function CyberpunkRadio({ label, className = "", id, ...props }: CyberpunkRadioProps) {
  const inputId = useStableId("radio", id);

  return (
    <label htmlFor={inputId} className={`${__styles_steez_cyberpunk_radio_0.wrapper} ${className}`.trim()}>
      <input id={inputId} type="radio" className={__styles_steez_cyberpunk_radio_0.radio} {...props} />
      {label ? <span className={__styles_steez_cyberpunk_radio_0.label}>{label}</span> : null}
    </label>
  );
}

export interface CyberpunkRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  /** Accessible name for the radiogroup (maps to aria-label). */
  label?: string;
}

export function CyberpunkRadioGroup({
  name,
  options,
  value,
  onChange,
  className = "",
  label,
}: CyberpunkRadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label || undefined}
      className={`${__styles_steez_cyberpunk_radio_0.radioGroup} ${className}`.trim()}
    >
      {options.map((option) => (
        <CyberpunkRadio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={(event) => onChange?.(event.target.value)}
        />
      ))}
    </div>
  );
}
