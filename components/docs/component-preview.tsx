"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { COMPONENT_MANIFEST } from "../../lib/docs/component-manifest.mjs";
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

function fromPreviewModule<T extends object>(
  loader: () => Promise<T>,
  name: keyof T,
): () => Promise<PreviewModule> {
  return () =>
    loader().then((mod) => ({
      default: mod[name] as ComponentType,
    }));
}

const fromContent = (
  name: keyof typeof import("./previews/preview-content"),
) => fromPreviewModule(() => import("./previews/preview-content"), name);
const fromControls = (
  name: keyof typeof import("./previews/preview-controls"),
) => fromPreviewModule(() => import("./previews/preview-controls"), name);
const fromForms = (
  name: keyof typeof import("./previews/preview-forms"),
) => fromPreviewModule(() => import("./previews/preview-forms"), name);
const fromNavigation = (
  name: keyof typeof import("./previews/preview-navigation"),
) => fromPreviewModule(() => import("./previews/preview-navigation"), name);
const fromFeedback = (
  name: keyof typeof import("./previews/preview-feedback"),
) => fromPreviewModule(() => import("./previews/preview-feedback"), name);

/**
 * Per-slug dynamic loaders. Heavy WebGL/canvas previews live in dedicated
 * chunks; lightweight demos use bounded category chunks so the parent never
 * statically imports the complete `@steez-ui/ui` surface.
 */
const PREVIEW_MAP: Record<string, ComponentType> = {
  "boiling-lines": makePreview(fromContent("BoilingLinesPreview")),
  "accordion-feature-card": makePreview(fromContent("AccordionFeatureCardPreview")),
  "ascii-ripple-text": makePreview(fromContent("AsciiRippleTextPreview")),
  "avatar-stage": makePreview(fromContent("AvatarStagePreview")),
  "blink-text": makePreview(fromContent("BlinkTextPreview")),
  button: makePreview(fromControls("ButtonPreview")),
  "copy-button": makePreview(fromControls("CopyButtonPreview")),
  "cyberpunk-input": makePreview(fromForms("CyberpunkInputPreview")),
  "cyberpunk-select": makePreview(fromForms("CyberpunkSelectPreview")),
  "cyberpunk-textarea": makePreview(fromForms("CyberpunkTextareaPreview")),
  "cyberpunk-checkbox": makePreview(fromForms("CyberpunkCheckboxPreview")),
  "cyberpunk-radio": makePreview(fromForms("CyberpunkRadioPreview")),
  "cyberpunk-slider": makePreview(fromForms("CyberpunkSliderPreview")),
  "themed-card": makePreview(fromContent("ThemedCardPreview")),
  "cyberpunk-tile": makePreview(fromContent("CyberpunkTilePreview")),
  "fui-button-tile": makePreview(fromControls("FUIButtonTilePreview")),
  "corner-bracket-card": makePreview(fromContent("CornerBracketCardPreview")),
  "dotted-halo-card": makePreview(fromContent("DottedHaloCardPreview")),
  "segmented-control": makePreview(fromForms("SegmentedControlPreview")),
  "tabbed-panel": makePreview(fromNavigation("TabbedPanelPreview")),
  "page-header": makePreview(fromControls("PageHeaderPreview")),
  "page-template": makePreview(fromNavigation("PageTemplatePreview")),
  "notched-viewport-frame": makePreview(fromNavigation("NotchedViewportFramePreview")),
  "radial-menu-overlay": makePreview(fromNavigation("RadialMenuOverlayPreview")),
  "theme-toggle": makePreview(fromControls("ThemeTogglePreview")),
  "heartbeat-pulse": makePreview(fromFeedback("HeartbeatPulsePreview")),
  "hexagon-grid": makePreview(() => import("./previews/hexagon-grid-preview")),
  "loading-overlay-crystalline": makePreview(fromFeedback("LoadingOverlayCrystallinePreview")),
  "loading-progress-bar": makePreview(fromFeedback("LoadingProgressBarPreview")),
  "loading-screen": makePreview(() => import("./previews/loading-screen-preview")),
  "marquee-strip": makePreview(fromFeedback("MarqueeStripPreview")),
  "overlay-button": makePreview(fromControls("OverlayButtonPreview")),
  "pixel-tooltip": makePreview(fromControls("PixelTooltipPreview")),
  "quick-info-card": makePreview(fromFeedback("QuickInfoCardPreview")),
  "runtime-orbit-diagram": makePreview(
    () => import("./previews/runtime-orbit-diagram-preview"),
  ),
  section: makePreview(fromNavigation("SectionPreview")),
  "section-header": makePreview(fromControls("SectionHeaderPreview")),
  "signal-trail-backdrop": makePreview(
    () => import("./previews/signal-trail-backdrop-preview"),
  ),
  "stat-card": makePreview(fromFeedback("StatCardPreview")),
  "status-message": makePreview(fromFeedback("StatusMessagePreview")),
  "error-message": makePreview(fromFeedback("ErrorMessagePreview")),
  "stroked-text": makePreview(fromContent("StrokedTextPreview")),
  "widget-card": makePreview(fromFeedback("WidgetCardPreview")),
};

/** Slugs with a preview module (for parity checks). */
export const PREVIEW_SLUGS = COMPONENT_MANIFEST
  .filter((component) => component.previewLoader)
  .map((component) => component.slug);

export function ComponentPreview({ slug }: { slug: string }) {
  const Preview = PREVIEW_MAP[slug];

  if (!Preview) {
    return <div className={styles.previewNote}>Preview unavailable.</div>;
  }

  return <Preview />;
}
