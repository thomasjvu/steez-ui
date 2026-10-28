# AGENTS.md — Steez UI monorepo

Conventions for agents and humans working in this repo.

## Public mirror

- **SoT (private):** Forgejo `https://forgejo.thomasjvu.com/steez-ui/steez-ui`
- **Public mirror:** GitHub `https://github.com/thomasjvu/steez-ui` (portfolio / recruiter link)
- Keep them in sync: after landing on Forgejo `main`, push the same tip to GitHub `main`.

## Workspace layout

```text
packages/
  theme/   # @steez-ui/theme — design tokens + Tailwind preset (canonical)
  icons/   # @steez-ui/icons — icon surface + provider (canonical)
  ui/      # @steez-ui/ui — React primitives, CSS modules (canonical source of truth)
  react/   # @steez-ui/react — DEPRECATED Tailwind/CVA bundle (sunset; no new features)

src/           # Vite + React docs site (minimal shell + routes)
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
- Heavy canvas: `HexagonGrid` is **subpath-only** (`@steez-ui/ui/hexagon-grid`).

### `@steez-ui/react` retirement gate

The legacy package is **deprecated-but-supported** for existing consumers. It stays
workspace-visible and publishable while the retirement gate is blocked. Do not
delete it, narrow the workspace glob, remove its root lockfile importer, revoke
publication, or change its API without all of the following evidence:

1. The exact published version list, registry metadata or URLs, and final supported
   version.
2. A dated inventory of every known consuming repository, owner, package range or
   lockfile reference, and the search scope. No search result may be treated as
   proof that no consumers exist.
3. A per-consumer migration status with its canonical target, verification date,
   and any approved blocker or exception.
4. A public deprecation notice with an owner-approved support end and removal
   deadline.

The repository currently records no external consumer inventory or deprecation
deadline. Until that evidence is supplied, the package is not **safe-to-remove**.
See [`packages/react/README.md`](packages/react/README.md) for the export migration
map and the legacy verification commands.

## Commands

```bash
pnpm install              # workspace install (root)
pnpm build:packages       # theme → icons → ui (canonical build order)
pnpm typecheck:react      # opt-in DEPRECATED package check
pnpm build:react          # opt-in DEPRECATED package build
pnpm pack:react           # opt-in DEPRECATED package build + tarball
pnpm verify:react         # opt-in legacy typecheck, build, and pack check
pnpm dev                  # Vite docs site (source HMR)
pnpm build                # canonical packages + Vite build + static docs routes
pnpm lint                 # eslint .
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # per-package tsc --noEmit (no rebuild)
pnpm typecheck:site       # site tsc --noEmit (source path maps; no dist required)
pnpm test                 # vitest run
pnpm test:registry-smoke  # registry install smoke script
pnpm registry:generate    # → public/r-steez (canonical)
pnpm deploy:pages         # builds and deploys Cloudflare Pages (needs wrangler auth / CF token)
pnpm registry:build       # archival only — Boston /r demos (do not extend)
```

`build:packages` and `typecheck:packages` name only the canonical theme, icons,
and ui packages, so canonical gates remain independent of the legacy package.
Legacy checks run only when explicitly requested with the commands above. The
package-local equivalents are `pnpm --dir packages/react typecheck`, `build`, and
`pack:local`.

### Test authoring policy

- Never write unit tests after you write code.
- Highly prefer E2E tests as the sole testing mechanism. Use them to verify complex features work. At the end of E2E tests, produce a verifiable and repeatable artifact.
- If you must test a system in isolation, first write down all the ways it could fail, then write the code.

Retain isolated regression tests only when they catch a concrete failure that the
existing E2E coverage misses. Avoid tests that merely repeat implementation details,
assert default markup or CSS classes, or check routine prop forwarding. E2E
artifacts should include the command and inputs needed to reproduce the run, the
result, and relevant screenshots, traces, or generated output.

The current repository has static-site and registry/standalone install smoke
checks, but no browser E2E suite. Do not treat those smoke checks as coverage of
interactive behavior when deciding whether an existing regression test is redundant.

### Typecheck / test commands

```bash
pnpm typecheck            # typecheck:packages then typecheck:site
pnpm typecheck:packages   # theme + icons + ui via tsc --noEmit
pnpm typecheck:site       # docs app tsc --noEmit
pnpm test                 # vitest run
pnpm test:watch           # vitest (watch mode)
pnpm test:registry-smoke  # node scripts/registry-install-smoke.mjs
pnpm --dir packages/react typecheck   # legacy package only
```

`typecheck:packages` uses pure `tsc --noEmit` (not `build:packages`). `@steez-ui/ui` build still path-maps `@steez-ui/icons` to `icons/dist` for emit; typecheck uses `packages/ui/tsconfig.typecheck.json` which path-maps icons to **source** so no prior rebuild is required. Root `tsconfig.json` path-maps `@steez-ui/*` to package sources so `typecheck:site` also works with cold `dist`. `pnpm build` / `build:packages` still full-emit for publication; the Vite site resolves package source directly. Root gates exclude `packages/react`.
### Registry generate

| Command | Output |
| --- | --- |
| `pnpm registry:generate` | Package primitives → `public/r-steez` and standalone copies → `public/copy/steez` (`scripts/generate-registry.mjs`, `scripts/generate-standalone.mjs`) |
| `pnpm registry:build` | **Archival** Boston demos → `public/r` only; do not add new blocks |
| `pnpm test:registry-smoke` | Smoke-check install paths for generated r-steez payloads |
| `pnpm test:standalone-smoke` | Compile-check every generated single-file copy without Steez package imports |

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

Standalone copy payloads are committed under `public/copy/steez/`. Each file is a generated,
single-file TSX component with embedded scoped CSS and local helper/icon implementations. Keep
`packages/ui/src` as the only source of truth; do not hand-edit standalone files. Standalone
copies assume React is already installed and provide fallbacks for theme tokens.

**Absolute `registryDependencies`:** `scripts/generate-registry.mjs` writes each dep as a full URL so `shadcn add` can resolve cross-item deps off-host:

- Default base: `https://steez-ui-6v5.pages.dev/r-steez` (matches `SITE_URL` + `/r-steez`)
- Override for local demos: `STEEZ_REGISTRY_BASE_URL=http://localhost:5173/r-steez pnpm registry:generate`
- Smoke (`test:registry-smoke`) loads deps by basename whether bare or absolute

Committed `public/r-steez/*.json` should use the production default base. Re-generate with the env override only for local shadcn install demos; do not commit localhost URLs.

## Registry URL surfaces

| Path | Meaning |
| --- | --- |
| `/r-steez/*.json` | **Package primitives** — install path for `@steez-ui/ui` components (`public/r-steez/`) |
| `/copy/steez/*.tsx` | **Standalone primitives** — single-file manual copy path (`public/copy/steez/`) |
| `/r/*.json` | **Archival** Boston / motion demos (`public/r/` + `registry/boston/`) — freeze; empty `new-york` style tree removed |

Install example (canonical) — local dev or production (`SITE_URL` in `lib/docs/site-data.ts`):

```bash
# Local (pnpm dev) — regenerate with STEEZ_REGISTRY_BASE_URL if deps must point at localhost
pnpm dlx shadcn@latest add http://localhost:5173/r-steez/cyberpunk-tile.json

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


## Docs frontend

The frontend lives in `src/` and uses Vite + React Router. `vite.config.mts`
aliases canonical workspace imports to source for HMR, including theme CSS and
subpath-only HexagonGrid. Keep the React dedupe setting to avoid duplicate hook runtimes.
Do not reintroduce Next dependencies or add a rebuild requirement to the dev loop.
`pnpm build:site` builds the client and a build-only server entry, then prerenders
all catalog routes into `dist/`. Previews load after hydration so browser-only
canvas and DOM code never runs during prerendering. Cloudflare deploys `dist/`
and fails if the complete build is missing; it does not fall back to `public/`.


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
