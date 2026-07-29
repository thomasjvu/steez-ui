import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const buttonVariants = cva("sz-btn", {
  variants: {
    variant: {
      primary: "sz-btn-primary",
      secondary: "sz-btn-secondary",
      ghost: "sz-btn-ghost",
      ink: "sz-btn-ink",
      /** Futuristic HUD cut-corner outline */
      fui: "sz-btn-fui",
      /** Solid FUI signal fill */
      "fui-solid": "sz-btn-fui sz-btn-fui-solid",
      /** Quiet FUI ghost */
      "fui-ghost": "sz-btn-fui sz-btn-fui-ghost",
    },
    size: {
      default: "",
      sm: "sz-btn-sm",
      lg: "sz-btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
