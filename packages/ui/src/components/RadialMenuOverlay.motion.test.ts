import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

// jsdom cannot evaluate media queries, so check the stylesheet source: every
// animated part of the wheel (spinning rings, boot blink) must stop when the
// user asks for reduced motion.
const sheet = path.join(import.meta.dirname, "RadialMenuOverlay.module.css");
const REDUCED = /prefers-reduced-motion:\s*reduce/;

type Rule = { selectors: string[]; body: string; reduced: boolean };

function parseRules(css: string, reduced = false, rules: Rule[] = []): Rule[] {
  let index = 0;
  while (index < css.length) {
    const open = css.indexOf("{", index);
    if (open === -1) break;
    let depth = 1;
    let close = open + 1;
    for (; close < css.length && depth > 0; close += 1) {
      if (css[close] === "{") depth += 1;
      if (css[close] === "}") depth -= 1;
    }
    const prelude = css.slice(index, open).trim();
    const body = css.slice(open + 1, close - 1);
    if (prelude.startsWith("@media")) {
      parseRules(body, reduced || REDUCED.test(prelude), rules);
    } else if (!prelude.startsWith("@")) {
      rules.push({ selectors: prelude.split(",").map((s) => s.trim()), body, reduced });
    }
    index = close;
  }
  return rules;
}

it("stops every radial menu animation for prefers-reduced-motion", () => {
  const css = readFileSync(sheet, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = parseRules(css);
  const animated = rules
    .filter((rule) => !rule.reduced && /(^|;)\s*animation\s*:(?!\s*none)/.test(rule.body))
    .flatMap((rule) => rule.selectors);
  const stopped = new Set(
    rules
      .filter((rule) => rule.reduced && /animation\s*:\s*none/.test(rule.body))
      .flatMap((rule) => rule.selectors),
  );

  expect(animated).toContain(".outerRing");
  expect(animated.filter((selector) => !stopped.has(selector))).toEqual([]);
});
