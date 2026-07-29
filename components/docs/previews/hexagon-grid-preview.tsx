"use client";

import { HexagonGrid } from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export default function HexagonGridPreview() {
  return (
    <div className={styles.hexagonPreviewShell}>
      <HexagonGrid pointerReactive backgroundOpacity={0.08} tone="default" />
      <div className={styles.hexagonPreviewCard}>
        <div className={styles.previewHeading}>Ambient field</div>
        <p className={styles.previewText}>
          Shared backdrop treatment for avatar shells and launch panels.
        </p>
      </div>
    </div>
  );
}
