import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AsciiRippleText } from "./AsciiRippleText";

let animationFrames: FrameRequestCallback[];

beforeEach(() => {
  animationFrames = [];
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    animationFrames.push(callback);
    return animationFrames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", () => undefined);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function mockTextBounds(element: HTMLElement) {
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    bottom: 20,
    height: 20,
    left: 0,
    right: 100,
    top: 0,
    width: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
}

describe("AsciiRippleText", () => {
  it("falls back to the default glyph set when characterSet is empty", () => {
    vi.spyOn(Date, "now").mockReturnValueOnce(0).mockReturnValueOnce(400);
    const { container } = render(
      <AsciiRippleText characterSet="">A</AsciiRippleText>,
    );
    const visual = container.querySelector<HTMLElement>("[aria-hidden='true']");
    expect(visual).toBeTruthy();
    mockTextBounds(visual!);

    fireEvent.mouseEnter(visual!, { clientX: 50 });
    const queuedWave = animationFrames.shift();
    expect(queuedWave).toBeDefined();
    queuedWave!(0);

    const animation = animationFrames.shift();
    expect(animation).toBeDefined();
    animation!(400);
    expect(visual).toHaveTextContent(/^.$/);
  });

  it("coalesces rapid pointer movement into one wave per animation frame", () => {
    const { container } = render(<AsciiRippleText>Signal</AsciiRippleText>);
    const visual = container.querySelector<HTMLElement>("[aria-hidden='true']");
    expect(visual).toBeTruthy();
    mockTextBounds(visual!);

    fireEvent.mouseEnter(visual!, { clientX: 10 });
    expect(animationFrames).toHaveLength(1);
    const queuedWave = animationFrames.shift();
    queuedWave!(0);

    for (let index = 0; index < 100; index += 1) {
      fireEvent.mouseMove(visual!, { clientX: index });
    }

    // The animation loop and one coalesced pointer sample are pending.
    expect(animationFrames).toHaveLength(2);
  });
});
