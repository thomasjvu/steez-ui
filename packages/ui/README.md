# @steez-ui/ui

Canonical React primitives for **Steez UI** (TSX + CSS modules). Source of truth for new apps and Phantasy.

Pair with `@steez-ui/theme` (tokens) and `@steez-ui/icons` (icon surface).

> **Not** `@steez-ui/react` — that package is legacy (Tailwind/CVA portable bundle). Prefer this package for all new work. See the [root README](../../README.md) and [AGENTS.md](../../AGENTS.md).

## Install

```bash
pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

### Optional peer: `three` (SignalTrailBackdrop only)

`three` is an **optional peer dependency**. Install it only if you use `SignalTrailBackdrop` (WebGL):

```bash
pnpm add three
```

```tsx
// Subpath only — keeps WebGL/three out of the main package surface
import { SignalTrailBackdrop } from "@steez-ui/ui/signal-trail-backdrop";
```

Apps that never import the backdrop do not need `three`.

## Usage

```tsx
import "@steez-ui/theme/tokens.css";
import {
  CyberpunkTile,
  LoadingProgressBar,
  FUIButtonTile,
  Button,
} from "@steez-ui/ui";

export function Example() {
  return (
    <>
      <Button variant="primary">Enter</Button>
      <CyberpunkTile>Signal</CyberpunkTile>
      <LoadingProgressBar progress={60} />
      <FUIButtonTile label="Deploy" />
    </>
  );
}
```

## Registry install (docs site)

Local (`pnpm dev` from repo root) or production (`SITE_URL` = `https://steez-ui-6v5.pages.dev`):

```bash
# Local
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/loading-progress-bar.json

# Production
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/loading-progress-bar.json
```

Use **`/r-steez`**, not legacy `/r`.

## Build (from monorepo root)

```bash
pnpm build:packages   # theme → icons → ui
```

Package-local:

```bash
pnpm --filter @steez-ui/ui build
```
