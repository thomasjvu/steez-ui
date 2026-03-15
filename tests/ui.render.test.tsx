import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
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
  LoadingProgressBar,
  PageHeader,
  PageTemplate,
  SegmentedControl,
  StatusMessage,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
} from "@steez-ui/ui";

describe("steez ui primitives", () => {
  it("renders the v1 primitive inventory", () => {
    const markup = renderToStaticMarkup(
      <>
        <Button>Launch</Button>
        <CopyButton value="npx phantasy create vtuber" />
        <CyberpunkInput label="Name" defaultValue="Rally" />
        <CyberpunkSelect label="Provider" defaultValue="alkahest" options={[{ value: "alkahest", label: "Alkahest" }]} />
        <CyberpunkTextarea label="Pitch" defaultValue="Companion-native" />
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
        <LoadingProgressBar progress={50} />
        <StatusMessage type="success" message="Built." />
        <ErrorMessage message="Something failed." />
      </>,
    );

    expect(markup).toContain("Launch");
    expect(markup).toContain("Operations");
    expect(markup).toContain("Character");
  });
});
