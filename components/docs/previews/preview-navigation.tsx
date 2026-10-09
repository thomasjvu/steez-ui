"use client";

import React from "react";

import {
  Button,
  NotchedViewportFrame,
  PageTemplate,
  Section,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
} from "@steez-ui/ui";
import { RadialMenuOverlay } from "@steez-ui/ui/blocks";
import { MenuIcon } from "@steez-ui/icons";

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
      <ThemedCard title={tab === "tokens" ? "Tokens" : "Overview"}>
        <p className={styles.previewText}>
          {tab === "tokens"
            ? "Import @steez-ui/theme/tokens.css once to share colors, spacing, and typography."
            : "This card sits inside a page with a header, tabs, and a theme toggle."}
        </p>
      </ThemedCard>
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

export function RadialMenuOverlayPreview() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className={styles.radialMenuPreview}>
      {!open && (
        <Button onClick={() => setOpen(true)}>Open navigation</Button>
      )}
      <RadialMenuOverlay
        open={open}
        contained
        title="Explore Steez UI"
        description="Choose components, read the docs, or install the packages."
        brand={
          <span className={styles.previewRow}>
            <MenuIcon width={14} height={14} />
            Menu
          </span>
        }
        onClose={() => setOpen(false)}
        items={[
          {
            id: "components",
            label: "Components",
            shortLabel: "01",
            eyebrow: "Browse",
            body: "Preview components and copy usage examples.",
            href: "/components",
          },
          {
            id: "docs",
            label: "Docs",
            shortLabel: "02",
            eyebrow: "Contribute",
            body: "Learn how to add and document a component.",
            href: "/docs",
          },
          {
            id: "packages",
            label: "Packages",
            shortLabel: "03",
            eyebrow: "Get started",
            body: "Install components, icons, and design tokens.",
            href: "/packages",
          },
        ]}
      />
    </div>
  );
}

export function SectionPreview() {
  return (
    <Section title="Browse services">
      <ThemedCard title="Directory">
        <p className={styles.previewText}>
          The section provides a heading and spacing around this card.
        </p>
      </ThemedCard>
    </Section>
  );
}
