import React from "react";

import { CopyButton, CyberpunkTile, ThemedCard } from "@steez-ui/ui";

import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import styles from "../site/RegistrySiteLayout.module.css";
import { PACKAGE_ITEMS } from "../site/siteData";

export function PackagesPage() {
  const installCommand = "bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui";

  return (
    <RegistrySiteLayout
      currentNav="packages"
      title="Packages"
      description="Direct npm consumption for the token layer, icon system, and primitive library."
    >
      <section className={styles.section}>
        <div className={styles.eyebrow}>Published packages</div>
        <h1 className={styles.heroTitle}>Install the shared surface directly when you want a package boundary.</h1>
      </section>

      <section className={styles.section}>
        <ThemedCard title="Install" className={styles.flatCard}>
          <div className={styles.commandRow}>
            <code className={styles.code}>{installCommand}</code>
            <CopyButton value={installCommand} />
          </div>
        </ThemedCard>
      </section>

      <section className={styles.section}>
        <div className={styles.gridThree}>
          {PACKAGE_ITEMS.map((item) => (
            <a key={item.title} className={styles.linkCard} href={item.href}>
              <CyberpunkTile className={styles.linkCard}>
                <div className={styles.tileTitle}>{item.title}</div>
                <p className={styles.tileBody}>{item.body}</p>
              </CyberpunkTile>
            </a>
          ))}
        </div>
      </section>
    </RegistrySiteLayout>
  );
}
