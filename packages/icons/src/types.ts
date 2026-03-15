import type { CSSProperties, SVGProps } from "react";

export interface SteezIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export type SteezIconName =
  | "copy"
  | "check"
  | "error"
  | "info"
  | "warning"
  | "refresh"
  | "close"
  | "chevronLeft"
  | "sliders"
  | "eye"
  | "sun"
  | "moon"
  | "lightCross";
