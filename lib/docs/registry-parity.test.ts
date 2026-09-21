import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import { COMPONENT_DOCS } from "./component-catalog";

const registryDir = path.join(process.cwd(), "public/r-steez");
const packageIndexPath = path.join(process.cwd(), "packages/ui/src/index.ts");
const packageBlocksPath = path.join(process.cwd(), "packages/ui/src/blocks.ts");

/** Non-component registry items that are allowed without a catalog slug. */
const NON_COMPONENT_REGISTRY_NAMES = new Set([
  "stable-id",
  "field-description",
  "roving-tabs",
  "button-styles",
  "theme-tokens",
  "icon-provider",
  "foundation",
  "phantasy-fui",
  "index",
]);

/**
 * Value exports from packages/ui that are not primary catalog components:
 * aliases, hooks, constants, and secondary exports covered by another slug.
 */
const NON_CATALOG_COMPONENT_EXPORTS = new Set([
  "CyberTile", // alias of CyberpunkTile
  "LOADING_PROGRESS_SEGMENT_COUNT",
  "useLoadingProgress",
  "HeartbeatIndicator", // covered by heartbeat-pulse
  "CyberpunkRadioGroup", // covered by cyberpunk-radio
]);

/** Explicit PascalCase → kebab-case overrides (acronyms, etc.). */
const EXPORT_SLUG_OVERRIDES: Record<string, string> = {
  FUIButtonTile: "fui-button-tile",
};

function pascalToKebab(name: string): string {
  if (EXPORT_SLUG_OVERRIDES[name]) {
    return EXPORT_SLUG_OVERRIDES[name];
  }
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Parse value (non-type) named exports from the package barrel.
 * Handles multi-line `export { A, type B, C as D } from "..."` blocks.
 */
function parseComponentExports(source: string): string[] {
  const names: string[] = [];
  const exportBlock = /export\s*\{([^}]+)\}\s*from\s*["'][^"']+["']/g;
  let match: RegExpExecArray | null;

  while ((match = exportBlock.exec(source)) !== null) {
    const body = match[1];
    for (const part of body.split(",")) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith("type ")) {
        continue;
      }
      // `Foo as Bar` → public name is Bar
      const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
      const exportName = asMatch ? asMatch[2] : trimmed;
      if (/^\w+$/.test(exportName)) {
        names.push(exportName);
      }
    }
  }

  return names;
}

describe("registry parity", () => {
  it("has a public/r-steez JSON payload for every COMPONENT_DOCS slug", () => {
    const missing: string[] = [];

    for (const doc of COMPONENT_DOCS) {
      const itemPath = path.join(registryDir, `${doc.slug}.json`);
      if (!fs.existsSync(itemPath)) {
        missing.push(doc.slug);
      }
    }

    expect(missing, `Missing registry JSON for catalog slugs: ${missing.join(", ")}`).toEqual(
      [],
    );
  });

  it("does not leave catalog components without registry coverage (allowlist only non-components)", () => {
    // Every file under r-steez that is not a catalog slug must be allowlisted.
    const catalogSlugs = new Set(COMPONENT_DOCS.map((doc) => doc.slug));
    const registryFiles = fs
      .readdirSync(registryDir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.replace(/\.json$/, ""));

    const unexpected = registryFiles.filter(
      (name) => !catalogSlugs.has(name) && !NON_COMPONENT_REGISTRY_NAMES.has(name),
    );

    expect(
      unexpected,
      `Registry files without catalog slug or allowlist entry: ${unexpected.join(", ")}`,
    ).toEqual([]);
  });

  it("has a catalog slug for every package component export (export ↔ catalog parity)", () => {
    const mainSource = fs.readFileSync(packageIndexPath, "utf8");
    const blocksSource = fs.readFileSync(packageBlocksPath, "utf8");
    const exports = [
      ...parseComponentExports(mainSource),
      ...parseComponentExports(blocksSource),
    ];
    const catalogSlugs = new Set(COMPONENT_DOCS.map((doc) => doc.slug));
    const missing: string[] = [];

    for (const name of exports) {
      if (NON_CATALOG_COMPONENT_EXPORTS.has(name)) {
        continue;
      }
      const slug = pascalToKebab(name);
      if (!catalogSlugs.has(slug)) {
        missing.push(`${name} → ${slug}`);
      }
    }

    expect(
      missing,
      `Package exports without catalog slug: ${missing.join(", ")}`,
    ).toEqual([]);
  });
});
