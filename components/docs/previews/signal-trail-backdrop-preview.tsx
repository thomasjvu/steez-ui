"use client";

import { SignalTrailBackdrop } from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export default function SignalTrailBackdropPreview() {
  return (
    <div className={styles.signalTrailPreview}>
      <SignalTrailBackdrop
        color="#7ae4ff"
        lineSpeed={0.22}
        signalDensity={0.36}
        trailLength={0.2}
        shapeSize={5.6}
        amplitude={1.15}
        tiltX={-0.04}
        tiltY={-0.02}
        baseOpacity={0.18}
        shapeOpacity={0.32}
      />
      <div className={styles.signalTrailCard}>
        <div className={styles.previewHeading}>Signal surface</div>
        <p className={styles.previewText}>
          Shared animated field for technical hero stages and viewer backdrops.
        </p>
      </div>
    </div>
  );
}
