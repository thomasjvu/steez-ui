import * as React from "react";
import { cn } from "../lib/cn";

export function Card({
  className,
  interactive,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "sz-card",
        interactive && "sz-card-interactive",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-4 pb-0", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-semibold tracking-tight leading-snug", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-[var(--steez-ink-soft)] mt-1", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-4 pb-4 pt-0 flex items-center gap-2 border-t border-[var(--steez-line)] mt-auto",
        className,
      )}
      {...props}
    />
  );
}
