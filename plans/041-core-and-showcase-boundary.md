# Plan 041: Move specialized compositions behind a blocks entrypoint

> **Executor instructions**: Follow this plan step by step. Touch only the files listed in Scope. Preserve public registry URLs. Stop if an existing documented import cannot be migrated safely.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- packages/ui/src/index.ts packages/ui/package.json tsconfig.json packages/ui/README.md lib/docs/component-catalog.ts components/docs scripts/generate-registry.mjs`.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: 040
- **Category**: tech-debt
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

The canonical barrel currently presents small primitives and product-shaped compositions as one equal API. `AccordionFeatureCard`, `LoadingOverlayCrystalline`, `QuickInfoCard`, `RadialMenuOverlay`, `RuntimeOrbitDiagram`, and `WidgetCard` are large or specialized compositions used only by docs previews in this repository. A `@steez-ui/ui/blocks` entrypoint keeps them available without making the core barrel the default discovery surface.

## Current state

- `packages/ui/src/index.ts:10-13,60-63,90-105,122` exports the specialized compositions from `@steez-ui/ui`.
- `packages/ui/package.json:25-30` defines only the main barrel and two heavy subpaths.
- `tsconfig.json:25-30` maps the package entrypoints for the docs app.
- `lib/docs/component-catalog.ts` and `components/docs/previews/*` contain package import strings and imports that must move to `@steez-ui/ui/blocks`.
- `scripts/generate-registry.mjs` must continue generating the same component JSON files and source paths.

## Scope

**In scope**:

- `packages/ui/src/index.ts`
- `packages/ui/src/blocks.ts` (create)
- `packages/ui/package.json`
- `tsconfig.json`
- `packages/ui/README.md`
- `lib/docs/component-catalog.ts`
- `components/docs/previews/preview-content.tsx`
- `components/docs/previews/preview-feedback.tsx`
- `components/docs/previews/preview-navigation.tsx`
- `components/docs/previews/runtime-orbit-diagram-preview.tsx`
- `lib/docs/registry-parity.test.ts`

**Out of scope**: deleting component files, changing registry JSON names, changing CSS, changing `packages/react`, or changing archival `/r` payloads.

## Steps

### Step 1: Add the blocks entrypoint

Create `packages/ui/src/blocks.ts` exporting the six specialized compositions and their public prop types. Remove those value exports from the main `src/index.ts`. Add `./blocks` to `packages/ui/package.json` exports and a matching TypeScript path in `tsconfig.json`.

**Verify**: `pnpm typecheck:packages` → exit 0; `pnpm --filter @steez-ui/ui build` → exit 0.

### Step 2: Migrate docs imports and public examples

Update preview imports and catalog `packageImport` strings for the moved components. Update the package README with a separate “Blocks” table and explicit `@steez-ui/ui/blocks` import examples.

**Verify**: `rg -n 'from "@steez-ui/ui"' components/docs lib/docs/component-catalog.ts` → no moved component appears in a main-barrel import; `pnpm typecheck:site` → exit 0.

### Step 3: Keep registry parity intentional

Update the parity test to parse both the main barrel and blocks entrypoint. Keep registry payloads and catalog slugs unchanged.

**Verify**: `pnpm test -- --pool=threads --maxWorkers=1` and `pnpm test:registry-smoke` → all pass.

## Done criteria

- [ ] Main barrel no longer exports the six blocks.
- [ ] `@steez-ui/ui/blocks` exports all six with types.
- [ ] Docs compile and use the blocks entrypoint.
- [ ] Existing `/r-steez/<slug>.json` URLs remain unchanged.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm build`, and registry smoke pass.

## STOP conditions

- A documented consumer requires a moved component from the main barrel and no compatibility strategy is available.
- The package build cannot emit the new subpath without changing out-of-scope build configuration.
- A registry payload changes its public name or target path.

## Maintenance notes

New product-shaped compositions belong in `blocks.ts`; new reusable behavior belongs in the main barrel only when it is broadly composable and independently useful.
