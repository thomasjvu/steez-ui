# Plan 043: Make registry metadata and discoverability smaller and safer

> **Executor instructions**: Follow this plan step by step. Preserve all existing component slugs and install URLs. Touch only the files listed in Scope.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- scripts/generate-registry.mjs lib/docs/component-catalog.ts components/docs/component-preview.tsx packages/ui/src/index.ts public/r-steez lib/docs/registry-parity.test.ts`.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED
- **Depends on**: 041, 042
- **Category**: tech-debt
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

The registry generator, catalog, preview map, and package barrels all maintain overlapping inventories. The current parity tests catch missing slugs but not metadata or source-path drift. Internal helper payloads also appear in the public index even though they are only dependency closure nodes.

## Current state

- `scripts/generate-registry.mjs:25-684` contains hand-authored item definitions, source files, dependencies, and preset membership.
- `lib/docs/component-catalog.ts:39-654` separately defines component titles, descriptions, usage, and related slugs.
- `components/docs/component-preview.tsx:52-100` separately maps slugs to preview loaders.
- `scripts/generate-registry.mjs:658-790` creates shared helper payloads and adds every item to `index.json`.
- `lib/docs/registry-parity.test.ts:14-158` allowlists helper names and checks only partial parity.

## Scope

**In scope**:

- `scripts/generate-registry.mjs`
- `scripts/registry-install-smoke.mjs` (required to validate hidden dependency-only payloads)
- `lib/docs/component-catalog.ts`
- `components/docs/component-preview.tsx`
- `lib/docs/registry-parity.test.ts`
- `public/r-steez/*.json` (generated output only)
- `README.md` and `app/registry/page.tsx` if generated index labels require it

**Out of scope**: changing public slugs, deleting registry payloads, changing component implementations, or touching archival `/r`.

## Steps

### Step 1: Define a typed canonical manifest

Create a manifest module containing each public component’s slug, title, description, category, package entrypoint, registry source files, dependencies, and optional preview loader key. Refactor the generator and catalog to derive shared fields from it. Keep usage examples, related links, and preview implementation details in their local surfaces.

**Verify**: a test compares manifest slugs to package exports, catalog slugs, preview slugs, and generated registry component names with zero drift.

### Step 2: Hide internal helper items from index discovery

Add an `index: false` or equivalent internal flag to `stable-id`, `field-description`, `roving-tabs`, and `button-styles`. Filter only the generated `index.json`; retain helper JSON files and dependency URLs.

**Verify**: `public/r-steez/index.json` contains no helper entries; `pnpm test:registry-smoke` still verifies every helper through dependency closure.

### Step 3: Add direct generator transformation tests

Extract pure functions for extensionless import rewriting, shared-source ownership, absolute registry dependency URLs, and unresolved import detection. Add table-driven tests under `scripts/` or `lib/` using temporary output.

**Verify**: `pnpm test` covers the transformation cases and `pnpm registry:generate && git diff --exit-code -- public/r-steez` passes.

### Step 4: Run all gates

**Verify**: `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:registry-smoke` → exit 0.

## Done criteria

- [ ] Shared metadata has one canonical owner.
- [ ] Helper payloads remain resolvable but are absent from the discoverable index.
- [ ] Generator transformations have direct tests.
- [ ] Generated payloads are committed and deterministic.

## STOP conditions

- The manifest requires changing an existing public slug or URL.
- A source file has multiple legitimate registry owners that cannot be represented without copying.
- Generator tests require network access or mutate files outside `public/r-steez`.

## Maintenance notes

Keep creative usage examples and previews local to docs; only stable public metadata belongs in the manifest.
