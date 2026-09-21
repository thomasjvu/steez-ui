# @steez-ui/react

> **DEPRECATED / sunset in progress.** Do not start new work on this package.
>
> | | Canonical (new work) | This package (legacy) |
> | --- | --- | --- |
> | Package | `@steez-ui/ui` | `@steez-ui/react` |
> | Styling | CSS modules + design tokens | Tailwind / CVA + bundled `styles.css` |
> | Status | Source of truth (Phantasy + monorepo) | **No new features**; security/critical fixes only |
>
> **Migrate:** `pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui` and import from `@steez-ui/ui` (CSS modules). See the [root README](../../README.md).
>
> Install this package only if you already depend on it and cannot migrate yet.
>
> Workspace installs use the **root** `pnpm-lock.yaml` only (nested lockfile removed).

## Retirement gate

`@steez-ui/react` is currently **deprecated-but-supported**. Existing consumers may
continue to install the published package, and maintenance is limited to security
or critical fixes. The package remains in the workspace and its publication path
remains available while the retirement gate is incomplete.

Before isolating or deleting the package, record all of the following evidence:

1. **Published versions:** the exact published version list, registry metadata or
   URLs, and the final supported version.
2. **Known consumers:** each consuming repository, owner, package range or lockfile
   reference, and the search scope and date. A missing search result does not prove
   that there are no consumers.
3. **Migration status:** a per-consumer status showing the canonical target,
   verification date, and any approved blocker or exception.
4. **Deprecation deadline:** a public deprecation notice and an owner-approved date
   for ending support and removing the package.

The current repository records no external consumer inventory or deprecation
deadline, so those facts must be supplied before removal work starts. Until then,
keep the package workspace-visible, keep its root lockfile importer, and preserve
its published package behavior. The future **safe-to-remove** state begins only
after the evidence above is complete and the final release/removal communication
has been approved.

### Legacy export migration map

The canonical package is not a drop-in replacement. Use this map to plan each
consumer migration and verify behavior rather than changing the import path alone.

| Legacy export | Canonical direction | Migration notes |
| --- | --- | --- |
| `Button`, `buttonVariants` | `Button` from `@steez-ui/ui` | `Button` is available; variant/size names differ and `buttonVariants` is not a canonical export. |
| `Input`, `Textarea` | `CyberpunkInput`, `CyberpunkTextarea` | Replace the component and review labels, helper/error text, and CSS-module styling. |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `ThemedCard`, `CornerBracketCard`, or `DottedHaloCard` | Choose the surface that matches the design; there is no slot-for-slot canonical card family. |
| `Tile`, `TileMedia`, `TileBody` | `CyberpunkTile` | Compose children directly; the legacy subcomponent exports have no canonical aliases. |
| `Meter` | `LoadingProgressBar` | Rename `value` to `progress` and review the visual and accessibility output. |
| `Marquee` | `MarqueeStrip` | Provide `items` and `renderItem`; the text and class API is different. |
| `Shell`, `Display`, `SectionLabel`, `MonoLabel`, `NavBar` | `Section`, `SectionHeader`, or `PageHeader` | These are layout building blocks, not one-to-one replacements; compose the needed structure. |
| `Chip` | `SegmentedControl` where a grouped choice fits | There is no single-chip canonical export; preserve the interaction semantics. |
| `HorizontalSlider` | No direct equivalent | `CyberpunkSlider` is a range input, not a horizontal carousel; keep carousel composition in the consuming app. |
| `Badge`, `HypeStrip`, `Skeleton*`, `Media`, `optimizeImageUrl`, `cn` | No direct canonical export | Keep the behavior in the consuming app or compose canonical primitives where appropriate. |
| `styles.css` | `@steez-ui/theme/tokens.css` | The token import is canonical, but the legacy Tailwind class styling is not preserved automatically. |

Portable React package for **Steez UI** — a modern, futuristic, hypebeast-leaning design system (minimal cyber chrome, signal green, cool volt blue).

## Install

### Forgejo npm registry (preferred)

Host: **https://forgejo.thomasjvu.com** · owner: **steez-ui**

```bash
# project or user .npmrc
@steez-ui:registry=https://forgejo.thomasjvu.com/api/packages/steez-ui/npm/
//forgejo.thomasjvu.com/api/packages/steez-ui/npm/:_authToken=${FORGEJO_TOKEN}

pnpm add @steez-ui/react
```

If Cloudflare Access sits in front of the host, also send service-token headers (or use `cloudflared access`) when installing.

### Local tarball / path

```bash
pnpm add @steez-ui/react@file:./steez-ui-react-0.2.1.tgz
# or live source (always run build first)
pnpm add @steez-ui/react@file:../path/to/steez-ui/packages/react
```

## Usage

```tsx
import "@steez-ui/react/styles.css";
import { Button, Card, Marquee, Meter, Shell, Display } from "@steez-ui/react";

export function App() {
  return (
    <div className="steez-root" data-steez>
      <Marquee text="DROP  ◆  BUILD  ◆  SHIP  ◆  " />
      <Shell>
        <Display as="h1">Stay steezy.</Display>
        <Button variant="primary">Enter</Button>
        <Card interactive className="p-4 mt-4">
          <Meter value={72} />
        </Card>
      </Shell>
    </div>
  );
}
```

Wrap your app root with `className="steez-root"` and optionally `data-steez` so design tokens apply.

## Components

| Export | Role |
| --- | --- |
| `Button` | primary / secondary / ghost / ink / **fui** / **fui-solid** / **fui-ghost** |
| `Badge` | default / signal / volt |
| `Card` | surface + interactive hover |
| `Tile` / `TileMedia` / `TileBody` | cut-corner tile cards |
| `Media` / `optimizeImageUrl` | lazy images + CDN width hints |
| `Skeleton` / `SkeletonTile` / `SkeletonRow` | loading placeholders |
| `Input` / `Textarea` | form fields |
| `Chip` | filter chips |
| `Meter` | progress bar |
| `Shell` / `Display` / `SectionLabel` / `NavBar` | layout + type |
| `Marquee` | GPU transform ticker (pauses offscreen) |
| `HorizontalSlider` | snap carousel row |

## Theme

CSS variables live in `@steez-ui/react/styles.css`. Dark is default. Light:

```html
<div class="steez-root" data-steez-theme="light">
```

## Build & publish

```bash
# Run from the repository root. These commands are opt-in because the package is
# deprecated and excluded from canonical build/typecheck gates.
pnpm typecheck:react  # typecheck only
pnpm build:react      # tsup → single ESM dist/index.js + dist/styles.css
pnpm pack:react       # build and create the local tarball
pnpm verify:react     # typecheck, build, and pack in one legacy check

# The package-local equivalents remain available:
pnpm --dir packages/react typecheck
pnpm --dir packages/react build
pnpm --dir packages/react pack:local

# Forgejo (Infisical FORGEJO_ADMIN_TOKEN + CF Access service token):
#   cd /Users/area/repos/@thedailyquest/agent
#   set -a && source /Users/area/@phantasy/agent/.env.infisical.agents && set +a
#   FORGEJO_BASE_URL=https://forgejo.thomasjvu.com FORGEJO_PKG_OWNER=steez-ui \
#     node scripts/infisical-agent-secrets.mjs run -- \
#       node /Users/area/repos/@thomasjvu/steez-ui/packages/react/scripts/publish-forgejo.mjs
```

The package is **bundled** (tsup). Consumers resolve one entry file — no extensionless multi-file ESM issues under Vite/esbuild.
