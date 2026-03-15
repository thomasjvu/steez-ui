import React from "react";

import { CopyButton, CyberpunkTile, StatusMessage, ThemedCard } from "@steez-ui/ui";

import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import styles from "../site/RegistrySiteLayout.module.css";
import { REGISTRY_ITEMS } from "../site/siteData";

export function RegistryPage() {
  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;
  const foundationCommand = `bunx shadcn@latest add ${registryOrigin}/r/foundation.json`;

  return (
    <RegistrySiteLayout
      currentNav="registry"
      title="Registry"
      description="Generated JSON payloads for shadcn-compatible installs, powered by the same source tree as the packages."
    >
      <section className={styles.section}>
        <div className={styles.eyebrow}>Registry output</div>
        <h1 className={styles.heroTitle}>Generated install payloads, not hand-maintained copies.</h1>
        <StatusMessage type="success" message="Registry payloads are generated from the package source tree." />
      </section>

      <section className={styles.section}>
        <ThemedCard title="Foundation preset" className={styles.flatCard}>
          <div className={styles.commandRow}>
            <code className={styles.code}>{foundationCommand}</code>
            <CopyButton value={foundationCommand} />
          </div>
        </ThemedCard>
      </section>

      <section className={styles.section}>
        <div className={styles.linkGrid}>
          {REGISTRY_ITEMS.map((item) => (
            <a key={item.href} className={styles.linkCard} href={item.href}>
              <CyberpunkTile className={styles.linkCard}>
                <div className={styles.tileTitle}>{item.label}</div>
                <p className={styles.tileBody}>{item.href}</p>
              </CyberpunkTile>
            </a>
          ))}
        </div>
      </section>
    </RegistrySiteLayout>
  );
}
