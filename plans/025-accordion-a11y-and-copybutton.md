# Plan 025: Accordion a11y collapse + CopyButton registry/clipboard

> Branch: `advisor/025-accordion-copybutton`. Commit, no push.

## Status
- Priority P2 · Effort S–M · Risk MED · Planned at `7475016`

## AccordionFeatureCard
1. Always generate panel id via `useStableId` (even without user `id`)
2. When collapsed: set expandable body/panel content `hidden` or `inert` (prefer `hidden` on content region) so SR doesn't read collapsed copy
3. Keep toggle always accessible; `aria-controls` always set

## CopyButton
1. On clipboard failure: set error UI state briefly or aria-live message (not silent)
2. Remove `"button"` from registryDependencies in generate-registry if CopyButton doesn't import Button
3. registry:generate

## Tests
- Accordion: expanded false → panel not visible to getByRole if possible
- CopyButton: mock clipboard reject → onCopyError or error label

## Done
- [x] collapsed content not in a11y tree
- [x] copy-button registry deps correct
- [x] clipboard failure feedback
