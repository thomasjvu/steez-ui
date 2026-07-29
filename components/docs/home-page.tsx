"use client";

import Link from "next/link";
import React from "react";
import { CopyButton } from "@steez-ui/ui";
import styles from "./site-layout.module.css";

export function HomePageContent() {
  const [origin, setOrigin] = React.useState("http://localhost:3000");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const packageCmd = "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
  const registryCmd = `pnpm dlx shadcn@latest add ${origin}/r-steez/foundation.json`;

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>A small React design system.</h1>
        <p className={styles.heroLead}>
          Tokens, icons, and UI primitives as npm packages — with a docs catalog for one
          component at a time.
        </p>
        <div className={styles.actions}>
          <Link href="/components" className={styles.button}>
            Browse components
          </Link>
          <Link href="/docs" className={`${styles.button} ${styles.buttonGhost}`}>
            Read docs
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Install</h2>
        <p className={styles.body}>Packages (recommended for apps like Phantasy admin):</p>
        <div className={styles.codeBlock}>
          <code>{packageCmd}</code>
          <CopyButton value={packageCmd} />
        </div>
        <p className={styles.body} style={{ marginTop: "1.25rem" }}>
          Or pull source via the registry CLI:
        </p>
        <div className={styles.codeBlock}>
          <code>{registryCmd}</code>
          <CopyButton value={registryCmd} />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Packages</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.mono}>@steez-ui/theme</span>
            <p className={styles.listMeta}>Shared design tokens and Tailwind preset.</p>
          </li>
          <li className={styles.listItem}>
            <span className={styles.mono}>@steez-ui/icons</span>
            <p className={styles.listMeta}>Icon exports and provider.</p>
          </li>
          <li className={styles.listItem}>
            <span className={styles.mono}>@steez-ui/ui</span>
            <p className={styles.listMeta}>React primitives authored with CSS modules.</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Start here</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/components/cyberpunk-tile">Cyberpunk Tile</Link>
            <p className={styles.listMeta}>Cut-corner surface used in admin grids.</p>
          </li>
          <li className={styles.listItem}>
            <Link href="/components/loading-progress-bar">Loading Progress Bar</Link>
            <p className={styles.listMeta}>Segmented progress for load screens.</p>
          </li>
          <li className={styles.listItem}>
            <Link href="/components/fui-button-tile">FUI Button Tile</Link>
            <p className={styles.listMeta}>Square HUD button with icon + label.</p>
          </li>
          <li className={styles.listItem}>
            <Link href="/components">All components</Link>
            <p className={styles.listMeta}>Full catalog, filtered by category.</p>
          </li>
        </ul>
      </section>
    </>
  );
}
