import React from "react";

import { TabbedPanel, type TabbedPanelTab, ThemedCard } from "@steez-ui/ui";

import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import styles from "../site/RegistrySiteLayout.module.css";

const DOC_TABS: TabbedPanelTab[] = [
  {
    id: "model",
    label: "Model",
    content: (
        <div className={styles.list}>
          <div className={styles.listItem}>Steez owns extracted primitives, tokens, and iconography.</div>
        <div className={styles.listItem}>Applications consume the package surface instead of copying shared CSS and React code.</div>
        <div className={styles.listItem}>App-specific composites, business flows, and domain panels stay in the consuming product.</div>
      </div>
    ),
  },
  {
    id: "authoring",
    label: "Authoring",
    content: (
        <div className={styles.list}>
          <div className={styles.listItem}>Build or update primitives in `packages/ui/src/components`.</div>
        <div className={styles.listItem}>Keep tokens in `packages/theme` and icons in `packages/icons`.</div>
        <div className={styles.listItem}>Add or update the generated payload definition in `scripts/generate-registry.mjs`.</div>
      </div>
    ),
  },
  {
    id: "release",
    label: "Release",
    content: (
        <div className={styles.list}>
          <div className={styles.listItem}>Run `bun run check:release` before publishing packages or deploying the docs frontend.</div>
        <div className={styles.listItem}>Push `main` to deploy the registry frontend, and push a `v*` tag to publish packages.</div>
        <div className={styles.listItem}>Consumers should bump package versions only when the extracted boundary actually changes.</div>
      </div>
    ),
  },
] as const;

export function DocsPage() {
  return (
    <RegistrySiteLayout
      currentNav="docs"
      title="Documentation"
      description="How Steez is organized, what belongs in the package, and how consuming apps should integrate it."
    >
      <section className={styles.section}>
        <div className={styles.eyebrow}>Guides</div>
        <h1 className={styles.heroTitle}>Keep the shared boundary small, clear, and stable.</h1>
        <p className={styles.body}>
          Steez is not meant to absorb every screen from the consuming product. It should own
          reusable primitives and styles, then let apps compose domain-specific surfaces on top.
        </p>
        <p className={styles.body}>
          Component-by-component installation and previews now live in the dedicated
          <a className={styles.linkButton} href="/components/"> components section</a>.
        </p>
      </section>

      <section className={styles.section}>
        <ThemedCard title="Docs" className={styles.flatCard}>
          <TabbedPanel tabs={DOC_TABS} defaultTab="model" />
        </ThemedCard>
      </section>
    </RegistrySiteLayout>
  );
}
