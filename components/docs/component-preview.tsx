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

const fromSurfaces = (name: keyof typeof import("./previews/preview-surfaces")) =>
  fromPreviewModule(() => import("./previews/preview-surfaces"), name);
const fromText = (name: keyof typeof import("./previews/preview-text")) =>
  fromPreviewModule(() => import("./previews/preview-text"), name);
const fromFilters = (name: keyof typeof import("./previews/preview-filters")) =>
  fromPreviewModule(() => import("./previews/preview-filters"), name);
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
  "boiling-lines": makePreview(fromSurfaces("BoilingLinesPreview")),
  "accordion-feature-card": makePreview(
    fromSurfaces("AccordionFeatureCardPreview"),
  ),
  "ascii-ripple-text": makePreview(fromText("AsciiRippleTextPreview")),
  "avatar-stage": makePreview(fromSurfaces("AvatarStagePreview")),
  "character-afterimage": makePreview(
    fromSurfaces("CharacterAfterimagePreview"),
  ),
  "blink-text": makePreview(fromText("BlinkTextPreview")),
  "kinetic-text-ramp": makePreview(fromText("KineticTextRampPreview")),
  "kinetic-text-ring": makePreview(fromText("KineticTextRingPreview")),
  "kinetic-text-globe": makePreview(fromText("KineticTextGlobePreview")),
  "kinetic-text-volume": makePreview(fromText("KineticTextVolumePreview")),
  "kinetic-swipe-text": makePreview(fromText("KineticSwipeTextPreview")),
  "kinetic-glyph": makePreview(fromSurfaces("KineticGlyphPreview")),
  "chromatic-aberration-filter": makePreview(fromFilters("ChromaticAberrationFilterPreview")),
  "glow-filter": makePreview(fromFilters("GlowFilterPreview")),
  "grain-filter": makePreview(fromFilters("GrainFilterPreview")),
  "displacement-filter": makePreview(fromFilters("DisplacementFilterPreview")),
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
  "themed-card": makePreview(fromSurfaces("ThemedCardPreview")),
  "cyberpunk-tile": makePreview(fromSurfaces("CyberpunkTilePreview")),
  "fui-button-tile": makePreview(fromControls("FUIButtonTilePreview")),
  "corner-bracket-card": makePreview(fromSurfaces("CornerBracketCardPreview")),
  "dotted-halo-card": makePreview(fromSurfaces("DottedHaloCardPreview")),
  "segmented-control": makePreview(fromForms("SegmentedControlPreview")),
  "tabbed-panel": makePreview(fromNavigation("TabbedPanelPreview")),
  "page-header": makePreview(fromControls("PageHeaderPreview")),
  "page-template": makePreview(fromNavigation("PageTemplatePreview")),
  "notched-viewport-frame": makePreview(
    fromNavigation("NotchedViewportFramePreview"),
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
  "stroked-text": makePreview(fromText("StrokedTextPreview")),
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
