import { describe, expect, it } from "vitest";

import {
  COMPONENT_DOCS,
  getComponentDoc,
} from "./component-catalog";

describe("component-catalog", () => {
  it("has unique slugs for every component doc", () => {
    const slugs = COMPONENT_DOCS.map((doc) => doc.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("returns a doc for a known slug via getComponentDoc", () => {
    const doc = getComponentDoc("loading-progress-bar");
    expect(doc).toBeDefined();
    expect(doc?.slug).toBe("loading-progress-bar");
    expect(doc?.title).toBe("Loading Progress Bar");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getComponentDoc("does-not-exist")).toBeUndefined();
  });

  it("includes required fields on every doc entry", () => {
    for (const doc of COMPONENT_DOCS) {
      expect(doc.slug.length).toBeGreaterThan(0);
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.packageImport).toContain("@steez-ui/ui");
      expect(Array.isArray(doc.related)).toBe(true);
      expect(Array.isArray(doc.tags)).toBe(true);
    }
  });
});
