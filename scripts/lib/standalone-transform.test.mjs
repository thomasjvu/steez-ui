import { describe, expect, it } from "vitest";

import {
  makeStyleBootstrap,
  parseTokenValues,
  transformCssModule,
} from "./standalone-transform.mjs";

describe("standalone component transformations", () => {
  it("scopes CSS module classes and preserves dynamic class lookups", () => {
    const result = transformCssModule(
      ".root { color: var(--text-primary); } .active:hover { animation: pulse 1s; } @keyframes pulse { from { opacity: 0; } to { opacity: 1; } }",
      {
        classPrefix: "steez-example-0",
        tokenValues: parseTokenValues(":root { --text-primary: #cbcbcc; }"),
      },
    );

    expect(result.objectSource).toContain('"root": "steez-example-0-root"');
    expect(result.objectSource).toContain('"active": "steez-example-0-active"');
    expect(result.css).toContain(".steez-example-0-root");
    expect(result.css).toContain("@keyframes steez-example-0-pulse");
    expect(result.css).toContain("var(--text-primary, #cbcbcc)");
  });

  it("does not rewrite keyframe names inside custom property names", () => {
    const result = transformCssModule(
      ".content { animation: boil var(--boil-duration); } @keyframes boil { to { filter: var(--boil-frame-1); } }",
      { classPrefix: "steez-boiling-lines-0", tokenValues: new Map() },
    );

    expect(result.css).toContain("animation: steez-boiling-lines-0-boil var(--boil-duration)");
    expect(result.css).toContain("var(--boil-frame-1)");
  });

  it("creates a browser-safe style bootstrap that is idempotent", () => {
    const bootstrap = makeStyleBootstrap(".root { content: `ok`; }", "example");

    expect(bootstrap).toContain('data-steez-standalone="${__steezStandaloneStyleKey}"');
    expect(bootstrap).toContain("document.querySelector");
    expect(bootstrap).toContain("document.head.appendChild(style)");
  });
});
