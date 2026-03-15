import React, { useMemo, useState } from "react";

import "@steez-ui/theme/tokens.css";

import {
  Button,
  CopyButton,
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

const SITE_URL = "https://steez-ui-6v5.pages.dev";
const REPOSITORY_URL = "https://github.com/thomasjvu/steez-ui";

const VALUE_PROPS = [
  {
    title: "Packages",
    body: "Install the theme, icon system, and UI primitives directly from npm.",
  },
  {
    title: "Registry",
    body: "Ship the same source as shadcn-compatible registry payloads with CSS modules included.",
  },
  {
    title: "Tokens",
    body: "Use a flat token layer with stable aliases instead of rewriting each surface from scratch.",
  },
];

const INVENTORY_TILES = [
  {
    title: "Foundation",
    detail: "Theme tokens, icon provider, buttons, and shared CSS module conventions.",
  },
  {
    title: "Forms",
    detail: "Inputs, selects, textareas, radios, checkboxes, and sliders with one surface language.",
  },
  {
    title: "Surfaces",
    detail: "Tiles, cards, headers, templates, status rails, and lightweight feedback components.",
  },
  {
    title: "Registry output",
    detail: "Generated JSON manifests and source payloads that stay aligned with the package source.",
  },
];

const PACKAGE_SURFACES = [
  {
    title: "@steez-ui/theme",
    body: "Token source, compatibility aliases, and the Tailwind compatibility preset.",
    npmHref: "https://www.npmjs.com/package/@steez-ui/theme",
  },
  {
    title: "@steez-ui/icons",
    body: "Shared icon exports and the provider layer used by the primitives.",
    npmHref: "https://www.npmjs.com/package/@steez-ui/icons",
  },
  {
    title: "@steez-ui/ui",
    body: "React primitives authored in `.tsx` and `.module.css`, published and generated from one source tree.",
    npmHref: "https://www.npmjs.com/package/@steez-ui/ui",
  },
];

const DOC_SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className={styles.tabPanel}>
        <p className={styles.tabLead}>
          Steez UI is a standalone React UI kit built around CSS modules, stable theme tokens,
          and a generated registry. Author once in `packages/ui`, then consume the same surface
          through npm packages or registry items.
        </p>
        <div className={styles.listBlock}>
          <div className={styles.listItem}>`@steez-ui/theme` exports tokens and compatibility aliases.</div>
          <div className={styles.listItem}>`@steez-ui/icons` exports the shared icon surface and provider.</div>
          <div className={styles.listItem}>`@steez-ui/ui` exports React primitives with `.tsx` and `.module.css` output.</div>
        </div>
      </div>
    ),
  },
  {
    id: "workflow",
    label: "Workflow",
    content: (
      <div className={styles.tabPanel}>
        <div className={styles.listBlock}>
          <div className={styles.listItem}>1. Build packages from `packages/theme`, `packages/icons`, and `packages/ui`.</div>
          <div className={styles.listItem}>2. Generate registry payloads from source with `bun run generate:registry`.</div>
          <div className={styles.listItem}>3. Publish packages and deploy the registry frontend from the same repo.</div>
        </div>
      </div>
    ),
  },
  {
    id: "adoption",
    label: "Adoption",
    content: (
      <div className={styles.tabPanel}>
        <div className={styles.listBlock}>
          <div className={styles.listItem}>Use the registry when you want source files and CSS modules dropped into the app.</div>
          <div className={styles.listItem}>Use the npm packages when you want shared updates and a package dependency boundary.</div>
          <div className={styles.listItem}>Both install paths come from the same components, tokens, and icon surface.</div>
          <div className={styles.listItem}>The registry frontend is the product docs, preview shell, and install entry point.</div>
        </div>
      </div>
    ),
  },
];

