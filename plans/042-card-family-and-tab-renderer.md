# Plan 042: Share card framing and tab rendering internals

> **Executor instructions**: Follow this plan step by step. Preserve existing public names and visual variants. Touch only the files listed in Scope.
>
> **Drift check**: `git diff --stat 12653cb..HEAD -- packages/ui/src/components/ThemedCard.tsx packages/ui/src/components/CornerBracketCard.tsx packages/ui/src/components/DottedHaloCard.tsx packages/ui/src/components/PageTemplate.tsx packages/ui/src/components/TabbedPanel.tsx packages/ui/src/components/*.module.css`.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: 041
- **Category**: tech-debt
- **Planned at**: commit `12653cb`, 2026-09-21

## Why this matters

The card components repeat the same title/content wrapper and the two tab components repeat the same tablist/tab/tabpanel ARIA structure. Sharing internal renderers reduces drift without breaking the public API or collapsing meaningful visual variants.

## Current state

- `ThemedCard.tsx:7-26`, `CornerBracketCard.tsx:7-30`, and `DottedHaloCard.tsx:7-44` expose overlapping title/content contracts.
- `TabbedPanel.tsx:95-135` and `PageTemplate.tsx:122-162` independently render tab controls and panel relationships while both use `useRovingTabs`.
- `SegmentedControl.tsx:87-105` uses `role="radiogroup"` and must remain separate.

## Scope

**In scope**:

- `packages/ui/src/components/CardFrame.tsx` and its CSS module (create)
- `packages/ui/src/components/ThemedCard.tsx`
- `packages/ui/src/components/CornerBracketCard.tsx`
- `packages/ui/src/components/DottedHaloCard.tsx`
- `packages/ui/src/components/TabList.tsx` and CSS module (create)
- `packages/ui/src/components/PageTemplate.tsx`
- `packages/ui/src/components/TabbedPanel.tsx`
- `packages/ui/src/index.ts`
- related component tests

**Out of scope**: public export removals, visual redesign, `SegmentedControl`, registry item names, or package React legacy code.

## Steps

### Step 1: Extract CardFrame

Create an internal frame that owns title rendering, content wrapper, class merging, and shared HTML attributes. Add explicit decoration slots or a small variant union for plain, bracket, and dotted treatments. Make the three public components thin adapters that preserve their current prop names and CSS behavior.

**Verify**: add tests for title rendering, children, custom class names, and each decoration; `pnpm test -- --pool=threads --maxWorkers=1 packages/ui/src/components/*Card*.test.tsx` → pass.

### Step 2: Extract TabList

Create an internal tab renderer that accepts tab records, DOM id functions, roving refs, selection callback, class names, and panel content. Refactor `TabbedPanel` and `PageTemplate` to use it while preserving controlled/uncontrolled behavior and existing markup semantics.

**Verify**: existing `PageTemplate.test.tsx` and `TabbedPanel.test.tsx` pass, including arrow/Home/End behavior and `aria-controls`/`aria-labelledby` relationships.

### Step 3: Run package gates

**Verify**: `pnpm typecheck`, `pnpm test`, `pnpm lint`, and `pnpm build` → exit 0.

### Step 4: Trim secondary barrel exports

Remove `LOADING_PROGRESS_SEGMENT_COUNT` and `HeartbeatIndicator` from the public barrel while retaining their internal implementations. Update the parity allowlist and package README so the supported barrel lists only documented primary components. Do not remove `useLoadingProgress`, which is part of the documented LoadingScreen usage.

**Verify**: `pnpm typecheck` and `pnpm test` → exit 0; `rg -n 'LOADING_PROGRESS_SEGMENT_COUNT|HeartbeatIndicator' packages/ui/src/index.ts` → no matches.

## Done criteria

- [ ] Three card components share one internal framing implementation.
- [ ] PageTemplate and TabbedPanel share one tablist renderer.
- [ ] Existing public component names and CSS-visible behavior remain intact.
- [ ] Tests cover the extracted behavior.

## STOP conditions

- The extraction requires changing a public prop or role contract.
- Existing tests reveal visual/ARIA behavior that cannot be represented by the shared renderer.
- A new abstraction becomes more complex than the duplicated implementations; report instead of adding a generic framework.

## Maintenance notes

Keep the shared internals private. New card decoration should be a deliberate variant or slot; new tab APIs should extend the shared renderer rather than copying its ARIA markup.
