import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  COMPONENT_CATEGORY_LABELS,
  COMPONENT_DOCS,
  COMPONENT_FILTERS,
  type ComponentCategory,
  type ComponentFilter,
} from "../../lib/docs/component-catalog";

export function ComponentsCatalog() {
  const [filter, setFilter] = useState<ComponentFilter>("all");
  const [query, setQuery] = useState("");
  const groups = useMemo(
    () =>
      COMPONENT_FILTERS.filter(({ value }) => value !== "all")
        .map(({ value: category }) => ({
          category,
          items: COMPONENT_DOCS.filter(
            (item) =>
              item.category === category &&
              (filter === "all" || category === filter) &&
              `${item.title} ${item.slug} ${item.summary} ${item.tags.join(" ")}`
                .toLowerCase()
                .includes(query.toLowerCase().trim()),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [filter, query],
  );
  const count = groups.reduce((total, group) => total + group.items.length, 0);
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">
          The library · {COMPONENT_DOCS.length} components
        </p>
        <h1>Components</h1>
        <p>
          React primitives with a point of view. Preview a component, then bring
          it into your project.
        </p>
      </header>
      <div className="catalog-tools">
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter by category"
        >
          {COMPONENT_FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          className="catalog-search"
          type="search"
          aria-label="Search components"
          placeholder="Search components…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <span className="sr-only" role="status">
        {count} components
      </span>
      {groups.map((group) => (
        <section key={group.category} className="catalog-group">
          <h2>
            {COMPONENT_CATEGORY_LABELS[group.category as ComponentCategory]}{" "}
            <span aria-hidden="true">{group.items.length}</span>
          </h2>
          <ul className="catalog-list">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link to={`/components/${item.slug}`}>
                  <div className="catalog-name">
                    {item.title}
                    <span aria-hidden="true">↗</span>
                  </div>
                  <p>{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {count === 0 && (
        <div className="page-header">
          <h2>No matching components</h2>
          <p>Try a different name or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            style={{ marginTop: 16 }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
