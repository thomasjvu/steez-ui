"use client";

import Link from "next/link";
import { CopyButton } from "@steez-ui/ui";
import styles from "./site-layout.module.css";

export function HomePageContent() {
  const packageCmd = "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";

  const componentCards = [
    { index: "01", label: "Button", art: "buttonArt", href: "/components/button" },
    { index: "02", label: "Input", art: "inputArt", href: "/components/cyberpunk-input" },
    { index: "03", label: "Toggle", art: "toggleArt", href: "/components/theme-toggle" },
    { index: "04", label: "Tabs", art: "tabsArt", href: "/components/tabbed-panel" },
  ] as const;

  return (
    <div className={styles.homePage}>
      <section className={styles.homeHero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowTag}>v1.0</span>
            <span>Modular</span>
            <span className={styles.eyebrowDot} aria-hidden="true">
              •
            </span>
            <span>Open source</span>
          </div>
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

        <div className={styles.heroStage} role="img" aria-label="Featured Steez UI component preview">
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.stageGrid} aria-hidden="true" />
          <div className={styles.stageFrame}>
            <div className={styles.stageHeader}>
              <span>01 / component</span>
              <span>steez ui</span>
            </div>
            <div className={styles.stageArt} aria-hidden="true">
              <div className={`${styles.stageShape} ${styles.stageShapeBack}`} />
              <div className={`${styles.stageShape} ${styles.stageShapeMid}`} />
              <div className={`${styles.stageShape} ${styles.stageShapeFront}`} />
              <div className={styles.featuredCard}>
                <div className={styles.cardStatus}>
                  <span className={styles.statusDot} />
                  Online
                </div>
                <div className={styles.featuredCardRow}>
                  <div>
                    <h2>Spectra Card</h2>
                    <p>A flexible surface for modern interfaces.</p>
                  </div>
                  <span className={styles.cardArrow}>↗</span>
                </div>
              </div>
            </div>
            <div className={styles.stageFooter}>
              <span className={styles.stageProgress} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>01 / 03</span>
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
          <span className={styles.sectionKicker}>Install</span>
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
            <span className={styles.sectionKicker}>A small surface area</span>
            <h2 className={styles.sectionHeading}>Start with the essentials.</h2>
          </div>
          <Link href="/components" className={styles.sectionLink}>
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.componentRail}>
          {componentCards.map((card) => (
            <Link key={card.label} href={card.href} className={styles.componentCard}>
              <div className={styles.componentArt} aria-hidden="true">
                <div className={`${styles.artSurface} ${styles[card.art]}`}>
                  {card.art === "buttonArt" ? <span>Button&nbsp; →</span> : null}
                  {card.art === "inputArt" ? <span>Type something…</span> : null}
                  {card.art === "toggleArt" ? <span className={styles.toggleKnob} /> : null}
                  {card.art === "tabsArt" ? (
                    <>
                      <span className={styles.tabActive}>Overview</span>
                      <span>API</span>
                      <span>Examples</span>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={styles.componentCardMeta}>
                <span>
                  {card.index}&nbsp;&nbsp; {card.label}
                </span>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
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
