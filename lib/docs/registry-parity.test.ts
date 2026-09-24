import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import { PREVIEW_SLUGS } from "../../components/docs/component-preview";
import { COMPONENT_DOCS } from "./component-catalog";
import { COMPONENT_MANIFEST } from "./component-manifest.mjs";

const registryDir = path.join(process.cwd(), "public/r-steez");
const standaloneDir = path.join(process.cwd(), "public/copy/steez");
const packageIndexPath = path.join(process.cwd(), "packages/ui/src/index.ts");
const packageBlocksPath = path.join(process.cwd(), "packages/ui/src/blocks.ts");
const packageSubpathPaths = [
  path.join(process.cwd(), "packages/ui/src/components/HexagonGrid.tsx"),
];

/** Non-component registry items that are allowed without a catalog slug. */
const NON_COMPONENT_REGISTRY_NAMES = new Set([
  "stable-id",
  "field-description",
  "roving-tabs",
  "button-styles",
  "card-frame",
  "card-frame-styles",
  "tab-list",
  "tab-list-styles",
  "theme-tokens",
  "icon-provider",
  "foundation",
  "phantasy-fui",
  "index",
  "surfaces",
  "motion",
  "app-shell",
]);

const INTERNAL_HELPER_REGISTRY_NAMES = [
  "stable-id",
  "field-description",
  "roving-tabs",
  "button-styles",
  "card-frame",
  "card-frame-styles",
  "tab-list",
  "tab-list-styles",
];

/**
 * Value exports from packages/ui that are not primary catalog components:
 * aliases, hooks, constants, and secondary exports covered by another slug.
 */
const NON_CATALOG_COMPONENT_EXPORTS = new Set([
  "CyberTile", // alias of CyberpunkTile
  "useLoadingProgress",
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
  it("keeps manifest slugs aligned with catalog, package exports, previews, and registry components", () => {
    const manifestSlugs = new Set(COMPONENT_MANIFEST.map((component) => component.slug));
    const catalogSlugs = new Set(COMPONENT_DOCS.map((doc) => doc.slug));
    const previewSlugs = new Set(
      COMPONENT_MANIFEST
        .filter((component) => component.previewLoader)
        .map((component) => component.slug),
    );
    const registrySlugs = new Set(
      fs
        .readdirSync(registryDir)
        .filter((name) => name.endsWith(".json") && name !== "index.json")
        .map((name) => JSON.parse(fs.readFileSync(path.join(registryDir, name), "utf8")))
        .filter((item) => item.type === "registry:component")
        .map((item) => item.name),
    );
    const packageExports = [
      parseComponentExports(fs.readFileSync(packageIndexPath, "utf8")),
      parseComponentExports(fs.readFileSync(packageBlocksPath, "utf8")),
      packageSubpathPaths.flatMap((sourcePath) =>
        [...fs.readFileSync(sourcePath, "utf8").matchAll(/export function (\w+)/g)].map(
          (match) => match[1],
        ),
      ),
    ].flat();
    const packageSlugs = new Set(
      packageExports
        .filter((name) => !NON_CATALOG_COMPONENT_EXPORTS.has(name))
        .map(pascalToKebab),
    );

    expect([...catalogSlugs].sort()).toEqual([...manifestSlugs].sort());
    expect([...previewSlugs].sort()).toEqual([...manifestSlugs].sort());
    expect([...registrySlugs].sort()).toEqual([...manifestSlugs].sort());
    expect([...packageSlugs].sort()).toEqual([...manifestSlugs].sort());
  });

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

  it("has one generated standalone TSX file for every COMPONENT_DOCS slug", () => {
    const missing: string[] = [];

    for (const doc of COMPONENT_DOCS) {
      const standalonePath = path.join(standaloneDir, `${doc.slug}.tsx`);
      if (!fs.existsSync(standalonePath)) {
        missing.push(doc.slug);
        continue;
      }

      const source = fs.readFileSync(standalonePath, "utf8");
      expect(source).not.toContain("@steez-ui/");
      expect(source).not.toMatch(/\b(?:from|import)\s*["']\.[^"']+["']/);
      expect(source).not.toMatch(/\b(?:from|import)\s*["'][^"']*\.module\.css["']/);
    }

    expect(
      missing,
      `Missing standalone TSX copies for catalog slugs: ${missing.join(", ")}`,
    ).toEqual([]);
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

  it("keeps internal helper payloads resolvable without listing them in the public index", () => {
    const index = JSON.parse(
      fs.readFileSync(path.join(registryDir, "index.json"), "utf8"),
    ) as Array<{ name: string }>;
    const indexedNames = new Set(index.map((item) => item.name));

    for (const helperName of INTERNAL_HELPER_REGISTRY_NAMES) {
      expect(fs.existsSync(path.join(registryDir, `${helperName}.json`))).toBe(true);
      expect(indexedNames.has(helperName)).toBe(false);
    }
  });

  it("has a preview loader for every catalog slug", () => {
    const catalogSlugs = new Set(COMPONENT_DOCS.map((doc) => doc.slug));
    const previewSlugs = new Set(PREVIEW_SLUGS);
    const missing = [...catalogSlugs].filter((slug) => !previewSlugs.has(slug));
    const unexpected = [...previewSlugs].filter((slug) => !catalogSlugs.has(slug));

    expect(
      missing,
      `Catalog slugs without preview loaders: ${missing.join(", ")}`,
    ).toEqual([]);
    expect(
      unexpected,
      `Preview loaders without catalog slugs: ${unexpected.join(", ")}`,
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
