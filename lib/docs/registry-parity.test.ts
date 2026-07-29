import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import { COMPONENT_DOCS } from "./component-catalog";

const registryDir = path.join(process.cwd(), "public/r-steez");

/** Non-component registry items that are allowed without a catalog slug. */
const NON_COMPONENT_REGISTRY_NAMES = new Set([
  "theme-tokens",
  "icon-provider",
  "foundation",
  "index",
]);

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
});
