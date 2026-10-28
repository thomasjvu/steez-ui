import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router";
import { ComponentsCatalog } from "../components/docs/components-catalog";
import { ComponentDetail } from "../components/docs/component-detail";
import {
  COMPONENT_DOCS,
  COMPONENT_FILTERS,
} from "../lib/docs/component-catalog";
import { REPOSITORY_URL } from "../lib/docs/site-data";
import { Appearance } from "./theme";
import { Guide, Packages, Registry } from "./pages";
import { pageMetadata } from "./page-metadata";

function DetailRoute() {
  const { slug = "" } = useParams();
  return <ComponentDetail key={slug} slug={slug} />;
}
export function NotFound() {
  return (
    <div className="page-header">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>This address doesn’t match a page.</p>
      <Link to="/components">Browse components →</Link>
    </div>
  );
}

export function App() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);
  const search = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (menuOpen) search.current?.focus();
  }, [menuOpen]);
  useEffect(() => {
    const { title, description } = pageMetadata(location.pathname);
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://steez-ui-6v5.pages.dev${location.pathname}`,
      );
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;
      setMenuOpen(false);
      main.current?.focus();
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(true);
        search.current?.focus();
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  const matches = COMPONENT_DOCS.filter((item) =>
    `${item.title} ${item.slug} ${item.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="mobile-header">
        <Link to="/" className="brand" aria-label="Steez UI home">
          <span className="brand-wordmark" aria-hidden="true" />
        </Link>
        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-sidebar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>
      <aside
        id="site-sidebar"
        className={`sidebar ${menuOpen ? "is-open" : ""}`}
      >
        <Link to="/" className="brand" aria-label="Steez UI home">
          <span className="brand-wordmark" aria-hidden="true" />
        </Link>
        <div className="search-field">
          <input
            ref={search}
            type="search"
            aria-label="Find a component"
            placeholder="Find a component…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </div>
        <nav aria-label="Documentation" className="site-nav">
          <NavLink to="/components">Components</NavLink>
          <NavLink to="/docs">Getting started</NavLink>
          <NavLink to="/packages">Packages</NavLink>
          <NavLink to="/registry">Registry</NavLink>
        </nav>
        <nav aria-label="Component library" className="component-nav">
          {COMPONENT_FILTERS.filter(({ value }) => value !== "all").map(
            ({ value, label }) => {
              const items = matches.filter((item) => item.category === value);
              return (
                items.length > 0 && (
                  <section key={value}>
                    <h2>{label}</h2>
                    {items.map((item) => (
                      <NavLink key={item.slug} to={`/components/${item.slug}`}>
                        {item.title}
                      </NavLink>
                    ))}
                  </section>
                )
              );
            },
          )}
          {matches.length === 0 && (
            <p className="muted">No components found.</p>
          )}
        </nav>
        <div className="sidebar-footer">
          <Appearance />
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </aside>
      <main id="content" ref={main} tabIndex={-1} className="main-content">
        <Routes>
          <Route path="/" element={<ComponentsCatalog />} />
          <Route path="/components" element={<ComponentsCatalog />} />
          <Route path="/components/:slug" element={<DetailRoute />} />
          <Route path="/docs" element={<Guide />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="main-footer">
          <span>Steez UI</span>
          <span>React · CSS Modules · MIT</span>
        </footer>
      </main>
    </>
  );
}
