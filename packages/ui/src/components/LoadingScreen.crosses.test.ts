// @vitest-environment node
import { describe, expect, it } from "vitest";

import { MAX_CROSSES, makeCross, pushCross } from "./LoadingScreen.crosses";

// Failure modes pinned here:
// - crosses spawn past the right edge, or off-screen on narrow surfaces
// - tilt, scale, ground or opacity leave their designed ranges
// - the field grows without bound

describe("makeCross", () => {
  it("keeps every value in its designed range", () => {
    const low = makeCross(1, 800, () => 0);
    const high = makeCross(2, 800, () => 0.999999);

    expect(low).toMatchObject({ id: 1, x: 0, rotation: -3, scale: 0.4, groundOffset: 0, opacity: 0.4 });
    expect(high.x).toBeCloseTo(680);
    expect(high.rotation).toBeCloseTo(3);
    expect(high.scale).toBeCloseTo(0.8);
    expect(high.groundOffset).toBeCloseTo(30);
    expect(high.opacity).toBeCloseTo(0.7);
  });

  it("still spreads crosses on very narrow surfaces", () => {
    expect(makeCross(1, 0, () => 0.999999).x).toBeCloseTo(40);
    expect(makeCross(1, 140, () => 0.999999).x).toBeCloseTo(40);
  });
});

describe("pushCross", () => {
  it("keeps only the newest crosses", () => {
    let crosses = [] as ReturnType<typeof makeCross>[];
    for (let id = 1; id <= MAX_CROSSES + 5; id += 1) {
      crosses = pushCross(crosses, makeCross(id, 800, () => 0.5));
    }
    expect(crosses).toHaveLength(MAX_CROSSES);
    expect(crosses[0].id).toBe(6);
    expect(crosses.at(-1)?.id).toBe(MAX_CROSSES + 5);
  });
});
