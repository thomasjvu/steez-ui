import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeProps = React.ComponentProps<"span"> & {
  tone?: "default" | "signal" | "volt";
};

export function Badge({
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "sz-badge",
        tone === "signal" && "sz-badge-signal",
        tone === "volt" && "sz-badge-volt",
        className,
      )}
      {...props}
    />
  );
}
