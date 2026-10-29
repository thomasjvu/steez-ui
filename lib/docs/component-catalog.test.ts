// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
  COMPONENT_DOCS,
  getComponentDoc,
} from "./component-catalog";
import { COMPONENT_USAGE } from "./catalog/usage";

describe("component-catalog", () => {
  it("has unique slugs for every component doc", () => {
    const slugs = COMPONENT_DOCS.map((doc) => doc.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly one usage example per component doc", () => {
    const slugs = COMPONENT_DOCS.map((doc) => doc.slug).sort();
    expect(Object.keys(COMPONENT_USAGE).sort()).toEqual(slugs);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getComponentDoc("does-not-exist")).toBeUndefined();
  });
});
