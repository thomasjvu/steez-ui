# Plan 012: Stop publishing tests; complete Accordion surface; export parity

> **Executor instructions**: Branch `advisor/012-packaging-parity-and-accordion`.
> Commit, do not push. Skip plans/README.md. Run verifications.
>
> **Drift check**: Confirm `packages/ui/dist` contains `*.test.js` and
> `AccordionFeatureCard` is exported without catalog/registry.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug | tests | docs
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

1. UI package `tsconfig` includes `**/*` so vitest files emit into `dist/` and
   publish with `"files": ["dist"]`.
2. `AccordionFeatureCard` is a public export without catalog, registry, or
   preview — violates the authoring lockstep model and is invisible to
   catalog↔registry parity tests.

## Current state

- `packages/ui/tsconfig.json` include `./src/**/*` — no exclude for tests
- Dist has `useStableId.test.js`, `LoadingProgressBar.test.js`
- `packages/ui/src/index.ts` exports AccordionFeatureCard
- No accordion in `lib/docs/component-catalog.ts`, `scripts/generate-registry.mjs`,
  `public/r-steez/`, or preview map
- `lib/docs/registry-parity.test.ts` only checks catalog → r-steez files

## Scope

**In scope**:
- `packages/ui/tsconfig.json` (exclude tests)
- Clean rebuild dist (via build script)
- Catalog entry for accordion-feature-card
- Generator item + `pnpm registry:generate`
- Preview module + loader entry (match codesplit pattern in
  `components/docs/component-preview.tsx` / `previews/`)
- Extend `lib/docs/registry-parity.test.ts` OR new test: package component
  exports ⊆ catalog (allowlist type-only re-exports / aliases like CyberTile)

**Out of scope**:
- Deep a11y rewrite of Accordion beyond minimal preview
- Changing other package surfaces

## Steps

### Step 1: Exclude tests from package emit

In `packages/ui/tsconfig.json` add:

```json
"exclude": ["./src/**/*.test.ts", "./src/**/*.test.tsx", "./src/**/*.spec.ts", "./src/**/*.spec.tsx"]
```

Run `pnpm --filter @steez-ui/ui build` (or full build:packages).

**Verify**: `find packages/ui/dist -name '*.test.*' | wc -l` → 0

### Step 2: Catalog + generator + preview for AccordionFeatureCard

- Slug: `accordion-feature-card`
- Category: surfaces (or layout — match sibling cards)
- Generator item like other cards (tsx + module.css, theme-tokens dep)
- Preview: simple expanded/collapsed demo with placeholder image or solid
  color imageSrc that works without network if possible (data URI or public path)
- Register in PREVIEW_MAP via dynamic loader pattern

### Step 3: Regenerate registry

`pnpm registry:generate`

**Verify**: `test -f public/r-steez/accordion-feature-card.json`

### Step 4: Export ↔ catalog parity test

Parse named component exports from `packages/ui/src/index.ts` (or maintain an
explicit list of component export names). Map PascalCase → kebab-case with
known exceptions (`FUIButtonTile` → `fui-button-tile`, `CyberTile` alias skip).

Assert every real component export has a catalog slug (allowlist only aliases /
type-only re-exports).

**Verify**: `pnpm test` all pass including new parity case

## Done criteria

- [ ] No `*.test.*` under `packages/ui/dist`
- [ ] Accordion in catalog, r-steez, preview
- [ ] Export parity test fails if a new export is added without catalog
- [ ] `pnpm test` and `pnpm build:packages` exit 0

## STOP conditions

- Accordion requires external image CDN that fails offline preview → use a local
  public asset or CSS placeholder approach and note it
