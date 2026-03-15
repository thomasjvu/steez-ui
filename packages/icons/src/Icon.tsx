import React from "react";

import {
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  CopyIcon,
  ErrorIcon,
  EyeIcon,
  InfoIcon,
  LightCrossIcon,
  MoonIcon,
  RefreshIcon,
  SlidersIcon,
  SunIcon,
  WarningIcon,
} from "./icons.js";
import type { SteezIconName, SteezIconProps } from "./types.js";

const ICONS: Record<SteezIconName, React.ComponentType<SteezIconProps>> = {
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  close: CloseIcon,
  copy: CopyIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  info: InfoIcon,
  lightCross: LightCrossIcon,
  moon: MoonIcon,
  refresh: RefreshIcon,
  sliders: SlidersIcon,
  sun: SunIcon,
  warning: WarningIcon,
};

export interface IconProps extends SteezIconProps {
  icon: SteezIconName;
}

export function Icon({ icon, ...props }: IconProps) {
  const Component = ICONS[icon];
  return <Component {...props} />;
}
