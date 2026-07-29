# Plan 015: Wire form helper text to aria-describedby

> **Executor instructions**: Branch `advisor/015-form-aria`. Commit, no push.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug | a11y
- **Planned at**: commit `7431be3`, 2026-07-29

## Why this matters

Steez form controls show helper text visually but do not associate it with the
control for assistive tech. Foundation ships these as the core form set.

## Current state

`CyberpunkInput.tsx` (pattern shared by siblings):

- `useStableId` for input id + label `htmlFor` — good
- helperText in sibling div with no `id` / no `aria-describedby` on input

Same gap likely in: CyberpunkTextarea, CyberpunkSelect, CyberpunkSlider (value
display optional). CyberpunkRadioGroup: no `role="radiogroup"`.

## Scope

**In scope**:
- `CyberpunkInput.tsx`, `CyberpunkTextarea.tsx`, `CyberpunkSelect.tsx`,
  `CyberpunkSlider.tsx`, `CyberpunkRadio.tsx` (group wrapper)
- Light RTL tests for describedby when helper present
- `pnpm registry:generate` after source updates

**Out of scope**:
- Full error-state API redesign (optional `aria-invalid` only if already trivial)

## Steps

### Step 1: Pattern

```tsx
const inputId = useStableId("input", id);
const helperId = useStableId("input-helper");
// on control:
aria-describedby={helperText ? helperId : undefined}
// on helper:
id={helperId}
```

Apply consistently. For RadioGroup: `role="radiogroup"` + optional
`aria-label` from existing `label` prop if any.

### Step 2: Tests

One test file or extend existing: render CyberpunkInput with helperText, expect
`getByRole('textbox')` to have accessible description.

### Step 3: Build + generate registry

## Done criteria

- [ ] Helper-associated controls use aria-describedby when helperText set
- [ ] Radio group has radiogroup role
- [ ] Tests pass; packages build

## STOP conditions

- Component API differs → adapt pattern, do not invent error props
