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
  LoadingProgressBar,
  MarqueeStrip,
  PageHeader,
  PageTemplate,
  RuntimeOrbitDiagram,
  SegmentedControl,
  StatusMessage,
  StrokedText,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
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
  "loading-progress-bar": LoadingProgressBarPreview,
  "marquee-strip": MarqueeStripPreview,
  "runtime-orbit-diagram": RuntimeOrbitDiagramPreview,
  "status-message": StatusMessagePreview,
  "error-message": ErrorMessagePreview,
  "stroked-text": StrokedTextPreview,
};

export function ComponentPreview({ slug }: { slug: string }) {
  const Preview = PREVIEW_MAP[slug];

  if (!Preview) {
    return <div className={styles.previewNote}>Preview unavailable.</div>;
  }

  return <Preview />;
}
