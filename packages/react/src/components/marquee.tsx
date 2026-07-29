import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type MarqueeProps = {
  text?: string;
  /** Seconds for one full loop (lower = faster). Default 28 (calm). */
  speedSeconds?: number;
  pauseOnHover?: boolean;
  /** Pause animation when offscreen (default true). */
  pauseWhenHidden?: boolean;
  className?: string;
};

/**
 * GPU-friendly marquee: CSS transform only, two segments, IntersectionObserver pause.
 */
export function Marquee({
  text = "STEEZ  ◆  FUTURE DROP  ◆  NO MIDDLEMAN  ◆  ",
  speedSeconds = 28,
  pauseOnHover = true,
  pauseWhenHidden = true,
  className,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!pauseWhenHidden) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setHidden(!entry?.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "40px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pauseWhenHidden]);

  // One segment is enough content; duplicated for seamless -50% transform loop
  const segment = (
    <div className="sz-marquee-segment" aria-hidden={false}>
      {text}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={cn("sz-marquee", hidden && "is-paused", className)}
      role="presentation"
    >
      <div
        className={cn("sz-marquee-inner", pauseOnHover && "is-pausable")}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {segment}
        <div className="sz-marquee-segment" aria-hidden>
          {text}
        </div>
      </div>
    </div>
  );
}
