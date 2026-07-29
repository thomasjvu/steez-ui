# @steez-ui/react

> **Legacy / maintenance mode.** Prefer **`@steez-ui/ui`** (with `@steez-ui/theme` + `@steez-ui/icons`) for new apps.
>
> | | Canonical (new work) | This package (legacy) |
> | --- | --- | --- |
> | Package | `@steez-ui/ui` | `@steez-ui/react` |
> | Styling | CSS modules + design tokens | Tailwind / CVA + bundled `styles.css` |
> | Status | Source of truth (Phantasy + monorepo) | Portable bundle; existing consumers only |
>
> See the [root README](../../README.md) for install and layout. This guide remains for consumers already on `@steez-ui/react`.

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
cd packages/react
pnpm install
pnpm build          # tsup → single ESM dist/index.js + dist/styles.css
pnpm pack           # local tarball

# Forgejo (Infisical FORGEJO_ADMIN_TOKEN + CF Access service token):
#   cd /Users/area/repos/@thedailyquest/agent
#   set -a && source /Users/area/@phantasy/agent/.env.infisical.agents && set +a
#   FORGEJO_BASE_URL=https://forgejo.thomasjvu.com FORGEJO_PKG_OWNER=steez-ui \
#     node scripts/infisical-agent-secrets.mjs run -- \
#       node /Users/area/repos/@thomasjvu/steez-ui/packages/react/scripts/publish-forgejo.mjs
```

The package is **bundled** (tsup). Consumers resolve one entry file — no extensionless multi-file ESM issues under Vite/esbuild.
