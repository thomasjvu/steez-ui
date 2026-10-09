import { COMPONENT_MANIFEST } from "./component-manifest.mjs";

export const COMPONENT_FILTERS = [
  { value: "all", label: "All" },
  { value: "actions", label: "Actions" },
  { value: "forms", label: "Forms" },
  { value: "surfaces", label: "Surfaces" },
  { value: "filters", label: "Filters" },
  { value: "layout", label: "Layout" },
  { value: "feedback", label: "Feedback" },
] as const;

export type ComponentFilter = (typeof COMPONENT_FILTERS)[number]["value"];
export type ComponentCategory = Exclude<ComponentFilter, "all">;

export const COMPONENT_CATEGORY_LABELS = Object.fromEntries(
  COMPONENT_FILTERS.filter((filter) => filter.value !== "all").map(
    (filter) => [filter.value, filter.label],
  ),
) as Record<ComponentCategory, string>;

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

type ComponentDocDetails = Pick<ComponentDoc, "summary" | "usage" | "related" | "tags"> & {
  slug: string;
};

const COMPONENT_DOC_DETAILS = [
  {
    slug: "crystal-button",
    summary: "A six-point crystal action, horizontal with text or vertical with an icon.",
    usage: `<CrystalButton href="/app" tone="loud">Open app</CrystalButton>
<CrystalButton orientation="vertical" aria-label="New thread" onClick={createThread}>
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M12 5v14M5 12h14" />
  </svg>
</CrystalButton>`,
    related: ["button", "quartz-crystal", "cyberpunk-tile"],
    tags: ["button", "link", "crystal"],
  },
  {
    slug: "quartz-crystal",
    summary: "A floating quartz with nine animated facets, local layout, and optional parallax.",
    usage: `<QuartzCrystal color="#ee1401" width={120} height={240} durationMs={5000} parallax />`,
    related: ["crystal-button", "boiling-lines", "hexagon-grid"],
    tags: ["crystal", "decorative", "motion", "parallax"],
  },
  {
    slug: "icon-stack-select",
    summary: "Select an option while keeping its associated icons visible in the closed trigger.",
    usage: `<IconStackSelect
  label="Model"
  value={model}
  onValueChange={setModel}
  options={[
    { value: "fast", label: "Fast", icons: [
      { id: "cloud", label: "Cloud provider", icon: <img src="/cloud.svg" alt="" /> },
      { id: "local", label: "Local provider", icon: <img src="/local.svg" alt="" /> },
    ] },
    { value: "balanced", label: "Balanced" },
    { value: "large", label: "Large (unavailable)", disabled: true },
  ]}
/>`,
    related: ["cyberpunk-select", "segmented-control"],
    tags: ["select", "icons", "keyboard", "popover"],
  },
  {
    slug: "boiling-lines",
    summary: "Hand-drawn motion for artwork, SVG lines, and decorative borders.",
    usage: `<BoilingLines intensity="subtle" speedMs={120}>
  <img src="/artwork.svg" alt="Hand-drawn studio mark" />
</BoilingLines>`,
    related: ["cyberpunk-tile", "stroked-text"], tags: ["motion", "illustration", "hand-drawn"],
  },
  {
    slug: "ascii-ripple-text",
    summary: "Hover-driven glitch ripple that scrambles characters outward from the cursor position.",
    usage: `<a href="/docs">
  <AsciiRippleText>Documentation</AsciiRippleText>
</a>`,
    related: ["blink-text", "stroked-text", "button"],
    tags: ["motion", "text", "editorial"],
  },
  {
    slug: "avatar-stage",
    summary: "Framed avatar viewport with a stable shell, viewport width, and bottom divider.",
    usage: `<AvatarStage stageHeight="34rem" viewportWidth="min(100%, 30rem)">
  <img src="/companion.png" alt="Companion preview" />
</AvatarStage>`,
    related: ["page-template", "cyberpunk-tile"],
    tags: ["avatar", "stage", "shell"],
  },
  {
    slug: "blink-text",
    summary: "Minimal blink treatment for hover or mount-triggered attention cues.",
    usage: `<BlinkText trigger="hover">「 quick jump 」</BlinkText>`,
    related: ["stroked-text", "button"],
    tags: ["motion", "text"],
  },
  {
    slug: "kinetic-swipe-text",
    summary: "Bold display type that snaps through a quick horizontal or vertical split.",
    usage: `<KineticSwipeText>SWIPE</KineticSwipeText>
<KineticSwipeText direction="vertical">SWIPE</KineticSwipeText>`,
    related: ["kinetic-glyph", "displacement-filter", "ascii-ripple-text", "stroked-text"],
    tags: ["motion", "text", "headline"],
  },
  {
    slug: "kinetic-glyph",
    summary: "Nested contour animation for a letter, number, or icon with a soft displacement ripple.",
    usage: `<KineticGlyph>D</KineticGlyph>
<KineticGlyph label="Compass icon"><CompassIcon /></KineticGlyph>`,
    related: ["displacement-filter", "kinetic-swipe-text", "stroked-text"],
    tags: ["motion", "glyph", "type", "icon"],
  },
  {
    slug: "displacement-filter",
    summary: "Reusable animated SVG displacement that can wrap text, icons, or any component.",
    usage: `<DisplacementFilter intensity="subtle">
  <KineticGlyph>D</KineticGlyph>
</DisplacementFilter>

<DisplacementFilter scale={10} trigger="hover">
  <Button>Distorted action</Button>
</DisplacementFilter>`,
    related: ["kinetic-glyph", "boiling-lines", "kinetic-swipe-text"],
    tags: ["filter", "displacement", "motion", "composition"],
  },
  {
    slug: "kinetic-text-ramp",
    summary: "Oversized type scrolls across a receding perspective plane with a hard shadow edge.",
    usage: `<KineticTextRamp>STEP IT UP</KineticTextRamp>
<KineticTextRamp trigger="hover" rows={10}>MAKE SOME NOISE</KineticTextRamp>`,
    related: ["kinetic-swipe-text", "ascii-ripple-text", "marquee-strip"],
    tags: ["motion", "text", "perspective", "headline"],
  },
  {
    slug: "kinetic-text-ring",
    summary: "A looping, curved type ring built with SVG and CSS motion.",
    usage: `<KineticTextRing>KINETIC</KineticTextRing>
<KineticTextRing direction="counterclockwise" pauseOnHover>
  TYPE IN MOTION
</KineticTextRing>`,
    related: ["kinetic-text-ramp", "kinetic-swipe-text", "marquee-strip"],
    tags: ["motion", "text", "typography"],
  },
  {
    slug: "kinetic-text-globe",
    summary: "Bold display type wraps around a high contrast sphere that rotates in place.",
    usage: `<KineticTextGlobe>HELLO</KineticTextGlobe>
<KineticTextGlobe direction="counterclockwise" pauseOnHover durationMs={24000}>
  KEEP MOVING
</KineticTextGlobe>`,
    related: ["kinetic-text-ring", "kinetic-text-ramp", "kinetic-glyph"],
    tags: ["motion", "text", "typography", "sphere"],
  },
  {
    slug: "kinetic-text-volume",
    summary: "Repeated type ripples across the three faces of a perspective text volume.",
    usage: `<KineticTextVolume>ESPACE</KineticTextVolume>
<KineticTextVolume rows={12} amplitude={8} pauseOnHover>
  KEEP MOVING
</KineticTextVolume>`,
    related: ["kinetic-text-globe", "kinetic-text-ramp", "kinetic-text-ring"],
    tags: ["motion", "text", "perspective", "field"],
  },
  {
    slug: "button",
    summary: "Primary, secondary, and danger actions with shared Steez button styling.",
    usage: `<Button>Deploy</Button>
<Button variant="secondary">Preview</Button>
<Button variant="danger">Remove</Button>`,
    related: ["copy-button", "theme-toggle", "error-message"],
    tags: ["primary", "secondary", "danger"],
  },
  {
    slug: "character-afterimage",
    summary: "Rainbow holographic silhouettes with an optional one-time entrance trail for character art.",
    usage: `<CharacterAfterimage
  src="/companion.png"
  alt="Pixel companion"
  width={180}
  height={260}
  entrance
/>`,
    related: ["avatar-stage", "boiling-lines"],
    tags: ["motion", "character", "holographic"],
  },
  {
    slug: "copy-button",
    summary: "Clipboard action with built-in copied state and icon feedback.",
    usage: `<CopyButton value="bun add @steez-ui/ui" />
<CopyButton value={command} title="Copy command" />`,
    related: ["button", "status-message"],
    tags: ["clipboard", "feedback"],
  },
  {
    slug: "cyberpunk-input",
    summary: "Monospace text input with label, helper copy, and optional leading icon.",
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
    summary: "Select field with shared Steez framing and arrow treatment.",
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
    summary: "Shared multiline input for prompts, notes, and longer authored content.",
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
    summary: "Checkbox primitive with label and Steez form spacing.",
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
    summary: "Radio and radio-group primitives for exclusive choices.",
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
    summary: "Native range with value display and an optional square-to-diamond thumb.",
    usage: `<CyberpunkSlider
  variant="diamond"
  label="Volume"
  value={volume}
  onChange={(event) => setVolume(Number(event.target.value))}
/>`,
    related: ["cyberpunk-checkbox", "loading-progress-bar"],
    tags: ["range", "tuning"],
  },
  {
    slug: "themed-card",
    summary: "Base content container with optional title and featured emphasis.",
    usage: `<ThemedCard title="Deployment">
  <p>Point the companion at a public URL and publish.</p>
</ThemedCard>`,
    related: ["cyberpunk-tile", "corner-bracket-card"],
    tags: ["card", "container"],
  },
  {
    slug: "cyberpunk-tile",
    summary: "Cut-corner tile with dual-layer border (top-right + bottom-left clips).",
    usage: `<CyberpunkTile>
  <strong>Site runtime</strong>
  <p>Deploy pages, media, and publishing flows.</p>
</CyberpunkTile>
<CyberpunkTile variant="small" center>Icon</CyberpunkTile>`,
    related: ["fui-button-tile", "themed-card", "corner-bracket-card"],
    tags: ["tile", "grid", "cut-corner", "fui"],
  },
  {
    slug: "fui-button-tile",
    summary: "Square HUD tile button with icon, label, and corner chevron.",
    usage: `<FUIButtonTile
  label="Media"
  icon={<EyeIcon />}
  active={active === "media"}
  onClick={() => setActive("media")}
/>`,
    related: ["cyberpunk-tile", "button", "overlay-button"],
    tags: ["fui", "tile", "hud", "icon"],
  },
  {
    slug: "accordion-feature-card",
    summary: "Expandable feature card with media panel, vertical title, and collapsible body.",
    usage: `<AccordionFeatureCard
  title="Signal mesh"
  eyebrow="01 / Surfaces"
  subtitle="Collapsible feature strip"
  description="Expand to reveal body copy and footer actions."
  imageSrc="/window.svg"
  imageAlt=""
  defaultExpanded
/>`,
    related: ["corner-bracket-card", "themed-card", "cyberpunk-tile"],
    tags: ["card", "accordion", "feature", "media"],
  },
  {
    slug: "corner-bracket-card",
    summary: "Bracketed feature surface with accent corners for standout content.",
    usage: `<CornerBracketCard title="Foundation">
  <p>Install tokens, icons, buttons, and forms together.</p>
</CornerBracketCard>`,
    related: ["themed-card", "cyberpunk-tile", "accordion-feature-card"],
    tags: ["featured", "accent"],
  },
  {
    slug: "dotted-halo-card",
    summary: "Flat card with an outer dotted field that sits beyond the main border.",
    usage: `<DottedHaloCard title="My Card">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</DottedHaloCard>`,
    related: ["themed-card", "corner-bracket-card"],
    tags: ["card", "pattern", "editorial"],
  },
  {
    slug: "segmented-control",
    summary: "Compact tab-like control for mode switches and view filters.",
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
    summary: "Simple tabbed container for grouped content and install flows.",
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
    summary: "Neutral page header with title, brand slot, and optional controls.",
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
    summary: "Page wrapper that composes the header, subtabs, and content area.",
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
    summary: "Bitkraft-style notched outline shell for viewport framing and overlay chrome.",
    usage: `<div style={{ position: "relative", minHeight: "28rem" }}>
  <NotchedViewportFrame tone="strong" />
</div>`,
    related: ["radial-menu-overlay", "page-template", "loading-screen"],
    tags: ["frame", "viewport", "shell"],
  },
  {
    slug: "radial-menu-overlay",
    summary: "Full-screen radial navigation surface built around the notched viewport shell.",
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
    summary: "Shared light and dark mode switch with document-level persistence.",
    usage: `<ThemeToggle storageKey="steez-ui-theme" defaultTheme="dark" />`,
    related: ["page-header", "button"],
    tags: ["theme", "light", "dark"],
  },
  {
    slug: "loading-progress-bar",
    summary: "Segmented loading bar for build, deploy, and initialization progress.",
    usage: `<LoadingProgressBar progress={72} valueLabel="72% synced" />`,
    related: ["status-message", "error-message"],
    tags: ["progress", "loading"],
  },
  {
    slug: "loading-screen",
    summary: "Fullscreen or contained loading shell with progress, cross field, and optional branding slots.",
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
    summary: "Compact centered loading card for viewers, canvases, and media shells.",
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
    summary: "Inline success, info, and error status surface with shared icon treatment.",
    usage: `<StatusMessage type="success" message="Registry payloads generated." />`,
    related: ["error-message", "copy-button"],
    tags: ["success", "info", "error"],
  },
  {
    slug: "error-message",
    summary: "Inline, card, and full-screen error surfaces with optional actions.",
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
    summary: "Orb and line heartbeat indicators for wake-up loops, sync state, and background activity.",
    usage: `<HeartbeatPulse variant="line" width={240} height={84} color="var(--accent-primary)" />`,
    related: ["loading-progress-bar", "status-message"],
    tags: ["heartbeat", "status", "activity"],
  },
  {
    slug: "hexagon-grid",
    summary: "Animated hex field backdrop for avatars, launch surfaces, and atmospheric panels.",
    usage: `<div style={{ position: "relative", minHeight: "18rem" }}>
  <HexagonGrid pointerReactive backgroundOpacity={0.12} />
</div>`,
    related: ["avatar-stage", "runtime-orbit-diagram"],
    tags: ["backdrop", "canvas", "ambient"],
  },
  {
    slug: "quick-info-card",
    summary: "Compact multi-stat summary surface with an optional storage meter.",
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
    summary: "Dashboard widget shell with grid-size presets, header slot, and overlay support.",
    usage: `<WidgetCard title="Scene" size="sm-b" overlay={<OverlayButton>+</OverlayButton>}>
  <div>Widget body</div>
</WidgetCard>`,
    related: ["stat-card", "themed-card"],
    tags: ["dashboard", "widget", "grid"],
  },
  {
    slug: "marquee-strip",
    summary: "Continuous horizontal marquee for providers, extensions, or launch lanes.",
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
    summary: "Simple content section with optional monospace title treatment.",
    usage: `<Section title="Browse services">
  <ThemedCard>...</ThemedCard>
</Section>`,
    related: ["section-header", "themed-card"],
    tags: ["group", "layout", "content"],
  },
  {
    slug: "overlay-button",
    summary: "Compact floating control button for viewer tools and absolute-positioned UI.",
    usage: `<OverlayButton aria-label="Expand viewer" active>
  <EyeIcon width={16} height={16} />
</OverlayButton>`,
    related: ["button", "pixel-tooltip"],
    tags: ["overlay", "viewer", "control"],
  },
  {
    slug: "pixel-tooltip",
    summary: "Compact hover tooltip with crisp monospace styling for short contextual hints.",
    usage: `<PixelTooltip content="Save configuration" position="top">
  <OverlayButton aria-label="Save">S</OverlayButton>
</PixelTooltip>`,
    related: ["overlay-button", "status-message"],
    tags: ["tooltip", "hover", "hint"],
  },
  {
    slug: "section-header",
    summary: "Framed header row for settings and control panels with optional actions.",
    usage: `<SectionHeader
  title="Appearance Configuration"
  description="Configure avatar rendering and expressions."
  actions={<Button variant="secondary">Save</Button>}
/>`,
    related: ["section", "page-header"],
    tags: ["header", "settings", "actions"],
  },
  {
    slug: "stat-card",
    summary: "Small numeric stat block with optional tone and subvalue.",
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
    summary: "Outlined accent text with optional stroke-to-fill blink on mount.",
    usage: `<StrokedText color="#ff7a72" animateOnMount>
  SPELLBINDING
</StrokedText>`,
    related: ["blink-text", "page-header"],
    tags: ["headline", "outline"],
  },
  {
    slug: "runtime-orbit-diagram",
    summary: "Animated path diagram for workspace systems, flows, and runtime maps.",
    usage: `<RuntimeOrbitDiagram
  nodes={nodes}
  pathOrder={["character", "site", "business", "automations", "operations"]}
/>`,
    related: ["hexagon-grid", "marquee-strip"],
    tags: ["diagram", "topology", "animation"],
  },
] satisfies ComponentDocDetails[];

const manifestBySlug = new Map(
  COMPONENT_MANIFEST.map((manifest) => [manifest.slug, manifest]),
);

export const COMPONENT_DOCS: ComponentDoc[] = COMPONENT_DOC_DETAILS.map((details) => {
  const manifest = manifestBySlug.get(details.slug);
  if (!manifest) {
    throw new Error(`Missing component manifest entry for ${details.slug}`);
  }

  return {
    slug: manifest.slug,
    title: manifest.title,
    category: manifest.category,
    summary: details.summary,
    description: manifest.description,
    packageImport: `import { ${manifest.packageExports.join(", ")} } from "${manifest.packageEntrypoint}";`,
    usage: details.usage,
    related: details.related,
    tags: details.tags,
  };
});

export function getComponentDoc(slug: string) {
  return COMPONENT_DOCS.find((component) => component.slug === slug);
}
