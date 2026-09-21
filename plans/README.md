# Implementation Plans

Plans **001–027** completed earlier. Batch **028–035** residual (HEAD was `dcbc717`) — executed and merged.

| Plan | Title | Status |
|------|-------|--------|
| 001–027 | prior cycles | DONE |
| 028 | Button default type=button | DONE (merged) |
| 029 | Merge aria-describedby with helper | DONE (merged) |
| 030 | CI registry dirty check | DONE (merged) |
| 031 | PageTemplate sub-tabs APG | DONE (merged) |
| 032 | RadialMenuOverlay focus trap | DONE (merged) |
| 033 | PixelTooltip focus + tooltip role | DONE (merged) |
| 034 | Characterization tests 028–033 | DONE (covered by 028–033 tests) |
| 035 | typecheck packages noEmit | DONE (merged) |

## Deferred follow-ups 036–039 (2026-07-31)

| Plan | Title | Status |
|------|-------|--------|
| 036 | HexagonGrid subpath | DONE |
| 037 | Form error API | DONE |
| 038 | Soft sunset @steez-ui/react | DONE |
| 039 | new-york removal + Boston archive docs | DONE |

## Retirement gate follow-up (2026-09-21)

| Plan | Title | Status |
|------|-------|--------|
| 045 | Isolate deprecated `@steez-ui/react` behind a retirement gate | **BLOCKED** — no external consumer inventory or deprecation deadline is recorded; documentation and opt-in checks are complete, package retained |

Plan 045 remains blocked until the exact published versions, dated consuming-repository
inventory, per-consumer migration status, and approved public deprecation deadline
are recorded. Until then, keep `packages/react` published and workspace-visible.

Still product-gated: hard delete `packages/react` / `public/r` Boston content; TW preset expansion.
