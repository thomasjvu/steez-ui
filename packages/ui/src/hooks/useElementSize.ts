import React from "react";

export interface ElementSize {
  width: number;
  height: number;
}

const NO_SIZE: ElementSize = { width: 0, height: 0 };

/**
 * Tracks an element's client size (content plus padding) with ResizeObserver.
 * Keeps `fallback` until the element has a non-zero size, and keeps the last
 * good size if it later collapses to zero.
 */
export function useElementSize(
  ref: React.RefObject<HTMLElement | null>,
  fallback: ElementSize = NO_SIZE,
): ElementSize {
  const [size, setSize] = React.useState(fallback);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      const width = ref.current?.clientWidth ?? 0;
      const height = ref.current?.clientHeight ?? 0;
      if (width <= 0 || height <= 0) return;
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
