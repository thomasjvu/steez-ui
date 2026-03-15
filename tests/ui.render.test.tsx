import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  AvatarStage,
  BlinkText,
  Button,
  CopyButton,
  CornerBracketCard,
  CyberpunkCheckbox,
  CyberpunkInput,
  CyberpunkRadioGroup,
  CyberpunkSelect,
  CyberpunkSlider,
  CyberpunkTextarea,
  CyberpunkTile,
  ErrorMessage,
  HeartbeatPulse,
  HexagonGrid,
  LoadingProgressBar,
  MarqueeStrip,
  PageHeader,
  PageTemplate,
  QuickInfoCard,
  RuntimeOrbitDiagram,
  Section,
  SectionHeader,
  SegmentedControl,
  StatCard,
  StatusMessage,
  StrokedText,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
} from "@steez-ui/ui";

describe("steez ui primitives", () => {
  it("renders the v1 primitive inventory", () => {
    const DemoIcon = () => (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
      </svg>
    );

    const markup = renderToStaticMarkup(
      <>
        <AvatarStage stageHeight="18rem" viewportWidth="12rem">
          <div>Avatar</div>
        </AvatarStage>
        <BlinkText trigger="mount">Ping</BlinkText>
        <Button>Launch</Button>
        <CopyButton value="bunx shadcn@latest add https://registry.example.com/r/foundation.json" />
        <CyberpunkInput label="Name" defaultValue="Studio Shell" />
        <CyberpunkSelect label="Mode" defaultValue="registry" options={[{ value: "registry", label: "Registry" }]} />
        <CyberpunkTextarea label="Pitch" defaultValue="Flat tokens and installable React primitives." />
        <CyberpunkCheckbox label="Enabled" checked readOnly />
        <CyberpunkRadioGroup
          name="mode"
          value="hosted"
          options={[
            { value: "hosted", label: "Hosted" },
            { value: "self-hosted", label: "Self-hosted" },
          ]}
        />
        <CyberpunkSlider label="Confidence" value={75} readOnly />
        <ThemedCard title="Card">Card body</ThemedCard>
        <CyberpunkTile>Tile body</CyberpunkTile>
        <CornerBracketCard title="Bracket">Bracket body</CornerBracketCard>
        <SegmentedControl
          value="hosted"
          onChange={() => undefined}
          options={[
            { value: "hosted", label: "Hosted" },
            { value: "self-hosted", label: "Self-hosted" },
          ]}
        />
        <TabbedPanel
          activeTab="one"
          onTabChange={() => undefined}
          tabs={[
            { id: "one", label: "One", content: <div>One</div> },
            { id: "two", label: "Two", content: <div>Two</div> },
          ]}
        />
        <PageHeader title="Operations" description="Shared header" />
        <PageTemplate title="Character" description="Shared layout">
          <div>Body</div>
        </PageTemplate>
        <ThemeToggle />
        <HeartbeatPulse variant="line" width={180} height={72} />
        <div style={{ position: "relative", minHeight: "8rem" }}>
          <HexagonGrid backgroundOpacity={0.08} />
        </div>
        <LoadingProgressBar progress={50} />
        <MarqueeStrip
          items={["Skills", "Themes", "Workflows"]}
          renderItem={(item) => <span>{item}</span>}
        />
        <QuickInfoCard
          items={[
            { label: "Status", value: "Live", valueColor: "success" },
            { label: "Requests", value: "1,024", mono: true },
          ]}
        />
        <RuntimeOrbitDiagram
          nodes={[
            { id: "character", label: "Character", icon: DemoIcon, x: 50, y: 10 },
            { id: "site", label: "Site", icon: DemoIcon, x: 84, y: 38 },
            { id: "business", label: "Business", icon: DemoIcon, x: 70, y: 82 },
            { id: "automations", label: "Automations", icon: DemoIcon, x: 30, y: 82 },
            { id: "operations", label: "Operations", icon: DemoIcon, x: 16, y: 38 },
          ]}
        />
        <Section title="Browse services">
          <div>Section body</div>
        </Section>
        <SectionHeader title="Appearance Configuration" />
        <StatCard label="Messages" value="1,248" />
        <StatusMessage type="success" message="Built." />
        <StrokedText animateOnMount>Spellbinding</StrokedText>
        <ErrorMessage message="Something failed." />
      </>,
    );

    expect(markup).toContain("Avatar");
    expect(markup).toContain("Launch");
    expect(markup).toContain("Operations");
    expect(markup).toContain("Character");
    expect(markup).toContain("Spellbinding");
    expect(markup).toContain("Themes");
    expect(markup).toContain("Appearance Configuration");
  });
});
