"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import styles from "./component-docs.module.css";

type PreviewModule = { default: ComponentType };

function PreviewFallback() {
  return <div className={styles.previewNote}>Loading preview…</div>;
}

function makePreview(loader: () => Promise<PreviewModule>) {
  return dynamic(loader, {
    ssr: false,
    loading: () => <PreviewFallback />,
  });
}

function fromSimple(
  name: keyof typeof import("./previews/simple-previews"),
): () => Promise<PreviewModule> {
  return () =>
    import("./previews/simple-previews").then((mod) => ({
      default: mod[name] as ComponentType,
    }));
}

/**
 * Per-slug dynamic loaders. Heavy WebGL/canvas previews live in dedicated
 * chunks; remaining demos share `simple-previews` so the parent never
 * statically imports `@steez-ui/ui`.
 */
const PREVIEW_MAP: Record<string, ComponentType> = {
  "accordion-feature-card": makePreview(fromSimple("AccordionFeatureCardPreview")),
  "ascii-ripple-text": makePreview(fromSimple("AsciiRippleTextPreview")),
  "avatar-stage": makePreview(fromSimple("AvatarStagePreview")),
  "blink-text": makePreview(fromSimple("BlinkTextPreview")),
  button: makePreview(fromSimple("ButtonPreview")),
  "copy-button": makePreview(fromSimple("CopyButtonPreview")),
  "cyberpunk-input": makePreview(fromSimple("CyberpunkInputPreview")),
  "cyberpunk-select": makePreview(fromSimple("CyberpunkSelectPreview")),
  "cyberpunk-textarea": makePreview(fromSimple("CyberpunkTextareaPreview")),
  "cyberpunk-checkbox": makePreview(fromSimple("CyberpunkCheckboxPreview")),
  "cyberpunk-radio": makePreview(fromSimple("CyberpunkRadioPreview")),
  "cyberpunk-slider": makePreview(fromSimple("CyberpunkSliderPreview")),
  "themed-card": makePreview(fromSimple("ThemedCardPreview")),
  "cyberpunk-tile": makePreview(fromSimple("CyberpunkTilePreview")),
  "fui-button-tile": makePreview(fromSimple("FUIButtonTilePreview")),
  "corner-bracket-card": makePreview(fromSimple("CornerBracketCardPreview")),
  "dotted-halo-card": makePreview(fromSimple("DottedHaloCardPreview")),
  "segmented-control": makePreview(fromSimple("SegmentedControlPreview")),
  "tabbed-panel": makePreview(fromSimple("TabbedPanelPreview")),
  "page-header": makePreview(fromSimple("PageHeaderPreview")),
  "page-template": makePreview(fromSimple("PageTemplatePreview")),
  "notched-viewport-frame": makePreview(fromSimple("NotchedViewportFramePreview")),
  "radial-menu-overlay": makePreview(fromSimple("RadialMenuOverlayPreview")),
  "theme-toggle": makePreview(fromSimple("ThemeTogglePreview")),
  "heartbeat-pulse": makePreview(fromSimple("HeartbeatPulsePreview")),
  "hexagon-grid": makePreview(() => import("./previews/hexagon-grid-preview")),
  "loading-overlay-crystalline": makePreview(fromSimple("LoadingOverlayCrystallinePreview")),
  "loading-progress-bar": makePreview(fromSimple("LoadingProgressBarPreview")),
  "loading-screen": makePreview(() => import("./previews/loading-screen-preview")),
  "marquee-strip": makePreview(fromSimple("MarqueeStripPreview")),
  "overlay-button": makePreview(fromSimple("OverlayButtonPreview")),
  "pixel-tooltip": makePreview(fromSimple("PixelTooltipPreview")),
  "quick-info-card": makePreview(fromSimple("QuickInfoCardPreview")),
  "runtime-orbit-diagram": makePreview(
    () => import("./previews/runtime-orbit-diagram-preview"),
  ),
  section: makePreview(fromSimple("SectionPreview")),
  "section-header": makePreview(fromSimple("SectionHeaderPreview")),
  "signal-trail-backdrop": makePreview(
    () => import("./previews/signal-trail-backdrop-preview"),
  ),
  "stat-card": makePreview(fromSimple("StatCardPreview")),
  "status-message": makePreview(fromSimple("StatusMessagePreview")),
  "error-message": makePreview(fromSimple("ErrorMessagePreview")),
  "stroked-text": makePreview(fromSimple("StrokedTextPreview")),
  "widget-card": makePreview(fromSimple("WidgetCardPreview")),
};

/** Slugs with a preview module (for parity checks). */
export const PREVIEW_SLUGS = Object.keys(PREVIEW_MAP);

export function ComponentPreview({ slug }: { slug: string }) {
  const Preview = PREVIEW_MAP[slug];

  if (!Preview) {
    return <div className={styles.previewNote}>Preview unavailable.</div>;
  }

  return <Preview />;
}
