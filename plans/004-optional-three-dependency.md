# Plan 004: Stop shipping three as a hard dependency of @steez-ui/ui

> **Executor instructions**: Follow step by step. Verify each step. STOP if
> public API breaks unexpectedly beyond the planned subpath. Reviewer maintains
> index if noted.
>
> **Drift check**: Confirm `three` is still a dependency of `packages/ui/package.json`
> and only imported from `SignalTrailBackdrop.tsx`.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (consumers of SignalTrailBackdrop must install three)
- **Depends on**: 001 recommended
- **Category**: perf | migration
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

`@steez-ui/ui` is the Phantasy design-system surface. Almost every consumer
imports Button/tiles/forms. Only `SignalTrailBackdrop` needs WebGL via `three`.
Because the package has a single export `"."` and a barrel `index.ts`, `three`
is a hard dependency of the whole package (~hundreds of KB, install weight, and
risk of accidental bundling).

## Current state

- `packages/ui/package.json`: `"three": "^0.179.1"` under `dependencies`
- `packages/ui/src/components/SignalTrailBackdrop.tsx`: `import * as THREE from "three"`
- `packages/ui/src/index.ts` re-exports `SignalTrailBackdrop`
- Exports map only has `"."` and `./styles/Buttons.module.css`
- No `sideEffects` field on `@steez-ui/ui`
- Docs preview statically imports `SignalTrailBackdrop` from `@steez-ui/ui`

## Scope

**In scope**:
- `packages/ui/package.json` (deps, exports, sideEffects, peerDependenciesMeta)
- `packages/ui/src/index.ts` (export strategy for backdrop)
- Optional: `packages/ui/src/signal-trail-backdrop.ts` subpath entry re-export
- Docs: `components/docs/component-preview.tsx` import path if needed
- Catalog/docs usage string for signal-trail-backdrop if it shows import path
- `public/r-steez/signal-trail-backdrop.json` only if plan 002 already ran —
  otherwise leave registry to 002; if you change import paths in source, ensure
  registry content still valid when regenerated
- README one-liner for optional backdrop dependency

**Out of scope**:
- Rewriting the WebGL shaders
- Splitting every component into subpaths (only backdrop / three boundary)
- `packages/react`

## Target design (choose A unless blocked)

**Preferred (A)**: Keep named export from main barrel for API compatibility, but:

1. Move `three` from `dependencies` → `peerDependencies` (optional via
   `peerDependenciesMeta`: `{ "three": { "optional": true } }`).
2. Add subpath export:
   ```json
   "./signal-trail-backdrop": {
     "types": "./dist/components/SignalTrailBackdrop.d.ts",
     "import": "./dist/components/SignalTrailBackdrop.js"
   }
   ```
3. Add `"sideEffects": ["**/*.css"]` so bundlers can drop unused JS more safely.
4. In `SignalTrailBackdrop.tsx`, keep `import * as THREE from "three"` (peer).
5. Document: apps that use `SignalTrailBackdrop` must `pnpm add three`.

**Fallback (B)** if peer optional breaks Phantasy build immediately: create
`@steez-ui/effects` package — **STOP and report** before creating a new package;
prefer A.

Main barrel may continue re-exporting `SignalTrailBackdrop` for compatibility
(tree-shaking still depends on consumer bundler). The critical win is **not
installing three** for consumers who never use the backdrop when peer is optional.

## Git workflow

- Branch: `advisor/004-optional-three-dependency`

## Steps

### Step 1: package.json dependency boundary

- Remove `three` from `dependencies`
- Add to `peerDependencies`: `"three": ">=0.179.0"`
- Add `peerDependenciesMeta.three.optional = true`
- Align `@types/three` devDependency minor with installed three line if still needed
- Add `sideEffects: ["**/*.css"]`
- Add subpath export for signal-trail-backdrop as above

**Verify**: `node -e "const p=require('./packages/ui/package.json'); if(p.dependencies?.three) process.exit(1)"` → exit 0
(use read/JSON parse if ESM)

### Step 2: Build package

**Verify**: `pnpm --filter @steez-ui/ui build` → exit 0; dist still contains
SignalTrailBackdrop.js

### Step 3: Docs / catalog import notes

- Where docs show install for signal-trail only, mention peer `three`.
- Preview can keep importing from `@steez-ui/ui` if three remains installed at
  workspace root for the docs app — **add `three` to root or docs workspace
  deps** so the discover site still builds.

**Verify**: `pnpm build:packages` → exit 0; if Next typecheck available, run it

### Step 4: Tests

If vitest exists: a test that the main package.json does not list three under
dependencies (node assertion test at repo root or packages/ui).

## Done criteria

- [ ] `three` is not in `@steez-ui/ui` `dependencies`
- [ ] `three` is optional peerDependency
- [ ] Subpath export exists for signal-trail-backdrop
- [ ] `sideEffects` includes CSS
- [ ] Docs site still builds with three available at app level
- [ ] `pnpm build:packages` exits 0

## STOP conditions

- Removing hard dep breaks monorepo build in a way that cannot be fixed by
  adding three only to the Next app → report
- You believe a separate package is required → STOP (do not create without approval)

## Maintenance notes

- Phantasy admin: if it uses SignalTrailBackdrop, add `three` peer explicitly.
- Reviewers: check lockfile for accidental root-wide three removal without docs app dep.
