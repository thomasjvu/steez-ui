# Plan 010: Deliver a real authoring model on /docs

> **Executor instructions**: Expand the docs page content; wire commands that
> exist after plan 002 when possible.
>
> **Drift check**: Confirm `app/docs/page.tsx` is still a short three-section
> page and README maps `/docs` to “Authoring model”.

## Status

- **Priority**: P3
- **Effort**: M
- **Risk**: LOW
- **Depends on**: 002 (so registry:generate is real)
- **Category**: docs
- **Planned at**: commit `no-git`, 2026-07-29

## Why this matters

README promises `/docs` is the authoring model. The page is a thin overview with
no steps for adding a primitive, regenerating registry, or keeping catalog/
preview/export in lockstep — the exact workflow that caused registry drift.

## Current state

- `app/docs/page.tsx` — brief source-of-truth / install / site map
- Catalog: `lib/docs/component-catalog.ts`
- Previews: `components/docs/component-preview.tsx`
- Package export: `packages/ui/src/index.ts`
- Registry: `public/r-steez` + generator (after 002)
- Site layout components under `components/docs/`

## Scope

**In scope**:
- `app/docs/page.tsx` and/or `components/docs/*` content modules
- Styles only if needed for readability (existing CSS modules)

**Out of scope**:
- Building a full MDX docs engine
- Changing package APIs
- Auto-generating prop tables from TS (optional future)

## Git workflow

- Branch: `advisor/010-authoring-model-docs`

## Steps

### Step 1: Author checklist content

Expand `/docs` to include a concrete checklist:

1. Add `packages/ui/src/components/MyThing.tsx` + `MyThing.module.css`
2. Export from `packages/ui/src/index.ts`
3. Add `COMPONENT_DOCS` entry in `lib/docs/component-catalog.ts`
4. Add preview in `component-preview` (or previews map)
5. Add generator item + `pnpm registry:generate` (if 002 landed)
6. `pnpm build:packages` and verify `/components/my-thing`
7. Token usage: import `@steez-ui/theme/tokens.css` in apps

Match the site’s visual language (existing `site-layout` / docs CSS classes).
Use accurate commands from `package.json` after checking the live file.

**Verify**: page still renders — `pnpm lint` or typecheck on app

### Step 2: Cross-link

From README “Authoring model” row, ensure `/docs` description matches reality.

## Done criteria

- [ ] `/docs` lists step-by-step authoring workflow with real paths
- [ ] Mentions dual install paths (npm vs r-steez) accurately
- [ ] Mentions verification commands if present (`typecheck`/`test`)
- [ ] No references to dead `apps/registry` paths

## STOP conditions

- Plan 002 not done and you need `registry:generate` — document current manual
  process honestly instead of inventing commands

## Maintenance notes

- Keep this page updated when inventory automation is added.
