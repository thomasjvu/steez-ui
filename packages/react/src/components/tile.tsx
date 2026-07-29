import * as React from "react";
import { cn } from "../lib/cn";

export type TileProps = React.ComponentProps<"div"> & {
  interactive?: boolean;
  /** Corner cut size in px (default 14). */
  cut?: number;
};

/** Square-friendly tile with cut corners (clip-path). */
export function Tile({
  className,
  interactive,
  cut = 14,
  style,
  ...props
}: TileProps) {
  return (
    <div
      className={cn(
        "sz-tile",
        interactive && "sz-tile-interactive",
        className,
      )}
      style={{ ...style, ["--sz-cut" as string]: `${cut}px` }}
      {...props}
    />
  );
}

export function TileMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("sz-tile-media", className)} {...props} />;
}

export function TileBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("sz-tile-body", className)} {...props} />;
}
