import fs from "fs/promises";
import path from "path";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const registryDir = path.join(repoRoot, "apps/registry/public/r");

const itemDefinitions = [
  {
    name: "theme-tokens",
    type: "registry:style",
    title: "Theme Tokens",
    description: "Shared CSS tokens and compatibility aliases for Steez UI consumers.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: [],
    files: [
      { source: "packages/theme/src/tokens.css", target: "styles/steez/tokens.css", type: "registry:file" },
    ],
  },
  {
    name: "icon-provider",
    type: "registry:lib",
    title: "Icon Provider",
    description: "Shared icon provider and icon surface used by Steez primitives.",
    dependencies: ["@steez-ui/icons"],
    registryDependencies: [],
    files: [
      { source: "packages/icons/src/index.ts", target: "lib/steez/icons/index.ts", type: "registry:file" },
      { source: "packages/icons/src/Icon.tsx", target: "lib/steez/icons/Icon.tsx", type: "registry:file" },
      { source: "packages/icons/src/IconProvider.tsx", target: "lib/steez/icons/IconProvider.tsx", type: "registry:file" },
      { source: "packages/icons/src/icons.tsx", target: "lib/steez/icons/icons.tsx", type: "registry:file" },
      { source: "packages/icons/src/types.ts", target: "lib/steez/icons/types.ts", type: "registry:file" },
    ],
  },
  {
    name: "ascii-ripple-text",
    type: "registry:component",
    title: "ASCII Ripple Text",
    description: "Hover-driven ASCII glitch ripple for editorial text links and mono-heavy navigation moments.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/AsciiRippleText.tsx", target: "components/steez/AsciiRippleText.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/AsciiRippleText.module.css", target: "components/steez/AsciiRippleText.module.css", type: "registry:style" },
    ],
  },
  {
    name: "avatar-stage",
    type: "registry:component",
    title: "Avatar Stage",
    description: "Stable avatar viewport shell with backdrop and bottom divider support.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/AvatarStage.tsx", target: "components/steez/AvatarStage.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/AvatarStage.module.css", target: "components/steez/AvatarStage.module.css", type: "registry:style" },
    ],
  },
  {
    name: "blink-text",
    type: "registry:component",
    title: "Blink Text",
    description: "Hover and mount-triggered blink text treatment for small attention cues.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/BlinkText.tsx", target: "components/steez/BlinkText.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/BlinkText.module.css", target: "components/steez/BlinkText.module.css", type: "registry:style" },
    ],
  },
  {
    name: "button",
    type: "registry:component",
    title: "Button",
    description: "Core button primitive with standard and cyberpunk-styled variants.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/Button.tsx", target: "components/steez/Button.tsx", type: "registry:component" },
      { source: "packages/ui/src/styles/Buttons.module.css", target: "components/styles/Buttons.module.css", type: "registry:style" },
    ],
  },
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description: "Clipboard button with built-in success feedback.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "button"],
    files: [
      { source: "packages/ui/src/components/CopyButton.tsx", target: "components/steez/CopyButton.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CopyButton.module.css", target: "components/steez/CopyButton.module.css", type: "registry:style" },
    ],
  },
  {
    name: "cyberpunk-input",
    type: "registry:component",
    title: "Cyberpunk Input",
    description: "Monospace input with shared Steez form framing.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkInput.tsx", target: "components/steez/CyberpunkInput.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkInput.module.css", target: "components/steez/CyberpunkInput.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-select",
    type: "registry:component",
    title: "Cyberpunk Select",
    description: "Select primitive with the shared Steez framing and arrow treatment.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkSelect.tsx", target: "components/steez/CyberpunkSelect.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkSelect.module.css", target: "components/steez/CyberpunkSelect.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-textarea",
    type: "registry:component",
    title: "Cyberpunk Textarea",
    description: "Textarea primitive with the shared Steez form framing.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/CyberpunkTextarea.tsx", target: "components/steez/CyberpunkTextarea.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkTextarea.module.css", target: "components/steez/CyberpunkTextarea.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-checkbox",
    type: "registry:component",
    title: "Cyberpunk Checkbox",
    description: "Checkbox primitive for Steez forms.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkCheckbox.tsx", target: "components/steez/CyberpunkCheckbox.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkCheckbox.module.css", target: "components/steez/CyberpunkCheckbox.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-radio",
    type: "registry:component",
    title: "Cyberpunk Radio",
    description: "Radio and radio group primitives.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkRadio.tsx", target: "components/steez/CyberpunkRadio.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkRadio.module.css", target: "components/steez/CyberpunkRadio.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "cyberpunk-slider",
    type: "registry:component",
    title: "Cyberpunk Slider",
    description: "Slider primitive with Steez progress styling.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkSlider.tsx", target: "components/steez/CyberpunkSlider.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkSlider.module.css", target: "components/steez/CyberpunkSlider.module.css", type: "registry:style" },
      { source: "packages/ui/src/hooks/useStableId.ts", target: "components/hooks/useStableId.ts", type: "registry:file" },
    ],
  },
  {
    name: "themed-card",
    type: "registry:component",
    title: "Themed Card",
    description: "Default Steez card surface.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/ThemedCard.tsx", target: "components/steez/ThemedCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ThemedCard.module.css", target: "components/steez/ThemedCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "cyberpunk-tile",
    type: "registry:component",
    title: "Cyberpunk Tile",
    description: "Angular tile surface for dashboards, docs, and launch pages.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CyberpunkTile.tsx", target: "components/steez/CyberpunkTile.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CyberpunkTile.module.css", target: "components/steez/CyberpunkTile.module.css", type: "registry:style" },
    ],
  },
  {
    name: "corner-bracket-card",
    type: "registry:component",
    title: "Corner Bracket Card",
    description: "Bracketed featured surface with accent corners.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/CornerBracketCard.tsx", target: "components/steez/CornerBracketCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/CornerBracketCard.module.css", target: "components/steez/CornerBracketCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "dotted-halo-card",
    type: "registry:component",
    title: "Dotted Halo Card",
    description: "Flat content card with a dotted field extending beyond the main border.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/DottedHaloCard.tsx", target: "components/steez/DottedHaloCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/DottedHaloCard.module.css", target: "components/steez/DottedHaloCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "segmented-control",
    type: "registry:component",
    title: "Segmented Control",
    description: "Shared segmented control for compact workspace switching.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/SegmentedControl.tsx", target: "components/steez/SegmentedControl.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/SegmentedControl.module.css", target: "components/steez/SegmentedControl.module.css", type: "registry:style" },
    ],
  },
  {
    name: "tabbed-panel",
    type: "registry:component",
    title: "Tabbed Panel",
    description: "Simple tabbed panel for registry consumers.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/TabbedPanel.tsx", target: "components/steez/TabbedPanel.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/TabbedPanel.module.css", target: "components/steez/TabbedPanel.module.css", type: "registry:style" },
    ],
  },
  {
    name: "page-header",
    type: "registry:component",
    title: "Page Header",
    description: "Neutral page header with optional icon, brand, and controls.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/PageHeader.tsx", target: "components/steez/PageHeader.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/PageHeader.module.css", target: "components/steez/PageHeader.module.css", type: "registry:style" },
    ],
  },
  {
    name: "page-template",
    type: "registry:component",
    title: "Page Template",
    description: "Layout wrapper that composes the Steez page header and subtabs.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "page-header"],
    files: [
      { source: "packages/ui/src/components/PageTemplate.tsx", target: "components/steez/PageTemplate.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/PageTemplate.module.css", target: "components/steez/PageTemplate.module.css", type: "registry:style" },
    ],
  },
  {
    name: "notched-viewport-frame",
    type: "registry:component",
    title: "Notched Viewport Frame",
    description: "Unified notched outline shell for viewport framing and overlay chrome.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/NotchedViewportFrame.tsx", target: "components/steez/NotchedViewportFrame.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/NotchedViewportFrame.module.css", target: "components/steez/NotchedViewportFrame.module.css", type: "registry:style" },
    ],
  },
  {
    name: "radial-menu-overlay",
    type: "registry:component",
    title: "Radial Menu Overlay",
    description: "Full-screen radial navigation surface built around the notched viewport shell.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "notched-viewport-frame"],
    files: [
      { source: "packages/ui/src/components/RadialMenuOverlay.tsx", target: "components/steez/RadialMenuOverlay.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/RadialMenuOverlay.module.css", target: "components/steez/RadialMenuOverlay.module.css", type: "registry:style" },
      { source: "packages/ui/src/components/NotchedViewportFrame.tsx", target: "components/steez/NotchedViewportFrame.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/NotchedViewportFrame.module.css", target: "components/steez/NotchedViewportFrame.module.css", type: "registry:style" },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:component",
    title: "Theme Toggle",
    description: "Shared dark and light theme toggle.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/ThemeToggle.tsx", target: "components/steez/ThemeToggle.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ThemeToggle.module.css", target: "components/steez/ThemeToggle.module.css", type: "registry:style" },
    ],
  },
  {
    name: "loading-screen",
    type: "registry:component",
    title: "Loading Screen",
    description: "Fullscreen or contained loading shell with progress, cross field, and neutral branding hooks.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "loading-progress-bar"],
    files: [
      { source: "packages/ui/src/components/LoadingScreen.tsx", target: "components/steez/LoadingScreen.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/LoadingScreen.module.css", target: "components/steez/LoadingScreen.module.css", type: "registry:style" },
      { source: "packages/ui/src/components/LoadingProgressBar.tsx", target: "components/steez/LoadingProgressBar.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/LoadingProgressBar.module.css", target: "components/steez/LoadingProgressBar.module.css", type: "registry:style" },
    ],
  },
  {
    name: "loading-overlay-crystalline",
    type: "registry:component",
    title: "Loading Overlay Crystalline",
    description: "Compact centered loading overlay for viewer and media surfaces.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/LoadingOverlayCrystalline.tsx", target: "components/steez/LoadingOverlayCrystalline.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/LoadingOverlayCrystalline.module.css", target: "components/steez/LoadingOverlayCrystalline.module.css", type: "registry:style" },
    ],
  },
  {
    name: "loading-progress-bar",
    type: "registry:component",
    title: "Loading Progress Bar",
    description: "Progress bar with segmented loading bars.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/LoadingProgressBar.tsx", target: "components/steez/LoadingProgressBar.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/LoadingProgressBar.module.css", target: "components/steez/LoadingProgressBar.module.css", type: "registry:style" },
    ],
  },
  {
    name: "heartbeat-pulse",
    type: "registry:component",
    title: "Heartbeat Pulse",
    description: "Orb and line heartbeat indicators for recurring runtime activity.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/HeartbeatPulse.tsx", target: "components/steez/HeartbeatPulse.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/HeartbeatPulse.module.css", target: "components/steez/HeartbeatPulse.module.css", type: "registry:style" },
    ],
  },
  {
    name: "hexagon-grid",
    type: "registry:component",
    title: "Hexagon Grid",
    description: "Animated hex field backdrop for avatars, hero surfaces, and ambient panels.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/HexagonGrid.tsx", target: "components/steez/HexagonGrid.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/HexagonGrid.module.css", target: "components/steez/HexagonGrid.module.css", type: "registry:style" },
    ],
  },
  {
    name: "overlay-button",
    type: "registry:component",
    title: "Overlay Button",
    description: "Compact floating control button for viewer and media overlays.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/OverlayButton.tsx", target: "components/steez/OverlayButton.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/OverlayButton.module.css", target: "components/steez/OverlayButton.module.css", type: "registry:style" },
    ],
  },
  {
    name: "pixel-tooltip",
    type: "registry:component",
    title: "Pixel Tooltip",
    description: "Compact hover tooltip for terse control hints.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/PixelTooltip.tsx", target: "components/steez/PixelTooltip.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/PixelTooltip.module.css", target: "components/steez/PixelTooltip.module.css", type: "registry:style" },
    ],
  },
  {
    name: "quick-info-card",
    type: "registry:component",
    title: "Quick Info Card",
    description: "Compact multi-stat summary surface with an optional storage meter.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/QuickInfoCard.tsx", target: "components/steez/QuickInfoCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/QuickInfoCard.module.css", target: "components/steez/QuickInfoCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "widget-card",
    type: "registry:component",
    title: "Widget Card",
    description: "Dashboard widget shell with size presets and optional overlay content.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/WidgetCard.tsx", target: "components/steez/WidgetCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/WidgetCard.module.css", target: "components/steez/WidgetCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "marquee-strip",
    type: "registry:component",
    title: "Marquee Strip",
    description: "Continuous horizontal marquee track for providers, skills, and launch lanes.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/MarqueeStrip.tsx", target: "components/steez/MarqueeStrip.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/MarqueeStrip.module.css", target: "components/steez/MarqueeStrip.module.css", type: "registry:style" },
    ],
  },
  {
    name: "section",
    type: "registry:component",
    title: "Section",
    description: "Simple content section with optional monospace title treatment.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/Section.tsx", target: "components/steez/Section.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/Section.module.css", target: "components/steez/Section.module.css", type: "registry:style" },
    ],
  },
  {
    name: "section-header",
    type: "registry:component",
    title: "Section Header",
    description: "Framed header row for settings and control panels with optional actions.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/SectionHeader.tsx", target: "components/steez/SectionHeader.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/SectionHeader.module.css", target: "components/steez/SectionHeader.module.css", type: "registry:style" },
    ],
  },
  {
    name: "signal-trail-backdrop",
    type: "registry:component",
    title: "Signal Trail Backdrop",
    description: "WebGL signal-field backdrop for technical hero and viewer surfaces.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons", "three"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/SignalTrailBackdrop.tsx", target: "components/steez/SignalTrailBackdrop.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/SignalTrailBackdrop.module.css", target: "components/steez/SignalTrailBackdrop.module.css", type: "registry:style" },
    ],
  },
  {
    name: "stat-card",
    type: "registry:component",
    title: "Stat Card",
    description: "Compact metric surface with optional tone and subvalue.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/StatCard.tsx", target: "components/steez/StatCard.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/StatCard.module.css", target: "components/steez/StatCard.module.css", type: "registry:style" },
    ],
  },
  {
    name: "status-message",
    type: "registry:component",
    title: "Status Message",
    description: "Success, error, and info toast primitive.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/StatusMessage.tsx", target: "components/steez/StatusMessage.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/StatusMessage.module.css", target: "components/steez/StatusMessage.module.css", type: "registry:style" },
    ],
  },
  {
    name: "stroked-text",
    type: "registry:component",
    title: "Stroked Text",
    description: "Outlined accent text with an optional mount-time stroke-to-fill blink.",
    dependencies: ["@steez-ui/theme"],
    registryDependencies: ["theme-tokens"],
    files: [
      { source: "packages/ui/src/components/StrokedText.tsx", target: "components/steez/StrokedText.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/StrokedText.module.css", target: "components/steez/StrokedText.module.css", type: "registry:style" },
    ],
  },
  {
    name: "runtime-orbit-diagram",
    type: "registry:component",
    title: "Runtime Orbit Diagram",
    description: "Animated workspace topology diagram with icon nodes and moving path marker.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider"],
    files: [
      { source: "packages/ui/src/components/RuntimeOrbitDiagram.tsx", target: "components/steez/RuntimeOrbitDiagram.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/RuntimeOrbitDiagram.module.css", target: "components/steez/RuntimeOrbitDiagram.module.css", type: "registry:style" },
    ],
  },
  {
    name: "error-message",
    type: "registry:component",
    title: "Error Message",
    description: "Inline, card, and fullscreen error message surface.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: ["theme-tokens", "icon-provider", "button"],
    files: [
      { source: "packages/ui/src/components/ErrorMessage.tsx", target: "components/steez/ErrorMessage.tsx", type: "registry:component" },
      { source: "packages/ui/src/components/ErrorMessage.module.css", target: "components/steez/ErrorMessage.module.css", type: "registry:style" },
      { source: "packages/ui/src/styles/Buttons.module.css", target: "components/styles/Buttons.module.css", type: "registry:style" },
    ],
  },
  {
    name: "foundation",
    type: "registry:block",
    title: "Foundation Preset",
    description: "Install theme tokens, icon provider, buttons, and core form primitives together.",
    dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
    registryDependencies: [
      "theme-tokens",
      "icon-provider",
      "button",
      "copy-button",
      "cyberpunk-input",
      "cyberpunk-select",
      "cyberpunk-textarea",
      "cyberpunk-checkbox",
      "cyberpunk-radio",
      "cyberpunk-slider"
    ],
    files: []
  },
];

function validateItem(item) {
  if (!item.name || !item.type || !Array.isArray(item.files) || !Array.isArray(item.dependencies)) {
    throw new Error(`Invalid registry item: ${item.name || "<missing>"}`);
  }
}

async function readFileContent(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return {
    absolutePath,
    content: await fs.readFile(absolutePath, "utf8"),
  };
}

await fs.mkdir(registryDir, { recursive: true });

const indexItems = [];

for (const item of itemDefinitions) {
  validateItem(item);

  const files = [];

  for (const file of item.files) {
    const fileData = await readFileContent(file.source);
    files.push({
      path: file.target,
      type: file.type,
      content: fileData.content,
      source: file.source,
    });
  }

  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files,
  };

  await fs.writeFile(
    path.join(registryDir, `${item.name}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
  );

  indexItems.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
  });
}

await fs.writeFile(
  path.join(registryDir, "index.json"),
  `${JSON.stringify(indexItems, null, 2)}\n`,
);
