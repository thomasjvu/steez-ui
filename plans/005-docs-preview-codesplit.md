# Plan 005: Code-split docs component previews

> **Executor instructions**: Follow step by step. Docs-only change; do not alter
> package public APIs.
>
> **Drift check**: Confirm `components/docs/component-preview.tsx` still
> statically imports ~40 components from `@steez-ui/ui` and uses `PREVIEW_MAP`.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

Every `/components/[slug]` page loads `ComponentPreview`, which statically
imports the entire `@steez-ui/ui` surface including WebGL (`SignalTrailBackdrop`)
and heavy canvas (`HexagonGrid`). Users viewing a Button doc still pay for the
full client graph.

## Current state

- `components/docs/component-preview.tsx`:
  - Lines ~5–47: static barrel imports
  - `PREVIEW_MAP` maps slug → preview component
  - `ComponentPreview({ slug })` picks one entry
- `"use client"` at top of file
- No `next/dynamic` usage in repo for previews

## Scope

**In scope**:
- `components/docs/component-preview.tsx` (and optional split files under
  `components/docs/previews/` if clearer)
- Optional tiny loading placeholder styles already in `component-docs.module.css`

**Out of scope**:
- Changing `@steez-ui/ui` package structure
- SSR of WebGL previews
- Plan 004 peerDependency work (coordinate import path if 004 already landed)

## Git workflow

- Branch: `advisor/005-docs-preview-codesplit`

## Steps

### Step 1: Dynamic import per slug

Refactor so that `PREVIEW_MAP` values are loaders, e.g.:

```tsx
const PREVIEW_LOADERS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  button: () => import("./previews/button-preview").then(m => ({ default: m.ButtonPreview })),
  // ...
};
```

Or use `next/dynamic` with a switch:

```tsx
const Preview = React.useMemo(() => {
  switch (slug) {
    case "button":
      return dynamic(() => import("./previews/button-preview").then(m => m.ButtonPreview), { ssr: false, loading: () => <div>…</div> });
    // ...
  }
}, [slug]);
```

**Requirements**:
- Only the active slug's module graph should load (heavy previews isolated).
- At minimum isolate: `signal-trail-backdrop`, `hexagon-grid`, `loading-screen`,
  `runtime-orbit-diagram` into separate dynamic chunks even if you keep a shared
  chunk for simple form previews.
- Preserve existing preview UI/behavior (same demo content).

Recommended structure: keep simple previews in one file with dynamic() map;
move WebGL/canvas previews to `components/docs/previews/*-preview.tsx`.

**Verify**: `pnpm lint` / `tsc -p tsconfig.json --noEmit` → exit 0

### Step 2: Manual sanity

- `rg -n "SignalTrailBackdrop" components/docs/component-preview.tsx` should
  not statically import it at top-level if isolated (import only inside the
  dynamic module for that slug).

**Verify**: top of `component-preview.tsx` (or parent) no longer has a static
`import { … SignalTrailBackdrop … } from "@steez-ui/ui"` that includes every
component — loaders only.

## Test plan

- No mandatory unit tests; if vitest exists, optional smoke that PREVIEW loaders
  keys match COMPONENT_DOCS slugs (parity).

## Done criteria

- [ ] Visiting a single slug does not require static import of all UI components
      in the parent module graph
- [ ] All previous PREVIEW_MAP slugs still render a preview (no “Preview unavailable”
      for previously supported slugs)
- [ ] Typecheck/lint clean

## STOP conditions

- Dynamic import breaks CSS modules for previews after 2 attempts → report
- Next 15 forbids the chosen pattern → use React.lazy + Suspense instead

## Maintenance notes

- New catalog components need a loader entry + preview module.
- Reviewers: confirm heavy components are not in the shared eager chunk.
