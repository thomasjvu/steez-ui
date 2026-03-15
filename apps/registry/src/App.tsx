import React, { useMemo, useState } from "react";

import "@steez-ui/theme/tokens.css";

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
  SegmentedControl,
  StatusMessage,
  TabbedPanel,
  ThemedCard,
  ThemeToggle,
} from "@steez-ui/ui";
import { SteezIconProvider } from "@steez-ui/icons";

import styles from "./App.module.css";

const FOUNDATION_COMMAND =
  "bunx shadcn@latest add https://steez-ui.pages.dev/r/foundation.json";
const BUTTON_COMMAND =
  "bunx shadcn@latest add https://steez-ui.pages.dev/r/button.json";

const PRIMITIVE_FAMILIES = [
  {
    title: "Foundation",
    body: "Theme tokens, icon provider, buttons, and installable CSS module source.",
  },
  {
    title: "Forms",
    body: "Cyberpunk inputs, selects, radios, checkboxes, sliders, and textareas with the same token system.",
  },
  {
    title: "Surfaces",
    body: "Tiles, cards, page shells, status rails, and feedback surfaces shared across admin and landing paths.",
  },
];

const ADOPTION_STEPS = [
  "Author once in packages/ui and generate registry payloads from source.",
  "Consume @steez-ui/ui directly in Phantasy first-party surfaces.",
  "Install the same primitives in external apps through the registry.",
];

