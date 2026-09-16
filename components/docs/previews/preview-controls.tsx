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

import styles from "../component-docs.module.css";

export function ButtonPreview() {
  return (
    <div className={styles.previewRow}>
      <Button>Deploy</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="danger">Remove</Button>
    </div>
  );
}

export function CopyButtonPreview() {
  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;
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
  return (
    <PageHeader
      title="Providers"
      description="Routing, failover, and API surfaces."
      brand={<span className={styles.previewBrand}>SU</span>}
      brandTitle="Steez UI"
      brandAriaLabel="Steez UI"
      extra={<Button variant="secondary">Publish</Button>}
      onViewerToggle={() => undefined}
      viewerVisible
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
      <OverlayButton aria-label="Refresh">
        <RefreshIcon width={16} height={16} />
      </OverlayButton>
    </div>
  );
}

export function PixelTooltipPreview() {
  return (
    <div className={styles.previewRow}>
      <PixelTooltip content="Save configuration" position="top">
        <OverlayButton aria-label="Save">
          <CheckIcon width={16} height={16} />
        </OverlayButton>
      </PixelTooltip>
      <PixelTooltip content="Open viewer details" position="bottom">
        <OverlayButton aria-label="Inspect">
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
