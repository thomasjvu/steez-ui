import * as React from "react";
import { cn } from "../lib/cn";

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <input className={cn("sz-input", className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return <textarea className={cn("sz-input", className)} {...props} />;
}
