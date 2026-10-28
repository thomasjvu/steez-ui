"use client";

import React from "react";

import {
  Checkbox,
  Input,
  RadioGroup,
  Select,
  Slider,
  Textarea,
  SegmentedControl,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export function InputPreview() {
  const [value, setValue] = React.useState("rally");

  return (
    <Input
      labelStyle="notch"
      label="Companion name"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperText="Used in URLs and install paths."
      variant="full"
    />
  );
}

export function SelectPreview() {
  const [value, setValue] = React.useState("balanced");
  const options = [
    { value: "fast", label: "Fast" },
    { value: "balanced", label: "Balanced" },
    { value: "quality", label: "Quality" },
  ];
  return (
    <div
      className={styles.previewColumn}
      style={{ width: "100%", maxWidth: 360 }}
    >
      <Select
        label="Plain label"
        value={value}
        onValueChange={setValue}
        options={options}
        variant="full"
      />
      <Select
        label="Cut label"
        labelStyle="notch"
        value={value}
        onValueChange={setValue}
        options={options}
        variant="full"
        helperText="The label cuts only the control border."
      />
    </div>
  );
}

export function TextareaPreview() {
  const [value, setValue] = React.useState(
    "You are a polished AI companion with a clear visual voice.",
  );

  return (
    <Textarea
      labelStyle="notch"
      label="System prompt"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      rows={5}
      variant="full"
    />
  );
}

export function CheckboxPreview() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className={styles.previewColumn}>
      <Checkbox
        label="Enable publishing queue"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <div className={styles.previewNote}>
        Current value: {checked ? "enabled" : "disabled"}
      </div>
    </div>
  );
}

export function RadioPreview() {
  const [value, setValue] = React.useState("hosted");

  return (
    <div className={styles.previewColumn}>
      <RadioGroup
        name="runtime-mode"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "hosted", label: "Hosted" },
          { value: "self-hosted", label: "Self-hosted" },
        ]}
      />
      <div className={styles.previewNote}>Selected: {value}</div>
    </div>
  );
}

export function SliderPreview() {
  const [value, setValue] = React.useState(62);

  return (
    <div
      className={styles.previewColumn}
      style={{ width: "100%", maxWidth: 360, alignItems: "stretch" }}
    >
      <Slider
        label="Default"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <Slider
        label="Diamond"
        labelStyle="notch"
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
      onValueChange={setValue}
      options={[
        { value: "registry", label: "Registry" },
        { value: "packages", label: "Packages" },
      ]}
      label="Install path"
    />
  );
}
