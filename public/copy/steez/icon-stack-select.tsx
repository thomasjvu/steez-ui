/**
 * Standalone Steez UI copy of Icon Stack Select.
 *
 * Generated from packages/ui/src/components/IconStackSelect.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";

const __styles_steez_icon_stack_select_0: Record<string, string> = {
  "root": "steez-icon-stack-select-0-root",
  "label": "steez-icon-stack-select-0-label",
  "trigger": "steez-icon-stack-select-0-trigger",
  "text": "steez-icon-stack-select-0-text",
  "stack": "steez-icon-stack-select-0-stack",
  "icon": "steez-icon-stack-select-0-icon",
  "chevron": "steez-icon-stack-select-0-chevron",
  "menu": "steez-icon-stack-select-0-menu",
  "option": "steez-icon-stack-select-0-option",
  "active": "steez-icon-stack-select-0-active",
  "check": "steez-icon-stack-select-0-check",
  "empty": "steez-icon-stack-select-0-empty",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/IconStackSelect.module.css */
.steez-icon-stack-select-0-root {
  --icon-stack-select-bg: var(--color-bg-elevated, #111);
  --icon-stack-select-text: var(--color-text-primary, #cbcbcc);
  --icon-stack-select-muted: var(--color-text-secondary, #999);
  --icon-stack-select-border: var(--color-border, #2a2a2a);
  --icon-stack-select-hover: var(--color-bg-hover, #222);
  --icon-stack-select-accent: var(--color-accent, #ee1401);
  --icon-stack-select-font: var(--font-sans, sans-serif);
  --icon-stack-select-icon-bg: var(--color-white, #fff);
  width: 100%;
  min-width: 0;
}
.steez-icon-stack-select-0-label { display: block; margin-bottom: .65rem; color: var(--icon-stack-select-muted); font: .72rem var(--icon-stack-select-font); }
.steez-icon-stack-select-0-trigger {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: .8rem calc(var(--icon-stack-select-stack-width, 0px) + 3.5rem) .8rem .6rem;
  border: 1px solid var(--icon-stack-select-border);
  border-radius: 10px;
  color: var(--icon-stack-select-text);
  background: var(--icon-stack-select-bg);
  font: .75rem var(--icon-stack-select-font);
  text-align: left;
  cursor: pointer;
}
.steez-icon-stack-select-0-trigger:focus-visible { outline: 2px solid var(--icon-stack-select-accent); outline-offset: 4px; }
.steez-icon-stack-select-0-trigger:disabled { opacity: .5; cursor: not-allowed; }
.steez-icon-stack-select-0-text { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.steez-icon-stack-select-0-stack { position: absolute; right: 2.5rem; top: 50%; transform: translateY(-50%); display: flex; align-items: center; pointer-events: none; }
.steez-icon-stack-select-0-icon { position: relative; display: grid; place-items: center; flex: 0 0 28px; width: 28px; height: 28px; box-sizing: border-box; border: 2px solid var(--icon-stack-select-bg); border-radius: 50%; background: var(--icon-stack-select-icon-bg); color: #111; overflow: hidden; }
.steez-icon-stack-select-0-icon + .steez-icon-stack-select-0-icon { margin-left: -12px; }
.steez-icon-stack-select-0-icon > * { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
.steez-icon-stack-select-0-chevron { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--icon-stack-select-muted); pointer-events: none; }
.steez-icon-stack-select-0-menu {
  position: fixed;
  inset: auto;
  margin: 0;
  z-index: 1000;
  box-sizing: border-box;
  overflow: auto;
  overscroll-behavior: contain;
  padding: .35rem;
  border: 1px solid var(--icon-stack-select-border);
  border-radius: 12px;
  background: var(--icon-stack-select-bg);
  color: var(--icon-stack-select-text);
  font: .75rem/1.5 var(--icon-stack-select-font);
  box-shadow: 0 12px 30px rgb(0 0 0 / .4);
}
.steez-icon-stack-select-0-menu::backdrop { background: transparent; pointer-events: none; }
.steez-icon-stack-select-0-option { display: flex; align-items: center; justify-content: space-between; gap: .6rem; padding: .8rem .6rem; border-radius: 8px; color: var(--icon-stack-select-muted); cursor: pointer; overflow-wrap: anywhere; }
.steez-icon-stack-select-0-active { color: var(--icon-stack-select-text); background: var(--icon-stack-select-hover); }
.steez-icon-stack-select-0-option[aria-disabled="true"] { opacity: .4; cursor: not-allowed; }
.steez-icon-stack-select-0-check { color: var(--icon-stack-select-accent); flex-shrink: 0; }
.steez-icon-stack-select-0-empty { padding: .8rem .6rem; color: var(--icon-stack-select-muted); }
`;
const __steezStandaloneStyleKey = "icon-stack-select";

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

export interface IconStackSelectIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface IconStackSelectOption {
  value: string;
  label: string;
  icons?: readonly IconStackSelectIcon[];
  disabled?: boolean;
}

export interface IconStackSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "value" | "defaultValue" | "onChange" | "name" | "type" | "role" | "aria-expanded" | "aria-controls" | "aria-activedescendant" | "aria-haspopup"> {
  options: readonly IconStackSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  /** Optional hidden input for native form submission. */
  name?: string;
  /** Applied to the outer wrapper; className and style apply to the trigger. */
  wrapperClassName?: string;
}

/** Select-only combobox with a decorative icon stack and a top-layer menu. */
export function IconStackSelect({
  options, value, defaultValue, onValueChange, label, placeholder = "Choose an option",
  name, disabled = false, id, className = "", wrapperClassName = "", style,
  onKeyDown, onClick, onBlur, "aria-label": ariaLabel, ...props
}: IconStackSelectProps) {
  const generatedId = React.useId();
  const triggerId = id ?? `icon-stack-select-${generatedId}`;
  const listId = `${triggerId}-list`;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);
  const selected = options[selectedIndex];
  const [expanded, setExpanded] = React.useState(false);
  const open = expanded && !disabled;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef({ text: "", time: 0 });
  const enabledIndices = options.flatMap((option, index) => option.disabled ? [] : [index]);
  const active = open && options[activeIndex] && !options[activeIndex].disabled ? activeIndex : -1;

  function showMenu(last = false) {
    searchRef.current = { text: "", time: 0 };
    setActiveIndex(selected && !selected.disabled ? selectedIndex :
      (last ? enabledIndices[enabledIndices.length - 1] : enabledIndices[0]) ?? -1);
    setExpanded(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) { setExpanded(false); return; }
    if (option.disabled || disabled) return;
    if (value === undefined) setInternalValue(option.value);
    if (option.value !== selectedValue) onValueChange?.(option.value);
    setExpanded(false);
  }

  React.useEffect(() => {
    if (disabled) setExpanded(false);
  }, [disabled]);

  React.useLayoutEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const trigger = triggerRef.current;
    if (!list || !trigger) return;
    // The Popover API lifts the menu above ancestor overflow and stacking contexts.
    list.showPopover?.();
    function position() {
      if (!list || !trigger) return;
      const rect = trigger.getBoundingClientRect();
      const margin = 8;
      const gap = 6;
      const below = Math.max(0, window.innerHeight - rect.bottom - margin - gap);
      const above = Math.max(0, rect.top - margin - gap);
      const upwards = below < Math.min(list.scrollHeight, 240) && above > below;
      const available = upwards ? above : below;
      const width = Math.min(rect.width, window.innerWidth - margin * 2);
      Object.assign(list.style, {
        width: `${Math.max(0, width)}px`,
        maxHeight: `${Math.min(320, available)}px`,
        left: `${Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin))}px`,
        top: upwards ? "auto" : `${rect.bottom + gap}px`,
        bottom: upwards ? `${window.innerHeight - rect.top + gap}px` : "auto",
      });
    }
    position();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(position);
    observer?.observe(trigger);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    function dismiss(event: PointerEvent) {
      const target = event.target as Node;
      if (!trigger?.contains(target) && !list?.contains(target)) setExpanded(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      document.removeEventListener("pointerdown", dismiss);
      list.hidePopover?.();
    };
  }, [open]);

  React.useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView?.({ block: "nearest" });
  }, [active, listId]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) showMenu(event.key === "ArrowUp");
      else {
        const current = enabledIndices.indexOf(active);
        const step = event.key === "ArrowDown" ? 1 : -1;
        const next = (current + step + enabledIndices.length) % enabledIndices.length;
        setActiveIndex(enabledIndices[next] ?? -1);
      }
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!open) showMenu();
      setActiveIndex((event.key === "Home" ? enabledIndices[0] : enabledIndices[enabledIndices.length - 1]) ?? -1);
    } else if (event.key === "Enter" || (event.key === " " && (!searchRef.current.text || Date.now() - searchRef.current.time >= 700))) {
      event.preventDefault();
      if (open) choose(active);
      else showMenu();
    } else if (event.key === "Escape") {
      if (open) event.preventDefault();
      setExpanded(false);
      searchRef.current.text = "";
    } else if (event.key === "Tab") {
      if (open) choose(active);
      setExpanded(false);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const previous = now - searchRef.current.time < 700 ? searchRef.current.text : "";
      const text = previous + event.key.toLocaleLowerCase();
      searchRef.current = { text, time: now };
      const query = [...text].every((character) => character === text[0]) ? text[0] : text;
      const start = enabledIndices.indexOf(open ? active : selectedIndex);
      const ordered = [...enabledIndices.slice(start + 1), ...enabledIndices.slice(0, start + 1)];
      const match = ordered.find((index) => options[index].label.toLocaleLowerCase().startsWith(query));
      if (!open) setExpanded(true);
      if (match !== undefined) setActiveIndex(match);
    }
  }

  const icons = selected?.icons ?? [];
  return (
    <div className={`${__styles_steez_icon_stack_select_0.root} ${wrapperClassName}`.trim()}>
      {label && <label htmlFor={triggerId} className={__styles_steez_icon_stack_select_0.label}>{label}</label>}
      {name && <input type="hidden" name={name} value={selectedValue} disabled={disabled} />}
      <button
        {...props}
        id={triggerId}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        disabled={disabled}
        className={`${__styles_steez_icon_stack_select_0.trigger} ${className}`.trim()}
        style={{ ...style, "--icon-stack-select-stack-width": `${icons.length ? 28 + (icons.length - 1) * 16 : 0}px` } as React.CSSProperties}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) { if (open) setExpanded(false); else showMenu(); }
        }}
        onKeyDown={handleKeyDown}
        onBlur={(event) => { onBlur?.(event); setExpanded(false); }}
      >
        <span className={__styles_steez_icon_stack_select_0.text}>{selected?.label ?? placeholder}</span>
        <span className={__styles_steez_icon_stack_select_0.stack} aria-hidden="true">
          {icons.map((item) => <span key={item.id} className={__styles_steez_icon_stack_select_0.icon} title={item.label}>{item.icon}</span>)}
        </span>
        <svg className={__styles_steez_icon_stack_select_0.chevron} aria-hidden="true" width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="m1 2 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div ref={listRef} id={listId} role="listbox" aria-label={ariaLabel ?? label ?? "Options"}
          popover="manual" className={__styles_steez_icon_stack_select_0.menu} onMouseDown={(event) => event.preventDefault()}>
          {options.map((option, index) => (
            <div key={option.value} id={`${listId}-${index}`} role="option"
              aria-selected={index === selectedIndex} aria-disabled={option.disabled || undefined}
              className={`${__styles_steez_icon_stack_select_0.option} ${index === active ? __styles_steez_icon_stack_select_0.active : ""}`.trim()}
              onPointerMove={() => { if (!option.disabled) setActiveIndex(index); }}
              onClick={() => { choose(index); triggerRef.current?.focus(); }}>
              <span>{option.label}</span><span className={__styles_steez_icon_stack_select_0.check} aria-hidden="true">{index === selectedIndex ? "✓" : ""}</span>
            </div>
          ))}
          {options.length === 0 && <div className={__styles_steez_icon_stack_select_0.empty}>No options available</div>}
        </div>
      )}
    </div>
  );
}
