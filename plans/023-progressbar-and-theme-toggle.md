# Plan 023: LoadingProgressBar a11y + ThemeToggle storage hardening

> Branch: `advisor/023-progressbar-theme-toggle`. Commit, no push. registry:generate after source changes.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `7475016`

## LoadingProgressBar (`packages/ui/src/components/LoadingProgressBar.tsx`)
1. Coerce non-finite progress to 0 before clamp
2. Root (or bar group): `role="progressbar"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow={clamped}`, `aria-label` or use valueLabel
3. Extend tests for role + NaN → 0

## ThemeToggle (`packages/ui/src/components/ThemeToggle.tsx`)
1. Allowlist only `"dark"|"light"` from localStorage
2. try/catch getItem/setItem
3. Invalid values fall back to defaultTheme

## Done
- [ ] progressbar semantics; NaN safe
- [ ] ThemeToggle safe storage
- [ ] tests + build + registry generate for affected items
