"use client";

import Link from "next/link";
import React from "react";
import { CopyButton } from "@steez-ui/ui";
import {
  COMPONENT_CATEGORY_LABELS,
  getComponentDoc,
} from "@/lib/docs/component-catalog";
import { ComponentPreview } from "@/components/docs/component-preview";
import styles from "./component-docs.module.css";
import siteStyles from "./site-layout.module.css";

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

export function ComponentDetail({ slug }: { slug: string }) {
  const component = getComponentDoc(slug);
  const [manifest, setManifest] = React.useState<RegistryManifest | null>(null);
  const [origin, setOrigin] = React.useState("");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  React.useEffect(() => {
    if (!component) return;
    let cancelled = false;

    async function loadManifest() {
      try {
        const response = await fetch(`/r-steez/${component!.slug}.json`);
        if (!response.ok) throw new Error("missing");
        const payload = (await response.json()) as RegistryManifest;
        if (!cancelled) setManifest(payload);
      } catch {
        if (!cancelled) setManifest(null);
      }
    }

    void loadManifest();
    return () => {
      cancelled = true;
    };
  }, [component]);

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

  const registryOrigin = origin || "http://localhost:3000";
  const registryCommand = `pnpm dlx shadcn@latest add ${registryOrigin}/r-steez/${component.slug}.json`;
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

          {manifest?.files?.length ? (
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Files</h2>
              <div className={styles.fileList}>
                {manifest.files.map((file) => (
                  <div key={file.path} className={styles.fileItem}>
                    <code className={styles.fileText}>{file.path}</code>
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
