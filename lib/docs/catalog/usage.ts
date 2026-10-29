/** Usage snippet shown on each component's detail page, keyed by slug. */
export const COMPONENT_USAGE: Record<string, string> = {
  "quartz-crystal": `<QuartzCrystal color="#ee1401" width={120} height={240} durationMs={5000} parallax />`,
  "boiling-lines": `<BoilingLines intensity="subtle" speedMs={120}>
  <img src="/artwork.svg" alt="Hand-drawn studio mark" />
</BoilingLines>`,
  "ascii-ripple-text": `<a href="/docs">
  <AsciiRippleText>Documentation</AsciiRippleText>
</a>`,
  "avatar-stage": `<AvatarStage stageHeight="34rem" viewportWidth="min(100%, 30rem)">
  <img src="/companion.png" alt="Companion preview" />
</AvatarStage>`,
  "blink-text": `<BlinkText trigger="hover">「 quick jump 」</BlinkText>`,
  "kinetic-swipe-text": `<KineticSwipeText>SWIPE</KineticSwipeText>
<KineticSwipeText direction="vertical">SWIPE</KineticSwipeText>`,
  "kinetic-glyph": `<KineticGlyph>D</KineticGlyph>
<KineticGlyph label="Compass icon"><CompassIcon /></KineticGlyph>`,
  "chromatic-aberration-filter": `<ChromaticAberrationFilter offset={3} trigger="hover">
  <div>Your content</div>
</ChromaticAberrationFilter>`,
  "glow-filter": `<GlowFilter color="#7dd3fc" radius={6}>
  <div>Your content</div>
</GlowFilter>`,
  "duotone-filter": `<DuotoneFilter intensity="default">
  <div>Your content</div>
</DuotoneFilter>`,
  "posterize-filter": `<PosterizeFilter intensity="default">
  <div>Your content</div>
</PosterizeFilter>`,
  "emboss-filter": `<EmbossFilter intensity="default">
  <div>Your content</div>
</EmbossFilter>`,
  "icon-background": `<IconBackground variant="magnetic" columns={9} rows={7} size={40} gap={24} color="#fece00" />`,
  "grain-filter": `<GrainFilter amount={0.25} trigger="always" speedMs={180}>
  <div>Your content</div>
</GrainFilter>`,
  "displacement-filter": `<DisplacementFilter intensity="subtle">
  <KineticGlyph>D</KineticGlyph>
</DisplacementFilter>

<DisplacementFilter scale={10} trigger="hover">
  <Button>Distorted action</Button>
</DisplacementFilter>`,
  "kinetic-text-ramp": `<KineticTextRamp>STEP IT UP</KineticTextRamp>
<KineticTextRamp trigger="hover" rows={10}>MAKE SOME NOISE</KineticTextRamp>`,
  "kinetic-text-ring": `<KineticTextRing>KINETIC</KineticTextRing>
<KineticTextRing direction="counterclockwise" pauseOnHover>
  TYPE IN MOTION
</KineticTextRing>`,
  "kinetic-text-globe": `<KineticTextGlobe>HELLO</KineticTextGlobe>
<KineticTextGlobe direction="counterclockwise" pauseOnHover durationMs={24000}>
  KEEP MOVING
</KineticTextGlobe>`,
  "kinetic-text-volume": `<KineticTextVolume>ESPACE</KineticTextVolume>
<KineticTextVolume rows={12} amplitude={8} pauseOnHover>
  KEEP MOVING
</KineticTextVolume>`,
  button: `<Button>Deploy</Button>
<Button shape="crystal">Open app</Button>
<Button shape="crystal" orientation="vertical" iconOnly aria-label="New thread">
  <PlusIcon />
</Button>
<Button variant="secondary">Preview</Button>
<Button variant="danger">Remove</Button>`,
  "character-afterimage": `<CharacterAfterimage
  src="/companion.png"
  alt="Pixel companion"
  width={180}
  height={260}
  entrance
/>`,
  "copy-button": `<CopyButton value="bun add @steez-ui/ui" />
<CopyButton value={command} title="Copy command" />`,
  input: `<Input
  label="Companion name"
  placeholder="rally"
  helperText="Used in URLs and generated files."
/>`,
  select: `<Select
  labelStyle="notch"
  label="Model tier"
  value={tier}
  onChange={(event) => setTier(event.target.value)}
  options={[
    { value: "fast", label: "Fast" },
    { value: "balanced", label: "Balanced" },
  ]}
/>`,
  textarea: `<Textarea
  label="System prompt"
  rows={6}
  placeholder="Tell the companion how to behave."
/>`,
  checkbox: `<Checkbox
  label="Enable auto-posting"
  checked={enabled}
  onCheckedChange={setEnabled}
/>`,
  radio: `<RadioGroup
  name="runtime"
  value={runtime}
  onValueChange={setRuntime}
  options={[
    { value: "hosted", label: "Hosted" },
    { value: "self-hosted", label: "Self-hosted" },
  ]}
/>`,
  slider: `<Slider
  variant="diamond"
  label="Volume"
  value={volume}
  onChange={(event) => setVolume(Number(event.target.value))}
/>`,
  "themed-card": `<ThemedCard title="Deployment" titleAs="h3" actions={
  <CopyButton value="pnpm deploy:pages" title="Copy deploy command" />
}>
  <p>Point the companion at a public URL and publish.</p>
</ThemedCard>`,
  "cyberpunk-tile": `<CyberpunkTile>
  <strong>Site runtime</strong>
  <p>Deploy pages, media, and publishing flows.</p>
</CyberpunkTile>
<CyberpunkTile variant="small" center>Icon</CyberpunkTile>`,
  "fui-button-tile": `<FUIButtonTile
  label="Media"
  icon={<EyeIcon />}
  active={active === "media"}
  onClick={() => setActive("media")}
/>`,
  "accordion-feature-card": `<AccordionFeatureCard
  title="Signal mesh"
  eyebrow="01 / Surfaces"
  subtitle="Collapsible feature strip"
  description="Expand to reveal body copy and footer actions."
  imageSrc="/window.svg"
  imageAlt=""
  defaultExpanded
/>`,
  "corner-bracket-card": `<CornerBracketCard title="Foundation">
  <p>Install tokens, icons, buttons, and forms together.</p>
</CornerBracketCard>`,
  "dotted-halo-card": `<DottedHaloCard title="My Card">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</DottedHaloCard>`,
  "segmented-control": `<SegmentedControl
  value={mode}
  onValueChange={setMode}
  options={[
    { value: "registry", label: "Registry" },
    { value: "packages", label: "Packages" },
  ]}
/>`,
  "tabbed-panel": `<TabbedPanel
  defaultTab="install"
  tabs={[
    { id: "install", label: "Install", content: <InstallBlock /> },
    { id: "usage", label: "Usage", content: <UsageBlock /> },
  ]}
/>`,
  "page-header": `<PageHeader
  title="Providers"
  description="Routing, failover, and API surfaces."
  brand={<span>SU</span>}
  extra={<Button variant="secondary">Publish</Button>}
/>`,
  "page-template": `<PageTemplate
  title="Steez UI"
  description="Standalone primitives and registry payloads."
  subTabs={[
    { id: "overview", label: "Overview" },
    { id: "tokens", label: "Tokens" },
  ]}
>
  <ThemedCard title="Overview">...</ThemedCard>
</PageTemplate>`,
  "notched-viewport-frame": `<div style={{ position: "relative", minHeight: "28rem" }}>
  <NotchedViewportFrame tone="strong" />
</div>`,
  "radial-menu-overlay": `<RadialMenuOverlay
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "studio", label: "Studio", eyebrow: "Creative studio", body: "Launch media and site assets.", href: "#studio" },
    { id: "runtime", label: "Runtime", eyebrow: "One runtime", body: "Five workspaces keep the illusion intact.", href: "#system" },
  ]}
/>`,
  "theme-toggle": `<ThemeToggle storageKey="steez-ui-theme" defaultTheme="dark" />`,
  "loading-progress-bar": `<LoadingProgressBar progress={72} valueLabel="72% synced" />`,
  "loading-screen": `<LoadingScreen
  progress={68}
  message="Syncing runtime"
  title="LOADING"
  logo={<img src="/logo.svg" alt="" />}
  footerBrand={<img src="/brand.svg" alt="" />}
  fullscreen={false}
/>`,
  "loading-overlay-crystalline": `<LoadingOverlayCrystalline
  message="Preparing avatar"
  subtext="Loading model assets"
  icon={<RefreshIcon width={18} height={18} />}
/>`,
  "status-message": `<StatusMessage type="success" message="Registry payloads generated." />`,
  "error-message": `<ErrorMessage
  title="Build failed"
  message="Registry generation could not finish."
  details={stderr}
  onRetry={handleRetry}
/>`,
  "heartbeat-pulse": `<HeartbeatPulse variant="line" width={240} height={84} color="var(--accent-primary)" />`,
  "hexagon-grid": `<div style={{ position: "relative", minHeight: "18rem" }}>
  <HexagonGrid pointerReactive backgroundOpacity={0.12} />
</div>`,
  "quick-info-card": `<QuickInfoCard
  items={[
    { label: "Status", value: "Live", valueColor: "success" },
    { label: "Requests", value: "1,024", mono: true },
  ]}
/>`,
  "widget-card": `<WidgetCard title="Scene" size="sm-b" overlay={<OverlayButton>+</OverlayButton>}>
  <div>Widget body</div>
</WidgetCard>`,
  "marquee-strip": `<MarqueeStrip
  items={providers}
  durationMs={28000}
  renderItem={(provider) => <span>{provider}</span>}
/>`,
  section: `<Section title="Browse services">
  <ThemedCard>...</ThemedCard>
</Section>`,
  "overlay-button": `<OverlayButton iconOnly aria-label="Expand viewer" active>
  <EyeIcon width={16} height={16} />
</OverlayButton>`,
  "pixel-tooltip": `<PixelTooltip content="Save configuration" position="top">
  <OverlayButton aria-label="Save">S</OverlayButton>
</PixelTooltip>`,
  "section-header": `<SectionHeader
  title="Appearance Configuration"
  description="Configure avatar rendering and expressions."
  actions={<Button variant="secondary">Save</Button>}
/>`,
  "stat-card": `<StatCard
  label="Messages"
  value="1,248"
  subvalue="+12% this week"
/>`,
  "stroked-text": `<StrokedText color="#ff7a72" animateOnMount>
  SPELLBINDING
</StrokedText>`,
  "runtime-orbit-diagram": `<RuntimeOrbitDiagram
  nodes={nodes}
  pathOrder={["character", "site", "business", "automations", "operations"]}
/>`,
};
