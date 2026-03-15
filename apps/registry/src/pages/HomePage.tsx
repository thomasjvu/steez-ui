import React from "react";

import {
  CopyButton,
  CyberpunkTile,
  SegmentedControl,
  TabbedPanel,
  ThemedCard,
} from "@steez-ui/ui";

import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import styles from "../site/RegistrySiteLayout.module.css";
import { PACKAGE_ITEMS, REGISTRY_ITEMS, VALUE_TILES } from "../site/siteData";

export function HomePage() {
  const [installMode, setInstallMode] = React.useState("registry");
  const [packageManager, setPackageManager] = React.useState("bun");

  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;

  const packageInstallCommand = React.useMemo(() => {
    if (packageManager === "npm") {
      return "npm install @steez-ui/theme @steez-ui/icons @steez-ui/ui";
    }

    if (packageManager === "pnpm") {
      return "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
    }

    return "bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
  }, [packageManager]);

  const foundationCommand = `bunx shadcn@latest add ${registryOrigin}/r/foundation.json`;

  const installTabs = [
    {
      id: "registry",
      label: "Registry",
      content: (
        <div className={styles.stack}>
          <ThemedCard title="Foundation preset" className={styles.flatCard}>
            <div className={styles.commandRow}>
              <code className={styles.code}>{foundationCommand}</code>
              <CopyButton value={foundationCommand} />
            </div>
          </ThemedCard>
        </div>
      ),
    },
    {
      id: "packages",
      label: "Packages",
      content: (
        <div className={styles.stack}>
          <SegmentedControl
            label="Package manager"
            value={packageManager}
            onChange={setPackageManager}
            options={[
              { value: "bun", label: "Bun" },
              { value: "npm", label: "npm" },
              { value: "pnpm", label: "pnpm" },
            ]}
          />
          <ThemedCard title="Direct install" className={styles.flatCard}>
            <div className={styles.commandRow}>
              <code className={styles.code}>{packageInstallCommand}</code>
              <CopyButton value={packageInstallCommand} />
            </div>
          </ThemedCard>
        </div>
      ),
    },
  ];

  return (
    <RegistrySiteLayout
      currentNav="home"
      title="Steez UI"
      description="Standalone React primitives, package installs, and generated registry output."
    >
      <section className={styles.section}>
        <div className={styles.heroGrid}>
          <div className={styles.stack}>
            <div className={styles.eyebrow}>Overview</div>
            <h1 className={styles.heroTitle}>Installable primitives with a clear package boundary.</h1>
            <p className={styles.body}>
              Steez UI is the source of truth for tokens, icons, and reusable primitives.
              The same components ship as npm packages and as shadcn-compatible registry items.
            </p>
          </div>
          <div className={styles.gridThree}>
            {VALUE_TILES.map((tile) => (
              <CyberpunkTile key={tile.title}>
                <div className={styles.tileTitle}>{tile.title}</div>
                <p className={styles.tileBody}>{tile.body}</p>
              </CyberpunkTile>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.eyebrow}>Getting started</div>
        <h2 className={styles.sectionTitle}>Pick the install path that matches the project.</h2>
        <div className={styles.gridTwo}>
          <ThemedCard title="Install" className={styles.flatCard}>
            <TabbedPanel
              tabs={installTabs}
              activeTab={installMode}
              onTabChange={setInstallMode}
            />
          </ThemedCard>
          <ThemedCard title="What ships" className={styles.flatCard}>
            <div className={styles.list}>
              <div className={styles.listItem}>
                `@steez-ui/theme`, `@steez-ui/icons`, and `@steez-ui/ui` publish together.
              </div>
              <div className={styles.listItem}>
                The public registry exposes foundation presets and per-component JSON payloads.
              </div>
              <div className={styles.listItem}>
                Documentation, install commands, and generated payloads stay in one repo.
              </div>
            </div>
          </ThemedCard>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.eyebrow}>Surfaces</div>
        <h2 className={styles.sectionTitle}>Use docs pages for navigation, not one oversized landing page.</h2>
        <div className={styles.gridTwo}>
          <ThemedCard title="Packages" className={styles.flatCard}>
            <div className={styles.list}>
              {PACKAGE_ITEMS.map((item) => (
                <div key={item.title} className={styles.listItem}>
                  <strong>{item.title}</strong>
                  <div className={styles.referenceValue}>{item.body}</div>
                </div>
              ))}
            </div>
          </ThemedCard>
          <ThemedCard title="Registry" className={styles.flatCard}>
            <div className={styles.list}>
              {REGISTRY_ITEMS.slice(0, 4).map((item) => (
                <div key={item.href} className={styles.listItem}>
                  <strong>{item.label}</strong>
                  <div className={styles.referenceValue}>{item.href}</div>
                </div>
              ))}
            </div>
          </ThemedCard>
        </div>
      </section>
    </RegistrySiteLayout>
  );
}
