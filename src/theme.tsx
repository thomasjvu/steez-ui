import { useEffect, useState } from "react";

type Preference = "system" | "light" | "dark";
export function Appearance() {
  const [preference, setPreference] = useState<Preference>("system");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("steez-site-theme");
      if (stored === "light" || stored === "dark") setPreference(stored);
    } catch {
      /* System appearance works without storage. */
    }
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      document.documentElement.dataset.theme =
        preference === "system"
          ? media.matches
            ? "dark"
            : "light"
          : preference;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [preference]);
  return (
    <label className="appearance">
      Appearance
      <select
        aria-label="Appearance"
        value={preference}
        onChange={(event) => {
          const value = event.target.value as Preference;
          setPreference(value);
          try {
            localStorage.setItem("steez-site-theme", value);
          } catch {
            /* Storage is optional. */
          }
        }}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
