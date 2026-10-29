"use client";

/** Kinetic and decorative text previews. */
import {
  AsciiRippleText,
  BlinkText,
  KineticSwipeText,
  KineticTextGlobe,
  KineticTextRamp,
  KineticTextRing,
  KineticTextVolume,
  StrokedText,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

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

export function KineticTextGlobePreview() {
  return (
    <div style={{ width: "100%", maxWidth: "25rem", background: "#050505" }}>
      <KineticTextGlobe aria-label="Rotating globe of warped type">HELLO</KineticTextGlobe>
    </div>
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
