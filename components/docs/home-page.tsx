"use client";

import Link from "next/link";
import { CopyButton, CyberpunkTile } from "@steez-ui/ui";
import { HomeComponentPreview } from "./home-component-preview";
import styles from "./site-layout.module.css";

export function HomePageContent() {
  const packageCmd = "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";

  const componentCards = [
    { index: "01", label: "Button", preview: "button", href: "/components/button" },
    { index: "02", label: "Input", preview: "cyberpunk-input", href: "/components/cyberpunk-input" },
    { index: "03", label: "Toggle", preview: "theme-toggle", href: "/components/theme-toggle" },
    { index: "04", label: "Tabs", preview: "tabbed-panel", href: "/components/tabbed-panel" },
  ] as const;

  return (
    <div className={styles.homePage}>
      <section className={styles.homeHero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.homeTitle}>
            Build
            <br />
            <span>with signal.</span>
          </h1>
          <p className={styles.homeLead}>
            Primitives, tokens, and motion for interfaces with intent.
          </p>
          <div className={styles.homeActions}>
            <Link href="/components" className={styles.accentButton}>
              Browse components <span aria-hidden="true">↗</span>
            </Link>
            <Link href="#install" className={styles.textButton}>
              Install <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.heroNote}>
            <span className={styles.crossMark} aria-hidden="true">
              +
            </span>
            <span>Beautiful components.</span>
            <span>Higher intent.</span>
          </div>
        </div>

        <div className={styles.heroStage}>
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.stageGrid} aria-hidden="true" />
          <div className={styles.stageFrame}>
            <div className={styles.stageHeader}>
              <span>01 / component</span>
              <span>steez ui</span>
            </div>
            <div className={styles.stageArt}>
              <div className={`${styles.stageShape} ${styles.stageShapeBack}`} />
              <div className={`${styles.stageShape} ${styles.stageShapeMid}`} />
              <div className={`${styles.stageShape} ${styles.stageShapeFront}`} />
              <Link href="/components/cyberpunk-tile" className={styles.featuredCard}>
                <CyberpunkTile
                  className={styles.featuredTile}
                  contentClassName={styles.featuredCardContent}
                  variant="big"
                >
                  <div className={styles.cardStatus}>
                    <span className={styles.statusDot} />
                    Component preview
                  </div>
                  <div className={styles.featuredCardRow}>
                    <div>
                      <h2>Cyberpunk Tile</h2>
                      <p>A shipped surface primitive, composed with real library content.</p>
                    </div>
                    <span className={styles.cardArrow} aria-hidden="true">↗</span>
                  </div>
                </CyberpunkTile>
              </Link>
            </div>
            <div className={styles.stageFooter}>
              <span>CSS Modules</span>
              <span>Composable primitives</span>
            </div>
          </div>
          <div className={styles.stageSideNote}>
            <span className={styles.crossMark} aria-hidden="true">
              +
            </span>
            <span>Interfaces</span>
            <span>that compound</span>
          </div>
          <div className={styles.stageCaption}>
            {"// less noise"}&nbsp;&nbsp; more building
          </div>
        </div>
      </section>

      <section className={styles.installRow} id="install">
        <div className={styles.installLabel}>
          <span className={styles.installTitle}>Install</span>
          <span>One command to get started.</span>
        </div>
        <div className={styles.commandBar}>
          <code>{packageCmd}</code>
          <CopyButton value={packageCmd} />
        </div>
        <Link href="/registry" className={styles.installLink}>
          View registry <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.componentSection}>
        <div className={styles.sectionHeadingRow}>
          <div>
            <h2 className={styles.sectionHeading}>Start with the essentials.</h2>
          </div>
          <Link href="/components" className={styles.sectionLink}>
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.componentRail}>
          {componentCards.map((card) => (
            <article key={card.label} className={styles.componentCard}>
              <div className={styles.componentArt}>
                <HomeComponentPreview preview={card.preview} />
              </div>
              <Link href={card.href} className={styles.componentCardMeta}>
                <span>
                  {card.index}&nbsp;&nbsp; {card.label}
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.homeIndex}>
        <div className={styles.indexBrand}>Steez UI</div>
        <div className={styles.indexLinks}>
          <Link href="/docs">
            <span>01</span> Authoring docs <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/packages">
            <span>02</span> Packages <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/registry">
            <span>03</span> Registry <b aria-hidden="true">↗</b>
          </Link>
        </div>
        <div className={styles.indexNote}>Built by a brighter internet <span>•</span></div>
      </section>
    </div>
  );
}
