"use client";

import React from "react";

import {
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
          content: <div className={styles.previewText}>Import the primitive and compose it with your app shell.</div>,
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
      <ThemedCard title="Overview">
        <p className={styles.previewText}>Compose app-specific screens on top of shared shell primitives.</p>
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
          Use one continuous outline when the whole interface should feel
          framed as a single surface.
        </p>
      </div>
    </div>
  );
}

export function RadialMenuOverlayPreview() {
  return (
    <div className={styles.radialMenuPreview}>
      <RadialMenuOverlay
        open
        contained
        title="Steer the runtime"
        description="One radial control surface for launch pages and app shells."
        brand={
          <span className={styles.previewRow}>
            <MenuIcon width={14} height={14} />
            Menu
          </span>
        }
        onClose={() => undefined}
        items={[
          {
            id: "studio",
            label: "Studio",
            shortLabel: "01",
            eyebrow: "Creative studio",
            body: "Launch clips, key art, and site-ready media.",
            href: "#studio",
          },
          {
            id: "runtime",
            label: "Runtime",
            shortLabel: "02",
            eyebrow: "One runtime",
            body: "Five workspaces hold the system together.",
            href: "#system",
          },
          {
            id: "launch",
            label: "Launch",
            shortLabel: "03",
            eyebrow: "Get started",
            body: "Start with one install path and ship the wedge.",
            href: "#cta",
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
          Group related surfaces without restyling spacing and heading treatment per page.
        </p>
      </ThemedCard>
    </Section>
  );
}
