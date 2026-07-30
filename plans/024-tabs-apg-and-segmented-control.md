# Plan 024: TabbedPanel WAI-ARIA APG + SegmentedControl radiogroup

> Branch: `advisor/024-tabs-apg`. Commit, no push.

## Status
- Priority P2 · Effort M · Risk MED · Planned at `7475016`

## TabbedPanel
Current: roles without ids/controls/keyboard.
Implement:
- Stable ids per tab and panel (`useStableId` or tab.id based)
- `aria-controls` on tab → panel id
- `aria-labelledby` on panel
- `tabIndex={0}` only on selected tab, `-1` on others
- Arrow Left/Right (and optional Home/End) to move selection
- Keep existing controlled/uncontrolled API

## SegmentedControl
- Change from tablist/tab to `role="radiogroup"` on container and `role="radio"` + `aria-checked` on options (or native radio pattern if markup allows)
- Keyboard: left/right among options

## Tests
RTL: select tab by click; arrow key moves; panel shows content. SegmentedControl selection.

## Done
- [x] TabbedPanel linked ids + keyboard
- [x] SegmentedControl not fake tabs
- [x] tests + build + registry:generate
