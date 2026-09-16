"use client";

import React from "react";

import {
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
    <CyberpunkSlider
      label="Reply energy"
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
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
