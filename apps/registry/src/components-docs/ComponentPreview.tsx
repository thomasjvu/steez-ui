import React from "react";

import {
  AvatarStage,
  BlinkText,
  Button,
  CopyButton,
  CyberpunkCheckbox,
  CyberpunkInput,
  CyberpunkRadioGroup,
  CyberpunkSelect,
  CyberpunkSlider,
  CyberpunkTextarea,
  CyberpunkTile,
  CornerBracketCard,
  ErrorMessage,
  HeartbeatPulse,
  HexagonGrid,
  LoadingOverlayCrystalline,
  LoadingProgressBar,
  LoadingScreen,
  MarqueeStrip,
  OverlayButton,
  PageHeader,
  PageTemplate,
  PixelTooltip,
  QuickInfoCard,
  RuntimeOrbitDiagram,
  Section,
  SectionHeader,
  SignalTrailBackdrop,
  SegmentedControl,
  StatCard,
  StatusMessage,
  StrokedText,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
  WidgetCard,
} from "@steez-ui/ui";
import { CheckIcon, EyeIcon, InfoIcon, RefreshIcon, SlidersIcon } from "@steez-ui/icons";

import styles from "./ComponentDocs.module.css";

function ButtonPreview() {
  return (
    <div className={styles.previewRow}>
      <Button>Deploy</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="danger">Remove</Button>
    </div>
  );
}

function AvatarStagePreview() {
  return (
    <AvatarStage stageHeight="18rem" viewportWidth="min(100%, 12rem)">
      <div className={styles.avatarStageFigure}>
        <div className={styles.avatarStageHead} />
        <div className={styles.avatarStageBody} />
      </div>
    </AvatarStage>
  );
}

function BlinkTextPreview() {
  return (
    <div className={styles.previewRow}>
      <BlinkText trigger="mount">system online</BlinkText>
      <BlinkText trigger="hover">hover to blink</BlinkText>
    </div>
  );
}

function CopyButtonPreview() {
  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;
  const command = `bunx shadcn@latest add ${registryOrigin}/r/button.json`;

  return (
    <div className={styles.commandPreview}>
      <code className={styles.inlineCode}>{command}</code>
      <CopyButton value={command} />
    </div>
  );
}

function CyberpunkInputPreview() {
  const [value, setValue] = React.useState("rally");

  return (
    <CyberpunkInput
      label="Companion name"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      helperText="Used in URLs and install paths."
      variant="full"
    />
  );
}

function CyberpunkSelectPreview() {
  const [value, setValue] = React.useState("balanced");

  return (
    <CyberpunkSelect
      label="Model tier"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      options={[
        { value: "fast", label: "Fast" },
        { value: "balanced", label: "Balanced" },
        { value: "quality", label: "Quality" },
      ]}
      variant="full"
    />
  );
}

function CyberpunkTextareaPreview() {
  const [value, setValue] = React.useState("You are a polished AI companion with a clear visual voice.");

  return (
    <CyberpunkTextarea
      label="System prompt"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      rows={5}
      variant="full"
    />
  );
}

function CyberpunkCheckboxPreview() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className={styles.previewColumn}>
      <CyberpunkCheckbox
        label="Enable publishing queue"
        checked={checked}
        onChange={setChecked}
      />
      <div className={styles.previewNote}>Current value: {checked ? "enabled" : "disabled"}</div>
    </div>
  );
}

function CyberpunkRadioPreview() {
  const [value, setValue] = React.useState("hosted");

  return (
    <div className={styles.previewColumn}>
      <CyberpunkRadioGroup
        name="runtime-mode"
        value={value}
        onChange={setValue}
        options={[
          { value: "hosted", label: "Hosted" },
          { value: "self-hosted", label: "Self-hosted" },
        ]}
      />
      <div className={styles.previewNote}>Selected: {value}</div>
    </div>
  );
}

function CyberpunkSliderPreview() {
  const [value, setValue] = React.useState(62);

  return (
    <CyberpunkSlider
      label="Reply energy"
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );
}

function ThemedCardPreview() {
  return (
    <ThemedCard title="Deployment">
      <p className={styles.previewText}>Point the companion at a public URL and publish.</p>
    </ThemedCard>
  );
}

function CyberpunkTilePreview() {
  return (
    <CyberpunkTile>
      <div className={styles.previewHeading}>Site runtime</div>
      <p className={styles.previewText}>Pages, media, and publishing flows in one flat surface.</p>
    </CyberpunkTile>
  );
}

function CornerBracketCardPreview() {
  return (
    <CornerBracketCard title="Foundation">
      <p className={styles.previewText}>Install tokens, icons, buttons, and forms together.</p>
    </CornerBracketCard>
  );
}

function SegmentedControlPreview() {
  const [value, setValue] = React.useState("registry");

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: "registry", label: "Registry" },
        { value: "packages", label: "Packages" },
      ]}
      label="Install path"
    />
  );
}

