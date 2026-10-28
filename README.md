# Steez UI

React components, design tokens, and icons, with a docs site for previews and installation.

## Brand and display font

The docs use the record-label wordmark in `public/brand/steezui-logo.svg`,
using cleaned vector silhouettes from the approved logo image for its six distinct
letters. **Steez Display** extends those shapes into Regular (400) and Bold (700) fonts: uppercase,
lowercase, numbers, ASCII punctuation, and selected currency, typographic, and
arrow symbols. It is available for logos and display text; the app uses Maple Mono
Bold for headings and Maple Mono for body copy. The family is licensed under the
SIL Open Font License 1.1.

Open `/brand/specimen.html` on the docs dev server to try both weights and download
`/brand/steez-display-family.zip`. Desktop TTFs, web WOFF2s, the CSS declarations,
and license are in `public/brand/fonts/`. To use the family on the web:

```css
@import url("/brand/fonts/fonts.css");
.headline { font-family: "Steez Display", sans-serif; font-weight: 700; }
```

The reproducible outline source is `scripts/build-steez-display.py`. Rebuild with:

```bash
python3 -m venv .cache/steez-font-venv
.cache/steez-font-venv/bin/pip install -r scripts/steez-font-requirements.txt
.cache/steez-font-venv/bin/python scripts/build-steez-display.py
```

## Start a project

Use the npm packages when projects should receive shared updates. Use the registry
when a project should own and customize the source. Use standalone copies when a
component should be pasted into an app with no Steez package or registry setup.
Choose one approach per component. Registry and standalone files are generated from
`packages/ui/src`; do not maintain a second implementation.

```bash
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/boiling-lines.json
```

Registry files install in `components/steez`, with shared helpers in
`components/hooks`, `components/styles`, and `lib/steez`. Paths are relative to the
project root, including for apps that use a `src` directory. Import the generated
`styles/steez/tokens.css` once in your global stylesheet or root layout. Import the
installed component with a relative path from your file. Registry consumers do not
need any `@steez-ui/*` npm packages. CSS modules require no Tailwind preset.

### Standalone copy

Every catalog component also has a generated single-file copy under
[`public/copy/steez/`](public/copy/steez/). Open the component’s `.tsx` file, copy
the entire file, and paste it into a React project—for example:

```text
components/ui/CyberpunkTile.tsx
```

Standalone files embed the component’s CSS, local hooks, and required Steez icons.
They use CSS-variable fallbacks, so importing `@steez-ui/theme` is optional. The
only normal requirement is that the destination app already has React. Standalone
copies are generated artifacts: edit `packages/ui/src` and run
`pnpm registry:generate` when the canonical component changes.

Components that depend on browser APIs still require a client component boundary
where the host framework uses one.

## A small design language

| Need | Start with | Guidance |
| --- | --- | --- |
| Signature cut-corner surface | `CyberpunkTile` | Use the surface directly. |
| Interactive launcher | `FUIButtonTile` | Use a button for an action; tiles frame content. |
| Quiet content surface | `ThemedCard` | Use `CornerBracketCard` or `DottedHaloCard` when that framing serves the design. |
| Hand-drawn motion | `BoilingLines` | One component with `subtle`, `default`, and `intense` presets. |
| Character art | `CharacterAfterimage` | Rainbow holographic silhouettes with an optional entrance trail. |
| Text accents | `StrokedText`, `AsciiRippleText`, `BlinkText` | Choose one treatment for a focal point; keep body text readable. |
| Progress | `LoadingProgressBar` | Compose into `LoadingScreen` for full loading states. |
| Ambient canvas | `HexagonGrid` | Opt in through its dedicated package subpath. |

Start with shared theme tokens, use one signature surface and one motion treatment,
and compose existing primitives before adding new ones. Change color tokens in the
consuming app after importing the theme. Keep project names, logos, routing, and
content in that app. Component variants belong in props; examples and compositions
belong in the docs, not in new copies of the primitive.

The canonical surface families are **actions**, **forms**, **surfaces**, **layout**,
**motion/text**, and **feedback/loading**. The package README lists the public exports
in each family. A new component should add a new behavior or interaction;
visual variations belong as props.

`BoilingLines` accepts children, intensity, speedMs, scale, paused, and native div
attributes. It preserves artwork alt text and disables animation for reduced motion.
The older `/r/boiling-lines-*` demos remain archival; use `/r-steez/boiling-lines.json`
for new projects.

`CharacterAfterimage` wraps an image with decorative, aria-hidden holographic copies.
Its optional entrance motion and persistent color cycling respect reduced-motion
preferences; position and size the wrapper from the consuming layout.

## Packages

**Canonical stack for new apps** (install these):

| Package | Role |
| --- | --- |
| `@steez-ui/theme` | Design tokens + Tailwind preset |
| `@steez-ui/icons` | Icons + size and stroke provider |
| `@steez-ui/ui` | React primitives (TSX + CSS modules) — **source of truth** |

**Deprecated (migrate away):**

| Package | Role |
| --- | --- |
| `@steez-ui/react` | Portable Tailwind/CVA bundle — **deprecated**; no new features |

