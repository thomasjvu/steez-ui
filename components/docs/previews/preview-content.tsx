"use client";

import {
  AsciiRippleText,
  AvatarStage,
  BlinkText,
  BoilingLines,
  CopyButton,
  CharacterAfterimage,
  CornerBracketCard,
  CyberpunkTile,
  DisplacementFilter,
  ChromaticAberrationFilter,
  GlowFilter,
  GrainFilter,
  DottedHaloCard,
  KineticGlyph,
  KineticTextRamp,
  KineticTextRing,
  KineticTextGlobe,
  KineticTextVolume,
  KineticSwipeText,
  StrokedText,
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

export function BlinkTextPreview() {
  return (
    <div className={styles.previewRow}>
      <BlinkText trigger="mount">system online</BlinkText>
      <BlinkText trigger="hover">hover to blink</BlinkText>
    </div>
  );
}

export function KineticSwipeTextPreview() {
  return (
    <div
      role="group"
      aria-label="Horizontal and vertical kinetic swipe text variants"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
        gap: "0.75rem",
        width: "100%",
      }}
    >
      <div>
        <p className={styles.previewText}>Horizontal</p>
        <KineticSwipeText>SWIPE</KineticSwipeText>
      </div>
      <div>
        <p className={styles.previewText}>Vertical</p>
        <KineticSwipeText direction="vertical">SWIPE</KineticSwipeText>
      </div>
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

export function DisplacementFilterPreview() {
  return (
    <DisplacementFilter className={styles.previewDisplacement} intensity="default">
      <div style={{ display: "grid", gap: "0.8rem", justifyItems: "center", padding: "1.5rem" }}>
        <span style={{ fontSize: "clamp(2rem, 8vw, 5rem)", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 0.9 }}>WARP FIELD</span>
        <span className={styles.previewText}>Wrap any component or artwork.</span>
      </div>
    </DisplacementFilter>
  );
}

export function KineticTextRampPreview() {
  return (
    <KineticTextRamp
      aria-label="Kinetic perspective text ramp reading step it up"
      style={{ width: "100%", maxWidth: "34rem" }}
    >
      STEP IT UP
    </KineticTextRamp>
  );
}

export function KineticTextRingPreview() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        background: "#080808",
        color: "#f7f7f7",
      }}
    >
      <KineticTextRing>KINETIC</KineticTextRing>
    </div>
  );
}

export function KineticTextGlobePreview() {
  return (
    <div style={{ width: "100%", maxWidth: "25rem", background: "#050505" }}>
      <KineticTextGlobe aria-label="Rotating globe of warped type">HELLO</KineticTextGlobe>
    </div>
  );
}

export function KineticTextVolumePreview() {
  return (
    <KineticTextVolume
      aria-label="A rippling perspective cube of repeated ESPACE lettering"
      style={{ width: "100%", maxWidth: "27rem" }}
    >
      ESPACE
    </KineticTextVolume>
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
    <ThemedCard title="Deployment" titleAs="h3" actions={<CopyButton value="pnpm deploy:pages" title="Copy deploy command" />}>
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
          Manage pages, media, and publishing from this panel.
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


export function ChromaticAberrationFilterPreview() {
  return <ChromaticAberrationFilter offset={3} trigger="always" speedMs={700}>
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <span style={{ fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 900, color: "var(--text-primary)" }}>SIGNAL SPLIT</span>
      <p className={styles.previewText}>Red and cyan channel separation.</p>
    </div>
  </ChromaticAberrationFilter>;
}

export function GlowFilterPreview() {
  return <GlowFilter color="#7dd3fc" radius={6}>
    <div style={{ padding: "2rem", textAlign: "center", color: "#7dd3fc" }}>
      <span style={{ fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 800 }}>AFTERGLOW</span>
      <p className={styles.previewText}>The source stays crisp inside the halo.</p>
    </div>
  </GlowFilter>;
}

export function GrainFilterPreview() {
  return <GrainFilter amount={0.4} trigger="always" speedMs={180}>
    <div style={{ padding: "2rem", borderRadius: "1rem", background: "linear-gradient(120deg, #924e6b, #4f567d, #357c7a)", color: "white" }}>
      <span style={{ fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 800 }}>FILM GRAIN</span>
      <p>Texture follows the content, including rounded corners.</p>
    </div>
  </GrainFilter>;
}
