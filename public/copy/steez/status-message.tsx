/**
 * Standalone Steez UI copy of Status Message.
 *
 * Generated from packages/ui/src/components/StatusMessage.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import type { CSSProperties, SVGProps } from "react";

const __styles_steez_status_message_0: Record<string, string> = {
  "message": "steez-status-message-0-message",
  "icon": "steez-status-message-0-icon",
  "text": "steez-status-message-0-text",
  "success": "steez-status-message-0-success",
  "error": "steez-status-message-0-error",
  "info": "steez-status-message-0-info",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/StatusMessage.module.css */
.steez-status-message-0-message {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg-secondary, #0a0a0a);
  border: 1px solid var(--border-color, rgba(203, 203, 204, 0.2));
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(1, 6, 7, 0.15);
  font-size: 0.9rem;
  animation: steez-status-message-0-slideIn 0.3s ease-out;
  z-index: 1000;
}

@keyframes steez-status-message-0-slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.steez-status-message-0-icon {
  display: inline-flex;
}

.steez-status-message-0-text {
  color: var(--text-primary, #cbcbcc);
}

.steez-status-message-0-success {
  border-color: var(--success, #00ff88);
}

.steez-status-message-0-success .steez-status-message-0-icon {
  color: var(--success, #00ff88);
}

.steez-status-message-0-error {
  border-color: var(--danger, #ee1401);
}

.steez-status-message-0-error .steez-status-message-0-icon {
  color: var(--danger, #ee1401);
}

.steez-status-message-0-info {
  border-color: var(--info, #4a9eff);
}

.steez-status-message-0-info .steez-status-message-0-icon {
  color: var(--info, #4a9eff);
}

`;
const __steezStandaloneStyleKey = "status-message";

function __injectSteezStandaloneStyles() {
  if (typeof document === "undefined" || document.querySelector(`style[data-steez-standalone="${__steezStandaloneStyleKey}"]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-steez-standalone", __steezStandaloneStyleKey);
  style.textContent = __steezStandaloneStyles;
  document.head.appendChild(style);
}

__injectSteezStandaloneStyles();

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
  | "menu"
  | "chevronLeft"
  | "sliders"
  | "eye"
  | "sun"
  | "moon"
  | "lightCross"
  | "github"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "companion"
  | "globe"
  | "integrationsTile"
  | "status"
  | "workflowsTile";

interface IconProviderValue {
  size: number;
  strokeWidth: number;
}

const DEFAULT_VALUE: IconProviderValue = {
  size: 16,
  strokeWidth: 2,
};

const IconProviderContext = createContext<IconProviderValue>(DEFAULT_VALUE);

export interface SteezIconProviderProps {
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}

export function SteezIconProvider({
  size = DEFAULT_VALUE.size,
  strokeWidth = DEFAULT_VALUE.strokeWidth,
  children,
}: SteezIconProviderProps) {
  return (
    <IconProviderContext.Provider value={{ size, strokeWidth }}>
      {children}
    </IconProviderContext.Provider>
  );
}

export function useSteezIconDefaults() {
  return useContext(IconProviderContext);
}

function createIcon(
  render: (
    props: Required<Pick<SteezIconProps, "width" | "height" | "color">> & SteezIconProps,
    strokeWidth: number,
  ) => React.ReactElement,
) {
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

export const CopyIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
));

export const CheckIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
));

export const ErrorIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
));

export const InfoIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
));

export const WarningIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
));

export const RefreshIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
  </svg>
));

export const CloseIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));

export const MenuIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
));

export const ChevronLeftIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
));

export const SlidersIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
));

export const EyeIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));

export const SunIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
));

export const MoonIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
    style={style}
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
  </svg>
));

export const GlobeIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
));

export const CompanionIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <path d="m12 2.8 2.5 5.06 5.58.81-4.04 3.94.95 5.56L12 15.55 7 18.17l.95-5.56-4.04-3.94 5.58-.81Z" />
  </svg>
));

export const StatusIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <path d="M12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8Z" />
    <path d="M7 12h2.4l1.35-2.4 2.5 5 1.3-2.6H17" />
  </svg>
));

export const IntegrationsTileIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 12h4" />
    <path d="M14.5 10.6 16.7 8.4" />
    <path d="M14.5 13.4 16.7 15.6" />
  </svg>
));

export const WorkflowsTileIcon = createIcon(({ width, height, color, className, style, ...props }, strokeWidth) => (
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
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M8 6h4a4 4 0 0 1 4 4v0" />
    <path d="M8 18h4a4 4 0 0 0 4-4v0" />
  </svg>
));

export function GitHubIcon({
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
      fill="none"
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4c-.5-1.4-1.3-1.8-1.3-1.8c-1.1-.7.1-.7.1-.7c1.2.1 1.9 1.2 1.9 1.2c1.1 1.9 2.9 1.4 3.6 1.1c.1-.8.4-1.4.7-1.7c-2.6-.3-5.4-1.3-5.4-5.9c0-1.3.5-2.4 1.2-3.2c-.1-.3-.5-1.5.1-3.1c0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2c.7 1.6.3 2.8.1 3.1c.8.9 1.2 1.9 1.2 3.2c0 4.6-2.8 5.6-5.5 5.9c.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function TwitterIcon({
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
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function InstagramIcon({
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
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

export function YouTubeIcon({
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
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

export function TikTokIcon({
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
      className={className}
      style={style}
      {...props}
    >
      <path
        fill={color}
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      />
    </svg>
  );
}

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
      <path
        d="M35.84 60.42C40.6422 60.7874 45.1351 62.9314 48.4413 66.4336C51.7475 69.9358 53.6295 74.5446 53.72 79.36L57.71 383.88L61.71 79.36C61.8005 74.5446 63.6825 69.9358 66.9887 66.4336C70.2949 62.9314 74.7878 60.7873 79.59 60.42L115.43 57.69L78.35 54.88C73.7394 54.5319 69.4063 52.5427 66.1368 49.2732C62.8673 46.0037 60.8781 41.6706 60.53 37.06L57.71 2.52302e-06L54.89 37.06C54.5376 41.6708 52.5457 46.0029 49.2749 49.2718C46.0042 52.5407 41.671 54.5302 37.06 54.88L2.52171e-06 57.69L35.84 60.42Z"
        fill={color}
      />
    </svg>
  );
}

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

export interface StatusMessageProps {
  message: string;
  type: "success" | "error" | "info";
}

export function StatusMessage({ message, type }: StatusMessageProps) {
  return (
    <div
      className={`${__styles_steez_status_message_0.message} ${__styles_steez_status_message_0[type]}`.trim()}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <span className={__styles_steez_status_message_0.icon}>
        {type === "success" ? <CheckIcon width={16} height={16} /> : null}
        {type === "error" ? <ErrorIcon width={16} height={16} /> : null}
        {type === "info" ? <InfoIcon width={16} height={16} /> : null}
      </span>
      <span className={__styles_steez_status_message_0.text}>{message}</span>
    </div>
  );
}
