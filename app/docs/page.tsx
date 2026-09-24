import Link from "next/link";
import { DocsSiteLayout } from "@/components/docs/site-layout";
import siteStyles from "@/components/docs/site-layout.module.css";

export default function DocsPage() {
  return (
    <DocsSiteLayout
      currentNav="docs"
      title="Authoring model"
      description="How to add a primitive and keep package, catalog, preview, and registry in lockstep."
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
            <p className={siteStyles.listMeta}>Icon surface and provider used by shared primitives.</p>
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
                pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json
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
                https://steez-ui-6v5.pages.dev/copy/steez/cyberpunk-tile.tsx
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
        <h2 className={siteStyles.sectionTitle}>Intent presets</h2>
        <p className={siteStyles.body}>
          Start with a coherent family when a project needs more than one primitive:
          <code className={siteStyles.inlineCode}>surfaces</code>,{" "}
          <code className={siteStyles.inlineCode}>motion</code>, or{" "}
          <code className={siteStyles.inlineCode}>app-shell</code>. Individual item URLs remain{" "}
          the smaller path when a project needs only one primitive.
        </p>
      </section>
      <section className={siteStyles.section}>
        <h2 className={siteStyles.sectionTitle}>Add a primitive (checklist)</h2>
        <p className={siteStyles.body}>
          Keep these surfaces in lockstep. Skipping the catalog, preview, or generator is what
          produces registry and docs drift.
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
              Add a <code className={siteStyles.inlineCode}>COMPONENT_DOCS</code> object in{" "}
              <code className={siteStyles.inlineCode}>lib/docs/component-catalog.ts</code>. Required
              fields: <code className={siteStyles.inlineCode}>slug</code>,{" "}
              <code className={siteStyles.inlineCode}>title</code>,{" "}
              <code className={siteStyles.inlineCode}>category</code>,{" "}
              <code className={siteStyles.inlineCode}>summary</code>,{" "}
              <code className={siteStyles.inlineCode}>description</code>,{" "}
              <code className={siteStyles.inlineCode}>packageImport</code>,{" "}
              <code className={siteStyles.inlineCode}>usage</code>,{" "}
              <code className={siteStyles.inlineCode}>related</code>,{" "}
              <code className={siteStyles.inlineCode}>tags</code>. The slug becomes the route{" "}
              <code className={siteStyles.inlineCode}>/components/[slug]</code> and should match the
              registry item name (kebab-case).
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>4. Docs preview</span>
            <p className={siteStyles.listMeta}>
              Wire a preview loader in{" "}
              <code className={siteStyles.inlineCode}>components/docs/component-preview.tsx</code>{" "}
              (<code className={siteStyles.inlineCode}>PREVIEW_MAP</code>). Lightweight demos go in{" "}
              <code className={siteStyles.inlineCode}>components/docs/previews/preview-*.tsx</code>
              ; keep lightweight demos in bounded category modules and give heavy WebGL/canvas demos a dedicated file under{" "}
              <code className={siteStyles.inlineCode}>components/docs/previews/</code> and a dynamic
              import so they stay code-split.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>5. Registry generator item</span>
            <p className={siteStyles.listMeta}>
              Append an entry to <code className={siteStyles.inlineCode}>itemDefinitions</code> in{" "}
              <code className={siteStyles.inlineCode}>scripts/generate-registry.mjs</code> (source
              paths under <code className={siteStyles.inlineCode}>packages/ui</code>,{" "}
              <code className={siteStyles.inlineCode}>name</code> matching the catalog slug). Then
              regenerate payloads into{" "}
              <code className={siteStyles.inlineCode}>public/r-steez/</code>:
            </p>
            <div className={siteStyles.codeBlock}>
              <code>pnpm registry:generate</code>
            </div>
            <p className={siteStyles.listMeta} style={{ marginTop: "0.75rem" }}>
              Optional smoke check that install manifests resolve:
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
              Builds packages, then runs TypeScript on the docs app (
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
              Writes <code className={siteStyles.inlineCode}>public/r-steez/*.json</code> from{" "}
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
            <p className={siteStyles.listMeta}>Next.js ESLint for the docs site.</p>
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
        <h2 className={siteStyles.sectionTitle}>Lockstep surfaces</h2>
        <p className={siteStyles.body}>
          For each new slug, these four must agree on name and files:
        </p>
        <ul className={siteStyles.list}>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>packages/ui/src/…</span>
            <p className={siteStyles.listMeta}>Implementation + export from index.</p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>lib/docs/component-catalog.ts</span>
            <p className={siteStyles.listMeta}>
              Docs metadata driving <code className={siteStyles.inlineCode}>/components/[slug]</code>.
            </p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>components/docs/component-preview.tsx</span>
            <p className={siteStyles.listMeta}>Preview loader for that slug.</p>
          </li>
          <li className={siteStyles.listItem}>
            <span className={siteStyles.mono}>scripts/generate-registry.mjs → public/r-steez</span>
            <p className={siteStyles.listMeta}>
              Generator definition and committed{" "}
              <code className={siteStyles.inlineCode}>/r-steez/&lt;slug&gt;.json</code>.
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
            <p className={siteStyles.listMeta}>One component: preview, usage, dual install</p>
          </li>
          <li className={siteStyles.listItem}>
            <Link href="/packages">/packages</Link>
            <p className={siteStyles.listMeta}>npm package surface</p>
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
