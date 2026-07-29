# Steez UI

Source of truth for **@steez-ui** packages (consolidated from the original monorepo) plus a documentation-style discovery site.

## Packages

**Canonical stack for new apps and Phantasy** (install these):

| Package | Role |
| --- | --- |
| `@steez-ui/theme` | Design tokens + Tailwind preset |
| `@steez-ui/icons` | Icon surface + provider |
| `@steez-ui/ui` | React primitives (TSX + CSS modules) — **source of truth** |

**Legacy (do not use for new work):**

| Package | Role |
| --- | --- |
| `@steez-ui/react` | Portable Tailwind/CVA bundle — **legacy / maintenance mode** only |

Phantasy admin already consumes the canonical package names from npm. This repo is where those components live and evolve. `@steez-ui/react` remains published for existing consumers; it is not an equal peer of `@steez-ui/ui` for new development.

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
| `/r/*.json` | Legacy Boston / motion blocks |

Featured FUI surfaces used by Phantasy:

- [Cyberpunk Tile](/components/cyberpunk-tile) (`CyberTile` alias)
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
  react/    # legacy portable package (optional)

app/        # Next docs + discover site
public/r-steez/  # generated registry JSON for package primitives
public/r/        # legacy motion / demo blocks
scripts/    # build helpers from upstream monorepo
```

## Install a registry item

Locally use your dev origin; production registry base is `SITE_URL` (`https://steez-ui-6v5.pages.dev` from `lib/docs/site-data.ts`).

```bash
# Local (pnpm dev)
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/loading-progress-bar.json

# Production
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/loading-progress-bar.json
```

## License

MIT