export default function App() {
  const [installMode, setInstallMode] = useState("registry");
  const [packageManager, setPackageManager] = useState("bun");
  const [surfaceState, setSurfaceState] = useState<"success" | "error" | "info">("success");
  const [shippingConfidence, setShippingConfidence] = useState(82);
  const [showStatusRail, setShowStatusRail] = useState(true);

  const registryOrigin =
    typeof window === "undefined" ? SITE_URL : window.location.origin;

  const packageInstallCommand = useMemo(() => {
    if (packageManager === "npm") {
      return "npm install @steez-ui/theme @steez-ui/icons @steez-ui/ui";
    }

    if (packageManager === "pnpm") {
      return "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
    }

    return "bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
  }, [packageManager]);

  const foundationCommand = `bunx shadcn@latest add ${registryOrigin}/r/foundation.json`;
  const buttonCommand = `bunx shadcn@latest add ${registryOrigin}/r/button.json`;

  const installTabs = useMemo(
    () => [
      {
        id: "registry",
        label: "Registry",
        content: (
          <div className={styles.commandStack}>
            <ThemedCard title="Foundation preset">
              <div className={styles.commandRow}>
                <code className={styles.commandCode}>{foundationCommand}</code>
                <CopyButton value={foundationCommand} />
              </div>
            </ThemedCard>
            <ThemedCard title="Single component">
              <div className={styles.commandRow}>
                <code className={styles.commandCode}>{buttonCommand}</code>
                <CopyButton value={buttonCommand} />
              </div>
            </ThemedCard>
          </div>
        ),
      },
      {
        id: "packages",
        label: "Packages",
        content: (
          <div className={styles.commandStack}>
            <div className={styles.inlineLabel}>Package manager</div>
            <SegmentedControl
              value={packageManager}
              onChange={setPackageManager}
              options={[
                { value: "bun", label: "Bun" },
                { value: "npm", label: "npm" },
                { value: "pnpm", label: "pnpm" },
              ]}
            />
            <ThemedCard title="Direct install">
              <div className={styles.commandRow}>
                <code className={styles.commandCode}>{packageInstallCommand}</code>
                <CopyButton value={packageInstallCommand} />
              </div>
            </ThemedCard>
          </div>
        ),
      },
    ],
    [buttonCommand, foundationCommand, packageInstallCommand, packageManager],
  );

  const statusMessage = useMemo(() => {
    if (!showStatusRail) {
      return null;
    }

    if (surfaceState === "success") {
      return <StatusMessage type="success" message="Registry payloads and packages are aligned." />;
    }

    if (surfaceState === "error") {
      return <StatusMessage type="error" message="A package or registry surface needs review." />;
    }

    return <StatusMessage type="info" message="Foundation install path is ready to use." />;
  }, [showStatusRail, surfaceState]);

  return (
    <SteezIconProvider size={16} strokeWidth={2}>
      <div className={styles.app}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Steez UI</div>
            <h1>Installable React primitives with package and registry output.</h1>
            <p className={styles.heroBody}>
              Steez UI is a standalone component system built with CSS modules, flat tokens,
              and generated registry manifests. Use the packages directly, or install the same
              source through a shadcn-compatible registry.
            </p>

            <div className={styles.heroActions}>
              <Button onClick={() => window.open("./r/foundation.json", "_blank", "noopener,noreferrer")}>
                Foundation preset
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open("./r/index.json", "_blank", "noopener,noreferrer")}
              >
                Registry index
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open(REPOSITORY_URL, "_blank", "noopener,noreferrer")}
              >
                GitHub
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <div className={styles.heroRail}>
            {VALUE_PROPS.map((item) => (
              <CyberpunkTile key={item.title} className={styles.valueTile}>
                <div className={styles.tileTitle}>{item.title}</div>
                <p className={styles.tileBody}>{item.body}</p>
              </CyberpunkTile>
            ))}
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Getting started</div>
              <h2>Choose the install path that matches the app you are building.</h2>
            </div>

            <div className={styles.installGrid}>
              <ThemedCard title="Install" className={styles.flatCard}>
                <SegmentedControl
                  value={installMode}
                  onChange={setInstallMode}
                  options={[
                    { value: "registry", label: "Registry" },
                    { value: "packages", label: "Packages" },
                  ]}
                />
                <div className={styles.installPanel}>
                  <TabbedPanel tabs={installTabs} activeTab={installMode} onTabChange={setInstallMode} />
                </div>
              </ThemedCard>

              <ThemedCard title="Reference" className={styles.flatCard}>
                <div className={styles.referenceGrid}>
                  <div className={styles.referenceRow}>
                    <span className={styles.referenceLabel}>Registry domain</span>
                    <code className={styles.inlineCode}>{registryOrigin}</code>
                  </div>
                  <div className={styles.referenceRow}>
                    <span className={styles.referenceLabel}>Packages</span>
                    <span className={styles.referenceValue}>theme, icons, ui</span>
                  </div>
                  <div className={styles.referenceRow}>
                    <span className={styles.referenceLabel}>Authoring model</span>
                    <span className={styles.referenceValue}>React + CSS modules</span>
                  </div>
                  <div className={styles.referenceRow}>
                    <span className={styles.referenceLabel}>Registry style</span>
                    <span className={styles.referenceValue}>shadcn-compatible JSON payloads</span>
                  </div>
                </div>
              </ThemedCard>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>What ships</div>
              <h2>Keep tokens, primitives, and install output in one repo.</h2>
            </div>

            <div className={styles.inventoryGrid}>
              {INVENTORY_TILES.map((tile) => (
                <CyberpunkTile key={tile.title} variant="big" className={styles.inventoryTile}>
                  <div className={styles.tileTitle}>{tile.title}</div>
                  <p className={styles.tileBody}>{tile.detail}</p>
                </CyberpunkTile>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Packages</div>
              <h2>Use the packages directly when you want a shared dependency surface.</h2>
            </div>

            <div className={styles.packageGrid}>
              {PACKAGE_SURFACES.map((item) => (
                <CyberpunkTile key={item.title} className={styles.packageTile}>
                  <div className={styles.tileTitle}>{item.title}</div>
                  <p className={styles.tileBody}>{item.body}</p>
                  <div className={styles.packageMeta}>
                    <a className={styles.subtleLink} href={item.npmHref}>
                      npm package
                    </a>
                    <a className={styles.subtleLink} href={REPOSITORY_URL}>
                      source
                    </a>
                  </div>
                </CyberpunkTile>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Documentation</div>
              <h2>Use the registry frontend as a direct product surface, not a placeholder preview.</h2>
            </div>

            <ThemedCard title="Project notes" className={styles.flatCard}>
              <TabbedPanel tabs={DOC_SECTIONS} defaultTab="overview" />
            </ThemedCard>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Component preview</div>
              <h2>Preview the primitives in a flat, documentation-first shell.</h2>
            </div>

            <div className={styles.previewGrid}>
              <ThemedCard title="Preview form" className={styles.flatCard}>
                <div className={styles.previewForm}>
                  <CyberpunkInput label="Project name" defaultValue="studio-shell" variant="full" />
                  <CyberpunkSelect
                    label="Starter surface"
                    defaultValue="dashboard"
                    options={[
                      { value: "dashboard", label: "Dashboard" },
                      { value: "docs", label: "Docs" },
                      { value: "settings", label: "Settings" },
                    ]}
                    variant="full"
                  />
                  <CyberpunkTextarea
                    label="Positioning"
                    defaultValue="Token-driven primitives, installable packages, and generated registry payloads."
                    variant="full"
                  />
                  <CyberpunkRadioGroup
                    name="state"
                    value={surfaceState}
                    onChange={(value) => setSurfaceState(value as "success" | "error" | "info")}
                    options={[
                      { value: "success", label: "Success" },
                      { value: "info", label: "Info" },
                      { value: "error", label: "Error" },
                    ]}
                  />
                  <CyberpunkSlider
                    label="Release confidence"
                    value={shippingConfidence}
                    onChange={(event) => setShippingConfidence(Number(event.currentTarget.value))}
                  />
                  <CyberpunkCheckbox
                    label="Show status rail"
                    checked={showStatusRail}
                    onChange={setShowStatusRail}
                  />
                </div>
              </ThemedCard>

              <div className={styles.previewSide}>
                <ThemedCard title="Status rail" className={styles.flatCard}>{statusMessage}</ThemedCard>
                <ThemedCard title="Delivery note" className={styles.flatCard}>
                  <ErrorMessage
                    variant="inline"
                    title="Registry contract"
                    message="Each registry item carries component source and its CSS module together."
                    details="The package surface and the registry payloads are generated from the same source tree."
                  />
                </ThemedCard>
                <ThemedCard title="Registry readiness" className={styles.flatCard}>
                  <LoadingProgressBar progress={shippingConfidence} valueLabel={`${shippingConfidence}%`} />
                </ThemedCard>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Registry items</div>
              <h2>Open the generated payloads directly.</h2>
            </div>

            <div className={styles.registryLinkGrid}>
              <a className={styles.registryLink} href="./r/index.json">
                registry index
              </a>
              <a className={styles.registryLink} href="./r/foundation.json">
                foundation preset
              </a>
              <a className={styles.registryLink} href="./r/button.json">
                button item
              </a>
              <a className={styles.registryLink} href="./r/theme-tokens.json">
                theme tokens
              </a>
            </div>
          </section>
        </main>
      </div>
    </SteezIconProvider>
  );
}
