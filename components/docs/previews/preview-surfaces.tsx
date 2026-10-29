"use client";

/** Surface previews: cards, tiles, stages and artwork. */
import {
  AvatarStage,
  BoilingLines,
  CharacterAfterimage,
  CopyButton,
  CornerBracketCard,
  CyberpunkTile,
  DottedHaloCard,
  KineticGlyph,
  ThemedCard,
} from "@steez-ui/ui";
import { AccordionFeatureCard } from "@steez-ui/ui/blocks";

import { CHARACTER_AFTERIMAGE_PREVIEW_SRC } from "../preview-assets";
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

export function CharacterAfterimagePreview() {
  return (
    <div className={styles.previewRow}>
      <CharacterAfterimage
        src={CHARACTER_AFTERIMAGE_PREVIEW_SRC}
        alt="Pixel explorer with holographic afterimages"
        width={144}
        height={220}
      />
      <CharacterAfterimage
        src={CHARACTER_AFTERIMAGE_PREVIEW_SRC}
        alt="Pixel explorer with an entrance trail"
        width={144}
        height={220}
        entrance
      />
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

export function CyberpunkTilePreview() {
  return (
    <div className={styles.previewRow}>
      <CyberpunkTile>
        <div className={styles.previewHeading}>Site runtime</div>
        <p className={styles.previewText}>
          Manage pages, media, and publishing from this panel.
        </p>
      </CyberpunkTile>
      <CyberpunkTile variant="small" center>
        <div className={styles.previewHeading}>Small</div>
      </CyberpunkTile>
    </div>
  );
}

export function DottedHaloCardPreview() {
  return (
    <div className={styles.dottedHaloPreviewGrid}>
      <DottedHaloCard title="Design tokens">
        <p className={styles.previewText}>
          Share colors, spacing, and typography across your components.
        </p>
      </DottedHaloCard>
      <DottedHaloCard title="Scoped styles">
        <p className={styles.previewText}>
          CSS Modules keep component styles local to each file.
        </p>
      </DottedHaloCard>
    </div>
  );
}

export function KineticGlyphPreview() {
  return (
    <div
      role="group"
      aria-label="Kinetic glyph letter, number, and icon examples"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
        gap: "0.75rem",
        width: "100%",
      }}
    >
      <KineticGlyph>D</KineticGlyph>
      <KineticGlyph>9</KineticGlyph>
      <KineticGlyph label="Star icon">
        <svg viewBox="0 0 100 100" role="presentation" aria-hidden="true">
          <path d="m50 8 12.5 27.3 29.9 3.3-22.2 20.3 6.1 29.4L50 73.4 23.7 88.3l6.1-29.4L7.6 38.6l29.9-3.3L50 8Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </KineticGlyph>
    </div>
  );
}

export function ThemedCardPreview() {
  return (
    <ThemedCard title="Deployment" titleAs="h3" actions={<CopyButton value="pnpm deploy:pages" title="Copy deploy command" />}>
      <p className={styles.previewText}>Point the companion at a public URL and publish.</p>
    </ThemedCard>
  );
}
