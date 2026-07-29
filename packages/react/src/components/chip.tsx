import * as React from "react";
import { cn } from "../lib/cn";

export type ChipProps = React.ComponentProps<"button"> & {
  active?: boolean;
};

export function Chip({ className, active, ...props }: ChipProps) {
  return (
    <button
      type="button"
      data-active={active ? "true" : "false"}
      className={cn("sz-chip", className)}
      {...props}
    />
  );
}
