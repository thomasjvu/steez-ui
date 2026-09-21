import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HexagonGrid } from "./HexagonGrid";

function createCanvasContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    fillStyle: "",
    strokeStyle: "",
  };
}

function countCells(context: ReturnType<typeof createCanvasContext>) {
  return new Set(
    context.translate.mock.calls.map(([x, y]) => `${String(x)}:${String(y)}`),
  ).size;
}

function prepareCanvas() {
  const context = createCanvasContext();
  vi.stubGlobal("ResizeObserver", undefined);
  vi.stubGlobal("IntersectionObserver", undefined);
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  return context;
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("HexagonGrid browser fallbacks", () => {
  it("renders a static canvas when observer APIs are unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    vi.stubGlobal("IntersectionObserver", undefined);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    expect(() =>
      render(
        <HexagonGrid
          width={120}
          height={80}
          autoTriggerBaseDelayMs={60_000}
        />,
      ),
    ).not.toThrow();
  });
});

describe("HexagonGrid cell budget", () => {
  it("keeps the normal desktop grid at its default density", () => {
    const context = prepareCanvas();

    render(<HexagonGrid width={800} height={600} autoTriggerBaseDelayMs={60_000} />);

    expect(countCells(context)).toBe(340);
  });

  it("keeps small surfaces within the requested budget", () => {
    const context = prepareCanvas();

    render(
      <HexagonGrid
        width={240}
        height={160}
        cellBudget={12}
        autoTriggerBaseDelayMs={60_000}
      />,
    );

    expect(countCells(context)).toBeLessThanOrEqual(12);
  });

  it("caps oversized surfaces at the default budget", () => {
    const context = prepareCanvas();

    render(
      <HexagonGrid
        width={4000}
        height={3000}
        autoTriggerBaseDelayMs={60_000}
      />,
    );

    expect(countCells(context)).toBeLessThanOrEqual(512);
  });
});

describe("HexagonGrid auto-trigger pause policy", () => {
  it("does not schedule while out of the viewport and re-arms on resume", () => {
    vi.useFakeTimers();
    const context = createCanvasContext();
    let intersectionCallback: IntersectionObserverCallback | undefined;

    class TestIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe() {}

      disconnect() {}
    }

    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

    render(
      <HexagonGrid
        width={120}
        height={80}
        autoTriggerBaseDelayMs={20}
        autoTriggerJitterMs={0}
      />,
    );

    expect(vi.getTimerCount()).toBe(1);

    intersectionCallback?.(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(100);
    expect(vi.getTimerCount()).toBe(0);

    intersectionCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(vi.getTimerCount()).toBe(1);

    vi.advanceTimersByTime(20);
    expect(vi.getTimerCount()).toBe(1);
  });
});
