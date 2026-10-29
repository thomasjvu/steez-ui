// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  extractStyleBinding,
  isIconTypeOnlyImport,
  isRelativeImport,
  isStyleImport,
  parseModuleImports,
  parseRelativeReexports,
  parseTokenValues,
  toCssObjectName,
  transformCssModule,
  transformSource,
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

  it("classifies relative, style and icon type-only imports", () => {
    expect(isRelativeImport("./Button.tsx")).toBe(true);
    expect(isRelativeImport("@steez-ui/icons")).toBe(false);
    expect(isStyleImport("./Button.module.css")).toBe(true);
    expect(isStyleImport("./Button.tsx")).toBe(false);

    expect(isIconTypeOnlyImport("type { SteezIconProps }")).toBe(true);
    expect(isIconTypeOnlyImport("{ type SteezIconProps, type SteezIconName }")).toBe(true);
    expect(isIconTypeOnlyImport("{ CopyIcon, type SteezIconProps }")).toBe(false);
  });

  it("binds CSS module imports to a safe style object name", () => {
    const [imported] = parseModuleImports('import styles from "./Button.module.css";');
    expect(extractStyleBinding(imported)).toEqual({ binding: "styles", source: "./Button.module.css" });
    expect(extractStyleBinding(parseModuleImports('import { Button } from "./Button";')[0])).toBeNull();
    expect(toCssObjectName("steez-copy-button-0")).toBe("__styles_steez_copy_button_0");
  });

  it("follows relative re-exports and drops the re-export line from the copy", () => {
    const source = [
      'import React from "react";',
      'export { useLoadingProgress, type LoadingStage } from "./LoadingScreen.progress";',
      'export type { Cross } from "./LoadingScreen.crosses";',
      "export function LoadingScreen() {}",
    ].join("\n");

    expect(parseRelativeReexports(source)).toEqual(["./LoadingScreen.progress", "./LoadingScreen.crosses"]);
    const copy = transformSource({ source, isEntry: true, styleBindings: new Map(), styleVariables: [] });
    expect(copy).toBe("export function LoadingScreen() {}");
  });

  it("rejects re-exports a standalone copy cannot inline", () => {
    expect(() => parseRelativeReexports('export { Button } from "@steez-ui/ui";')).toThrow(/package/);
    expect(() => parseRelativeReexports('export { a as b } from "./a";')).toThrow(/rename/);
  });
});
