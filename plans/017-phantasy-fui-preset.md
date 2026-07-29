# Plan 017: Phantasy FUI registry preset

> **Executor instructions**: Branch `advisor/017-phantasy-fui-preset`. Commit.

## Status

- **Priority**: P2
- **Effort**: S–M
- **Risk**: MED (install graph for new preset only — do not break existing foundation consumers)
- **Depends on**: none
- **Category**: direction | docs
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

Home/README feature cyberpunk-tile, loading-progress-bar, fui-button-tile, but
`foundation.json` only installs forms + button. Product needs a one-command FUI kit.

## Current state

- `public/r-steez/foundation.json` — forms stack only
- Featured: CyberpunkTile, LoadingProgressBar, FUIButtonTile
- Generator foundation item in `scripts/generate-registry.mjs` ~538+

## Scope

**In scope**:
- New registry item `phantasy-fui` (preferred over changing foundation deps)
- Generator entry with registryDependencies:
  - theme-tokens, icon-provider
  - cyberpunk-tile, fui-button-tile, loading-progress-bar
  - optionally button, themed-card, status-message if cheap
- `pnpm registry:generate`
- Home page + README install command pointing at phantasy-fui (or dual: foundation vs fui)
- Parity allowlist: non-component names include `phantasy-fui` and `foundation`

**Out of scope**:
- Removing foundation
- Absolute-URL registryDependencies migration

## Steps

### Step 1: Generator item

```js
{
  name: "phantasy-fui",
  type: "registry:block",
  title: "Phantasy FUI Preset",
  description: "Theme, tiles, and loading primitives used by Phantasy admin FUI chrome.",
  dependencies: ["@steez-ui/theme", "@steez-ui/icons"],
  registryDependencies: [
    "theme-tokens",
    "icon-provider",
    "cyberpunk-tile",
    "fui-button-tile",
    "loading-progress-bar",
  ],
  files: [],
}
```

### Step 2: Generate + allowlist parity test

Update `NON_COMPONENT_REGISTRY_NAMES` in `registry-parity.test.ts`.

### Step 3: Docs

Home install + README example:

`…/r-steez/phantasy-fui.json`

Keep foundation documented as forms starter.

## Done criteria

- [ ] `public/r-steez/phantasy-fui.json` exists
- [ ] Home/README advertise it for Phantasy FUI
- [ ] `pnpm test` parity still passes
- [ ] foundation unchanged (or only description clarified)

## STOP conditions

- Product insists foundation must change instead → expand foundation carefully and
  note breaking install set in NOTES