function TabbedPanelPreview() {
  return (
    <TabbedPanel
      defaultTab="install"
      tabs={[
        {
          id: "install",
          label: "Install",
          content: <div className={styles.previewText}>Add the registry JSON or install the npm packages directly.</div>,
        },
        {
          id: "usage",
          label: "Usage",
          content: <div className={styles.previewText}>Import the primitive and compose it with your app shell.</div>,
        },
      ]}
    />
  );
}

function PageHeaderPreview() {
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

function PageTemplatePreview() {
  const [tab, setTab] = React.useState("overview");

  return (
    <PageTemplate
      title="Steez UI"
      description="Standalone primitives and registry payloads."
      brand={<span className={styles.previewBrand}>SU</span>}
      brandTitle="Steez UI"
      brandAriaLabel="Steez UI"
      subTabs={[
        { id: "overview", label: "Overview" },
        { id: "tokens", label: "Tokens" },
      ]}
      activeSubTab={tab}
      onSubTabChange={setTab}
      extra={<ThemeToggle storageKey="steez-component-preview-theme" />}
    >
      <ThemedCard title="Overview">
        <p className={styles.previewText}>Compose app-specific screens on top of shared shell primitives.</p>
      </ThemedCard>
    </PageTemplate>
  );
}

function ThemeTogglePreview() {
  return (
    <div className={styles.previewRow}>
      <ThemeToggle storageKey="steez-docs-theme" />
      <div className={styles.previewNote}>Toggles the site theme and persists the choice to local storage.</div>
    </div>
  );
}

function LoadingProgressBarPreview() {
  return <LoadingProgressBar progress={72} valueLabel="72% synced" />;
}

function LoadingScreenPreview() {
  return (
    <div className={styles.loadingScreenPreview}>
      <LoadingScreen
        progress={68}
        message="Syncing runtime"
        title="SYNC"
        fullscreen={false}
        themeMode="dark"
      />
    </div>
  );
}

function LoadingOverlayCrystallinePreview() {
  return (
    <div className={styles.loadingOverlayPreview}>
      <div className={styles.loadingOverlayCanvas} />
      <LoadingOverlayCrystalline
        message="Preparing avatar"
        subtext="Loading model assets"
        icon={<RefreshIcon width={18} height={18} />}
      />
    </div>
  );
}

function StatusMessagePreview() {
  return (
    <div className={styles.previewColumn}>
      <StatusMessage type="success" message="Registry payloads generated." />
      <StatusMessage type="info" message="Packages are ready to install." />
    </div>
  );
}

function ErrorMessagePreview() {
  return (
    <ErrorMessage
      variant="inline"
      title="Build failed"
      message="Registry generation could not finish."
      details="The component catalog and payload manifest are out of sync."
      onRetry={() => undefined}
    />
  );
}

function HeartbeatPulsePreview() {
  return (
    <div className={styles.previewColumn}>
      <HeartbeatPulse variant="orb" />
      <HeartbeatPulse variant="line" width={220} height={80} />
    </div>
  );
}

function HexagonGridPreview() {
  return (
    <div className={styles.hexagonPreviewShell}>
      <HexagonGrid pointerReactive backgroundOpacity={0.08} tone="default" />
      <div className={styles.hexagonPreviewCard}>
        <div className={styles.previewHeading}>Ambient field</div>
        <p className={styles.previewText}>
          Shared backdrop treatment for avatar shells and launch panels.
        </p>
      </div>
    </div>
  );
}

function QuickInfoCardPreview() {
  return (
    <QuickInfoCard
      items={[
        {
          icon: <InfoIcon width={18} height={18} />,
          label: "Status",
          value: "Live",
          valueColor: "success",
        },
        {
          icon: <RefreshIcon width={18} height={18} />,
          label: "Requests",
          value: "1,024",
          mono: true,
        },
      ]}
      storageProgress={{ used: 2_760_000, limit: 8_000_000 }}
    />
  );
}

function MarqueeStripPreview() {
  return (
    <MarqueeStrip
      items={[
        { kind: "Skill", label: "Persona pack" },
        { kind: "Theme", label: "Chronicle site kit" },
        { kind: "Workflow", label: "Launch approvals" },
      ]}
      durationSeconds={12}
      gap="0.55rem"
      className={styles.marqueeDemo}
      renderItem={(item) => (
        <span className={styles.marqueeItem}>
          <span className={styles.marqueeItemKind}>{item.kind}</span>
          <span>{item.label}</span>
        </span>
      )}
    />
  );
}

function WidgetCardPreview() {
  return (
    <div className={styles.widgetPreviewGrid}>
      <WidgetCard
        title="Scene"
        size="xs-a"
        icon={<EyeIcon width={18} height={18} />}
        overlay={
          <div className={styles.widgetOverlay}>
            <OverlayButton aria-label="Inspect">
              <InfoIcon width={14} height={14} />
            </OverlayButton>
          </div>
        }
      >
        <p className={styles.previewText}>
          Reusable admin widget shell for viewer and dashboard grids.
        </p>
      </WidgetCard>
      <WidgetCard title="Queue" size="xs-a">
        <StatCard label="Jobs" value="12" subvalue="3 active" />
      </WidgetCard>
    </div>
  );
}

function SectionPreview() {
  return (
    <Section title="Browse services">
      <ThemedCard title="Directory">
        <p className={styles.previewText}>
          Group related surfaces without restyling spacing and heading treatment per page.
        </p>
      </ThemedCard>
    </Section>
  );
}

function OverlayButtonPreview() {
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

function PixelTooltipPreview() {
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

function SectionHeaderPreview() {
  return (
    <SectionHeader
      title="Appearance Configuration"
      description="Configure avatar rendering and expressions."
      actions={<Button variant="secondary">Save</Button>}
    />
  );
}

function SignalTrailBackdropPreview() {
  return (
    <div className={styles.signalTrailPreview}>
      <SignalTrailBackdrop
        color="#7ae4ff"
        lineSpeed={0.22}
        signalDensity={0.36}
        trailLength={0.2}
        shapeSize={5.6}
        amplitude={1.15}
        tiltX={-0.04}
        tiltY={-0.02}
        baseOpacity={0.18}
        shapeOpacity={0.32}
      />
      <div className={styles.signalTrailCard}>
        <div className={styles.previewHeading}>Signal surface</div>
        <p className={styles.previewText}>
          Shared animated field for technical hero stages and viewer backdrops.
        </p>
      </div>
    </div>
  );
}

function StatCardPreview() {
  return (
    <div className={styles.statPreviewGrid}>
      <StatCard label="Messages" value="1,248" subvalue="+12% this week" />
      <StatCard label="Queue" value="3" color="warning" />
      <StatCard label="Errors" value="0" color="success" />
    </div>
  );
}

function RuntimeOrbitDiagramPreview() {
  return (
    <div className={styles.orbitPreviewShell}>
      <RuntimeOrbitDiagram
        durationSeconds={5.2}
        nodes={[
          { id: "character", label: "Character", icon: EyeIcon, x: 50, y: 10 },
          { id: "site", label: "Site", icon: InfoIcon, x: 84, y: 38 },
          { id: "business", label: "Business", icon: CheckIcon, x: 70, y: 82 },
          { id: "automations", label: "Automations", icon: RefreshIcon, x: 30, y: 82 },
          { id: "operations", label: "Operations", icon: SlidersIcon, x: 16, y: 38 },
        ]}
        pathOrder={["character", "site", "business", "automations", "operations"]}
      />
    </div>
  );
}

function StrokedTextPreview() {
  return (
    <div className={styles.previewColumn}>
      <StrokedText color="#ff7a72" animateOnMount>
        SPELLBINDING
      </StrokedText>
      <StrokedText color="#8ef0ff">UNFORGETTABLE</StrokedText>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ComponentType> = {
  "avatar-stage": AvatarStagePreview,
  "blink-text": BlinkTextPreview,
  button: ButtonPreview,
  "copy-button": CopyButtonPreview,
  "cyberpunk-input": CyberpunkInputPreview,
  "cyberpunk-select": CyberpunkSelectPreview,
  "cyberpunk-textarea": CyberpunkTextareaPreview,
  "cyberpunk-checkbox": CyberpunkCheckboxPreview,
  "cyberpunk-radio": CyberpunkRadioPreview,
  "cyberpunk-slider": CyberpunkSliderPreview,
  "themed-card": ThemedCardPreview,
  "cyberpunk-tile": CyberpunkTilePreview,
  "corner-bracket-card": CornerBracketCardPreview,
  "segmented-control": SegmentedControlPreview,
  "tabbed-panel": TabbedPanelPreview,
  "page-header": PageHeaderPreview,
  "page-template": PageTemplatePreview,
  "theme-toggle": ThemeTogglePreview,
  "heartbeat-pulse": HeartbeatPulsePreview,
  "hexagon-grid": HexagonGridPreview,
  "loading-overlay-crystalline": LoadingOverlayCrystallinePreview,
  "loading-progress-bar": LoadingProgressBarPreview,
  "loading-screen": LoadingScreenPreview,
  "marquee-strip": MarqueeStripPreview,
  "overlay-button": OverlayButtonPreview,
  "pixel-tooltip": PixelTooltipPreview,
  "quick-info-card": QuickInfoCardPreview,
  "runtime-orbit-diagram": RuntimeOrbitDiagramPreview,
  section: SectionPreview,
  "section-header": SectionHeaderPreview,
  "signal-trail-backdrop": SignalTrailBackdropPreview,
  "stat-card": StatCardPreview,
  "status-message": StatusMessagePreview,
  "error-message": ErrorMessagePreview,
  "stroked-text": StrokedTextPreview,
  "widget-card": WidgetCardPreview,
};

export function ComponentPreview({ slug }: { slug: string }) {
  const Preview = PREVIEW_MAP[slug];

  if (!Preview) {
    return <div className={styles.previewNote}>Preview unavailable.</div>;
  }

  return <Preview />;
}
