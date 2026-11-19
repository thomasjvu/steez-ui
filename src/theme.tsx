import { useEffect, useState } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@steez-ui/icons";

type Preference = "system" | "light" | "dark";
const OPTIONS = [
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
] as const;

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
  function choose(value: Preference) {
    setPreference(value);
    try {
      localStorage.setItem("steez-site-theme", value);
    } catch {
      /* Storage is optional. */
    }
  }
  return (
    <div className="appearance" role="group" aria-label="Appearance">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={preference === value}
          title={label}
          onClick={() => choose(value)}
        >
          <Icon width={14} height={14} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
