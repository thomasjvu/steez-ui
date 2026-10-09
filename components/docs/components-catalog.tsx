"use client";

import Link from "next/link";
import React from "react";
import {
  COMPONENT_CATEGORY_LABELS,
  COMPONENT_DOCS,
  COMPONENT_FILTERS,
  type ComponentFilter,
} from "@/lib/docs/component-catalog";
import styles from "./component-docs.module.css";
import siteStyles from "./site-layout.module.css";

export function ComponentsCatalog() {
  const [filter, setFilter] = React.useState<ComponentFilter>("all");

  const groupedComponents = React.useMemo(() => {
    return COMPONENT_FILTERS.filter((item) => item.value !== "all").map(({ value: category }) => ({
      category,
      items: COMPONENT_DOCS.filter((component) =>
        component.category === category && (filter === "all" || category === filter),
      ),
    })).filter((group) => group.items.length > 0);
  }, [filter]);

  return (
    <>
      <div className={styles.filterBar} role="group" aria-label="Filter by category">
        {COMPONENT_FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              className={`${styles.filterChip} ${active ? styles.filterChipActive : ""}`}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {groupedComponents.map((group) => (
        <section key={group.category} className={siteStyles.section}>
          <h2 className={siteStyles.sectionTitle}>
            {COMPONENT_CATEGORY_LABELS[group.category]}
          </h2>
          <ul className={styles.catalogList}>
            {group.items.map((component) => (
              <li key={component.slug}>
                <Link href={`/components/${component.slug}`} className={styles.catalogRow}>
                  <div className={styles.catalogRowMain}>
                    <span className={styles.catalogName}>{component.title}</span>
                    <span className={styles.catalogSlug}>{component.slug}</span>
                  </div>
                  <p className={styles.catalogSummary}>{component.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
