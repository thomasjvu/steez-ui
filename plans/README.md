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

Still product-gated: hard delete `packages/react` / `public/r` Boston content; TW preset expansion.

## Slimming audit plans (2026-09-21)

| Plan | Title | Priority | Effort | Depends on | Status |
|------|-------|----------|--------|------------|--------|
| 040 | Remove unused root dependency ownership | P1 | S | — | DONE (safe subset reviewed in isolated commit 5b85e25; archive deps deferred to 045) |
| 041 | Move specialized compositions behind a blocks entrypoint | P1 | L | 040 | DONE (reviewed in isolated commit 57fdb60) |
| 042 | Share card framing and tab rendering internals | P1 | M | 041 | DONE (reviewed in isolated commits 22a3bf5 + c421dad) |
| 043 | Make registry metadata and discoverability smaller and safer | P2 | L | 041, 042 | DONE (reviewed in 8c0c076 + 503ba61 + 05bd4bc; integrated 125 tests/build/smoke pass) |
| 044 | Bound HexagonGrid runtime work | P2 | M | — | DONE (reviewed in isolated commit f802c64) |
| 045 | Isolate the deprecated React package behind a retirement gate | P2 | L | 040 | BLOCKED (docs/checks reviewed in isolated commit 02312b7; no external consumer evidence or deadline) |
| 046 | Refresh duplicate transitive lockfile entries | P3 | S | 040 | DONE (reviewed in isolated commit f22c7b6) |

### Dependency notes

- 041 depends on 040 because package ownership changes must settle before changing public entrypoints.
- 042 depends on 041 to avoid refactoring components while their export tier is moving.
- 043 depends on 041 and 042 because the manifest must describe the final public barrels.
- 046 runs after 040 so dedupe does not immediately become stale.
