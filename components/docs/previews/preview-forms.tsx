"use client";

import React from "react";

import {
  IconStackSelect,
  CyberpunkCheckbox,
  CyberpunkInput,
  CyberpunkRadioGroup,
  CyberpunkSelect,
  CyberpunkSlider,
  CyberpunkTextarea,
  SegmentedControl,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export function CyberpunkInputPreview() {
  const [value, setValue] = React.useState("rally");

  return (
    <CyberpunkInput
      label="Companion name"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperText="Used in URLs and install paths."
      variant="full"
    />
  );
}

export function CyberpunkSelectPreview() {
  const [value, setValue] = React.useState("balanced");

  return (
    <CyberpunkSelect
      label="Model tier"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      options={[
        { value: "fast", label: "Fast" },
        { value: "balanced", label: "Balanced" },
        { value: "quality", label: "Quality" },
      ]}
      variant="full"
    />
  );
}

export function CyberpunkTextareaPreview() {
  const [value, setValue] = React.useState("You are a polished AI companion with a clear visual voice.");

  return (
    <CyberpunkTextarea
      label="System prompt"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      rows={5}
      variant="full"
    />
  );
}

export function CyberpunkCheckboxPreview() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className={styles.previewColumn}>
      <CyberpunkCheckbox
        label="Enable publishing queue"
        checked={checked}
        onChange={setChecked}
      />
      <div className={styles.previewNote}>Current value: {checked ? "enabled" : "disabled"}</div>
    </div>
  );
}

export function CyberpunkRadioPreview() {
  const [value, setValue] = React.useState("hosted");

  return (
    <div className={styles.previewColumn}>
      <CyberpunkRadioGroup
        name="runtime-mode"
        value={value}
        onChange={setValue}
        options={[
          { value: "hosted", label: "Hosted" },
          { value: "self-hosted", label: "Self-hosted" },
        ]}
      />
      <div className={styles.previewNote}>Selected: {value}</div>
    </div>
  );
}

export function CyberpunkSliderPreview() {
  const [value, setValue] = React.useState(62);

  return (
    <div className={styles.previewColumn} style={{ width: "100%", maxWidth: 360, alignItems: "stretch" }}>
      <CyberpunkSlider
        label="Default"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <CyberpunkSlider
        label="Diamond"
        variant="diamond"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        helperText="Hold the square thumb to turn it into a diamond."
      />
    </div>
  );
}

export function SegmentedControlPreview() {
  const [value, setValue] = React.useState("registry");

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: "registry", label: "Registry" },
        { value: "packages", label: "Packages" },
      ]}
      label="Install path"
    />
  );
}

export function IconStackSelectPreview() {
  const [value, setValue] = React.useState("balanced");
  const icons = [
    { id: "circle", label: "Circle", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6" fill="#111" /></svg> },
    { id: "square", label: "Square", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" fill="#111" /></svg> },
    { id: "triangle", label: "Triangle", icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 5 8 14H4Z" fill="#111" /></svg> },
  ];
  return (
    <div className={styles.previewColumn} style={{ width: "100%", maxWidth: 360 }}>
      <IconStackSelect label="Model" value={value} onValueChange={setValue}
        options={[
          { value: "fast", label: "Fast", icons: icons.slice(0, 2) },
          { value: "balanced", label: "Balanced", icons },
          { value: "quality", label: "Quality", icons: icons.slice(1) },
          { value: "offline", label: "Offline (unavailable)", disabled: true },
        ]} />
      <p className={styles.previewNote}>All associated icons stay visible. Use arrow keys to browse and Enter to choose.</p>
    </div>
  );
}
