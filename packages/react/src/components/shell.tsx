import * as React from "react";
import { cn } from "../lib/cn";

export function Shell({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("sz-shell", className)} {...props} />;
}

export function Display({
  className,
  as: Comp = "h1",
  ...props
}: React.ComponentProps<"h1"> & { as?: "h1" | "h2" | "h3" | "p" | "div" }) {
  return <Comp className={cn("sz-display", className)} {...props} />;
}

export function SectionLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("sz-label", className)} {...props} />;
}

export function MonoLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return <span className={cn("sz-mono", className)} {...props} />;
}

export function NavBar({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return <header className={cn("sz-nav", className)} {...props} />;
}
