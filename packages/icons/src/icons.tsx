"use client";

import React from "react";

import { useSteezIconDefaults } from "./IconProvider.tsx";
import {
  BRAND_ICON_PATHS,
  LIGHT_CROSS_PATH,
  MOON_PATH,
  STROKE_ICON_NODES,
  type IconNode,
} from "./icons.data.ts";
import type { SteezIconProps } from "./types.ts";

type ResolvedIconProps = Required<Pick<SteezIconProps, "width" | "height" | "color">> & SteezIconProps;

/** Wraps an icon so size and stroke width fall back to the SteezIconProvider defaults. */
function createIcon(render: (props: ResolvedIconProps, strokeWidth: number) => React.ReactElement) {
  return function SteezIcon({
    width,
    height,
    color = "currentColor",
    ...props
  }: SteezIconProps) {
    const defaults = useSteezIconDefaults();
    return render(
      {
        width: width ?? defaults.size,
        height: height ?? defaults.size,
        color,
        ...props,
      },
      defaults.strokeWidth,
    );
  };
}

function renderNodes(nodes: readonly IconNode[]) {
  return nodes.map(([tag, attributes], index) => React.createElement(tag, { key: index, ...attributes }));
}

function strokeIcon(nodes: readonly IconNode[]) {
  return createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...props}
    >
      {renderNodes(nodes)}
    </svg>
  ));
}

/** Brand marks ignore the provider size and always default to 24×24. */
function brandIcon(d: string, svgFill?: "none") {
  return function SteezBrandIcon({
    width = 24,
    height = 24,
    color = "currentColor",
    className,
    style,
    ...props
  }: SteezIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={svgFill}
        className={className}
        style={style}
        {...props}
      >
        <path fill={color} d={d} />
      </svg>
    );
  };
}

export const CopyIcon = strokeIcon(STROKE_ICON_NODES.copy);
export const CheckIcon = strokeIcon(STROKE_ICON_NODES.check);
export const ErrorIcon = strokeIcon(STROKE_ICON_NODES.error);
export const InfoIcon = strokeIcon(STROKE_ICON_NODES.info);
export const WarningIcon = strokeIcon(STROKE_ICON_NODES.warning);
export const RefreshIcon = strokeIcon(STROKE_ICON_NODES.refresh);
export const CloseIcon = strokeIcon(STROKE_ICON_NODES.close);
export const MenuIcon = strokeIcon(STROKE_ICON_NODES.menu);
export const ChevronLeftIcon = strokeIcon(STROKE_ICON_NODES.chevronLeft);
export const SlidersIcon = strokeIcon(STROKE_ICON_NODES.sliders);
export const EyeIcon = strokeIcon(STROKE_ICON_NODES.eye);
export const SunIcon = strokeIcon(STROKE_ICON_NODES.sun);
export const GlobeIcon = strokeIcon(STROKE_ICON_NODES.globe);
export const CompanionIcon = strokeIcon(STROKE_ICON_NODES.companion);
export const StatusIcon = strokeIcon(STROKE_ICON_NODES.status);
export const IntegrationsTileIcon = strokeIcon(STROKE_ICON_NODES.integrationsTile);
export const WorkflowsTileIcon = strokeIcon(STROKE_ICON_NODES.workflowsTile);

export const MoonIcon = createIcon(({ width, height, color, className, style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    stroke="none"
    className={className}
    style={style}
    {...props}
  >
    <path d={MOON_PATH} />
  </svg>
));

export const GitHubIcon = brandIcon(BRAND_ICON_PATHS.GitHub, "none");
export const TwitterIcon = brandIcon(BRAND_ICON_PATHS.Twitter);
export const InstagramIcon = brandIcon(BRAND_ICON_PATHS.Instagram);
export const YouTubeIcon = brandIcon(BRAND_ICON_PATHS.YouTube);
export const TikTokIcon = brandIcon(BRAND_ICON_PATHS.TikTok);

export function LightCrossIcon({
  width = 116,
  height = 384,
  color = "currentColor",
  className,
  style,
  ...props
}: SteezIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 116 384"
      fill="none"
      className={className}
      style={style}
      {...props}
    >
      <path d={LIGHT_CROSS_PATH} fill={color} />
    </svg>
  );
}
