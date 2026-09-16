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
  const foundationCmd = `pnpm dlx shadcn@latest add ${origin}/r-steez/foundation.json`;
  const tileCmd = `pnpm dlx shadcn@latest add ${origin}/r-steez/cyberpunk-tile.json`;
  const boilingCmd = `pnpm dlx shadcn@latest add ${origin}/r-steez/boiling-lines.json`;

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>A small design system you can install.</h1>
        <p className={styles.heroLead}>
          Tokens, CSS-module primitives, and a shadcn-compatible registry.
          Built for inspectable demos: clean APIs, motion that respects reduced
          preference, and source you can own or share via npm.
        </p>
        <div className={styles.actions}>
          <Link href="/components" className={styles.button}>
            Browse components
          </Link>
          <Link href="/docs" className={`${styles.button} ${styles.buttonGhost}`}>
            Authoring docs
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Install</h2>
        <p className={styles.body}>Packages when you want shared updates:</p>
        <div className={styles.codeBlock}>
          <code>{packageCmd}</code>
          <CopyButton value={packageCmd} />
        </div>
        <p className={styles.body} style={{ marginTop: "1.25rem" }}>
          Forms starter via the registry CLI:
        </p>
        <div className={styles.codeBlock}>
          <code>{foundationCmd}</code>
          <CopyButton value={foundationCmd} />
        </div>
        <p className={styles.body} style={{ marginTop: "1.25rem" }}>
          Signature surface:
        </p>
        <div className={styles.codeBlock}>
          <code>{tileCmd}</code>
          <CopyButton value={tileCmd} />
        </div>
        <p className={styles.body} style={{ marginTop: "1.25rem" }}>
          Hand-drawn motion:
        </p>
        <div className={styles.codeBlock}>
          <code>{boilingCmd}</code>
          <CopyButton value={boilingCmd} />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Signature craft</h2>
        <p className={styles.body}>
          Start with one surface, one motion treatment, and familiar controls.
          Shared tokens tie the pieces together; the consuming app supplies brand and content.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/components/cyberpunk-tile">Cyberpunk Tile</Link>
            <p className={styles.listMeta}>
              Cut-corner surface with clear framing props. Primary signature component.
            </p>
          </li>
          <li className={styles.listItem}>
            <Link href="/components/boiling-lines">Boiling Lines</Link>
            <p className={styles.listMeta}>
              One motion primitive, three intensity presets, automatic reduced motion.
            </p>
          </li>
          <li className={styles.listItem}>
            <Link href="/components/cyberpunk-input">Foundation forms</Link>
            <p className={styles.listMeta}>
              Inputs, select, checkbox, slider — labeled fields with described-by wiring.
            </p>
          </li>
        </ul>
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
        <h2 className={styles.sectionTitle}>Explore</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/components">Component catalog</Link>
            <p className={styles.listMeta}>Filter by category; open one primitive at a time.</p>
          </li>
          <li className={styles.listItem}>
            <Link href="/registry">Registry endpoints</Link>
            <p className={styles.listMeta}>Canonical payloads under /r-steez.</p>
          </li>
          <li className={styles.listItem}>
            <Link href="/docs">Authoring model</Link>
            <p className={styles.listMeta}>Package → catalog → preview → registry.</p>
          </li>
        </ul>
      </section>
    </>
  );
}
