import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useElementSize } from "./useElementSize";

// Failure modes pinned here:
// - no ResizeObserver (SSR, old browsers) throws instead of keeping the fallback
// - a collapsed (0 x 0) element wipes out the last good size
// - the observer leaks after unmount

type Callback = (entries: unknown[]) => void;
let notify: Callback = () => undefined;
const disconnect = vi.fn();

class FakeResizeObserver {
  constructor(callback: Callback) {
    notify = callback;
  }
  observe() {}
  disconnect = disconnect;
}

function sized(width: number, height: number) {
  const element = document.createElement("div");
  Object.defineProperty(element, "clientWidth", { configurable: true, get: () => width });
  Object.defineProperty(element, "clientHeight", { configurable: true, get: () => height });
  return element;
}

afterEach(() => {
  vi.unstubAllGlobals();
  disconnect.mockClear();
});

describe("useElementSize", () => {
  it("keeps the fallback when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const ref = { current: sized(300, 200) };
    const { result } = renderHook(() => useElementSize(ref, { width: 8, height: 6 }));
    expect(result.current).toEqual({ width: 8, height: 6 });
  });

  it("reports the element's client size and ignores collapsed reads", () => {
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    let element = sized(300, 200);
    const ref = {
      get current() {
        return element;
      },
    };
    const { result, unmount } = renderHook(() => useElementSize(ref));
    expect(result.current).toEqual({ width: 0, height: 0 });

    act(() => notify([]));
    expect(result.current).toEqual({ width: 300, height: 200 });

    element = sized(0, 0);
    Object.defineProperty(ref, "current", { value: element });
    act(() => notify([]));
    expect(result.current).toEqual({ width: 300, height: 200 });

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
