import Link from "next/link";
import { DocsSiteLayout } from "@/components/docs/site-layout";
import siteStyles from "@/components/docs/site-layout.module.css";

export default function DocsPage() {
  return (
    <DocsSiteLayout
      currentNav="docs"
      title="Docs"
      description="How Steez UI is organized and consumed."
    >
      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Source of truth</h2>
        <p className={siteStyles.body}>
          Components live in <code className={siteStyles.inlineCode}>packages/ui</code>. Tokens
          live in <code className={siteStyles.inlineCode}>packages/theme</code>. Icons live in{" "}
          <code className={siteStyles.inlineCode}>packages/icons</code>. This Next app is only
          documentation and discovery.
        </p>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Install paths</h2>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>npm packages</span>
            <p className={siteStyles.listMeta}>
              Shared updates across apps:{" "}
              <code className={siteStyles.inlineCode}>
                pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui
              </code>
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>shadcn registry</span>
            <p className={siteStyles.listMeta}>
              Copy source into a project via{" "}
              <code className={siteStyles.inlineCode}>/r-steez/*.json</code> payloads.
            </p>
          </li>
        </ul>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Site map</h2>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <Link href="/components">/components</Link>
            <p className={siteStyles.listMeta}>Catalog index</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/components/button">/components/[slug]</Link>
            <p className={siteStyles.listMeta}>One component at a time</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/packages">/packages</Link>
            <p className={siteStyles.listMeta}>npm package overview</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/registry">/registry</Link>
            <p className={siteStyles.listMeta}>Registry endpoints</p>
          </li>
        </ul>
      </section>
    </DocsSiteLayout>
  );
}
