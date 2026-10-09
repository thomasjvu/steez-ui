"use client";

import React from "react";

import styles from "./IconStackSelect.module.css";

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
    <div className={`${styles.root} ${wrapperClassName}`.trim()}>
      {label && <label htmlFor={triggerId} className={styles.label}>{label}</label>}
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
        className={`${styles.trigger} ${className}`.trim()}
        style={{ ...style, "--icon-stack-select-stack-width": `${icons.length ? 28 + (icons.length - 1) * 16 : 0}px` } as React.CSSProperties}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) { if (open) setExpanded(false); else showMenu(); }
        }}
        onKeyDown={handleKeyDown}
        onBlur={(event) => { onBlur?.(event); setExpanded(false); }}
      >
        <span className={styles.text}>{selected?.label ?? placeholder}</span>
        <span className={styles.stack} aria-hidden="true">
          {icons.map((item) => <span key={item.id} className={styles.icon} title={item.label}>{item.icon}</span>)}
        </span>
        <svg className={styles.chevron} aria-hidden="true" width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="m1 2 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div ref={listRef} id={listId} role="listbox" aria-label={ariaLabel ?? label ?? "Options"}
          popover="manual" className={styles.menu} onMouseDown={(event) => event.preventDefault()}>
          {options.map((option, index) => (
            <div key={option.value} id={`${listId}-${index}`} role="option"
              aria-selected={index === selectedIndex} aria-disabled={option.disabled || undefined}
              className={`${styles.option} ${index === active ? styles.active : ""}`.trim()}
              onPointerMove={() => { if (!option.disabled) setActiveIndex(index); }}
              onClick={() => { choose(index); triggerRef.current?.focus(); }}>
              <span>{option.label}</span><span className={styles.check} aria-hidden="true">{index === selectedIndex ? "✓" : ""}</span>
            </div>
          ))}
          {options.length === 0 && <div className={styles.empty}>No options available</div>}
        </div>
      )}
    </div>
  );
}
