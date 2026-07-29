"use client";

import { LoadingScreen } from "@steez-ui/ui";

import styles from "../component-docs.module.css";

export default function LoadingScreenPreview() {
  return (
    <div className={styles.loadingScreenPreview}>
      <LoadingScreen
        progress={68}
        message="Syncing runtime"
        title="SYNC"
        footerBrand={<span className={styles.previewBrand}>SU</span>}
        fullscreen={false}
        themeMode="dark"
      />
    </div>
  );
}
