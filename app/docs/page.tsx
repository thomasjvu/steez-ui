import Link from "next/link";
import { SITE_URL } from "@/lib/docs/site-data";
import { DocsSiteLayout } from "@/components/docs/site-layout";
import siteStyles from "@/components/docs/site-layout.module.css";

export default function DocsPage() {
  return (
    <DocsSiteLayout
      currentNav="docs"
      title="Authoring model"
      description="Add a component, document it, and generate its install files."
    >
      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Source of truth</h2>
        <p className={siteStyles.body}>
          Author once in the canonical packages. This Next app is documentation and discovery only
          — not a second component tree.
        </p>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>packages/ui</span>
            <p className={siteStyles.listMeta}>
              React primitives (<code className={siteStyles.inlineCode}>.tsx</code> +{" "}
              <code className={siteStyles.inlineCode}>.module.css</code>).
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>packages/theme</span>
            <p className={siteStyles.listMeta}>
              Design tokens and Tailwind preset. Consumers import{" "}
              <code className={siteStyles.inlineCode}>@steez-ui/theme/tokens.css</code>.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>packages/icons</span>
            <p className={siteStyles.listMeta}>Icons and shared size and stroke settings.</p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>packages/react</span>
            <p className={siteStyles.listMeta}>
              Legacy Tailwind/CVA bundle — maintenance only. Do not author new primitives here.
            </p>
          </li>
        </ul>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Three install paths</h2>
        <p className={siteStyles.body}>
          Every published primitive is generated from the same canonical source and can be used
          as an npm dependency, a source-level registry install, or a standalone file copy.
          Choose packages for shared updates, the registry for source ownership with automatic
          dependency wiring, or a standalone copy for a one-file paste into a React app.
        </p>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>npm packages</span>
            <p className={siteStyles.listMeta}>
              Shared updates across apps (Phantasy, etc.). Install the canonical stack:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui</code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              Import tokens once at the app root, then import components from the package:
            </p>
            <div className={`${siteStyles.codeBlock} ${siteStyles.codeBlockMultiline}`}>
              <code>
                {`import "@steez-ui/theme/tokens.css";
import { CyberpunkTile } from "@steez-ui/ui";`}
              </code>
            </div>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>shadcn registry (/r-steez)</span>
            <p className={siteStyles.listMeta}>
              Source-level install via JSON under{" "}
              <code className={siteStyles.inlineCode}>public/r-steez/</code> (served as{" "}
              <code className={siteStyles.inlineCode}>/r-steez/*.json</code>). Example:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>
                {`pnpm dlx shadcn@latest add ${SITE_URL}/r-steez/cyberpunk-tile.json`}
              </code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              Import the copied styles/steez/tokens.css once and use local imports from
              components/steez. Registry installs do not require Steez npm packages.
              Legacy Boston / motion demo blocks live under{" "}
              <code className={siteStyles.inlineCode}>/r/*.json</code> only — do not mix them with
              package primitives.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>standalone copy (/copy/steez)</span>
            <p className={siteStyles.listMeta}>
              Open a component&apos;s generated <code className={siteStyles.inlineCode}>.tsx</code>
              file, copy the entire file, and paste it into your project. CSS, local helpers,
              icons, and theme fallbacks are embedded; no Steez packages are needed.
            </p>
            <div className={siteStyles.codeBlock}>
              <code>
                {`${SITE_URL}/copy/steez/cyberpunk-tile.tsx`}
              </code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              Generated copies should be customized locally; edit the canonical package source
              when publishing an update.
            </p>
          </li>
        </ul>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Component presets</h2>
        <p className={siteStyles.body}>
          Install a group of related components with a preset:{" "}
          <code className={siteStyles.inlineCode}>surfaces</code>,{" "}
          <code className={siteStyles.inlineCode}>motion</code>, or{" "}
          <code className={siteStyles.inlineCode}>app-shell</code>. Use an individual item URL when you need one component.
        </p>
      </section>
      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Add a primitive (checklist)</h2>
        <p className={siteStyles.body}>
          Update the package, catalog, preview, and generated files together.
        </p>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>1. Component + CSS module</span>
            <p className={siteStyles.listMeta}>
              Add <code className={siteStyles.inlineCode}>packages/ui/src/components/MyThing.tsx</code>{" "}
              and <code className={siteStyles.inlineCode}>MyThing.module.css</code>. Prefer CSS
              modules and design tokens over hard-coded palette values. Export the component and its
              props type from the TSX file.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>2. Package export</span>
            <p className={siteStyles.listMeta}>
              Re-export from{" "}
              <code className={siteStyles.inlineCode}>packages/ui/src/index.ts</code> (named export +
              props type), matching the existing pattern:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>
                {`export { MyThing, type MyThingProps } from "./components/MyThing.js";`}
              </code>
            </div>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>3. Catalog entry</span>
            <p className={siteStyles.listMeta}>
              Add metadata to <code className={siteStyles.inlineCode}>COMPONENT_MANIFEST</code> in{" "}
              <code className={siteStyles.inlineCode}>lib/docs/component-manifest.mjs</code>:
              slug, title, description, category, package entrypoint and exports, registry files,
              dependencies, and preview loader. The slug names the component route and registry item.
              Add summary, usage, related components, and tags to{" "}
              <code className={siteStyles.inlineCode}>COMPONENT_DOC_DETAILS</code> in{" "}
              <code className={siteStyles.inlineCode}>lib/docs/component-catalog.ts</code>.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>4. Docs preview</span>
            <p className={siteStyles.listMeta}>
              Wire a preview loader in{" "}
              <code className={siteStyles.inlineCode}>components/docs/component-preview.tsx</code>{" "}
              (<code className={siteStyles.inlineCode}>PREVIEW_MAP</code>). Lightweight demos go in{" "}
              <code className={siteStyles.inlineCode}>components/docs/previews/preview-*.tsx</code>
              ; give heavy WebGL/canvas demos a dedicated file under{" "}
              <code className={siteStyles.inlineCode}>components/docs/previews/</code> and a dynamic
              import so they stay code-split.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>5. Generate install files</span>
            <p className={siteStyles.listMeta}>
              The generator reads component definitions from the manifest. Generate the registry
              payloads in <code className={siteStyles.inlineCode}>public/r-steez/</code> and
              standalone files in <code className={siteStyles.inlineCode}>public/copy/steez/</code>:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>pnpm registry:generate</code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              Verify that generated install files resolve:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>pnpm test:registry-smoke</code>
            </div>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>6. Build packages + verify the page</span>
            <p className={siteStyles.listMeta}>
              Build the canonical package graph, then open the component page:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>pnpm build:packages</code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              With <code className={siteStyles.inlineCode}>pnpm dev</code>, visit{" "}
              <code className={siteStyles.inlineCode}>/components/my-thing</code> and confirm preview,
              usage, package install, and{" "}
              <code className={siteStyles.inlineCode}>/r-steez/my-thing.json</code> all look correct.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>7. Tokens in consumer apps</span>
            <p className={siteStyles.listMeta}>
              Package consumers import <code className={siteStyles.inlineCode}>@steez-ui/theme/tokens.css</code>.
              Registry consumers import the copied <code className={siteStyles.inlineCode}>styles/steez/tokens.css</code>.
              Load tokens once in the root layout or global stylesheet so CSS module variables resolve.
              Do not bundle tokens inside each primitive.
            </p>
          </li>
        </ul>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Verification commands</h2>
        <p className={siteStyles.body}>
          Use the root scripts from <code className={siteStyles.inlineCode}>package.json</code> after
          changing packages, catalog, or registry:
        </p>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm typecheck</span>
            <p className={siteStyles.listMeta}>
              Checks the canonical packages and docs app without building (
              <code className={siteStyles.inlineCode}>tsc -p tsconfig.json --noEmit</code>).
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm test</span>
            <p className={siteStyles.listMeta}>
              Vitest suite (catalog shape, registry parity, package unit tests).
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm registry:generate</span>
            <p className={siteStyles.listMeta}>
              Writes registry JSON and standalone TSX files from{" "}
              <code className={siteStyles.inlineCode}>scripts/generate-registry.mjs</code>.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm test:registry-smoke</span>
            <p className={siteStyles.listMeta}>
              Smoke-checks generated registry install payloads (
              <code className={siteStyles.inlineCode}>scripts/registry-install-smoke.mjs</code>).
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm lint</span>
            <p className={siteStyles.listMeta}>Runs ESLint across the repository.</p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>pnpm registry:build</span>
            <p className={siteStyles.listMeta}>
              Legacy Boston surface only (<code className={siteStyles.inlineCode}>shadcn build</code>{" "}
              → <code className={siteStyles.inlineCode}>public/r</code>). Not the package-primitive
              path.
            </p>
          </li>
        </ul>
      </section>

      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Site map</h2>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <Link href="/components">/components</Link>
            <p className={siteStyles.listMeta}>Catalog index (filter by category)</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/components/button">/components/[slug]</Link>
            <p className={siteStyles.listMeta}>One component: preview, usage, and three install paths</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/packages">/packages</Link>
            <p className={siteStyles.listMeta}>Published npm packages</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/registry">/registry</Link>
            <p className={siteStyles.listMeta}>Registry endpoints (/r-steez and legacy /r)</p>
          </li>
        </ul>
      </section>
    </DocsSiteLayout>
  );
}
