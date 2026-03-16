export type ComponentCategory =
  | "actions"
  | "forms"
  | "surfaces"
  | "layout"
  | "feedback";

export interface ComponentDoc {
  slug: string;
  title: string;
  category: ComponentCategory;
  summary: string;
  description: string;
  packageImport: string;
  usage: string;
  related: string[];
  tags: string[];
}

export const COMPONENT_CATEGORY_LABELS: Record<ComponentCategory, string> = {
  actions: "Actions",
  forms: "Forms",
  surfaces: "Surfaces",
  layout: "Layout",
  feedback: "Feedback",
};

export const COMPONENT_FILTERS = [
  { value: "all", label: "All" },
  { value: "actions", label: "Actions" },
  { value: "forms", label: "Forms" },
  { value: "surfaces", label: "Surfaces" },
  { value: "layout", label: "Layout" },
  { value: "feedback", label: "Feedback" },
] as const;

export type ComponentFilter = (typeof COMPONENT_FILTERS)[number]["value"];

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: "avatar-stage",
    title: "Avatar Stage",
    category: "surfaces",
    summary: "Framed avatar viewport with a stable shell, viewport width, and bottom divider.",
    description: "Use AvatarStage when VRM, Live2D, PNGTuber, or image-based character views need one stable shell instead of per-page framing logic.",
    packageImport: 'import { AvatarStage } from "@steez-ui/ui";',
    usage: `<AvatarStage stageHeight="34rem" viewportWidth="min(100%, 30rem)">
  <img src="/companion.png" alt="Companion preview" />
</AvatarStage>`,
    related: ["page-template", "cyberpunk-tile"],
    tags: ["avatar", "stage", "shell"],
  },
  {
    slug: "blink-text",
    title: "Blink Text",
    category: "feedback",
    summary: "Minimal blink treatment for hover or mount-triggered attention cues.",
    description: "Use BlinkText for quick-jump links, terminal hints, or other subtle attention grabs without building custom keyframes in every app.",
    packageImport: 'import { BlinkText } from "@steez-ui/ui";',
    usage: `<BlinkText trigger="hover">「 quick jump 」</BlinkText>`,
    related: ["stroked-text", "button"],
    tags: ["motion", "text"],
  },
  {
    slug: "button",
    title: "Button",
    category: "actions",
    summary: "Primary, secondary, and danger actions with shared Steez button styling.",
    description: "Use Button for direct actions where you want the shared Steez interaction surface without reauthoring local variants.",
    packageImport: 'import { Button } from "@steez-ui/ui";',
    usage: `<Button>Deploy</Button>
<Button variant="secondary">Preview</Button>
<Button variant="danger">Remove</Button>`,
    related: ["copy-button", "theme-toggle", "error-message"],
    tags: ["primary", "secondary", "danger"],
  },
  {
    slug: "copy-button",
    title: "Copy Button",
    category: "actions",
    summary: "Clipboard action with built-in copied state and icon feedback.",
    description: "Use CopyButton anywhere a command, ID, or token needs to be copied without wiring your own success state.",
    packageImport: 'import { CopyButton } from "@steez-ui/ui";',
    usage: `<CopyButton value="bun add @steez-ui/ui" />
<CopyButton value={command} title="Copy command" />`,
    related: ["button", "status-message"],
    tags: ["clipboard", "feedback"],
  },
  {
    slug: "cyberpunk-input",
    title: "Cyberpunk Input",
    category: "forms",
    summary: "Monospace text input with label, helper copy, and optional leading icon.",
    description: "Use CyberpunkInput for text, handle, slug, and credential fields that should match the Steez form surface.",
    packageImport: 'import { CyberpunkInput } from "@steez-ui/ui";',
    usage: `<CyberpunkInput
  label="Companion name"
  placeholder="rally"
  helperText="Used in URLs and generated files."
/>`,
    related: ["cyberpunk-textarea", "cyberpunk-select", "cyberpunk-checkbox"],
    tags: ["text", "field", "helper"],
  },
  {
    slug: "cyberpunk-select",
    title: "Cyberpunk Select",
    category: "forms",
    summary: "Select field with shared Steez framing and arrow treatment.",
    description: "Use CyberpunkSelect for compact controlled choices that need to stay visually consistent with the rest of the form system.",
    packageImport: 'import { CyberpunkSelect } from "@steez-ui/ui";',
    usage: `<CyberpunkSelect
  label="Model tier"
  value={tier}
  onChange={(event) => setTier(event.target.value)}
  options={[
    { value: "fast", label: "Fast" },
    { value: "balanced", label: "Balanced" },
  ]}
/>`,
    related: ["cyberpunk-input", "cyberpunk-radio"],
    tags: ["select", "options"],
  },
  {
    slug: "cyberpunk-textarea",
    title: "Cyberpunk Textarea",
    category: "forms",
    summary: "Shared multiline input for prompts, notes, and longer authored content.",
    description: "Use CyberpunkTextarea when the field needs Steez spacing and typography but more room than a single-line input.",
    packageImport: 'import { CyberpunkTextarea } from "@steez-ui/ui";',
    usage: `<CyberpunkTextarea
  label="System prompt"
  rows={6}
  placeholder="Tell the companion how to behave."
/>`,
    related: ["cyberpunk-input", "cyberpunk-select"],
    tags: ["textarea", "prompt", "multiline"],
  },
  {
    slug: "cyberpunk-checkbox",
    title: "Cyberpunk Checkbox",
    category: "forms",
    summary: "Checkbox primitive with label and Steez form spacing.",
    description: "Use CyberpunkCheckbox for boolean settings where a compact inline control is enough.",
    packageImport: 'import { CyberpunkCheckbox } from "@steez-ui/ui";',
    usage: `<CyberpunkCheckbox
  label="Enable auto-posting"
  checked={enabled}
  onChange={setEnabled}
/>`,
    related: ["cyberpunk-radio", "cyberpunk-slider"],
    tags: ["boolean", "settings"],
  },
  {
    slug: "cyberpunk-radio",
    title: "Cyberpunk Radio",
    category: "forms",
    summary: "Radio and radio-group primitives for exclusive choices.",
    description: "Use CyberpunkRadioGroup for compact exclusive selections that should read clearly at a glance.",
    packageImport: 'import { CyberpunkRadioGroup } from "@steez-ui/ui";',
    usage: `<CyberpunkRadioGroup
  name="runtime"
  value={runtime}
  onChange={setRuntime}
  options={[
    { value: "hosted", label: "Hosted" },
    { value: "self-hosted", label: "Self-hosted" },
  ]}
/>`,
    related: ["cyberpunk-select", "cyberpunk-checkbox"],
    tags: ["choice", "group"],
  },
  {
    slug: "cyberpunk-slider",
    title: "Cyberpunk Slider",
    category: "forms",
    summary: "Range input with Steez progress styling and value display.",
    description: "Use CyberpunkSlider for tunable settings such as intensity, thresholds, or timing windows.",
    packageImport: 'import { CyberpunkSlider } from "@steez-ui/ui";',
    usage: `<CyberpunkSlider
  label="Reply energy"
  value={energy}
  onChange={(event) => setEnergy(Number(event.target.value))}
/>`,
    related: ["cyberpunk-checkbox", "loading-progress-bar"],
    tags: ["range", "tuning"],
  },
  {
    slug: "themed-card",
    title: "Themed Card",
    category: "surfaces",
    summary: "Base content container with optional title and featured emphasis.",
    description: "Use ThemedCard as the default flat surface for settings blocks, docs sections, and dashboard cards.",
    packageImport: 'import { ThemedCard } from "@steez-ui/ui";',
    usage: `<ThemedCard title="Deployment">
  <p>Point the companion at a public URL and publish.</p>
</ThemedCard>`,
    related: ["cyberpunk-tile", "corner-bracket-card"],
    tags: ["card", "container"],
  },
  {
    slug: "cyberpunk-tile",
    title: "Cyberpunk Tile",
    category: "surfaces",
    summary: "Angular tile surface for dashboards, launch grids, and compact summaries.",
    description: "Use CyberpunkTile when the surface needs stronger edges than a default card but should still stay flat and lightweight.",
    packageImport: 'import { CyberpunkTile } from "@steez-ui/ui";',
    usage: `<CyberpunkTile>
  <strong>Site runtime</strong>
  <p>Deploy pages, media, and publishing flows.</p>
</CyberpunkTile>`,
    related: ["themed-card", "corner-bracket-card"],
    tags: ["tile", "grid"],
  },
  {
    slug: "corner-bracket-card",
    title: "Corner Bracket Card",
    category: "surfaces",
    summary: "Bracketed feature surface with accent corners for standout content.",
    description: "Use CornerBracketCard when a section needs more visual emphasis without introducing gradients or glow-heavy chrome.",
    packageImport: 'import { CornerBracketCard } from "@steez-ui/ui";',
    usage: `<CornerBracketCard title="Foundation">
  <p>Install tokens, icons, buttons, and forms together.</p>
</CornerBracketCard>`,
    related: ["themed-card", "cyberpunk-tile"],
    tags: ["featured", "accent"],
  },
  {
    slug: "dotted-halo-card",
    title: "Dotted Halo Card",
    category: "surfaces",
    summary: "Flat card with an outer dotted field that sits beyond the main border.",
    description: "Use DottedHaloCard when you want a sharper editorial or showcase surface without gradients, glow, or an extra nested wrapper just to get the outside pattern treatment.",
    packageImport: 'import { DottedHaloCard } from "@steez-ui/ui";',
    usage: `<DottedHaloCard title="My Card">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</DottedHaloCard>`,
    related: ["themed-card", "corner-bracket-card"],
    tags: ["card", "pattern", "editorial"],
  },
  {
    slug: "segmented-control",
    title: "Segmented Control",
    category: "layout",
    summary: "Compact tab-like control for mode switches and view filters.",
    description: "Use SegmentedControl for small, immediate view switches where the content can update in place.",
    packageImport: 'import { SegmentedControl } from "@steez-ui/ui";',
    usage: `<SegmentedControl
  value={mode}
  onChange={setMode}
  options={[
    { value: "registry", label: "Registry" },
    { value: "packages", label: "Packages" },
  ]}
/>`,
    related: ["tabbed-panel", "page-template"],
    tags: ["filters", "switcher"],
  },
  {
    slug: "tabbed-panel",
    title: "Tabbed Panel",
    category: "layout",
    summary: "Simple tabbed container for grouped content and install flows.",
    description: "Use TabbedPanel when each tab needs its own panel content and the interaction should remain explicit.",
    packageImport: 'import { TabbedPanel } from "@steez-ui/ui";',
    usage: `<TabbedPanel
  defaultTab="install"
  tabs={[
    { id: "install", label: "Install", content: <InstallBlock /> },
    { id: "usage", label: "Usage", content: <UsageBlock /> },
  ]}
/>`,
    related: ["segmented-control", "page-template"],
    tags: ["tabs", "panels"],
  },
  {
    slug: "page-header",
    title: "Page Header",
    category: "layout",
    summary: "Neutral page header with title, brand slot, and optional controls.",
    description: "Use PageHeader for consistent page titles and lightweight shell actions without hardcoding product-specific branding.",
    packageImport: 'import { PageHeader } from "@steez-ui/ui";',
    usage: `<PageHeader
  title="Providers"
  description="Routing, failover, and API surfaces."
  brand={<span>SU</span>}
  extra={<Button variant="secondary">Publish</Button>}
/>`,
    related: ["page-template", "theme-toggle"],
    tags: ["header", "brand", "shell"],
  },
  {
    slug: "page-template",
    title: "Page Template",
    category: "layout",
    summary: "Page wrapper that composes the header, subtabs, and content area.",
    description: "Use PageTemplate when a consuming app needs a neutral page shell it can brand and extend locally.",
    packageImport: 'import { PageTemplate } from "@steez-ui/ui";',
    usage: `<PageTemplate
  title="Steez UI"
  description="Standalone primitives and registry payloads."
  subTabs={[
    { id: "overview", label: "Overview" },
    { id: "tokens", label: "Tokens" },
  ]}
>
  <ThemedCard title="Overview">...</ThemedCard>
</PageTemplate>`,
    related: ["page-header", "tabbed-panel"],
    tags: ["layout", "shell"],
  },
  {
    slug: "notched-viewport-frame",
    title: "Notched Viewport Frame",
    category: "layout",
    summary: "Bitkraft-style notched outline shell for viewport framing and overlay chrome.",
    description: "Use NotchedViewportFrame when the interface should live inside one continuous shell instead of isolated corner decorations.",
    packageImport: 'import { NotchedViewportFrame } from "@steez-ui/ui";',
    usage: `<div style={{ position: "relative", minHeight: "28rem" }}>
  <NotchedViewportFrame tone="strong" />
</div>`,
    related: ["radial-menu-overlay", "page-template", "loading-screen"],
    tags: ["frame", "viewport", "shell"],
  },
  {
    slug: "radial-menu-overlay",
    title: "Radial Menu Overlay",
    category: "layout",
    summary: "Full-screen radial navigation surface built around the notched viewport shell.",
    description: "Use RadialMenuOverlay when the product needs one authored navigation moment instead of scattering section links across the viewport.",
    packageImport: 'import { RadialMenuOverlay } from "@steez-ui/ui";',
    usage: `<RadialMenuOverlay
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "studio", label: "Studio", eyebrow: "Creative studio", body: "Launch media and site assets.", href: "#studio" },
    { id: "runtime", label: "Runtime", eyebrow: "One runtime", body: "Five workspaces keep the illusion intact.", href: "#system" },
  ]}
/>`,
    related: ["notched-viewport-frame", "overlay-button", "button"],
    tags: ["overlay", "menu", "navigation"],
  },
  {
    slug: "theme-toggle",
    title: "Theme Toggle",
    category: "layout",
    summary: "Shared light and dark mode switch with document-level persistence.",
    description: "Use ThemeToggle when the consuming app wants the Steez theme switch behavior without rewriting storage and root-attribute wiring.",
    packageImport: 'import { ThemeToggle } from "@steez-ui/ui";',
    usage: `<ThemeToggle storageKey="steez-ui-theme" defaultTheme="dark" />`,
    related: ["page-header", "button"],
    tags: ["theme", "light", "dark"],
  },
  {
    slug: "loading-progress-bar",
    title: "Loading Progress Bar",
    category: "feedback",
    summary: "Segmented loading bar for build, deploy, and initialization progress.",
    description: "Use LoadingProgressBar for visible progress states that should feel mechanical and legible rather than glossy.",
    packageImport: 'import { LoadingProgressBar } from "@steez-ui/ui";',
    usage: `<LoadingProgressBar progress={72} valueLabel="72% synced" />`,
    related: ["status-message", "error-message"],
    tags: ["progress", "loading"],
  },
  {
    slug: "loading-screen",
    title: "Loading Screen",
    category: "feedback",
    summary: "Fullscreen or contained loading shell with progress, cross field, and optional branding slots.",
    description: "Use LoadingScreen when an app needs a complete loading state with neutral branding hooks instead of baking product names, logos, and sound behavior into the component itself.",
    packageImport: 'import { LoadingScreen, useLoadingProgress } from "@steez-ui/ui";',
    usage: `<LoadingScreen
  progress={68}
  message="Syncing runtime"
  title="LOADING"
  logo={<img src="/logo.svg" alt="" />}
  footerBrand={<img src="/brand.svg" alt="" />}
  fullscreen={false}
/>`,
    related: ["loading-progress-bar", "loading-overlay-crystalline"],
    tags: ["loading", "shell", "progress"],
  },
  {
    slug: "loading-overlay-crystalline",
    title: "Loading Overlay Crystalline",
    category: "feedback",
    summary: "Compact centered loading card for viewers, canvases, and media shells.",
    description: "Use LoadingOverlayCrystalline when only one surface is loading and you need a small overlay message instead of a full-screen takeover.",
    packageImport: 'import { LoadingOverlayCrystalline } from "@steez-ui/ui";',
    usage: `<LoadingOverlayCrystalline
  message="Preparing avatar"
  subtext="Loading model assets"
  icon={<RefreshIcon width={18} height={18} />}
/>`,
    related: ["loading-screen", "status-message"],
    tags: ["overlay", "loading", "viewer"],
  },
  {
    slug: "status-message",
    title: "Status Message",
    category: "feedback",
    summary: "Inline success, info, and error status surface with shared icon treatment.",
    description: "Use StatusMessage for concise feedback that should stay embedded in the current layout.",
    packageImport: 'import { StatusMessage } from "@steez-ui/ui";',
    usage: `<StatusMessage type="success" message="Registry payloads generated." />`,
    related: ["error-message", "copy-button"],
    tags: ["success", "info", "error"],
  },
  {
    slug: "error-message",
    title: "Error Message",
    category: "feedback",
    summary: "Inline, card, and full-screen error surfaces with optional actions.",
    description: "Use ErrorMessage when the failure state needs more context or retry actions than a compact status line can provide.",
    packageImport: 'import { ErrorMessage } from "@steez-ui/ui";',
    usage: `<ErrorMessage
  title="Build failed"
  message="Registry generation could not finish."
  details={stderr}
  onRetry={handleRetry}
/>`,
    related: ["status-message", "button"],
    tags: ["failure", "retry"],
  },
  {
    slug: "heartbeat-pulse",
    title: "Heartbeat Pulse",
    category: "feedback",
    summary: "Orb and line heartbeat indicators for wake-up loops, sync state, and background activity.",
    description: "Use HeartbeatPulse and HeartbeatIndicator for runtime heartbeat UI without rebuilding the SVG motion treatment in every product.",
    packageImport: 'import { HeartbeatPulse } from "@steez-ui/ui";',
    usage: `<HeartbeatPulse variant="line" width={240} height={84} color="var(--accent-primary)" />`,
    related: ["loading-progress-bar", "status-message"],
    tags: ["heartbeat", "status", "activity"],
  },
  {
    slug: "hexagon-grid",
    title: "Hexagon Grid",
    category: "surfaces",
    summary: "Animated hex field backdrop for avatars, launch surfaces, and atmospheric panels.",
    description: "Use HexagonGrid when a surface needs a reactive geometric backdrop without rebuilding the canvas animation and timing logic locally.",
    packageImport: 'import { HexagonGrid } from "@steez-ui/ui";',
    usage: `<div style={{ position: "relative", minHeight: "18rem" }}>
  <HexagonGrid pointerReactive backgroundOpacity={0.12} />
</div>`,
    related: ["avatar-stage", "runtime-orbit-diagram"],
    tags: ["backdrop", "canvas", "ambient"],
  },
  {
    slug: "quick-info-card",
    title: "Quick Info Card",
    category: "surfaces",
    summary: "Compact multi-stat summary surface with an optional storage meter.",
    description: "Use QuickInfoCard when several small operational stats should sit in one flat summary band instead of separate tiles.",
    packageImport: 'import { QuickInfoCard } from "@steez-ui/ui";',
    usage: `<QuickInfoCard
  items={[
    { label: "Status", value: "Live", valueColor: "success" },
    { label: "Requests", value: "1,024", mono: true },
  ]}
/>`,
    related: ["stat-card", "themed-card"],
    tags: ["summary", "stats", "status"],
  },
  {
    slug: "widget-card",
    title: "Widget Card",
    category: "surfaces",
    summary: "Dashboard widget shell with grid-size presets, header slot, and overlay support.",
    description: "Use WidgetCard when grid-driven admin or monitoring surfaces need a flat reusable widget frame instead of one-off card markup.",
    packageImport: 'import { WidgetCard } from "@steez-ui/ui";',
    usage: `<WidgetCard title="Scene" size="sm-b" overlay={<OverlayButton>+</OverlayButton>}>
  <div>Widget body</div>
</WidgetCard>`,
    related: ["stat-card", "themed-card"],
    tags: ["dashboard", "widget", "grid"],
  },
  {
    slug: "marquee-strip",
    title: "Marquee Strip",
    category: "layout",
    summary: "Continuous horizontal marquee for providers, extensions, or launch lanes.",
    description: "Use MarqueeStrip when a row of repeated pills or labels should move as a single track with consistent duplication and spacing.",
    packageImport: 'import { MarqueeStrip } from "@steez-ui/ui";',
    usage: `<MarqueeStrip
  items={providers}
  durationSeconds={28}
  renderItem={(provider) => <span>{provider}</span>}
/>`,
    related: ["segmented-control", "cyberpunk-tile"],
    tags: ["marquee", "motion", "track"],
  },
  {
    slug: "section",
    title: "Section",
    category: "layout",
    summary: "Simple content section with optional monospace title treatment.",
    description: "Use Section when a page needs consistent vertical rhythm and a lightweight labeled block without a full header card.",
    packageImport: 'import { Section } from "@steez-ui/ui";',
    usage: `<Section title="Browse services">
  <ThemedCard>...</ThemedCard>
</Section>`,
    related: ["section-header", "themed-card"],
    tags: ["group", "layout", "content"],
  },
  {
    slug: "overlay-button",
    title: "Overlay Button",
    category: "actions",
    summary: "Compact floating control button for viewer tools and absolute-positioned UI.",
    description: "Use OverlayButton for media, avatar, or preview controls that need to sit on top of another surface without pulling in a full toolbar system.",
    packageImport: 'import { OverlayButton } from "@steez-ui/ui";',
    usage: `<OverlayButton aria-label="Expand viewer" active>
  <EyeIcon width={16} height={16} />
</OverlayButton>`,
    related: ["button", "pixel-tooltip"],
    tags: ["overlay", "viewer", "control"],
  },
  {
    slug: "pixel-tooltip",
    title: "Pixel Tooltip",
    category: "feedback",
    summary: "Compact hover tooltip with crisp monospace styling for short contextual hints.",
    description: "Use PixelTooltip when controls need inline explanations without adding a larger floating-popover system to the page.",
    packageImport: 'import { PixelTooltip } from "@steez-ui/ui";',
    usage: `<PixelTooltip content="Save configuration" position="top">
  <OverlayButton aria-label="Save">S</OverlayButton>
</PixelTooltip>`,
    related: ["overlay-button", "status-message"],
    tags: ["tooltip", "hover", "hint"],
  },
  {
    slug: "section-header",
    title: "Section Header",
    category: "layout",
    summary: "Framed header row for settings and control panels with optional actions.",
    description: "Use SectionHeader when a product area needs a stronger header surface than a plain title but should stay flat and token-driven.",
    packageImport: 'import { SectionHeader } from "@steez-ui/ui";',
    usage: `<SectionHeader
  title="Appearance Configuration"
  description="Configure avatar rendering and expressions."
  actions={<Button variant="secondary">Save</Button>}
/>`,
    related: ["section", "page-header"],
    tags: ["header", "settings", "actions"],
  },
  {
    slug: "signal-trail-backdrop",
    title: "Signal Trail Backdrop",
    category: "surfaces",
    summary: "WebGL signal-field backdrop for avatar stages and technical hero surfaces.",
    description: "Use SignalTrailBackdrop when a surface needs the animated figure-field treatment without reauthoring the Three.js shader and resize lifecycle locally.",
    packageImport: 'import { SignalTrailBackdrop } from "@steez-ui/ui";',
    usage: `<div style={{ position: "relative", minHeight: "22rem" }}>
  <SignalTrailBackdrop color="#7ae4ff" signalDensity={0.36} />
</div>`,
    related: ["avatar-stage", "hexagon-grid"],
    tags: ["webgl", "backdrop", "motion"],
  },
  {
    slug: "stat-card",
    title: "Stat Card",
    category: "surfaces",
    summary: "Small numeric stat block with optional tone and subvalue.",
    description: "Use StatCard for compact dashboard stats that should read clearly without a larger tile or widget frame.",
    packageImport: 'import { StatCard } from "@steez-ui/ui";',
    usage: `<StatCard
  label="Messages"
  value="1,248"
  subvalue="+12% this week"
/>`,
    related: ["quick-info-card", "themed-card"],
    tags: ["metric", "dashboard", "number"],
  },
  {
    slug: "stroked-text",
    title: "Stroked Text",
    category: "layout",
    summary: "Outlined accent text with optional stroke-to-fill blink on mount.",
    description: "Use StrokedText for large launch words, hero accents, and standout callouts that need a sharper high-contrast treatment than plain filled text.",
    packageImport: 'import { StrokedText } from "@steez-ui/ui";',
    usage: `<StrokedText color="#ff7a72" animateOnMount>
  SPELLBINDING
</StrokedText>`,
    related: ["blink-text", "page-header"],
    tags: ["headline", "outline"],
  },
  {
    slug: "runtime-orbit-diagram",
    title: "Runtime Orbit Diagram",
    category: "layout",
    summary: "Animated path diagram for workspace systems, flows, and runtime maps.",
    description: "Use RuntimeOrbitDiagram when a product surface needs a compact animated topology instead of static icon rows or screenshot placeholders.",
    packageImport: 'import { RuntimeOrbitDiagram } from "@steez-ui/ui";',
    usage: `<RuntimeOrbitDiagram
  nodes={nodes}
  pathOrder={["character", "site", "business", "automations", "operations"]}
/>`,
    related: ["hexagon-grid", "marquee-strip"],
    tags: ["diagram", "topology", "animation"],
  },
];

export function getComponentDoc(slug: string) {
  return COMPONENT_DOCS.find((component) => component.slug === slug);
}
