import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useLoadingProgress, type LoadingStage } from "./LoadingScreen.progress";

// Failure modes pinned here:
// - progress jumps instead of easing over 20 x 100ms steps
// - a new stage restarts from 0 instead of from the current progress
// - progress overshoots the stage target
// - finishing (isLoading false) does not land on 100 / "Complete!"
// - a stage behind the current progress animates backwards instead of snapping

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function renderProgress(stage: LoadingStage, isLoading = true) {
  return renderHook(
    (props: { isLoading: boolean; stage: LoadingStage }) =>
      useLoadingProgress(props.isLoading, undefined, props.stage),
    { initialProps: { isLoading, stage } },
  );
}

describe("useLoadingProgress", () => {
  it("eases linearly to the stage target over two seconds", () => {
    const { result } = renderProgress("auth");
    expect(result.current).toEqual({ progress: 0, message: "Authenticating..." });

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.progress).toBeCloseTo(12.5);

    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.progress).toBe(25);
  });

  it("continues from the current progress when the stage changes", () => {
    const { result, rerender } = renderProgress("auth");
    act(() => vi.advanceTimersByTime(2000));

    rerender({ isLoading: true, stage: "config" });
    expect(result.current.message).toBe("Loading configuration...");
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.progress).toBeCloseTo(50);

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.progress).toBe(75);
  });

  it("snaps back when the stage is behind the current progress", () => {
    const { result, rerender } = renderProgress("config");
    act(() => vi.advanceTimersByTime(2000));

    rerender({ isLoading: true, stage: "auth" });
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.progress).toBe(25);
  });

  it("completes at once when loading ends", () => {
    const { result, rerender } = renderProgress("auth");
    rerender({ isLoading: false, stage: "auth" });
    expect(result.current).toEqual({ progress: 100, message: "Complete!" });
  });
});
