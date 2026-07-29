"use client";

import React from "react";

import {
  AsciiRippleText,
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
  DottedHaloCard,
  ErrorMessage,
  FUIButtonTile,
  HeartbeatPulse,
  LoadingOverlayCrystalline,
  LoadingProgressBar,
  MarqueeStrip,
  NotchedViewportFrame,
  OverlayButton,
  PageHeader,
  PageTemplate,
  PixelTooltip,
  QuickInfoCard,
  RadialMenuOverlay,
  Section,
  SectionHeader,
  SegmentedControl,
  StatCard,
  StatusMessage,
  StrokedText,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
  WidgetCard,
} from "@steez-ui/ui";
import {
  CheckIcon,
  EyeIcon,
  InfoIcon,
  MenuIcon,
  RefreshIcon,
  SlidersIcon,
} from "@steez-ui/icons";

import styles from "../component-docs.module.css";

export function ButtonPreview() {
  return (
    <div className={styles.previewRow}>
      <Button>Deploy</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="danger">Remove</Button>
    </div>
  );
}

export function AsciiRippleTextPreview() {
  return (
    <div className={styles.previewLinkList}>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>Roadside Picnic</AsciiRippleText>
      </a>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>The City &amp; the City</AsciiRippleText>
      </a>
      <a className={styles.previewLink} href="#docs">
        <AsciiRippleText>Parable of the Sower</AsciiRippleText>
      </a>
    </div>
  );
}

export function AvatarStagePreview() {
  return (
    <AvatarStage stageHeight="18rem" viewportWidth="min(100%, 12rem)">
      <div className={styles.avatarStageFigure}>
        <div className={styles.avatarStageHead} />
        <div className={styles.avatarStageBody} />
      </div>
    </AvatarStage>
  );
}

export function BlinkTextPreview() {
  return (
    <div className={styles.previewRow}>
      <BlinkText trigger="mount">system online</BlinkText>
      <BlinkText trigger="hover">hover to blink</BlinkText>
    </div>
  );
}

export function CopyButtonPreview() {
  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;
  const command = `pnpm dlx shadcn@latest add ${registryOrigin}/r-steez/button.json`;

  return (
    <div className={styles.commandPreview}>
      <code className={styles.inlineCode}>{command}</code>
      <CopyButton value={command} />
    </div>
  );
}

