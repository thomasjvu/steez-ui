import React from "react";

import { CyberpunkTile, SegmentedControl, ThemedCard } from "@steez-ui/ui";

import {
  COMPONENT_CATEGORY_LABELS,
  COMPONENT_DOCS,
  COMPONENT_FILTERS,
  type ComponentCategory,
  type ComponentFilter,
} from "../components-docs/componentCatalog";
import styles from "../components-docs/ComponentDocs.module.css";
import { RegistrySiteLayout } from "../site/RegistrySiteLayout";
import siteStyles from "../site/RegistrySiteLayout.module.css";

const CATEGORY_ORDER: ComponentCategory[] = [
  "actions",
  "forms",
  "surfaces",
  "layout",
  "feedback",
];

export function ComponentsPage() {
  const [filter, setFilter] = React.useState<ComponentFilter>("all");

  const groupedComponents = React.useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: COMPONENT_DOCS.filter((component) =>
        filter === "all" ? component.category === category : component.category === filter,
      ),
    })).filter((group) => group.items.length > 0);
  }, [filter]);

  return (
    <RegistrySiteLayout
      currentNav="components"
      title="Components"
      description="Inspect each primitive before you install it. Every component gets its own page, preview, usage block, and registry payload."
    >
      <section className={siteStyles.section}>
        <div className={siteStyles.eyebrow}>Component docs</div>
        <h1 className={siteStyles.heroTitle}>Browse each primitive before you install it.</h1>
        <p className={`${siteStyles.body} ${styles.catalogIntro}`}>
          Steez documents components as individual pages, not as one long marketing scroll.
          Each primitive has a dedicated preview, usage snippet, install path, and registry manifest.
        </p>
      </section>

      <section className={siteStyles.section}>
        <ThemedCard title="Filter" className={siteStyles.flatCard}>
          <div className={styles.filterWrap}>
            <SegmentedControl
              value={filter}
              onChange={(value) => setFilter(value as ComponentFilter)}
              options={COMPONENT_FILTERS.map((item) => ({ value: item.value, label: item.label }))}
              ariaLabel="Filter components by category"
            />
          </div>
        </ThemedCard>
      </section>

      {groupedComponents.map((group) => (
        <section key={group.category} className={siteStyles.section}>
          <div className={styles.categorySection}>
            <div className={siteStyles.eyebrow}>{COMPONENT_CATEGORY_LABELS[group.category]}</div>
            <div className={styles.catalogGrid}>
              {group.items.map((component) => (
                <a
                  key={component.slug}
                  className={styles.catalogLink}
                  href={`/components/${component.slug}/`}
                >
                  <CyberpunkTile className={styles.catalogCard}>
                    <div className={styles.catalogHeader}>
                      <h2 className={styles.catalogTitle}>{component.title}</h2>
                      <span className={styles.categoryTag}>
                        {COMPONENT_CATEGORY_LABELS[component.category]}
                      </span>
                    </div>
                    <p className={styles.catalogSummary}>{component.summary}</p>
                    <p className={styles.catalogDescription}>{component.description}</p>
                  </CyberpunkTile>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}
    </RegistrySiteLayout>
  );
}
