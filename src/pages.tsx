import { Link } from "react-router";
import { PACKAGE_ITEMS, REGISTRY_ITEMS, SITE_URL } from "../lib/docs/site-data";
import { CodeBlock } from "./code-block";

export function Guide() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Documentation</p>
        <h1>Getting started</h1>
        <p>
          Use packages for shared updates, registry source for customization, or
          a standalone file for one component.
        </p>
      </header>
      <div className="prose">
        <section>
          <h2>01 · Install the packages</h2>
          <CodeBlock>
            {"pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui"}
          </CodeBlock>
          <p>
            Import the tokens once, then use the components. CSS Modules handle
            component styling.
          </p>
          <CodeBlock>{`import "@steez-ui/theme/tokens.css";
import { Button } from "@steez-ui/ui";

export function Example() {
  return <Button>Continue</Button>;
}`}</CodeBlock>
        </section>
        <section>
          <h2>02 · Own the source</h2>
          <p>
            Install a component with shadcn. Shared helpers and tokens resolve
            through registry dependencies.
          </p>
          <CodeBlock>{`pnpm dlx shadcn@latest add ${SITE_URL}/r-steez/button.json`}</CodeBlock>
          <p>
            Files install relative to your project root. Import{" "}
            <code>styles/steez/tokens.css</code> once and use a relative
            component import. Steez npm packages aren’t required.
          </p>
        </section>
        <section>
          <h2>03 · Copy a single file</h2>
          <p>
            Each <Link to="/components">component page</Link> has a standalone
            source tab and download. Paste the generated TSX into a React
            project. Scoped CSS, helpers, icons, and token fallbacks are
            included.
          </p>
        </section>
        <section>
          <h2>Theme and motion</h2>
          <p>
            Set <code>data-theme="light"</code> or{" "}
            <code>data-theme="dark"</code> on your app root. Override color
            tokens after loading the theme. Animated components respect reduced
            motion.
          </p>
          <p>
            Load the optional canvas through{" "}
            <code>@steez-ui/ui/hexagon-grid</code> so it stays out of ordinary
            component imports.
          </p>
        </section>
        <section>
          <h2>Contributing a component</h2>
          <ol>
            <li>
              Add source and CSS Modules in <code>packages/ui/src</code>, then
              export the component.
            </li>
            <li>
              Add its manifest and usage example in <code>lib/docs</code>.
            </li>
            <li>
              Register a preview in{" "}
              <code>components/docs/component-preview.tsx</code>.
            </li>
            <li>
              Run <code>pnpm registry:generate</code>, then typecheck, tests,
              and both install smoke checks.
            </li>
          </ol>
          <p>
            The Vite dev server reads package source directly. Editing a
            component or CSS Module updates its preview without a package
            rebuild.
          </p>
        </section>
      </div>
    </>
  );
}

export function Packages() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Installation</p>
        <h1>Packages</h1>
        <p>Theme tokens, shared icons, and React primitives.</p>
      </header>
      <CodeBlock>
        {"pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui"}
      </CodeBlock>
      <div className="package-list">
        {PACKAGE_ITEMS.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer">
            <h2>{item.title} ↗</h2>
            <p>{item.body}</p>
          </a>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 24 }}>
        The older <code>@steez-ui/react</code> package is deprecated and
        supported for existing consumers. Use <code>@steez-ui/ui</code> for new
        work.
      </p>
    </>
  );
}

export function Registry() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Source installation</p>
        <h1>Registry</h1>
        <p>
          Install individual components or a preset. The source becomes part of
          your project.
        </p>
      </header>
      <CodeBlock>{`pnpm dlx shadcn@latest add ${SITE_URL}/r-steez/button.json`}</CodeBlock>
      <ul className="registry-list">
        {REGISTRY_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
              <span>↗</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="prose" style={{ marginTop: 28 }}>
        <p>
          <code>/r-steez</code> contains current package primitives.{" "}
          <code>/copy/steez</code> contains generated standalone TSX files. The
          older <code>/r</code> demo registry is archival.
        </p>
      </div>
    </>
  );
}