const PREVIEW_TABS = [
  {
    id: "packages",
    label: "Packages",
    panel: (
      <div className={styles.previewPanelCopy}>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>Theme</span>
          <span className={styles.previewMetricValue}>CSS tokens + Tailwind compatibility</span>
        </div>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>Icons</span>
          <span className={styles.previewMetricValue}>Shared icon surface and provider defaults</span>
        </div>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>UI</span>
          <span className={styles.previewMetricValue}>React primitives with `.tsx` + `.module.css` output</span>
        </div>
      </div>
    ),
  },
  {
    id: "registry",
    label: "Registry",
    panel: (
      <div className={styles.previewPanelCopy}>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>Foundation preset</span>
          <span className={styles.previewMetricValue}>One install target for tokens, icons, buttons, and forms</span>
        </div>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>Per-component items</span>
          <span className={styles.previewMetricValue}>Install only what a consumer app actually needs</span>
        </div>
        <div className={styles.previewMetric}>
          <span className={styles.previewMetricLabel}>Static payloads</span>
          <span className={styles.previewMetricValue}>Generated JSON manifests that match shadcn registry semantics</span>
        </div>
      </div>
    ),
  },
  {
    id: "adoption",
    label: "Adoption",
    panel: (
      <div className={styles.previewPanelCopy}>
        {ADOPTION_STEPS.map((step, index) => (
          <div key={step} className={styles.adoptionStep}>
            <span className={styles.adoptionIndex}>0{index + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function App() {
  const [installMode, setInstallMode] = useState("registry");
  const [provider, setProvider] = useState("alkahest");
  const [accent, setAccent] = useState<"success" | "error" | "info">("success");
  const [shippingConfidence, setShippingConfidence] = useState(76);
  const [showToast, setShowToast] = useState(true);

  const statusMessage = useMemo(() => {
    if (!showToast) {
      return null;
    }

    if (accent === "success") {
      return <StatusMessage type="success" message="Registry payload generated from source." />;
    }

    if (accent === "error") {
      return <StatusMessage type="error" message="A local consumer needs review." />;
    }

    return <StatusMessage type="info" message="Foundation preset is ready for install." />;
  }, [accent, showToast]);

  return (
    <SteezIconProvider size={16} strokeWidth={2}>
      <div className={styles.app}>
        <div className={styles.backdrop} aria-hidden="true" />

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Steez UI</div>
            <h1>Shared Phantasy primitives, packaged and installable.</h1>
            <p className={styles.heroBody}>
              Steez UI is the source of truth for the button, form, surface, and shell
              primitives used across Phantasy CMS, Hub, and landing experiences. It ships as
              packages for first-party consumers and as a shadcn-compatible registry for
              external React apps.
            </p>

            <div className={styles.heroActions}>
              <Button>Explore Foundation</Button>
              <Button variant="secondary">Open Registry Items</Button>
              <ThemeToggle />
            </div>

            <div className={styles.commandStack}>
              <ThemedCard title="Foundation preset">
                <div className={styles.commandRow}>
                  <code className={styles.commandCode}>{FOUNDATION_COMMAND}</code>
                  <CopyButton value={FOUNDATION_COMMAND} />
                </div>
              </ThemedCard>

              <ThemedCard title="Single component">
                <div className={styles.commandRow}>
                  <code className={styles.commandCode}>{BUTTON_COMMAND}</code>
                  <CopyButton value={BUTTON_COMMAND} />
                </div>
              </ThemedCard>
            </div>
          </div>

          <CornerBracketCard title="Live package state" variant="featured" className={styles.heroPanel}>
            <div className={styles.panelSection}>
              <div className={styles.panelLabel}>Consumption path</div>
              <SegmentedControl
                value={installMode}
                onChange={setInstallMode}
                options={[
                  { value: "registry", label: "Registry" },
                  { value: "package", label: "Package" },
                ]}
              />
            </div>

            <div className={styles.panelSection}>
              <div className={styles.panelLabel}>Shipping confidence</div>
              <LoadingProgressBar progress={shippingConfidence} valueLabel={`${shippingConfidence}%`} />
            </div>

            <div className={styles.panelSection}>
              <div className={styles.panelLabel}>Package surface</div>
              <TabbedPanel tabs={PREVIEW_TABS} defaultTab="packages" />
            </div>
          </CornerBracketCard>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Primitive families</div>
              <h2>Use the same visual language in product, docs, and install output.</h2>
            </div>

            <div className={styles.familyGrid}>
              {PRIMITIVE_FAMILIES.map((family) => (
                <CyberpunkTile key={family.title} variant="big" className={styles.familyTile}>
                  <div className={styles.familyTitle}>{family.title}</div>
                  <p className={styles.familyBody}>{family.body}</p>
                </CyberpunkTile>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Frontend preview</div>
              <h2>A Steez-native surface should be built out of Steez primitives.</h2>
            </div>

            <div className={styles.previewGrid}>
              <CornerBracketCard title="Registry playground" variant="featured">
                <div className={styles.previewForm}>
                  <CyberpunkInput label="Runtime name" defaultValue="rally" variant="full" />
                  <CyberpunkSelect
                    label="Default provider"
                    value={provider}
                    onChange={(event) => setProvider(event.currentTarget.value)}
                    options={[
                      { value: "alkahest", label: "Alkahest" },
                      { value: "openai", label: "OpenAI" },
                      { value: "anthropic", label: "Anthropic" },
                    ]}
                    variant="full"
                  />
                  <CyberpunkTextarea
                    label="Positioning"
                    defaultValue="Companion-native runtime surfaces, shared design tokens, and installable primitives."
                    variant="full"
                  />
                  <CyberpunkRadioGroup
                    name="status"
                    value={accent}
                    onChange={(value) => setAccent(value as "success" | "error" | "info")}
                    options={[
                      { value: "success", label: "Success" },
                      { value: "error", label: "Error" },
                      { value: "info", label: "Info" },
                    ]}
                  />
                  <CyberpunkSlider
                    label="Registry readiness"
                    value={shippingConfidence}
                    onChange={(event) =>
                      setShippingConfidence(Number(event.currentTarget.value))
                    }
                  />
                  <CyberpunkCheckbox
                    label="Show runtime status toast"
                    checked={showToast}
                    onChange={setShowToast}
                  />
                </div>
              </CornerBracketCard>

              <div className={styles.feedbackColumn}>
                <ThemedCard title="Status rail">{statusMessage}</ThemedCard>
                <ThemedCard title="Install notes">
                  <ErrorMessage
                    variant="inline"
                    title="Registry contract"
                    message="Each item installs component source and its CSS module together."
                    details="First-party apps consume @steez-ui/ui directly. External apps can install the same source payload through the generated registry items."
                  />
                </ThemedCard>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Registry items</div>
              <h2>Inspect the generated payloads directly.</h2>
            </div>

            <div className={styles.registryLinks}>
              <a className={styles.registryLink} href="./r/index.json">
                registry index
              </a>
              <a className={styles.registryLink} href="./r/foundation.json">
                foundation preset
              </a>
              <a className={styles.registryLink} href="./r/button.json">
                button item
              </a>
              <a className={styles.registryLink} href="./r/cyberpunk-input.json">
                cyberpunk input
              </a>
            </div>
          </section>
        </main>
      </div>
    </SteezIconProvider>
  );
}

