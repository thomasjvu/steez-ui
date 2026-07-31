# Plan 031: PageTemplate sub-tabs APG

> Branch `advisor/031-pagetemplate-subtabs-apg`. Commit, no push.

## Status
- Priority P2 · Effort M · Risk MED · Planned at `dcbc717`

## Why
`PageTemplate.tsx` ~89–103 has incomplete tab roles; TabbedPanel already has full APG.

## Implement
Mirror TabbedPanel: ids, aria-controls, panel association for content region, roving tabIndex, arrow keys calling onSubTabChange. Keep activeSubTab API.

## Alternative STOP
Demote to non-tab buttons if APG unfit — do not leave half-ARIA.

## Tests + registry:generate for page-template.

## Done
- [x] PageTemplate sub-tabs: ids, aria-controls, tabpanel, roving tabIndex, arrows/Home/End → onSubTabChange
- [x] Keep activeSubTab API (controlled)
- [x] tests + registry:generate
