import { Link } from "react-router";
import { PACKAGE_ITEMS, REGISTRY_ITEMS, SITE_URL } from "../lib/docs/site-data";
import { CodeBlock } from "./code-block";

const PACKAGE_INSTALL = "pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui";
const REGISTRY_INSTALL = `pnpm dlx shadcn@latest add ${SITE_URL}/r-steez/button.json`;

export function Guide() {
  return (
    <>
      <header className="page-header">
        <h1>Getting started</h1>
      </header>
      <div className="prose">
        <section>
          <h2>Packages</h2>
          <CodeBlock>{PACKAGE_INSTALL}</CodeBlock>
          <CodeBlock>{`import "@steez-ui/theme/tokens.css";
import { Button } from "@steez-ui/ui";

<Button>Continue</Button>`}</CodeBlock>
        </section>
        <section>
          <h2>Registry</h2>
          <CodeBlock>{REGISTRY_INSTALL}</CodeBlock>
          <p>
            Import <code>styles/steez/tokens.css</code> once.
          </p>
        </section>
        <section>
          <h2>Standalone</h2>
          <p>
            Every <Link to="/components">component</Link> has a single-file TSX
            download under its Source tab.
          </p>
        </section>
        <section>
          <h2>Theme</h2>
          <p>
            Set <code>data-theme="light"</code> or{" "}
            <code>data-theme="dark"</code> on the root. Import the canvas from{" "}
            <code>@steez-ui/ui/hexagon-grid</code>.
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
        <h1>Packages</h1>
      </header>
      <CodeBlock>{PACKAGE_INSTALL}</CodeBlock>
      <div className="package-list">
        {PACKAGE_ITEMS.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer">
            <h2>{item.title} ↗</h2>
            <p>{item.body}</p>
          </a>
        ))}
      </div>
      <p className="muted page-note">
        <code>@steez-ui/react</code> is deprecated. Use{" "}
        <code>@steez-ui/ui</code>.
      </p>
    </>
  );
}

export function Registry() {
  return (
    <>
      <header className="page-header">
        <h1>Registry</h1>
      </header>
      <CodeBlock>{REGISTRY_INSTALL}</CodeBlock>
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
    </>
  );
}
