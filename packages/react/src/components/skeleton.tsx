import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Skeleton({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("sz-skeleton", className)}
      style={style}
      aria-hidden
      {...props}
    />
  );
}

/** Campaign / product tile placeholder with cut corners. */
export function SkeletonTile({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "sz-skeleton-tile",
        compact
          ? "min-w-[16.5rem] w-[16.5rem] sm:min-w-[18rem] sm:w-[18rem]"
          : "w-full",
        className,
      )}
      aria-hidden
    >
      <Skeleton className="aspect-square w-full !rounded-none" />
      <div className="p-3.5 space-y-2 border-t border-[var(--steez-line)]">
        <Skeleton className="h-4 w-3/4" style={{ width: "75%" }} />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" style={{ width: "66%" }} />
        <Skeleton className="h-1 w-full mt-3" />
        <div className="flex justify-between gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow({
  count = 4,
  compact = true,
}: {
  count?: number;
  compact?: boolean;
}) {
  return (
    <div className="sz-slider px-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonTile key={i} compact={compact} />
      ))}
    </div>
  );
}
