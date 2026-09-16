"use client";

import {
  AccordionFeatureCard,
  AsciiRippleText,
  AvatarStage,
  BlinkText,
  BoilingLines,
  CornerBracketCard,
  CyberpunkTile,
  DottedHaloCard,
  StrokedText,
  ThemedCard,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

/** 1×1 transparent PNG — avoids network dependency in offline previews. */
const PLACEHOLDER_IMAGE_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

export function AccordionFeatureCardPreview() {
  return (
    <div className={styles.previewColumn}>
      <AccordionFeatureCard
        title="Signal mesh"
        eyebrow="01 / Surfaces"
        subtitle="Collapsible feature strip"
        description="Expand to reveal body copy, badges, and footer actions without a full accordion system."
        imageSrc={PLACEHOLDER_IMAGE_SRC}
        imageAlt=""
        badge="New"
        defaultExpanded
        footer={<span className={styles.previewText}>Footer slot</span>}
      >
        <p className={styles.previewText}>
          Body slot for richer feature detail or nested controls.
        </p>
      </AccordionFeatureCard>
      <AccordionFeatureCard
        title="Collapsed lane"
        eyebrow="02 / Surfaces"
        subtitle="Starts collapsed"
        description="Toggle to open."
        imageSrc={PLACEHOLDER_IMAGE_SRC}
        imageAlt=""
        defaultExpanded={false}
      />
    </div>
  );
}

export function AsciiRippleTextPreview() {
  return (
    <div className={styles.previewLinkList}>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>Roadside Picnic</AsciiRippleText>
      </a>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>The City &amp; the City</AsciiRippleText>
      </a>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>Parable of the Sower</AsciiRippleText>
      </a>
    </div>
  );
}

export function AvatarStagePreview() {
  return (
    <AvatarStage stageHeight="18rem" viewportWidth="min(100%, 12rem)">
      <div className={styles.avatarStageFigure}>
        <div className={styles.avatarStageHead} />
        <div className={styles.avatarStageBody} />
      </div>
    </AvatarStage>
  );
}

export function BlinkTextPreview() {
  return (
    <div className={styles.previewRow}>
      <BlinkText trigger="mount">system online</BlinkText>
      <BlinkText trigger="hover">hover to blink</BlinkText>
    </div>
  );
}

export function BoilingLinesPreview() {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
    {(["subtle", "default", "intense"] as const).map((intensity) => (
      <div key={intensity}>
        <BoilingLines intensity={intensity}>
          <svg width="140" height="100" viewBox="0 0 140 100" role="img" aria-label={`${intensity} hand-drawn star`}>
            <path d="M70 10 82 35 115 30 98 52 120 78 85 73 70 94 55 73 20 78 42 52 25 30 58 35Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </BoilingLines>
        <p style={{ textAlign: "center" }}>{intensity}</p>
      </div>
    ))}
  </div>;
}

export function ThemedCardPreview() {
  return (
    <ThemedCard title="Deployment">
      <p className={styles.previewText}>Point the companion at a public URL and publish.</p>
    </ThemedCard>
  );
}

export function CyberpunkTilePreview() {
  return (
    <div className={styles.previewRow}>
      <CyberpunkTile>
        <div className={styles.previewHeading}>Site runtime</div>
        <p className={styles.previewText}>
          Pages, media, and publishing flows in one flat surface.
        </p>
      </CyberpunkTile>
      <CyberpunkTile variant="small" center>
        <div className={styles.previewHeading}>Small</div>
      </CyberpunkTile>
    </div>
  );
}

export function CornerBracketCardPreview() {
  return (
    <CornerBracketCard title="Foundation">
      <p className={styles.previewText}>Install tokens, icons, buttons, and forms together.</p>
    </CornerBracketCard>
  );
}

export function DottedHaloCardPreview() {
  return (
    <div className={styles.dottedHaloPreviewGrid}>
      <DottedHaloCard title="My Card">
        <p className={styles.previewText}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          vero blanditiis amet.
        </p>
      </DottedHaloCard>
      <DottedHaloCard title="My Second Card">
        <p className={styles.previewText}>
          Quaerat magni unde ducimus voluptates, sed pariatur perspiciatis
          perferendis.
        </p>
      </DottedHaloCard>
    </div>
  );
}

export function StrokedTextPreview() {
  return (
    <div className={styles.previewColumn}>
      <StrokedText color="#ff7a72" animateOnMount>
        SPELLBINDING
      </StrokedText>
      <StrokedText color="#8ef0ff">UNFORGETTABLE</StrokedText>
    </div>
  );
}
