import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronLeftIcon } from "@steez-ui/icons";
import {
  COMPONENT_DOCS,
  COMPONENT_FILTERS,
  type ComponentCategory,
} from "../lib/docs/component-catalog";

type CategoryFilter = Extract<
  (typeof COMPONENT_FILTERS)[number],
  { value: ComponentCategory }
>;
const CATEGORIES = COMPONENT_FILTERS.filter(
  (filter): filter is CategoryFilter => filter.value !== "all",
);

function categoryOf(pathname: string) {
  const slug = pathname.match(/^\/components\/([^/]+)/)?.[1];
  return COMPONENT_DOCS.find((item) => item.slug === slug)?.category;
}

/** Open state per category: only the current page's category on a component page, all elsewhere. */
function initialOpen(current: ComponentCategory | undefined) {
  return Object.fromEntries(
    CATEGORIES.map(({ value }) => [value, !current || value === current]),
  ) as Record<ComponentCategory, boolean>;
}

export function ComponentNav({ query }: { query: string }) {
  const current = categoryOf(useLocation().pathname);
  const [open, setOpen] = useState(() => initialOpen(current));
  useEffect(() => {
    if (current) setOpen((state) => ({ ...state, [current]: true }));
  }, [current]);
  const search = query.toLowerCase().trim();
  const matches = COMPONENT_DOCS.filter((item) =>
    `${item.title} ${item.slug} ${item.tags.join(" ")}`
      .toLowerCase()
      .includes(search),
  );
  return (
    <nav aria-label="Component library" className="component-nav">
      {CATEGORIES.map(({ value, label }) => {
        const items = matches.filter((item) => item.category === value);
        if (items.length === 0) return null;
        const expanded = Boolean(search) || open[value];
        const listId = `component-nav-${value}`;
        return (
          <section key={value}>
            <h2>
              <button
                type="button"
                className="nav-category"
                aria-expanded={expanded}
                aria-controls={listId}
                onClick={() =>
                  setOpen((state) => ({ ...state, [value]: !expanded }))
                }
              >
                {label}
                <ChevronLeftIcon width={12} height={12} aria-hidden="true" />
              </button>
            </h2>
            <div id={listId} hidden={!expanded}>
              {items.map((item) => (
                <NavLink key={item.slug} to={`/components/${item.slug}`}>
                  {item.title}
                </NavLink>
              ))}
            </div>
          </section>
        );
      })}
      {matches.length === 0 && <p className="muted">No components found.</p>}
    </nav>
  );
}