`@steez-ui/react` may still install for existing apps; migrate to `@steez-ui/ui` + theme + icons.

The legacy package is currently **deprecated-but-supported**: it remains published
for existing consumers, receives only security or critical fixes, and stays in the
workspace while its retirement gate is incomplete. Before isolating or removing it,
record the exact published versions, a dated inventory of known consuming repos,
per-consumer migration status, and an owner-approved public deprecation deadline.
This repository currently records no external consumer inventory or deadline, so
Plan 045 remains blocked. See [`packages/react/README.md`](packages/react/README.md)
for the export migration map and explicit legacy verification commands.

## Docs site

Open one primitive at a time:

| Route | Purpose |
| --- | --- |
| `/` | Component library |
| `/components` | Catalog index (filter by category) |
| `/components/[slug]` | Single component: preview, usage, install |
| `/docs` | Authoring model: add a primitive (package → catalog → preview → registry) |
| `/packages` | Published npm packages |
| `/registry` | Registry endpoints |
| `/r-steez/*.json` | Package registry payloads |
| `/copy/steez/*.tsx` | Generated standalone files for manual copy/paste |
| `/r/*.json` | Legacy Boston / motion blocks |

Components to try first:

- [Cyberpunk Tile](/components/cyberpunk-tile)
- [Boiling Lines](/components/boiling-lines)
- [Loading Progress Bar](/components/loading-progress-bar)
- [FUI Button Tile](/components/fui-button-tile)

## Development

The docs site uses Vite + React, with direct aliases to canonical package source.
Component TSX and CSS edits refresh previews without rebuilding `dist`.
Appearance follows the system by default; the sidebar provides light/dark overrides.


```bash
pnpm install
pnpm dev
```

```bash
# build docs + packages
pnpm build
# preview the production site
pnpm start
# deploy the verified Vite output to Cloudflare Pages
pnpm deploy:pages
```

```bash
# consume in another app (workspace / file link)
pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

```tsx
import "@steez-ui/theme/tokens.css";
import { CyberpunkTile, LoadingProgressBar, FUIButtonTile, Button } from "@steez-ui/ui";
```

## Layout

```text
packages/
  theme/    # tokens
  icons/    # icons
  ui/       # canonical primitives (source of truth)
  react/    # DEPRECATED portable package (sunset)

src/        # Vite + React docs frontend
public/r-steez/  # generated registry JSON for package primitives
public/copy/steez/ # generated single-file standalone copies
public/r/        # archival Boston motion / demo blocks (frozen)
scripts/    # build helpers
```

## Install a registry item

Locally use your dev origin; production registry base is `SITE_URL` (`https://steez-ui-6v5.pages.dev` from `lib/docs/site-data.ts`).

**Foundation preset** (forms starter — inputs, select, checkbox, slider, button):

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/foundation.json
```

**Optional product preset** (theme + cyberpunk-tile + fui-button-tile + loading-progress-bar):

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/phantasy-fui.json
```

**Surface preset** (tiles, cards, and compact metrics):

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/surfaces.json
```

**Motion preset** (hand-drawn, text, marquee, and heartbeat treatments):

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/motion.json
```

**App shell preset** (navigation, layout, feedback, and loading primitives):

```bash
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/app-shell.json
```

Single primitives:

```bash
# Local (pnpm dev)
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/loading-progress-bar.json

# Production
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/loading-progress-bar.json
```

## Copy a standalone component

Standalone copies are served as plain TypeScript files. For example:

1. Open [`CyberpunkTile.tsx`](https://steez-ui-6v5.pages.dev/copy/steez/cyberpunk-tile.tsx).
2. Copy the entire file.
3. Paste it into `components/ui/CyberpunkTile.tsx` in a React app.
4. Import it from that local path and render it.

This path does not install `@steez-ui/theme`, `@steez-ui/icons`, or
`@steez-ui/ui`. Customize the pasted file in your app. Use the
package path for shared updates, or the registry path when you want source files
and dependency wiring installed automatically.

## License

MIT


The site build prerenders the catalog, documentation, and every component route
into `dist/`, with per-page metadata, a sitemap, and a 404 page. Browser previews
load on demand after hydration. `pnpm build:site` builds only the frontend;
`pnpm test:site-smoke` checks its generated routes and public install files.


### Responsive local validation

Use `pnpm check` for sequential typecheck, tests, and lint. Heavy one-shot checks
and canonical compilers share a local queue and run at lower CPU priority on
macOS/Linux. Starting two checks queues the second instead of running both at
once. Vitest uses one worker by default; pure utility tests use Node rather than
jsdom. Watch tests remain independent of the one-shot queue and use the same
worker cap.

Typecheck and lint caches live in ignored `.cache/`. Site typechecking includes
canonical sources and tests; generated standalone copies are checked separately
by `test:standalone-smoke`, and archival sources are outside the site gate.
Registry smoke checks retain independent consumer folders and compile batches
of eight sequentially to bound peak memory. Run those install checks when
primitives or generators change, and before publishing. Avoid parallel validation
or repeating full builds unless a change or failure calls for them.
