# Plan 028: Button default type="button"

> Branch `advisor/028-button-default-type`. Commit, no push. Skip plans/README.md.

## Status
- Priority P1 · Effort S · Risk LOW · Planned at `dcbc717`

## Why
`Button` spreads props onto `<button>` with no `type`, so HTML defaults to `submit` inside forms. `FUIButtonTile` already defaults `type="button"`.

## Change
`packages/ui/src/components/Button.tsx`: destructure `type = "button"`; pass `type={type}` on the element (before or after props carefully so explicit type still works — default only when omitted).

## Test
`Button.test.tsx`: bare Button has type button; type=submit preserved.

## Verify
`pnpm test`; `pnpm registry:generate` (button.json).
