"use client";

import React from "react";

import {
  Button,
  CopyButton,
  FUIButtonTile,
  OverlayButton,
  PageHeader,
  PixelTooltip,
  SectionHeader,
  ThemeToggle,
} from "@steez-ui/ui";
import {
  CheckIcon,
  EyeIcon,
  InfoIcon,
  RefreshIcon,
  SlidersIcon,
} from "@steez-ui/icons";

import { SITE_URL } from "@/lib/docs/site-data";

import styles from "../component-docs.module.css";

export function ButtonPreview() {
  return (
    <div className={styles.previewRow}>
      <Button>Deploy</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="danger">Remove</Button>
      <CrystalShapes />
    </div>
  );
}

export function CopyButtonPreview() {
  const registryOrigin =
    typeof window === "undefined" ? SITE_URL : window.location.origin;
  const command = `pnpm dlx shadcn@latest add ${registryOrigin}/r-steez/button.json`;

  return (
    <div className={styles.commandPreview}>
      <code className={styles.inlineCode}>{command}</code>
      <CopyButton value={command} />
    </div>
  );
}

export function FUIButtonTilePreview() {
  const [active, setActive] = React.useState("media");
  return (
    <div className={styles.previewRow}>
      <FUIButtonTile
        label="Media"
        icon={<EyeIcon />}
        active={active === "media"}
        onClick={() => setActive("media")}
      />
      <FUIButtonTile
        label="Deploy"
        icon={<RefreshIcon />}
        active={active === "deploy"}
        onClick={() => setActive("deploy")}
      />
      <FUIButtonTile
        label="Settings"
        icon={<SlidersIcon />}
        active={active === "settings"}
        onClick={() => setActive("settings")}
      />
    </div>
  );
}

export function PageHeaderPreview() {
  const [viewerVisible, setViewerVisible] = React.useState(true);

  return (
    <PageHeader
      title="Providers"
      description="Configure API routing and fallback providers."
      brand={<span className={styles.previewBrand}>SU</span>}
      brandTitle="Steez UI"
      brandAriaLabel="Steez UI"
      extra={<Button variant="secondary">Publish</Button>}
      onViewerToggle={() => setViewerVisible((visible) => !visible)}
      viewerVisible={viewerVisible}
    />
  );
}

export function ThemeTogglePreview() {
  return (
    <div className={styles.previewRow}>
      <ThemeToggle storageKey="steez-docs-theme" />
      <div className={styles.previewNote}>Toggles the site theme and persists the choice to local storage.</div>
    </div>
  );
}

export function OverlayButtonPreview() {
  const [active, setActive] = React.useState(true);

  return (
    <div className={styles.previewRow}>
      <OverlayButton
        aria-label="Toggle viewer"
        active={active}
        onClick={() => setActive((current) => !current)}
      >
        <EyeIcon width={16} height={16} />
      </OverlayButton>
      <OverlayButton iconOnly aria-label="Refresh">
        <RefreshIcon width={16} height={16} />
      </OverlayButton>
    </div>
  );
}

export function PixelTooltipPreview() {
  return (
    <div className={styles.previewRow}>
      <PixelTooltip content="Save configuration" position="top">
        <OverlayButton iconOnly aria-label="Save">
          <CheckIcon width={16} height={16} />
        </OverlayButton>
      </PixelTooltip>
      <PixelTooltip content="Open viewer details" position="bottom">
        <OverlayButton iconOnly aria-label="Inspect">
          <InfoIcon width={16} height={16} />
        </OverlayButton>
      </PixelTooltip>
    </div>
  );
}

export function SectionHeaderPreview() {
  return (
    <SectionHeader
      title="Appearance Configuration"
      description="Configure avatar rendering and expressions."
      actions={<Button variant="secondary">Save</Button>}
    />
  );
}

function CrystalShapes() {
  const [threads, setThreads] = React.useState(0);
  const plus = <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
  return (
    <div className={styles.previewColumn}>
      <div className={styles.previewRow}>
        <Button shape="crystal" href="/components">Open app <span aria-hidden="true">↗</span></Button>
        <Button shape="crystal" onClick={() => setThreads((count) => count + 1)}>New thread</Button>
        <Button shape="crystal" orientation="vertical" aria-label="New thread" onClick={() => setThreads((count) => count + 1)}>{plus}</Button>
        <Button shape="crystal" disabled>Unavailable</Button>
      </div>
      <p className={styles.previewNote} role="status">Threads created: {threads}</p>
    </div>
  );
}
