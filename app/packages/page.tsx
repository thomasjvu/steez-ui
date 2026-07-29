import { DocsSiteLayout } from "@/components/docs/site-layout";
import { PACKAGE_ITEMS } from "@/lib/docs/site-data";
import siteStyles from "@/components/docs/site-layout.module.css";

export default function PackagesPage() {
  return (
    <DocsSiteLayout
      currentNav="packages"
      title="Packages"
      description="Published npm packages that mirror this workspace."
    >
      <ul className={siteStyles.list}>
        {PACKAGE_ITEMS.map((item) => (
          <li key={item.title} className={siteStyles.listItem}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.title}
            </a>
            <p className={siteStyles.listMeta}>{item.body}</p>
          </li>
        ))}
      </ul>
    </DocsSiteLayout>
  );
}
