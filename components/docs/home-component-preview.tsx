"use client";

import { Button, CyberpunkInput, TabbedPanel, ThemeToggle } from "@steez-ui/ui";
import styles from "./site-layout.module.css";

export type HomeComponentPreviewId =
  | "button"
  | "cyberpunk-input"
  | "theme-toggle"
  | "tabbed-panel";

export function HomeComponentPreview({
  preview,
}: {
  preview: HomeComponentPreviewId;
}) {
  switch (preview) {
    case "button":
      return (
        <div className={styles.homeButtonPreview}>
          <Button variant="cyberpunk3" size="small">Deploy</Button>
          <Button variant="secondary" size="small">Preview</Button>
        </div>
      );
    case "cyberpunk-input":
      return (
        <CyberpunkInput
          className={styles.homeInputPreview}
          label="Project name"
          defaultValue="orbit-kit"
          variant="full"
        />
      );
    case "theme-toggle":
      return (
        <div className={styles.homeTogglePreview}>
          <ThemeToggle storageKey="steez-home-theme-preview" />
          <span>Switch theme</span>
        </div>
      );
    case "tabbed-panel":
      return (
        <TabbedPanel
          ariaLabel="Example sections"
          className={styles.homeTabsPreview}
          navClassName={styles.homeTabsPreviewList}
          panelClassName={styles.homeTabsPreviewPanel}
          defaultTab="canvas"
          tabs={[
            { id: "canvas", label: "Canvas", content: "Live preview" },
            { id: "api", label: "API", content: "Composable props" },
          ]}
        />
      );
  }
}
