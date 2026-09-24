# Steez UI

Source of truth for **@steez-ui** packages (consolidated from the original monorepo) plus a documentation-style discovery site.

## Start a project

Use the npm packages when projects should receive shared updates. Use the registry
when a project should own and customize the source. Use standalone copies when a
component should be pasted into an app with no Steez package or registry setup.
Choose one approach per component. Every surface is generated from
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
| Signature cut-corner surface | `CyberpunkTile` | `CyberTile` is a compatibility alias, not another component. |
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
in each family. A new component should add a genuinely new behavior or interaction;
visual variations belong as props or a documented compatibility alias.

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
| `@steez-ui/icons` | Icon surface + provider |
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

## Discover site (not a component dump)

Open one primitive at a time:

| Route | Purpose |
| --- | --- |
| `/` | Overview + install |
| `/components` | Catalog index (filter by category) |
| `/components/[slug]` | Single component: preview, usage, install |
| `/docs` | Authoring model: add a primitive (package → catalog → preview → registry) |
| `/packages` | npm package surface |
| `/registry` | Registry endpoints |
| `/r-steez/*.json` | Package registry payloads |
| `/copy/steez/*.tsx` | Generated standalone files for manual copy/paste |
| `/r/*.json` | Legacy Boston / motion blocks |

Signature surfaces to inspect first:

- [Cyberpunk Tile](/components/cyberpunk-tile) (`CyberTile` alias)
- [Boiling Lines](/components/boiling-lines)
- [Loading Progress Bar](/components/loading-progress-bar)
- [FUI Button Tile](/components/fui-button-tile)

## Development

```bash
pnpm install
pnpm build:packages
pnpm dev
```

```bash
# build packages only
pnpm build:packages
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

app/        # Next docs + discover site
public/r-steez/  # generated registry JSON for package primitives
public/copy/steez/ # generated single-file standalone copies
public/r/        # archival Boston motion / demo blocks (frozen)
scripts/    # build helpers
```

## Install a registry item

Locally use your dev origin; production registry base is `SITE_URL` (`https://steez-ui-6v5.pages.dev` from `lib/docs/site-data.ts`).

**Foundation preset** (forms starter — inputs, select, checkbox, slider, button):

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/foundation.json
```

**Optional product preset** (theme + cyberpunk-tile + fui-button-tile + loading-progress-bar):

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/phantasy-fui.json
```

**Surface preset** (tiles, cards, and compact metrics):

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/surfaces.json
```

**Motion preset** (hand-drawn, text, marquee, and heartbeat treatments):

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/motion.json
```

**App shell preset** (navigation, layout, feedback, and loading primitives):

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/app-shell.json
```

Single primitives:

```bash
# Local (pnpm dev)
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/loading-progress-bar.json

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
`@steez-ui/ui`. It is intended for one-off ownership and customization. Use the
package path for shared updates, or the registry path when you want source files
and dependency wiring installed automatically.

## License

MIT
