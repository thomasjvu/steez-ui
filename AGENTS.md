# AGENTS.md — Steez UI monorepo

Conventions for agents and humans working in this repo.

## Workspace layout

```text
packages/
  theme/   # @steez-ui/theme — design tokens + Tailwind preset (canonical)
  icons/   # @steez-ui/icons — icon surface + provider (canonical)
  ui/      # @steez-ui/ui — React primitives, CSS modules (canonical source of truth)
  react/   # @steez-ui/react — legacy portable Tailwind/CVA bundle (maintenance only)

app/           # Next.js docs + discovery site
components/    # Site-local components (not published packages)
lib/           # Docs catalog, registry helpers, utilities
public/r-steez/  # Registry JSON for package primitives (shadcn install path)
public/r/        # Legacy Boston / motion demo blocks
registry/      # shadcn registry sources (Boston / new-york style trees)
scripts/       # Build helpers, registry generators, publish scripts
plans/         # Execution plans (advisor work)
```

pnpm workspace: `packages/*` (see `pnpm-workspace.yaml`).

## Canonical vs legacy

| Surface | Packages | Styling | Use for |
| --- | --- | --- | --- |
| **Canonical** | `@steez-ui/theme`, `@steez-ui/icons`, `@steez-ui/ui` | CSS modules + tokens | New apps, Phantasy, monorepo work |
| **Legacy** | `@steez-ui/react` | Tailwind / CVA + bundled CSS | Existing consumers only |

- Do **not** steer new features or docs toward `@steez-ui/react`.
- Root `tsconfig.json` **excludes** `packages/react`.
- `packages/react` has a nested `pnpm-lock.yaml` (known debt; do not “fix” by deleting in drive-by PRs).
- Full sunset of `@steez-ui/react` is a separate product decision.

## Commands

```bash
pnpm install              # workspace install (root)
pnpm build:packages       # theme → icons → ui (canonical build order)
pnpm build:react          # legacy package only (packages/react via tsup)
pnpm dev                  # Next docs site (turbopack)
pnpm build                # build:packages then next build
pnpm lint                 # next lint
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # build:packages (supplies dist for site types)
pnpm typecheck:site       # site tsc --noEmit (fast when dist is warm)
pnpm test                 # vitest run
pnpm test:registry-smoke  # registry install smoke script
pnpm registry:generate    # → public/r-steez
pnpm registry:build       # shadcn build → Boston / legacy /r surface
```

### Typecheck / test

```bash
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # build:packages (emit validates packages; supplies dist for site)
pnpm typecheck:site       # tsc --noEmit for the docs app (fast when dist is warm)
pnpm test                 # vitest run
pnpm test:watch           # vitest (watch mode)
pnpm test:registry-smoke  # node scripts/registry-install-smoke.mjs
pnpm --dir packages/react typecheck   # legacy package only
```

`typecheck:packages` uses `build:packages` rather than pure `tsc --noEmit` because `@steez-ui/ui` resolves `@steez-ui/icons` via `dist` path maps. Root gates exclude `packages/react`.
### Registry generate

| Command | Output |
| --- | --- |
| `pnpm registry:generate` | Package primitives → `public/r-steez` (`scripts/generate-registry.mjs`) |
| `pnpm registry:build` | Legacy Boston / motion blocks → `public/r` (`shadcn build`) |
| `pnpm test:registry-smoke` | Smoke-check install paths for generated r-steez payloads |

```bash
pnpm registry:generate
pnpm test:registry-smoke
```

Live steez payloads are committed under `public/r-steez/`. Regenerate after adding or changing package primitives.

## Registry URL surfaces

| Path | Meaning |
| --- | --- |
| `/r-steez/*.json` | **Package primitives** — install path for `@steez-ui/ui` components (`public/r-steez/`) |
| `/r/*.json` | **Legacy** Boston / motion demo blocks (`public/r/`) — **archival / freeze**; do not extend as the package install path |

Install example (canonical) — local dev or production (`SITE_URL` in `lib/docs/site-data.ts`):

```bash
# Local (pnpm dev)
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
