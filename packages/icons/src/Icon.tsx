import React from "react";

import {
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  CompanionIcon,
  CopyIcon,
  ErrorIcon,
  EyeIcon,
  GitHubIcon,
  GlobeIcon,
  InfoIcon,
  InstagramIcon,
  IntegrationsTileIcon,
  LightCrossIcon,
  MenuIcon,
  MoonIcon,
  RefreshIcon,
  SlidersIcon,
  StatusIcon,
  SunIcon,
  TikTokIcon,
  TwitterIcon,
  WarningIcon,
  WorkflowsTileIcon,
  YouTubeIcon,
} from "./icons.js";
import type { SteezIconName, SteezIconProps } from "./types.js";

const ICONS: Record<SteezIconName, React.ComponentType<SteezIconProps>> = {
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  close: CloseIcon,
  companion: CompanionIcon,
  copy: CopyIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  github: GitHubIcon,
  globe: GlobeIcon,
  info: InfoIcon,
  instagram: InstagramIcon,
  integrationsTile: IntegrationsTileIcon,
  lightCross: LightCrossIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  refresh: RefreshIcon,
  sliders: SlidersIcon,
  status: StatusIcon,
  sun: SunIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
  warning: WarningIcon,
  workflowsTile: WorkflowsTileIcon,
  youtube: YouTubeIcon,
};

export interface IconProps extends SteezIconProps {
  icon: SteezIconName;
}

export function Icon({ icon, ...props }: IconProps) {
  const Component = ICONS[icon];
  return <Component {...props} />;
}
