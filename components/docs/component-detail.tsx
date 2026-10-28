import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import {
  COMPONENT_CATEGORY_LABELS,
  getComponentDoc,
} from "../../lib/docs/component-catalog";
import { COMPONENT_MANIFEST } from "../../lib/docs/component-manifest.mjs";
import { SITE_URL } from "../../lib/docs/site-data";
import { CodeBlock } from "../../src/code-block";
import { PreviewOptions } from "./preview-options";
import { ComponentPreview } from "./component-preview";

import { PREVIEW_EXAMPLES, exampleCode, type PreviewValues } from "./preview-config";

const tabs = ["Usage", "Install", "Source"] as const;
type Tab = (typeof tabs)[number];

export function ComponentDetail({ slug }: { slug: string }) {
  const component = getComponentDoc(slug);
  const manifest = COMPONENT_MANIFEST.find((item) => item.slug === slug);
  const [tab, setTab] = useState<Tab>("Usage");
  const [configuration, setConfiguration] = useState<{ slug: string; values: PreviewValues }>({ slug, values: {} });
  const values = configuration.slug === slug ? configuration.values : {};
  const example = PREVIEW_EXAMPLES[slug];
  function update(prop: string, value: PreviewValues[string]) {
    setConfiguration({ slug, values: { ...values, [prop]: value } });
  }
  const [previewKey, setPreviewKey] = useState(0);
  const [standalone, setStandalone] = useState<{
    slug: string;
    source: string | null;
  } | null>(null);
  const [retry, setRetry] = useState(0);
  const [origin, setOrigin] = useState(SITE_URL);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setOrigin(window.location.origin), []);
  useEffect(() => {
    if (tab !== "Source" || !component) return;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`/copy/steez/${slug}.tsx`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const source = await response.text();
        if (!source.trim() || /^\s*(?:<!doctype|<html)/i.test(source))
          throw new Error("Missing source file");
        if (!controller.signal.aborted) setStandalone({ slug, source });
      } catch {
        if (!controller.signal.aborted) setStandalone({ slug, source: null });
      }
    }
    void load();
    return () => controller.abort();
  }, [tab, slug, component, retry]);
  if (!component)
    return (
      <header className="page-header">
        <p className="eyebrow">404</p>
        <h1>Component not found</h1>
        <Link to="/components">Browse components →</Link>
      </header>
    );
  const source = standalone?.slug === slug ? standalone : null;
  const standalonePath = `/copy/steez/${slug}.tsx`;
  const entry = manifest?.registryFiles.find((file) =>
    file.source.endsWith(".tsx"),
  );
  const registryImport = entry
    ? component.packageImport.replace(
        /"@steez-ui\/ui(?:\/[^"]+)?"/,
        `"<project-root>/${entry.target.replace(/\.tsx$/, "")}"`,
      )
    : "";
  return (
    <>
      <header className="page-header">
        <div className="breadcrumb">
          <Link to="/components">Components</Link> /{" "}
          {COMPONENT_CATEGORY_LABELS[component.category]}
        </div>
        <h1>{component.title}</h1>
        <p>{component.summary}</p>
      </header>
      <section
        className="preview-frame"
        aria-label={`${component.title} preview`}
      >
        <div className="preview-toolbar">
          <span>Live preview</span>
          <button
            type="button"
            onClick={() => { setPreviewKey((value) => value + 1); setConfiguration({ slug, values: {} }); }}
          >
            Reset preview
          </button>
        </div>
        <PreviewOptions slug={slug} values={values} onChange={update} />
        <div className="preview-stage" data-component={slug}>
          <ComponentPreview key={`${slug}-${previewKey}`} slug={slug} values={values} />
        </div>
      </section>
      <div className="tabs" role="tablist" aria-label="Component documentation">
        {tabs.map((name, index) => (
          <button
            key={name}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${id}-${name}`}
            type="button"
            role="tab"
            aria-selected={tab === name}
            aria-controls={`${id}-panel`}
            tabIndex={tab === name ? 0 : -1}
            onClick={() => setTab(name)}
            onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
              else if (event.key === "ArrowLeft")
                next = (index + tabs.length - 1) % tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabs.length - 1;
              else return;
              event.preventDefault();
              setTab(tabs[next]);
              tabRefs.current[next]?.focus();
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <section
        className="detail-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${tab}`}
        tabIndex={0}
      >
        {tab === "Usage" && (
          <>
            <p>{component.description}</p>
            <CodeBlock>{example ? exampleCode(slug, values) : `${component.packageImport}\n\n${component.usage}`}</CodeBlock>
          </>
        )}
        {tab === "Install" && (
          <>
            <h2>Package</h2>
            <CodeBlock>
              {"pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui"}
            </CodeBlock>
            <p>
              Import <code>@steez-ui/theme/tokens.css</code> once in your app.
            </p>
            <h2>Registry</h2>
            <CodeBlock>{`pnpm dlx shadcn@latest add ${origin}/r-steez/${slug}.json`}</CodeBlock>
            <p>
              Import the copied <code>styles/steez/tokens.css</code> once. No
              Steez npm packages required.
            </p>
            {registryImport && <CodeBlock>{registryImport}</CodeBlock>}
            <p>
              Replace <code>&lt;project-root&gt;</code> with the relative path
              from your file.
            </p>
            <h2>Installed files</h2>
            <ul className="file-list">
              {manifest?.registryFiles.map((file) => (
                <li key={file.target}>
                  <code>{file.target}</code>
                </li>
              ))}
            </ul>
          </>
        )}
        {tab === "Source" && (
          <>
            <p>
              A complete TSX file with scoped CSS and local helpers. React is
              the only required dependency.
            </p>
            <div className="detail-links">
              <a href={standalonePath} download={`${component.title}.tsx`}>
                Download TSX ↓
              </a>
              <a href={standalonePath} target="_blank" rel="noreferrer">
                Open source ↗
              </a>
            </div>
            {source?.source ? (
              <CodeBlock label="Copy standalone component">
                {source.source}
              </CodeBlock>
            ) : (
              <div role="status">
                {source ? (
                  <>
                    Could not load source.{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setStandalone(null);
                        setRetry((value) => value + 1);
                      }}
                    >
                      Retry
                    </button>
                  </>
                ) : (
                  "Loading…"
                )}
              </div>
            )}
          </>
        )}
      </section>

    </>
  );
}
