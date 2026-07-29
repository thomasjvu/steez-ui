import { useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Display } from "./shell";

export function HorizontalSlider({
  children,
  label,
  action,
  className,
}: {
  children: ReactNode;
  label?: string;
  action?: ReactNode;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <div className={className}>
      {(label || action) && (
        <div className="sz-shell flex items-end justify-between gap-4 mb-4">
          {label ? (
            <Display as="h2" className="text-xl sm:text-2xl">
              {label}
            </Display>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            {action}
            <div className="hidden sm:flex gap-1.5">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="sz-slider-nav"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="sz-slider-nav"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        ref={scrollerRef}
        className={cn(
          "sz-slider px-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
