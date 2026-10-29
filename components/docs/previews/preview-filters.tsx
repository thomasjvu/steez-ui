"use client";

/** SVG filter previews. */
import {
  ChromaticAberrationFilter,
  DisplacementFilter,
  GlowFilter,
  GrainFilter,
} from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export function ChromaticAberrationFilterPreview() {
  return <ChromaticAberrationFilter offset={3} trigger="always" speedMs={700}>
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <span style={{ fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 900, color: "var(--text-primary)" }}>SIGNAL SPLIT</span>
      <p className={styles.previewText}>Red and cyan channel separation.</p>
    </div>
  </ChromaticAberrationFilter>;
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
