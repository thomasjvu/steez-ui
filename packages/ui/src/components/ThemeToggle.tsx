"use client";

import React, { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@steez-ui/icons";

import styles from "./ThemeToggle.module.css";

export interface ThemeToggleProps {
  storageKey?: string;
  defaultTheme?: "dark" | "light";
  className?: string;
  onThemeChange?: (theme: "dark" | "light") => void;
}

function isTheme(value: string | null): value is "dark" | "light" {
  return value === "dark" || value === "light";
}

function readStoredTheme(storageKey: string): "dark" | "light" | null {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return isTheme(saved) ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredTheme(storageKey: string, theme: "dark" | "light"): void {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Storage may be unavailable (private mode, quota, policy).
  }
}

export function ThemeToggle({
  storageKey = "theme",
  defaultTheme = "dark",
  className = "",
  onThemeChange,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">(defaultTheme);

  useEffect(() => {
    const initialTheme = readStoredTheme(storageKey) ?? defaultTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, [defaultTheme, storageKey]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    writeStoredTheme(storageKey, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    onThemeChange?.(newTheme);
  };

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${styles.iconButton} ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <SunIcon width={14} height={14} /> : <MoonIcon width={14} height={14} />}
    </button>
  );
}

