# AGENTS.md — Steez UI monorepo

Conventions for agents and humans working in this repo.

## Workspace layout

```text
packages/
  theme/   # @steez-ui/theme — design tokens + Tailwind preset (canonical)
  icons/   # @steez-ui/icons — icon surface + provider (canonical)
  ui/      # @steez-ui/ui — React primitives, CSS modules (canonical source of truth)
  react/   # @steez-ui/react — DEPRECATED Tailwind/CVA bundle (sunset; no new features)

app/           # Next.js docs + discovery site
components/    # Site-local components (not published packages)
lib/           # Docs catalog, registry helpers, utilities
public/r-steez/  # Registry JSON for package primitives (shadcn install path)
public/r/        # ARCHIVAL Boston / motion demo blocks (frozen)
registry/boston/ # ARCHIVAL shadcn sources for /r demos only
scripts/       # Build helpers, registry generators, publish scripts
plans/         # Execution plans (advisor work)
```

pnpm workspace: `packages/*` (see `pnpm-workspace.yaml`). Single root lockfile only.

## Canonical vs legacy

| Surface | Packages | Styling | Use for |
| --- | --- | --- | --- |
| **Canonical** | `@steez-ui/theme`, `@steez-ui/icons`, `@steez-ui/ui` | CSS modules + tokens | New apps, Phantasy, monorepo work |
| **Deprecated** | `@steez-ui/react` | Tailwind / CVA + bundled CSS | Existing consumers only; migrate ASAP |

- Do **not** add features to `@steez-ui/react` or document it as equal to `@steez-ui/ui`.
- Root `tsconfig.json` **excludes** `packages/react`.
- `packages/react` uses the **root** lockfile (nested lock removed). `build:react` / `publish:react:forgejo` are legacy escape hatches.
- Heavy canvas: `HexagonGrid` and `SignalTrailBackdrop` are **subpath-only** (`@steez-ui/ui/hexagon-grid`, `@steez-ui/ui/signal-trail-backdrop`).

## Commands

```bash
pnpm install              # workspace install (root)
pnpm build:packages       # theme → icons → ui (canonical build order)
pnpm build:react          # DEPRECATED package only (escape hatch)
pnpm dev                  # Next docs site (turbopack)
pnpm build                # build:packages then next build
pnpm lint                 # eslint .
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # per-package tsc --noEmit (no rebuild)
pnpm typecheck:site       # site tsc --noEmit (source path maps; no dist required)
pnpm test                 # vitest run
pnpm test:registry-smoke  # registry install smoke script
pnpm registry:generate    # → public/r-steez (canonical)
pnpm deploy:pages         # Cloudflare Pages (needs wrangler auth / CF token)
pnpm registry:build       # archival only — Boston /r demos (do not extend)
```

### Typecheck / test

```bash
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # theme + icons + ui via tsc --noEmit
pnpm typecheck:site       # docs app tsc --noEmit
pnpm test                 # vitest run
pnpm test:watch           # vitest (watch mode)
pnpm test:registry-smoke  # node scripts/registry-install-smoke.mjs
pnpm --dir packages/react typecheck   # legacy package only
```

`typecheck:packages` uses pure `tsc --noEmit` (not `build:packages`). `@steez-ui/ui` build still path-maps `@steez-ui/icons` to `icons/dist` for emit; typecheck uses `packages/ui/tsconfig.typecheck.json` which path-maps icons to **source** so no prior rebuild is required. Root `tsconfig.json` path-maps `@steez-ui/*` to package sources so `typecheck:site` also works with cold `dist`. `pnpm build` / `build:packages` still full-emit for publish and Next. Root gates exclude `packages/react`.
### Registry generate

| Command | Output |
| --- | --- |
| `pnpm registry:generate` | Package primitives → `public/r-steez` (`scripts/generate-registry.mjs`) |
| `pnpm registry:build` | **Archival** Boston demos → `public/r` only; do not add new blocks |
| `pnpm test:registry-smoke` | Smoke-check install paths for generated r-steez payloads |

```bash
pnpm registry:generate
pnpm test:registry-smoke
```

Registry payloads use explicit project-root targets and local source imports. Do not add
Steez npm dependencies to source installs. Shared source files have one owning registry
item; depend on it instead of copying it into another payload. The smoke test checks every
item independently without workspace path aliases. React component entry files declare
`"use client"` so copied and packaged interactive primitives work in Next.js.

Live steez payloads are committed under `public/r-steez/`. Regenerate after adding or changing package primitives.

**Absolute `registryDependencies`:** `scripts/generate-registry.mjs` writes each dep as a full URL so `shadcn add` can resolve cross-item deps off-host:

- Default base: `https://steez-ui-6v5.pages.dev/r-steez` (matches `SITE_URL` + `/r-steez`)
- Override for local demos: `STEEZ_REGISTRY_BASE_URL=http://localhost:3000/r-steez pnpm registry:generate`
- Smoke (`test:registry-smoke`) loads deps by basename whether bare or absolute

Committed `public/r-steez/*.json` should use the production default base. Re-generate with the env override only for local shadcn install demos; do not commit localhost URLs.

## Registry URL surfaces

| Path | Meaning |
| --- | --- |
| `/r-steez/*.json` | **Package primitives** — install path for `@steez-ui/ui` components (`public/r-steez/`) |
| `/r/*.json` | **Archival** Boston / motion demos (`public/r/` + `registry/boston/`) — freeze; empty `new-york` style tree removed |

Install example (canonical) — local dev or production (`SITE_URL` in `lib/docs/site-data.ts`):

```bash
# Local (pnpm dev) — regenerate with STEEZ_REGISTRY_BASE_URL if deps must point at localhost
pnpm dlx shadcn@latest add http://localhost:3000/r-steez/cyberpunk-tile.json

# Production
pnpm dlx shadcn@latest add https://steez-ui-6v5.pages.dev/r-steez/cyberpunk-tile.json
```

Do not mix `/r` and `/r-steez` when documenting new work.

## Consumer install (canonical)

```bash
pnpm add @steez-ui/theme @steez-ui/icons @steez-ui/ui
```

```tsx
import "@steez-ui/theme/tokens.css";
import { CyberpunkTile, LoadingProgressBar, FUIButtonTile, Button } from "@steez-ui/ui";
```

## Publish / secrets

- Do **not** commit tokens, `.env` files with secrets, or service credentials.
- Canonical packages: `scripts/publish-packages.mjs` (uses env / CI secrets).
- Legacy react: `packages/react/scripts/publish-forgejo.mjs` and root script `publish:react:forgejo`.
- Env names only in docs (e.g. `FORGEJO_TOKEN`, Infisical / CF Access tokens) — never paste values.
- Publish only via scripts with tokens supplied from the environment.

## Docs-only / scope hygiene

- Prefer editing docs in root `README.md`, package READMEs, and `AGENTS.md` over inventing new markdown trees.
- `plans/README.md` may be maintained by a reviewer — skip unless the task says otherwise.
- Do not delete `packages/react` or merge APIs without an explicit plan.
