"use client";

/** Decorative text previews. */
import {
  AsciiRippleText,
  BlinkText,
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