export function CyberpunkInputPreview() {
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

export function CyberpunkSelectPreview() {
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

export function CyberpunkTextareaPreview() {
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

export function CyberpunkCheckboxPreview() {
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

export function CyberpunkRadioPreview() {
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

export function CyberpunkSliderPreview() {
  const [value, setValue] = React.useState(62);

  return (
    <CyberpunkSlider
      label="Reply energy"
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    />
  );
}

export function ThemedCardPreview() {
  return (
    <ThemedCard title="Deployment">
      <p className={styles.previewText}>Point the companion at a public URL and publish.</p>
    </ThemedCard>
  );
}

export function CyberpunkTilePreview() {
  return (
    <div className={styles.previewRow}>
      <CyberpunkTile>
        <div className={styles.previewHeading}>Site runtime</div>
        <p className={styles.previewText}>
          Pages, media, and publishing flows in one flat surface.
        </p>
      </CyberpunkTile>
      <CyberpunkTile variant="small" center>
        <div className={styles.previewHeading}>Small</div>
      </CyberpunkTile>
    </div>
  );
}

export function FUIButtonTilePreview() {
  const [active, setActive] = React.useState("media");
  return (
    <div className={styles.previewRow}>
      <FUIButtonTile
        label="Media"
        icon={<EyeIcon />}
        active={active === "media"}
        onClick={() => setActive("media")}
      />
      <FUIButtonTile
        label="Deploy"
        icon={<RefreshIcon />}
        active={active === "deploy"}
        onClick={() => setActive("deploy")}
      />
      <FUIButtonTile
        label="Settings"
        icon={<SlidersIcon />}
        active={active === "settings"}
        onClick={() => setActive("settings")}
      />
    </div>
  );
}

export function CornerBracketCardPreview() {
  return (
    <CornerBracketCard title="Foundation">
      <p className={styles.previewText}>Install tokens, icons, buttons, and forms together.</p>
    </CornerBracketCard>
  );
}

export function DottedHaloCardPreview() {
  return (
    <div className={styles.dottedHaloPreviewGrid}>
      <DottedHaloCard title="My Card">
        <p className={styles.previewText}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          vero blanditiis amet.
        </p>
      </DottedHaloCard>
      <DottedHaloCard title="My Second Card">
        <p className={styles.previewText}>
          Quaerat magni unde ducimus voluptates, sed pariatur perspiciatis
          perferendis.
        </p>
      </DottedHaloCard>
    </div>
  );
}

export function SegmentedControlPreview() {
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

export function TabbedPanelPreview() {
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

export function PageHeaderPreview() {
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

export function PageTemplatePreview() {
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

export function NotchedViewportFramePreview() {
  return (
    <div className={styles.notchedFramePreview}>
      <NotchedViewportFrame tone="strong" />
      <div className={styles.notchedFrameCard}>
        <div className={styles.previewHeading}>Viewport shell</div>
        <p className={styles.previewText}>
          Use one continuous outline when the whole interface should feel
          framed as a single surface.
        </p>
      </div>
    </div>
  );
}

export function RadialMenuOverlayPreview() {
  return (
    <div className={styles.radialMenuPreview}>
      <RadialMenuOverlay
        open
        contained
        title="Steer the runtime"
        description="One radial control surface for launch pages and app shells."
        brand={
          <span className={styles.previewRow}>
            <MenuIcon width={14} height={14} />
            Menu
          </span>
        }
        onClose={() => undefined}
        items={[
          {
            id: "studio",
            label: "Studio",
            shortLabel: "01",
            eyebrow: "Creative studio",
            body: "Launch clips, key art, and site-ready media.",
            href: "#studio",
          },
          {
            id: "runtime",
            label: "Runtime",
            shortLabel: "02",
            eyebrow: "One runtime",
            body: "Five workspaces hold the system together.",
            href: "#system",
          },
          {
            id: "launch",
            label: "Launch",
            shortLabel: "03",
            eyebrow: "Get started",
            body: "Start with one install path and ship the wedge.",
            href: "#cta",
          },
        ]}
      />
    </div>
  );
}

export function ThemeTogglePreview() {
  return (
    <div className={styles.previewRow}>
      <ThemeToggle storageKey="steez-docs-theme" />
      <div className={styles.previewNote}>Toggles the site theme and persists the choice to local storage.</div>
    </div>
  );
}

export function LoadingProgressBarPreview() {
  return <LoadingProgressBar progress={72} valueLabel="72% synced" />;
}

export function LoadingOverlayCrystallinePreview() {
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

export function StatusMessagePreview() {
  return (
    <div className={styles.previewColumn}>
      <StatusMessage type="success" message="Registry payloads generated." />
      <StatusMessage type="info" message="Packages are ready to install." />
    </div>
  );
}

export function ErrorMessagePreview() {
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

export function HeartbeatPulsePreview() {
  return (
    <div className={styles.previewColumn}>
      <HeartbeatPulse variant="orb" />
      <HeartbeatPulse variant="line" width={220} height={80} />
    </div>
  );
}

export function QuickInfoCardPreview() {
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

export function MarqueeStripPreview() {
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

export function WidgetCardPreview() {
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

export function SectionPreview() {
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

export function OverlayButtonPreview() {
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

export function PixelTooltipPreview() {
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

export function SectionHeaderPreview() {
  return (
    <SectionHeader
      title="Appearance Configuration"
      description="Configure avatar rendering and expressions."
      actions={<Button variant="secondary">Save</Button>}
    />
  );
}

export function StatCardPreview() {
  return (
    <div className={styles.statPreviewGrid}>
      <StatCard label="Messages" value="1,248" subvalue="+12% this week" />
      <StatCard label="Queue" value="3" color="warning" />
      <StatCard label="Errors" value="0" color="success" />
    </div>
  );
}

export function StrokedTextPreview() {
  return (
    <div className={styles.previewColumn}>
      <StrokedText color="#ff7a72" animateOnMount>
        SPELLBINDING
      </StrokedText>
      <StrokedText color="#8ef0ff">UNFORGETTABLE</StrokedText>
    </div>
  );
}
