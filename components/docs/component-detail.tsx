"use client";

import Link from "next/link";
import React from "react";
import { CopyButton } from "@steez-ui/ui";
import {
  COMPONENT_CATEGORY_LABELS,
  getComponentDoc,
} from "@/lib/docs/component-catalog";
import { ComponentPreview } from "@/components/docs/component-preview";
import { COMPONENT_MANIFEST } from "@/lib/docs/component-manifest.mjs";
import { SITE_URL } from "@/lib/docs/site-data";
import styles from "./component-docs.module.css";
import siteStyles from "./site-layout.module.css";

export function ComponentDetail({ slug }: { slug: string }) {
  const component = getComponentDoc(slug);
  const manifest = COMPONENT_MANIFEST.find((item) => item.slug === slug);
  const [standalone, setStandalone] = React.useState<{
    slug: string;
    source: string | null;
  } | null>(null);
  const [origin, setOrigin] = React.useState("");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  React.useEffect(() => {
    if (!component) return;
    const controller = new AbortController();

    async function loadStandaloneSource() {
      try {
        const response = await fetch(`/copy/steez/${slug}.tsx`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const source = await response.text();
        if (!source.trim()) throw new Error("Empty standalone file");
        if (!controller.signal.aborted) setStandalone({ slug, source });
      } catch {
        if (!controller.signal.aborted) setStandalone({ slug, source: null });
      }
    }

    void loadStandaloneSource();
    return () => controller.abort();
  }, [component, slug]);

  if (!component) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.metaText}>Component not found.</p>
        <Link href="/components" className={siteStyles.buttonGhost + " " + siteStyles.button}>
          Back to components
        </Link>
      </div>
    );
  }

  const registryOrigin = origin || SITE_URL;
  const registryCommand = `pnpm dlx shadcn@latest add ${registryOrigin}/r-steez/${component.slug}.json`;
  const standaloneResult = standalone?.slug === slug ? standalone : null;
  const standaloneSource = standaloneResult?.source;
  const standalonePath = `/copy/steez/${component.slug}.tsx`;
  const installedComponent = manifest?.registryFiles.find((file) => file.source.endsWith(".tsx"));
  const registryImport = installedComponent
    ? component.packageImport.replace(/"@steez-ui\/ui(?:\/[^"]+)?"/, `"<project-root>/${installedComponent.target.replace(/\.tsx$/, "")}"`)
    : "";
  const packageInstallCommand = "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
  const relatedComponents = component.related
    .map((relatedSlug) => getComponentDoc(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <div className={styles.breadcrumb}>
        <Link href="/components">Components</Link>
        <span> / {component.title}</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.tag}>{COMPONENT_CATEGORY_LABELS[component.category]}</span>
        {component.tags.slice(0, 4).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <p className={siteStyles.pageLead} style={{ marginTop: 0 }}>
        {component.description}
      </p>

      <div className={styles.docLayout}>
        <div>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Preview</h2>
            <div
              className={`${styles.previewSurface} ${component.slug === "page-template" ? styles.previewSurfaceShell : ""}`}
            >
              <ComponentPreview slug={component.slug} />
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Usage</h2>
            <p className={styles.usageLead}>{component.summary}</p>
            <code className={styles.codeBlock}>{component.usage}</code>
          </div>

          {manifest?.registryFiles.length ? (
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Files</h2>
              <div className={styles.fileList}>
                {manifest.registryFiles.map((file) => (
                  <div key={file.target} className={styles.fileItem}>
                    <code className={styles.fileText}>{file.target}</code>
                    <span className={styles.tag}>{file.type.replace("registry:", "")}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside>
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Install package</h2>
            <div className={styles.commandPreview}>
              <code className={styles.inlineCode}>{packageInstallCommand}</code>
              <CopyButton value={packageInstallCommand} />
            </div>
            <p className={styles.metaText} style={{ marginTop: "0.65rem" }}>
              {component.packageImport}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Install from registry</h2>
            <div className={styles.commandPreview}>
              <code className={styles.inlineCode}>{registryCommand}</code>
              <CopyButton value={registryCommand} />
            </div>
            <p className={styles.metaText}>
              Source files install at your project root. Import styles/steez/tokens.css once
              in your global stylesheet or root layout. No Steez packages needed.
            </p>
            {registryImport && <code className={styles.codeBlock}>{registryImport}</code>}
            <p className={styles.metaText}>Replace &lt;project-root&gt; with a relative path from your file.</p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Copy standalone file</h2>
            <div className={styles.commandPreview}>
              <code className={styles.inlineCode}>{standalonePath}</code>
              {standaloneSource ? (
                <CopyButton value={standaloneSource} title="Copy standalone component" />
              ) : (
                <span className={styles.metaText} role="status">
                  {standaloneResult ? "Could not load source. Open the file below to try again." : "Loading…"}
                </span>
              )}
            </div>
            <p className={styles.metaText}>
              Copy the entire generated TSX file into your React project. It embeds CSS, local
              helpers, icons, and theme fallbacks, so no Steez npm packages are required.
            </p>
            <a
              href={standalonePath}
              target="_blank"
              rel="noreferrer"
              className={siteStyles.buttonGhost + " " + siteStyles.button}
            >
              Open standalone source
            </a>
          </div>

          {relatedComponents.length > 0 ? (
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Related</h2>
              <div className={styles.relatedList}>
                {relatedComponents.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/components/${related.slug}`}
                    className={styles.relatedLink}
                  >
                    <div className={styles.relatedTitle}>{related.title}</div>
                    <p className={styles.metaText}>{related.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
