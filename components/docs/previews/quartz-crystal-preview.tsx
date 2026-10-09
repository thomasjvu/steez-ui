"use client";

import React from "react";
import { Button, QuartzCrystal } from "@steez-ui/ui";
import styles from "../component-docs.module.css";

export default function QuartzCrystalPreview() {
  const [paused, setPaused] = React.useState(false);
  const [parallax, setParallax] = React.useState(false);
  return (
    <div className={styles.previewColumn} style={{ width: "100%", alignItems: "center" }}>
      <div style={{ display: "grid", placeItems: "center", minHeight: 440, width: "100%", overflow: "hidden" }}>
        <QuartzCrystal width={120} height={240} durationMs={5000} floatDistance={15} paused={paused} parallax={parallax} />
      </div>
      <div className={styles.previewRow}>
        <Button variant="secondary" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Resume motion" : "Pause motion"}</Button>
        <Button variant="secondary" aria-pressed={parallax} onClick={() => setParallax((value) => !value)}>Pointer parallax</Button>
      </div>
      <p className={styles.previewNote}>120 × 240px body, plus pointed tips. Motion pauses offscreen and respects reduced motion.</p>
    </div>
  );
}
