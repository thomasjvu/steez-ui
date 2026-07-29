import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useStableId } from "./useStableId";

describe("useStableId", () => {
  it("returns the explicit id when provided", () => {
    const { result } = renderHook(() => useStableId("field", "custom-id"));
    expect(result.current).toBe("custom-id");
  });

  it("generates a prefixed id without colons when no explicit id is given", () => {
    const { result } = renderHook(() => useStableId("field"));
    expect(result.current).toMatch(/^field-/);
    expect(result.current).not.toContain(":");
  });

  it("keeps the same generated id across re-renders", () => {
    const { result, rerender } = renderHook(
      ({ prefix, explicitId }: { prefix: string; explicitId?: string }) =>
        useStableId(prefix, explicitId),
      { initialProps: { prefix: "input" } },
    );

    const first = result.current;
    rerender({ prefix: "input" });
    expect(result.current).toBe(first);
  });
});
