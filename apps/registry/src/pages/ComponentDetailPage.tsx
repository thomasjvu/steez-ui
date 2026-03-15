import React from "react";

import {
  CopyButton,
  StatusMessage,
  TabbedPanel,
  ThemedCard,
} from "@steez-ui/ui";

import {
  COMPONENT_CATEGORY_LABELS,
  COMPONENT_DOCS,
  getComponentDoc,
} from "../components-docs/componentCatalog";
import { ComponentPreview } from "../components-docs/ComponentPreview";
import styles from "../components-docs/ComponentDocs.module.css";
import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import siteStyles from "../site/RegistrySiteLayout.module.css";

interface RegistryFile {
  path: string;
  type: string;
}

interface RegistryManifest {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

function getComponentSlugFromPathname(pathname: string) {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

function formatRegistryLabel(registryDependency: string) {
  return registryDependency
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ComponentDetailPage() {
  const slug =
    typeof window === "undefined" ? "" : getComponentSlugFromPathname(window.location.pathname);
  const component = getComponentDoc(slug);
  const [manifest, setManifest] = React.useState<RegistryManifest | null>(null);
  const [manifestError, setManifestError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!component || typeof window === "undefined") {
      return;
    }

    let cancelled = false;
    const componentSlug = component.slug;

    async function loadManifest() {
      try {
        const response = await fetch(`${window.location.origin}/r/${componentSlug}.json`);
        if (!response.ok) {
          throw new Error(`Unable to load manifest (${response.status})`);
        }

        const payload = (await response.json()) as RegistryManifest;
        if (!cancelled) {
          setManifest(payload);
          setManifestError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setManifestError(error instanceof Error ? error.message : "Unable to load manifest.");
        }
      }
    }

    void loadManifest();

    return () => {
      cancelled = true;
    };
  }, [component]);

  if (!component) {
    return (
      <RegistrySiteLayout
        currentNav="components"
        title="Component not found"
        description="This component page does not exist in the current Steez UI catalog."
      >
        <section className={siteStyles.section}>
          <ThemedCard title="Not found" className={siteStyles.flatCard}>
            <div className={styles.emptyState}>
              <p className={styles.metaText}>
                The requested component does not exist in the current catalog.
              </p>
              <a href="/components/" className={siteStyles.linkButton}>
                Back to components
              </a>
            </div>
          </ThemedCard>
        </section>
      </RegistrySiteLayout>
    );
  }

  const registryOrigin =
    typeof window === "undefined" ? "https://steez-ui-6v5.pages.dev" : window.location.origin;
  const registryCommand = `bunx shadcn@latest add ${registryOrigin}/r/${component.slug}.json`;
  const packageInstallCommand = "bun add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
  const relatedComponents = component.related
    .map((relatedSlug) => getComponentDoc(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const installTabs = [
    {
      id: "registry",
      label: "Registry",
      content: (
        <div className={styles.codeStack}>
          <div className={styles.commandPreview}>
            <code className={styles.inlineCode}>{registryCommand}</code>
            <CopyButton value={registryCommand} />
          </div>
          <p className={styles.metaText}>
            Installs the component source files and linked style modules into the consuming app.
          </p>
        </div>
      ),
    },
    {
      id: "packages",
      label: "Packages",
      content: (
        <div className={styles.codeStack}>
          <div className={styles.commandPreview}>
            <code className={styles.inlineCode}>{packageInstallCommand}</code>
            <CopyButton value={packageInstallCommand} />
          </div>
          <div className={styles.commandPreview}>
            <code className={styles.inlineCode}>{component.packageImport}</code>
            <CopyButton value={component.packageImport} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <RegistrySiteLayout
      currentNav="components"
      title={component.title}
      description={component.summary}
    >
      <section className={siteStyles.section}>
        <div className={styles.docHeader}>
          <div className={styles.breadcrumb}>
            <a href="/components/">Components</a>
            {" / "}
            <span>{component.title}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.categoryTag}>
              {COMPONENT_CATEGORY_LABELS[component.category]}
            </span>
            {component.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className={siteStyles.heroTitle}>{component.title}</h1>
          <p className={siteStyles.body}>{component.description}</p>
        </div>
      </section>

      <section className={siteStyles.section}>
        <div className={styles.docGrid}>
          <div className={styles.stack}>
            <ThemedCard title="Preview" className={styles.previewCard}>
              <div
                className={`${styles.previewSurface} ${component.slug === "page-template" ? styles.previewSurfaceShell : ""}`}
              >
                <ComponentPreview slug={component.slug} />
              </div>
            </ThemedCard>

            <ThemedCard title="Usage" className={styles.usageCard}>
              <div className={styles.codeStack}>
                <p className={styles.usageLead}>{component.summary}</p>
                <code className={styles.codeBlock}>{component.usage}</code>
              </div>
            </ThemedCard>

            <ThemedCard title="Included files" className={styles.filesCard}>
              {manifestError ? (
                <StatusMessage type="error" message={manifestError} />
              ) : manifest ? (
                <div className={styles.fileList}>
                  {manifest.files.map((file) => (
                    <div key={file.path} className={styles.fileItem}>
                      <code className={styles.fileText}>{file.path}</code>
                      <div className={styles.metaRow}>
                        <span className={styles.tag}>{file.type.replace("registry:", "")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <StatusMessage type="info" message="Loading registry manifest..." />
              )}
            </ThemedCard>
          </div>

          <div className={styles.stack}>
            <ThemedCard title="Install" className={styles.metaCard}>
              <TabbedPanel tabs={installTabs} defaultTab="registry" className={styles.installTabs} />
            </ThemedCard>

            <ThemedCard title="Package surface" className={styles.metaCard}>
              <div className={styles.metaList}>
                <div className={styles.metaBlock}>
                  <div className={styles.metaLabel}>Import</div>
                  <code className={styles.inlineCode}>{component.packageImport}</code>
                </div>
                {manifest?.dependencies?.length ? (
                  <div className={styles.metaBlock}>
                    <div className={styles.metaLabel}>Dependencies</div>
                    <div className={styles.metaRow}>
                      {manifest.dependencies.map((dependency) => (
                        <span key={dependency} className={styles.tag}>
                          {dependency}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {manifest?.registryDependencies?.length ? (
                  <div className={styles.metaBlock}>
                    <div className={styles.metaLabel}>Registry dependencies</div>
                    <div className={styles.metaRow}>
                      {manifest.registryDependencies.map((dependency) => (
                        <span key={dependency} className={styles.tag}>
                          {formatRegistryLabel(dependency)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </ThemedCard>

            <ThemedCard title="Related components" className={styles.relatedCard}>
              <div className={styles.relatedList}>
                {relatedComponents.map((relatedComponent) => (
                  <a
                    key={relatedComponent.slug}
                    className={styles.relatedLink}
                    href={`/components/${relatedComponent.slug}/`}
                  >
                    <div className={styles.relatedItem}>
                      <div className={styles.catalogTitle}>{relatedComponent.title}</div>
                      <p className={styles.metaText}>{relatedComponent.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </ThemedCard>
          </div>
        </div>
      </section>
    </RegistrySiteLayout>
  );
}
