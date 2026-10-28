import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import { PREVIEW_EXAMPLES, type PreviewValues } from "./preview-config";
const ConfiguredPreview = lazy(() => import("./previews/configured-preview"));

import styles from "./component-docs.module.css";

type PreviewModule = { default: ComponentType };

function PreviewFallback() {
  return <div className={styles.previewNote}>Loading preview…</div>;
}

function makePreview(loader: () => Promise<PreviewModule>) {
  return lazy(loader);
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

const fromContent = (name: keyof typeof import("./previews/preview-content")) =>
  fromPreviewModule(() => import("./previews/preview-content"), name);
const fromControls = (
  name: keyof typeof import("./previews/preview-controls"),
) => fromPreviewModule(() => import("./previews/preview-controls"), name);
const fromForms = (name: keyof typeof import("./previews/preview-forms")) =>
  fromPreviewModule(() => import("./previews/preview-forms"), name);
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
  "accordion-feature-card": makePreview(
    fromContent("AccordionFeatureCardPreview"),
  ),
  "ascii-ripple-text": makePreview(fromContent("AsciiRippleTextPreview")),
  "avatar-stage": makePreview(fromContent("AvatarStagePreview")),
  "character-afterimage": makePreview(
    fromContent("CharacterAfterimagePreview"),
  ),
  "blink-text": makePreview(fromContent("BlinkTextPreview")),
  "kinetic-text-ramp": makePreview(fromContent("KineticTextRampPreview")),
  "kinetic-text-ring": makePreview(fromContent("KineticTextRingPreview")),
  "kinetic-text-globe": makePreview(fromContent("KineticTextGlobePreview")),
  "kinetic-text-volume": makePreview(fromContent("KineticTextVolumePreview")),
  "kinetic-swipe-text": makePreview(fromContent("KineticSwipeTextPreview")),
  "kinetic-glyph": makePreview(fromContent("KineticGlyphPreview")),
  "chromatic-aberration-filter": makePreview(fromContent("ChromaticAberrationFilterPreview")),
  "glow-filter": makePreview(fromContent("GlowFilterPreview")),
  "grain-filter": makePreview(fromContent("GrainFilterPreview")),
  "displacement-filter": makePreview(fromContent("DisplacementFilterPreview")),
  "quartz-crystal": makePreview(
    () => import("./previews/quartz-crystal-preview"),
  ),
  button: makePreview(fromControls("ButtonPreview")),
  "copy-button": makePreview(fromControls("CopyButtonPreview")),
  "input": makePreview(fromForms("InputPreview")),
  "select": makePreview(fromForms("SelectPreview")),
  "textarea": makePreview(fromForms("TextareaPreview")),
  "checkbox": makePreview(fromForms("CheckboxPreview")),
  "radio": makePreview(fromForms("RadioPreview")),
  "slider": makePreview(fromForms("SliderPreview")),
  "themed-card": makePreview(fromContent("ThemedCardPreview")),
  "cyberpunk-tile": makePreview(fromContent("CyberpunkTilePreview")),
  "fui-button-tile": makePreview(fromControls("FUIButtonTilePreview")),
  "corner-bracket-card": makePreview(fromContent("CornerBracketCardPreview")),
  "dotted-halo-card": makePreview(fromContent("DottedHaloCardPreview")),
  "segmented-control": makePreview(fromForms("SegmentedControlPreview")),
  "tabbed-panel": makePreview(fromNavigation("TabbedPanelPreview")),
  "page-header": makePreview(fromControls("PageHeaderPreview")),
  "page-template": makePreview(fromNavigation("PageTemplatePreview")),
  "notched-viewport-frame": makePreview(
    fromNavigation("NotchedViewportFramePreview"),
  ),
  "radial-menu-overlay": makePreview(
    fromNavigation("RadialMenuOverlayPreview"),
  ),
  "theme-toggle": makePreview(fromControls("ThemeTogglePreview")),
  "heartbeat-pulse": makePreview(fromFeedback("HeartbeatPulsePreview")),
  "hexagon-grid": makePreview(() => import("./previews/hexagon-grid-preview")),
  "loading-overlay-crystalline": makePreview(
    fromFeedback("LoadingOverlayCrystallinePreview"),
  ),
  "loading-progress-bar": makePreview(
    fromFeedback("LoadingProgressBarPreview"),
  ),
  "loading-screen": makePreview(
    () => import("./previews/loading-screen-preview"),
  ),
  "marquee-strip": makePreview(fromFeedback("MarqueeStripPreview")),
  "overlay-button": makePreview(fromControls("OverlayButtonPreview")),
  "pixel-tooltip": makePreview(fromControls("PixelTooltipPreview")),
  "quick-info-card": makePreview(fromFeedback("QuickInfoCardPreview")),
  "runtime-orbit-diagram": makePreview(
    () => import("./previews/runtime-orbit-diagram-preview"),
  ),
  section: makePreview(fromNavigation("SectionPreview")),
  "section-header": makePreview(fromControls("SectionHeaderPreview")),
  "stat-card": makePreview(fromFeedback("StatCardPreview")),
  "status-message": makePreview(fromFeedback("StatusMessagePreview")),
  "error-message": makePreview(fromFeedback("ErrorMessagePreview")),
  "stroked-text": makePreview(fromContent("StrokedTextPreview")),
  "widget-card": makePreview(fromFeedback("WidgetCardPreview")),
};

/** Slugs with a preview module (for parity checks). */
export const PREVIEW_SLUGS = [...new Set([...Object.keys(PREVIEW_MAP), ...Object.keys(PREVIEW_EXAMPLES)])];

export function ComponentPreview({ slug, values = {} }: { slug: string; values?: PreviewValues }) {
  const Preview = PREVIEW_MAP[slug];

  if (!Preview && !PREVIEW_EXAMPLES[slug]) {
    return <div className={styles.previewNote}>Preview unavailable.</div>;
  }

  return (
    <PreviewBoundary key={slug}>
      <ClientPreview>
        <Suspense fallback={<PreviewFallback />}>
          {PREVIEW_EXAMPLES[slug] ? <ConfiguredPreview slug={slug} values={values} /> : Preview ? <Preview /> : null}
        </Suspense>
      </ClientPreview>
    </PreviewBoundary>
  );
}

// Browser-only demos mount after hydration; static docs remain useful without them.
function ClientPreview({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : <PreviewFallback />;
}

class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className={styles.previewNote} role="alert">
        The preview could not load.{" "}
        <button type="button" onClick={() => this.setState({ failed: false })}>
          Try again
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
