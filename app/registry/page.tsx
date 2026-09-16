import Link from "next/link";
import { DocsSiteLayout } from "@/components/docs/site-layout";
import { REGISTRY_ITEMS } from "@/lib/docs/site-data";
import siteStyles from "@/components/docs/site-layout.module.css";

export default function RegistryPage() {
  return (
    <DocsSiteLayout
      currentNav="registry"
      title="Registry"
      description="shadcn-compatible JSON payloads for source-level installs."
    >
      <section className={siteStyles.section}>
        <p className={siteStyles.body}>
          Package primitives: <code className={siteStyles.inlineCode}>/r-steez/*.json</code>.
          Older motion blocks from this app:{" "}
          <code className={siteStyles.inlineCode}>/r/*.json</code>.
        </p>
        <p className={siteStyles.body}>
          Install one component by URL with shadcn. Its shared dependencies install automatically.
          Source files go into components/steez at your project root. Import the copied
          styles/steez/tokens.css once in your root layout or global stylesheet; no Steez
          npm packages are needed. Customize those files locally, or use the npm packages
          when you want shared updates across projects.
        </p>
        <ul className={siteStyles.list}>
          {REGISTRY_ITEMS.map((item) => (
            <li key={item.href} className={siteStyles.listItem}>
              <Link href={item.href}>{item.label}</Link>
              <p className={siteStyles.listMeta}>
                <code className={siteStyles.inlineCode}>{item.href}</code>
              </p>
            </li>
          ))}
          <li className={siteStyles.listItem}>
            <Link href="/components">Browse components</Link>
            <p className={siteStyles.listMeta}>Prefer the catalog over dumping every preview.</p>
          </li>
        </ul>
      </section>
    </DocsSiteLayout>
  );
}
