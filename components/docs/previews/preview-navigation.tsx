"use client";

import React from "react";

import {
  NotchedViewportFrame,
  PageTemplate,
  Section,
  TabbedPanel,
  Card,
  ThemeToggle,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export function TabbedPanelPreview() {
  return (
    <TabbedPanel
      defaultTab="install"
      tabs={[
        {
          id: "install",
          label: "Install",
          content: <div className={styles.previewText}>Add the registry JSON or install the npm packages directly.</div>,
        },
        {
          id: "usage",
          label: "Usage",
          content: <div className={styles.previewText}>Import the component and render it with your content.</div>,
        },
      ]}
    />
  );
}

export function PageTemplatePreview() {
  const [tab, setTab] = React.useState("overview");

  return (
    <PageTemplate
      title="Steez UI"
      description="Standalone primitives and registry payloads."
      brand={<span className={styles.previewBrand}>SU</span>}
      brandTitle="Steez UI"
      brandAriaLabel="Steez UI"
      subTabs={[
        { id: "overview", label: "Overview" },
        { id: "tokens", label: "Tokens" },
      ]}
      activeSubTab={tab}
      onSubTabChange={setTab}
      extra={<ThemeToggle storageKey="steez-component-preview-theme" />}
    >
      <Card title={tab === "tokens" ? "Tokens" : "Overview"}>
        <p className={styles.previewText}>
          {tab === "tokens"
            ? "Import @steez-ui/theme/tokens.css once to share colors, spacing, and typography."
            : "This card sits inside a page with a header, tabs, and a theme toggle."}
        </p>
      </Card>
    </PageTemplate>
  );
}

export function NotchedViewportFramePreview() {
  return (
    <div className={styles.notchedFramePreview}>
      <NotchedViewportFrame tone="strong" />
      <div className={styles.notchedFrameCard}>
        <div className={styles.previewHeading}>Viewport shell</div>
        <p className={styles.previewText}>
          A notched outline frames the viewport without covering its content.
        </p>
      </div>
    </div>
  );
}

export function SectionPreview() {
  return (
    <Section title="Browse services">
      <Card title="Directory">
        <p className={styles.previewText}>
          The section provides a heading and spacing around this card.
        </p>
      </Card>
    </Section>
  );
}
