import React, { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@steez-ui/icons";

import styles from "./ThemeToggle.module.css";

export interface ThemeToggleProps {
  storageKey?: string;
  defaultTheme?: "dark" | "light";
  className?: string;
  onThemeChange?: (theme: "dark" | "light") => void;
}

export function ThemeToggle({
  storageKey = "theme",
  defaultTheme = "dark",
  className = "",
  onThemeChange,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">(defaultTheme);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey) as "dark" | "light" | null;
    const initialTheme = savedTheme || defaultTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, [defaultTheme, storageKey]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem(storageKey, newTheme);
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

