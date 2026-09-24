/**
 * Standalone Steez UI copy of Radial Menu Overlay.
 *
 * Generated from packages/ui/src/components/RadialMenuOverlay.tsx by pnpm registry:generate.
 * This file is intentionally self-contained: its CSS, local helpers, and icon
 * implementations are embedded so it can be pasted into a React project.
 * Do not edit this generated copy; edit the canonical package source instead.
 */

"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import type { CSSProperties, SVGProps } from "react";

const __styles_steez_radial_menu_overlay_0: Record<string, string> = {
  "root": "steez-radial-menu-overlay-0-root",
  "absolute": "steez-radial-menu-overlay-0-absolute",
  "fixed": "steez-radial-menu-overlay-0-fixed",
  "svg": "steez-radial-menu-overlay-0-svg",
  "segment": "steez-radial-menu-overlay-0-segment",
  "strong": "steez-radial-menu-overlay-0-strong",
  "content": "steez-radial-menu-overlay-0-content",
};

const __styles_steez_radial_menu_overlay_1: Record<string, string> = {
  "overlay": "steez-radial-menu-overlay-1-overlay",
  "contained": "steez-radial-menu-overlay-1-contained",
  "backdrop": "steez-radial-menu-overlay-1-backdrop",
  "panel": "steez-radial-menu-overlay-1-panel",
  "frame": "steez-radial-menu-overlay-1-frame",
  "chrome": "steez-radial-menu-overlay-1-chrome",
  "header": "steez-radial-menu-overlay-1-header",
  "footer": "steez-radial-menu-overlay-1-footer",
  "headerBlock": "steez-radial-menu-overlay-1-headerBlock",
  "headerKicker": "steez-radial-menu-overlay-1-headerKicker",
  "copyEyebrow": "steez-radial-menu-overlay-1-copyEyebrow",
  "detailMeta": "steez-radial-menu-overlay-1-detailMeta",
  "detailLink": "steez-radial-menu-overlay-1-detailLink",
  "coreKicker": "steez-radial-menu-overlay-1-coreKicker",
  "coreMeta": "steez-radial-menu-overlay-1-coreMeta",
  "nodeLabel": "steez-radial-menu-overlay-1-nodeLabel",
  "footerHint": "steez-radial-menu-overlay-1-footerHint",
  "brand": "steez-radial-menu-overlay-1-brand",
  "closeButton": "steez-radial-menu-overlay-1-closeButton",
  "layout": "steez-radial-menu-overlay-1-layout",
  "copy": "steez-radial-menu-overlay-1-copy",
  "copyTitle": "steez-radial-menu-overlay-1-copyTitle",
  "detailTitle": "steez-radial-menu-overlay-1-detailTitle",
  "coreTitle": "steez-radial-menu-overlay-1-coreTitle",
  "copyBody": "steez-radial-menu-overlay-1-copyBody",
  "detailBody": "steez-radial-menu-overlay-1-detailBody",
  "detailPanel": "steez-radial-menu-overlay-1-detailPanel",
  "wheelWrap": "steez-radial-menu-overlay-1-wheelWrap",
  "wheel": "steez-radial-menu-overlay-1-wheel",
  "outerRing": "steez-radial-menu-overlay-1-outerRing",
  "innerRing": "steez-radial-menu-overlay-1-innerRing",
  "sweepRingOuter": "steez-radial-menu-overlay-1-sweepRingOuter",
  "sweepRingInner": "steez-radial-menu-overlay-1-sweepRingInner",
  "radarTicks": "steez-radial-menu-overlay-1-radarTicks",
  "core": "steez-radial-menu-overlay-1-core",
  "node": "steez-radial-menu-overlay-1-node",
  "nodeActive": "steez-radial-menu-overlay-1-nodeActive",
  "nodeConnector": "steez-radial-menu-overlay-1-nodeConnector",
  "nodeMarker": "steez-radial-menu-overlay-1-nodeMarker",
  "stickZone": "steez-radial-menu-overlay-1-stickZone",
  "stickStem": "steez-radial-menu-overlay-1-stickStem",
  "stickKnob": "steez-radial-menu-overlay-1-stickKnob",
  "stickKnobDragging": "steez-radial-menu-overlay-1-stickKnobDragging",
  "stickKnobPending": "steez-radial-menu-overlay-1-stickKnobPending",
  "footerContent": "steez-radial-menu-overlay-1-footerContent",
};

const __steezStandaloneStyles = String.raw`/* packages/ui/src/components/NotchedViewportFrame.module.css */
.steez-radial-menu-overlay-0-root {
  pointer-events: none;
  isolation: isolate;
}

.steez-radial-menu-overlay-0-absolute {
  position: absolute;
  inset: 0;
}

.steez-radial-menu-overlay-0-fixed {
  position: fixed;
  inset: 0;
}

.steez-radial-menu-overlay-0-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.steez-radial-menu-overlay-0-segment {
  fill: none;
  stroke: color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 88%, transparent);
  stroke-linecap: square;
  stroke-width: 1.45;
  vector-effect: non-scaling-stroke;
}

.steez-radial-menu-overlay-0-strong .steez-radial-menu-overlay-0-segment {
  stroke: color-mix(in srgb, var(--text-primary, #cbcbcc) 38%, transparent);
}

.steez-radial-menu-overlay-0-content {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: auto;
}


/* packages/ui/src/components/RadialMenuOverlay.module.css */
.steez-radial-menu-overlay-1-overlay {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  padding: var(--radial-menu-frame-inset, var(--page-frame-inset, 1rem));
}

.steez-radial-menu-overlay-1-contained {
  position: absolute;
}

.steez-radial-menu-overlay-1-backdrop {
  position: absolute;
  inset: 0;
  padding: 0;
  border: 0;
  background: color-mix(in srgb, var(--bg-primary, #010607) 76%, transparent);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.steez-radial-menu-overlay-1-contained .steez-radial-menu-overlay-1-backdrop {
  background: color-mix(in srgb, var(--bg-primary, #010607) 18%, transparent);
}

.steez-radial-menu-overlay-1-panel {
  position: relative;
  min-height: 100%;
  background: color-mix(in srgb, var(--bg-primary, #010607) 99%, transparent);
  overflow: hidden;
}

.steez-radial-menu-overlay-1-frame {
  inset: 0;
}

.steez-radial-menu-overlay-1-chrome {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
  padding: clamp(2.1rem, 3vw, 3rem) clamp(2.1rem, 4vw, 3.8rem)
    clamp(2rem, 3vw, 2.6rem);
  gap: 1.35rem;
  animation: steez-radial-menu-overlay-1-overlayBootBlink 420ms steps(2, end) 3;
}

.steez-radial-menu-overlay-1-header,
.steez-radial-menu-overlay-1-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.steez-radial-menu-overlay-1-headerBlock {
  display: grid;
  gap: 0.28rem;
}

.steez-radial-menu-overlay-1-headerKicker,
.steez-radial-menu-overlay-1-copyEyebrow,
.steez-radial-menu-overlay-1-detailMeta,
.steez-radial-menu-overlay-1-detailLink,
.steez-radial-menu-overlay-1-coreKicker,
.steez-radial-menu-overlay-1-coreMeta,
.steez-radial-menu-overlay-1-nodeLabel,
.steez-radial-menu-overlay-1-footerHint {
  color: var(--text-secondary, #999999);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.steez-radial-menu-overlay-1-brand {
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-primary, "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: 0.95rem;
  line-height: 1.2;
}

.steez-radial-menu-overlay-1-closeButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 78%, transparent);
  background: color-mix(in srgb, var(--bg-primary, #010607) 96%, transparent);
  color: var(--text-primary, #cbcbcc);
  cursor: pointer;
}

.steez-radial-menu-overlay-1-layout {
  display: grid;
  grid-template-columns: minmax(18rem, 0.92fr) minmax(22rem, 1.08fr);
  gap: clamp(1.6rem, 4vw, 4rem);
  align-items: center;
  min-height: 0;
}

.steez-radial-menu-overlay-1-copy {
  display: grid;
  gap: 0.72rem;
  align-content: start;
  max-width: 24rem;
}

.steez-radial-menu-overlay-1-copyTitle,
.steez-radial-menu-overlay-1-detailTitle,
.steez-radial-menu-overlay-1-coreTitle {
  color: var(--text-primary, #cbcbcc);
  margin: 0;
}

.steez-radial-menu-overlay-1-copyTitle {
  font-family: var(--font-display, "BBH Bartle", "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: clamp(2.25rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.steez-radial-menu-overlay-1-copyBody,
.steez-radial-menu-overlay-1-detailBody {
  margin: 0;
  color: var(--text-secondary, #999999);
  line-height: 1.58;
}

.steez-radial-menu-overlay-1-detailPanel {
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid color-mix(in srgb, var(--border-color, rgba(203, 203, 204, 0.2)) 74%, transparent);
}

.steez-radial-menu-overlay-1-detailTitle {
  font-family: var(--font-primary, "Zed Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif);
  font-size: clamp(1.4rem, 1.1rem + 0.7vw, 1.9rem);
  font-weight: 600;
  letter-spacing: -0.03em;
}

.steez-radial-menu-overlay-1-detailLink {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 2rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-primary, #cbcbcc);
  cursor: pointer;
}

.steez-radial-menu-overlay-1-detailLink:hover {
  color: var(--text-secondary, #999999);
}

.steez-radial-menu-overlay-1-wheelWrap {
  display: grid;
  place-items: center;
}

.steez-radial-menu-overlay-1-wheel {
  position: relative;
  width: min(100%, 31rem);
  aspect-ratio: 1;
  --wheel-accent: rgba(244, 244, 244, 0.94);
  --wheel-accent-dim: rgba(214, 214, 214, 0.82);
  --wheel-accent-soft: rgba(244, 244, 244, 0.16);
  --wheel-deep-shadow: rgba(0, 0, 0, 0.54);
}

.steez-radial-menu-overlay-1-outerRing,
.steez-radial-menu-overlay-1-innerRing,
.steez-radial-menu-overlay-1-sweepRingOuter,
.steez-radial-menu-overlay-1-sweepRingInner,
.steez-radial-menu-overlay-1-radarTicks {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  pointer-events: none;
}

.steez-radial-menu-overlay-1-outerRing,
.steez-radial-menu-overlay-1-innerRing {
  border-radius: 50%;
}

.steez-radial-menu-overlay-1-outerRing {
  width: 72%;
  height: 72%;
  border: 1px solid color-mix(in srgb, var(--wheel-accent) 24%, transparent);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.018),
    inset 0 0 0 1px rgba(255, 255, 255, 0.018);
  animation: steez-radial-menu-overlay-1-orbitSpinClockwise 26s linear infinite;
}

.steez-radial-menu-overlay-1-innerRing {
  width: 48%;
  height: 48%;
  border: 1px solid color-mix(in srgb, var(--wheel-accent-dim) 22%, transparent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.014);
  animation: steez-radial-menu-overlay-1-orbitSpinCounter 18s linear infinite;
}

.steez-radial-menu-overlay-1-outerRing::before,
.steez-radial-menu-overlay-1-outerRing::after,
.steez-radial-menu-overlay-1-innerRing::before,
.steez-radial-menu-overlay-1-innerRing::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.steez-radial-menu-overlay-1-outerRing::before {
  inset: 0.72rem;
  border: 1px dashed color-mix(in srgb, var(--wheel-accent-dim) 16%, transparent);
  opacity: 0.54;
}

.steez-radial-menu-overlay-1-outerRing::after {
  inset: 0.88rem;
  background:
    conic-gradient(
      from 92deg,
      transparent 0deg 32deg,
      color-mix(in srgb, var(--wheel-accent) 40%, transparent) 32deg 66deg,
      transparent 66deg 174deg,
      color-mix(in srgb, var(--wheel-accent-dim) 30%, transparent) 174deg 208deg,
      transparent 208deg 292deg,
      color-mix(in srgb, var(--wheel-accent) 44%, transparent) 292deg 326deg,
      transparent 326deg 360deg
    );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  opacity: 0.8;
  animation: steez-radial-menu-overlay-1-orbitSpinCounter 16s linear infinite;
}

.steez-radial-menu-overlay-1-innerRing::before {
  inset: 0.58rem;
  border: 1px dashed color-mix(in srgb, var(--wheel-accent-dim) 14%, transparent);
  opacity: 0.42;
}

.steez-radial-menu-overlay-1-innerRing::after {
  inset: 0.72rem;
  background:
    conic-gradient(
      from -72deg,
      transparent 0deg 44deg,
      color-mix(in srgb, var(--wheel-accent) 34%, transparent) 44deg 78deg,
      transparent 78deg 228deg,
      color-mix(in srgb, var(--wheel-accent-dim) 28%, transparent) 228deg 258deg,
      transparent 258deg 360deg
    );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  opacity: 0.74;
  animation: steez-radial-menu-overlay-1-orbitSpinClockwise 14s linear infinite;
}

.steez-radial-menu-overlay-1-sweepRingOuter,
.steez-radial-menu-overlay-1-sweepRingInner {
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
}

.steez-radial-menu-overlay-1-sweepRingOuter {
  width: 62%;
  height: 62%;
  background:
    conic-gradient(
      from 18deg,
      transparent 0deg 82deg,
      color-mix(in srgb, var(--wheel-accent) 14%, transparent) 82deg 148deg,
      transparent 148deg 232deg,
      color-mix(in srgb, var(--wheel-accent-dim) 11%, transparent) 232deg 292deg,
      transparent 292deg 360deg
    );
  opacity: 0.88;
  animation: steez-radial-menu-overlay-1-orbitSpinClockwise 20s linear infinite;
}

.steez-radial-menu-overlay-1-sweepRingInner {
  width: 36%;
  height: 36%;
  background:
    conic-gradient(
      from 214deg,
      transparent 0deg 96deg,
      color-mix(in srgb, var(--wheel-accent-dim) 16%, transparent) 96deg 150deg,
      transparent 150deg 276deg,
      color-mix(in srgb, var(--wheel-accent) 12%, transparent) 276deg 320deg,
      transparent 320deg 360deg
    );
  opacity: 0.72;
  animation: steez-radial-menu-overlay-1-orbitSpinCounter 12s linear infinite;
}

.steez-radial-menu-overlay-1-radarTicks {
  width: 54%;
  height: 54%;
  border-radius: 50%;
  background:
    repeating-conic-gradient(
      from -6deg,
      color-mix(in srgb, var(--wheel-accent-dim) 12%, transparent) 0deg 1.2deg,
      transparent 1.2deg 22deg
    );
  -webkit-mask: radial-gradient(circle, transparent 0 57%, #000 57% 58.3%, transparent 58.3%);
  mask: radial-gradient(circle, transparent 0 57%, #000 57% 58.3%, transparent 58.3%);
  opacity: 0.5;
  animation: steez-radial-menu-overlay-1-orbitSpinClockwise 32s linear infinite;
}

.steez-radial-menu-overlay-1-core {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 9.8rem;
  height: 9.8rem;
  z-index: 1;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--wheel-accent) 22%, transparent);
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.042) 0%, rgba(255, 255, 255, 0.012) 34%, transparent 56%),
    radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--bg-primary, #010607) 98%, black) 0%, #050505 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.015),
    0 28px 64px var(--wheel-deep-shadow);
}

.steez-radial-menu-overlay-1-core::before,
.steez-radial-menu-overlay-1-core::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 50%;
}

.steez-radial-menu-overlay-1-core::before {
  width: 74%;
  height: 74%;
  border: 1px solid color-mix(in srgb, var(--wheel-accent-dim) 22%, transparent);
  opacity: 0.74;
}

.steez-radial-menu-overlay-1-core::after {
  width: 22%;
  height: 22%;
  background: rgba(244, 244, 244, 0.88);
  box-shadow: 0 0 0 0.35rem rgba(244, 244, 244, 0.1);
}

.steez-radial-menu-overlay-1-node {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  justify-items: center;
  gap: 0.45rem;
  width: max-content;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  transform:
    translate(-50%, -50%)
    rotate(var(--wheel-angle))
    translateY(-9.4rem)
    rotate(calc(var(--wheel-angle) * -1));
  transition: transform 180ms ease, color 180ms ease;
}

.steez-radial-menu-overlay-1-node:hover,
.steez-radial-menu-overlay-1-node:focus-visible,
.steez-radial-menu-overlay-1-nodeActive {
  transform:
    translate(-50%, -50%)
    rotate(var(--wheel-angle))
    translateY(-9.62rem)
    rotate(calc(var(--wheel-angle) * -1));
}

.steez-radial-menu-overlay-1-nodeConnector {
  width: 1px;
  height: 1.2rem;
  background: color-mix(in srgb, var(--wheel-accent-dim) 18%, transparent);
}

.steez-radial-menu-overlay-1-nodeMarker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.15rem;
  height: 3.15rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--wheel-accent-dim) 22%, transparent);
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.032) 0%, transparent 56%),
    color-mix(in srgb, var(--bg-primary, #010607) 98%, transparent);
  color: var(--text-primary, #cbcbcc);
  font-family: var(--font-mono, "Maple Mono", "SF Mono", "Cascadia Code", "Fira Code", Monaco, monospace);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.steez-radial-menu-overlay-1-nodeLabel {
  color: var(--text-primary, #cbcbcc);
  text-align: center;
}

.steez-radial-menu-overlay-1-node:hover .steez-radial-menu-overlay-1-nodeMarker,
.steez-radial-menu-overlay-1-node:focus-visible .steez-radial-menu-overlay-1-nodeMarker,
.steez-radial-menu-overlay-1-nodeActive .steez-radial-menu-overlay-1-nodeMarker {
  border-color: rgba(255, 255, 255, 0.48);
  background: rgba(245, 245, 245, 0.9);
  color: #050505;
}

.steez-radial-menu-overlay-1-stickZone {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 46%;
  height: 46%;
  translate: -50% -50%;
  border-radius: 50%;
  touch-action: none;
}

.steez-radial-menu-overlay-1-stickStem {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max(var(--stick-length), 0px);
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(244, 244, 244, 0.08) 0%, rgba(244, 244, 244, 0.68) 100%);
  transform-origin: left center;
  transform: rotate(var(--stick-angle));
}

.steez-radial-menu-overlay-1-stickKnob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3.7rem;
  height: 3.7rem;
  translate: calc(-50% + var(--stick-x, 0px)) calc(-50% + var(--stick-y, 0px));
  border-radius: 50%;
  border: 1px solid rgba(244, 244, 244, 0.28);
  background:
    radial-gradient(circle at 50% 50%, rgba(245, 245, 245, 0.14) 0%, transparent 42%),
    radial-gradient(circle at 50% 50%, rgba(7, 7, 7, 0.98) 0%, rgba(5, 5, 5, 1) 72%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.018),
    0 20px 38px rgba(0, 0, 0, 0.4);
  transition:
    translate 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    transform 160ms ease;
}

.steez-radial-menu-overlay-1-stickKnob::before,
.steez-radial-menu-overlay-1-stickKnob::after {
  content: "";
  position: absolute;
  inset: 50%;
  translate: -50% -50%;
  border-radius: 50%;
}

.steez-radial-menu-overlay-1-stickKnob::before {
  width: 64%;
  height: 64%;
  border: 1px solid rgba(244, 244, 244, 0.2);
}

.steez-radial-menu-overlay-1-stickKnob::after {
  width: 28%;
  height: 28%;
  border: 1px solid rgba(244, 244, 244, 0.38);
  background: rgba(244, 244, 244, 0.86);
}

.steez-radial-menu-overlay-1-stickKnobDragging,
.steez-radial-menu-overlay-1-stickKnobPending {
  border-color: rgba(255, 255, 255, 0.54);
}

.steez-radial-menu-overlay-1-stickKnobDragging {
  transform: scale(1.04);
}

.steez-radial-menu-overlay-1-footer {
  align-items: end;
}

.steez-radial-menu-overlay-1-footerContent {
  color: var(--text-secondary, #999999);
}

@keyframes steez-radial-menu-overlay-1-overlayBootBlink {
  0%,
  100% {
    opacity: 1;
  }

  20%,
  40%,
  60%,
  80% {
    opacity: 0.12;
  }

  30%,
  50%,
  70%,
  90% {
    opacity: 1;
  }
}

@keyframes steez-radial-menu-overlay-1-orbitSpinClockwise {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes steez-radial-menu-overlay-1-orbitSpinCounter {
  from {
    transform: translate(-50%, -50%) rotate(360deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

@keyframes steez-radial-menu-overlay-1-axisPulse {
  0%,
  100% {
    opacity: 0.46;
  }

  50% {
    opacity: 0.92;
  }
}

@media (max-width: 980px) {
  .steez-radial-menu-overlay-1-layout {
    grid-template-columns: 1fr;
    align-content: start;
  }

  .steez-radial-menu-overlay-1-copy {
    max-width: none;
  }

  .steez-radial-menu-overlay-1-wheel {
    width: min(100%, 27rem);
  }

  .steez-radial-menu-overlay-1-node {
    transform:
      translate(-50%, -50%)
      rotate(var(--wheel-angle))
      translateY(-8.05rem)
      rotate(calc(var(--wheel-angle) * -1));
  }

  .steez-radial-menu-overlay-1-node:hover,
  .steez-radial-menu-overlay-1-node:focus-visible,
  .steez-radial-menu-overlay-1-nodeActive {
    transform:
      translate(-50%, -50%)
      rotate(var(--wheel-angle))
      translateY(-8.25rem)
      rotate(calc(var(--wheel-angle) * -1));
  }
}

@media (max-width: 720px) {
  .steez-radial-menu-overlay-1-overlay {
    padding: var(--radial-menu-frame-inset, 0.55rem);
  }

  .steez-radial-menu-overlay-1-chrome {
    padding: 1.2rem 1.1rem 1.15rem;
  }

  .steez-radial-menu-overlay-1-copyTitle {
    font-size: clamp(1.9rem, 9vw, 2.9rem);
  }

  .steez-radial-menu-overlay-1-wheel {
    width: min(100%, 18rem);
  }

  .steez-radial-menu-overlay-1-core {
    width: 7rem;
    height: 7rem;
  }

  .steez-radial-menu-overlay-1-coreTitle {
    font-size: 1rem;
  }

  .steez-radial-menu-overlay-1-node {
    transform:
      translate(-50%, -50%)
      rotate(var(--wheel-angle))
      translateY(-6rem)
      rotate(calc(var(--wheel-angle) * -1));
  }

  .steez-radial-menu-overlay-1-node:hover,
  .steez-radial-menu-overlay-1-node:focus-visible,
  .steez-radial-menu-overlay-1-nodeActive {
    transform:
      translate(-50%, -50%)
      rotate(var(--wheel-angle))
      translateY(-6.15rem)
      rotate(calc(var(--wheel-angle) * -1));
  }

  .steez-radial-menu-overlay-1-nodeMarker {
    width: 2.4rem;
    height: 2.4rem;
  }

  .steez-radial-menu-overlay-1-nodeLabel {
    font-size: 0.64rem;
  }

  .steez-radial-menu-overlay-1-footer {
    flex-direction: column;
    align-items: start;
  }
}
`;
const __steezStandaloneStyleKey = "radial-menu-overlay";

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

const FRAME_SEGMENTS = [
  "M14 38V24L24 14H40",
  "M68 14H392",
  "M392 14L424 46",
  "M424 46H576",
  "M576 46L608 14",
  "M608 14H932",
  "M960 14H976L986 24V38",
  "M14 66V934",
  "M986 66V934",
  "M14 962V976L24 986H40",
  "M68 986H932",
  "M960 986H976L986 976V962",
] as const;

export interface NotchedViewportFrameProps {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  fixed?: boolean;
  tone?: "default" | "strong";
}

export function NotchedViewportFrame({
  className = "",
  contentClassName = "",
  children,
  fixed = false,
  tone = "default",
}: NotchedViewportFrameProps) {
  return (
    <div
      className={`${__styles_steez_radial_menu_overlay_0.root} ${fixed ? __styles_steez_radial_menu_overlay_0.fixed : __styles_steez_radial_menu_overlay_0.absolute} ${
        tone === "strong" ? __styles_steez_radial_menu_overlay_0.strong : ""
      } ${className}`.trim()}
      aria-hidden={children ? undefined : "true"}
    >
      <svg
        className={__styles_steez_radial_menu_overlay_0.svg}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {FRAME_SEGMENTS.map((segment) => (
          <path key={segment} className={__styles_steez_radial_menu_overlay_0.segment} d={segment} />
        ))}
      </svg>
      {children ? (
        <div className={`${__styles_steez_radial_menu_overlay_0.content} ${contentClassName}`.trim()}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

const FULL_CIRCLE_DEGREES = 360;
const JOYSTICK_MAX_RADIUS_RATIO = 0.28;
const JOYSTICK_ACTIVATION_RATIO = 0.34;
const JOYSTICK_COMMIT_RATIO = 0.78;
const EMPTY_ITEMS: readonly RadialMenuItem[] = [];

const FOCUSABLE_SELECTOR = [
  'a[href]',
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.tabIndex >= 0,
  );
}

export interface RadialMenuItem {
  id: string;
  label: string;
  eyebrow: string;
  body: string;
  href?: string;
  shortLabel?: string;
  onSelect?: () => void;
}

export interface RadialMenuOverlayProps {
  open: boolean;
  items: readonly RadialMenuItem[];
  onClose: () => void;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  contained?: boolean;
  closeLabel?: string;
  ariaLabel?: string;
}

export function RadialMenuOverlay({
  open,
  items,
  onClose,
  className = "",
  title = "Navigate the runtime",
  description = "One radial control surface for the sections that matter most.",
  brand,
  footer,
  contained = false,
  closeLabel = "Close navigation",
  ariaLabel = "Site navigation",
}: RadialMenuOverlayProps) {
  const safeItems = items.length > 0 ? items : EMPTY_ITEMS;
  const [isPending, startTransition] = React.useTransition();
  const [activeId, setActiveId] = React.useState(safeItems[0]?.id ?? "");
  const [isDragging, setIsDragging] = React.useState(false);
  const [stickOffset, setStickOffset] = React.useState({ x: 0, y: 0 });
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const wheelRef = React.useRef<HTMLDivElement | null>(null);
  const activeIdRef = React.useRef(activeId);
  const dragPointerIdRef = React.useRef<number | null>(null);
  const itemsRef = React.useRef(items);
  const onCloseRef = React.useRef(onClose);

  itemsRef.current = items;
  onCloseRef.current = onClose;

  React.useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    setActiveId(safeItems[0]?.id ?? "");
    setStickOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragPointerIdRef.current = null;
    return undefined;
  }, [open, safeItems]);

  React.useEffect(() => {
    if (!open || typeof window === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const shouldTrapFocus = !contained;
    const previousFocus =
      shouldTrapFocus && document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (shouldTrapFocus) {
      const focusTarget =
        closeButtonRef.current ??
        (overlayRef.current ? getFocusableElements(overlayRef.current)[0] : undefined);
      focusTarget?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (!shouldTrapFocus || event.key !== "Tab") {
        return;
      }

      const root = overlayRef.current;
      if (!root) {
        return;
      }

      const focusable = getFocusableElements(root);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !active || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !active || !root.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (
        previousFocus &&
        typeof previousFocus.focus === "function" &&
        document.contains(previousFocus)
      ) {
        previousFocus.focus();
      }
    };
  }, [contained, open]);

  const getClosestItem = React.useCallback((angle: number) => {
    const currentItems = itemsRef.current;
    const firstItem = currentItems[0];

    if (!firstItem) {
      return undefined;
    }

    let closest = firstItem;
    let closestDistance = Number.POSITIVE_INFINITY;

    currentItems.forEach((item, index) => {
      const itemAngle =
        -90 + (FULL_CIRCLE_DEGREES / Math.max(currentItems.length, 1)) * index;
      const normalizedDistance = Math.abs(
        ((((angle - itemAngle) % FULL_CIRCLE_DEGREES) + 540) % FULL_CIRCLE_DEGREES) - 180,
      );

      if (normalizedDistance < closestDistance) {
        closest = item;
        closestDistance = normalizedDistance;
      }
    });

    return closest;
  }, []);

  const resetStick = React.useCallback(() => {
    dragPointerIdRef.current = null;
    setIsDragging(false);
    setStickOffset({ x: 0, y: 0 });
  }, []);

  const triggerItem = React.useCallback((item: RadialMenuItem) => {
    item.onSelect?.();

    if (item.href && typeof window !== "undefined") {
      if (item.href.startsWith("#")) {
        const target = document.querySelector<HTMLElement>(item.href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.hash = item.href;
        }
      } else {
        window.location.assign(item.href);
      }
    }

    onCloseRef.current();
  }, []);

  const updateStickFromPointer = React.useCallback(
    (clientX: number, clientY: number) => {
      const wheel = wheelRef.current;
      if (!wheel) {
        return 0;
      }

      const rect = wheel.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = Math.min(rect.width, rect.height) * JOYSTICK_MAX_RADIUS_RATIO;
      const clampRatio = distance > maxDistance && distance > 0 ? maxDistance / distance : 1;
      const x = deltaX * clampRatio;
      const y = deltaY * clampRatio;
      const normalizedDistance = maxDistance > 0 ? distance / maxDistance : 0;

      setStickOffset({ x, y });

      if (normalizedDistance >= JOYSTICK_ACTIVATION_RATIO) {
        const nextItem = getClosestItem((Math.atan2(y, x) * 180) / Math.PI);
        if (nextItem && nextItem.id !== activeIdRef.current) {
          activeIdRef.current = nextItem.id;
          startTransition(() => {
            setActiveId(nextItem.id);
          });
        }
      }

      return normalizedDistance;
    },
    [getClosestItem],
  );

  React.useEffect(() => {
    if (!isDragging || typeof window === "undefined") {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
        return;
      }

      updateStickFromPointer(event.clientX, event.clientY);
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (dragPointerIdRef.current !== null && event.pointerId !== dragPointerIdRef.current) {
        return;
      }

      const progress = updateStickFromPointer(event.clientX, event.clientY);
      const selectedItem =
        itemsRef.current.find((item) => item.id === activeIdRef.current) ?? itemsRef.current[0];

      resetStick();

      if (progress >= JOYSTICK_COMMIT_RATIO && selectedItem) {
        triggerItem(selectedItem);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [isDragging, resetStick, triggerItem, updateStickFromPointer]);

  if (!open || safeItems.length === 0) {
    return null;
  }

  const activeItem = safeItems.find((item) => item.id === activeId) ?? safeItems[0];
  const activeIndex = Math.max(
    0,
    safeItems.findIndex((item) => item.id === activeItem.id),
  );
  const angleStep = FULL_CIRCLE_DEGREES / Math.max(safeItems.length, 1);
  const stickLength = Math.hypot(stickOffset.x, stickOffset.y);
  const stickAngle = Math.atan2(stickOffset.y, stickOffset.x);

  return (
    <div
      ref={overlayRef}
      className={`${__styles_steez_radial_menu_overlay_1.overlay} ${contained ? __styles_steez_radial_menu_overlay_1.contained : ""} ${className}`.trim()}
      role="dialog"
      aria-modal={contained ? undefined : "true"}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={__styles_steez_radial_menu_overlay_1.backdrop}
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div className={__styles_steez_radial_menu_overlay_1.panel}>
        <NotchedViewportFrame className={__styles_steez_radial_menu_overlay_1.frame} tone="strong" />
        <div className={__styles_steez_radial_menu_overlay_1.chrome}>
          <div className={__styles_steez_radial_menu_overlay_1.header}>
            <div className={__styles_steez_radial_menu_overlay_1.headerBlock}>
              <div className={__styles_steez_radial_menu_overlay_1.headerKicker}>Navigation</div>
              {brand ? <div className={__styles_steez_radial_menu_overlay_1.brand}>{brand}</div> : null}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={__styles_steez_radial_menu_overlay_1.closeButton}
              onClick={onClose}
              aria-label={closeLabel}
              title={closeLabel}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>

          <div className={__styles_steez_radial_menu_overlay_1.layout}>
            <div className={__styles_steez_radial_menu_overlay_1.copy}>
              <div className={__styles_steez_radial_menu_overlay_1.copyEyebrow}>{activeItem.eyebrow}</div>
              <h2 className={__styles_steez_radial_menu_overlay_1.copyTitle}>{title}</h2>
              <p className={__styles_steez_radial_menu_overlay_1.copyBody}>{description}</p>

              <div className={__styles_steez_radial_menu_overlay_1.detailPanel}>
                <div className={__styles_steez_radial_menu_overlay_1.detailMeta}>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(safeItems.length).padStart(2, "0")}
                </div>
                <div className={__styles_steez_radial_menu_overlay_1.detailTitle}>{activeItem.label}</div>
                <p className={__styles_steez_radial_menu_overlay_1.detailBody}>{activeItem.body}</p>
                <button
                  type="button"
                  className={__styles_steez_radial_menu_overlay_1.detailLink}
                  onClick={() => triggerItem(activeItem)}
                >
                  Open section
                </button>
              </div>
            </div>

            <div className={__styles_steez_radial_menu_overlay_1.wheelWrap}>
              <div ref={wheelRef} className={__styles_steez_radial_menu_overlay_1.wheel}>
                <div className={__styles_steez_radial_menu_overlay_1.outerRing} aria-hidden="true" />
                <div className={__styles_steez_radial_menu_overlay_1.innerRing} aria-hidden="true" />
                <div className={__styles_steez_radial_menu_overlay_1.sweepRingOuter} aria-hidden="true" />
                <div className={__styles_steez_radial_menu_overlay_1.sweepRingInner} aria-hidden="true" />
                <div className={__styles_steez_radial_menu_overlay_1.radarTicks} aria-hidden="true" />

                {safeItems.map((item, index) => {
                  const angle = -90 + angleStep * index;
                  const isActive = item.id === activeItem.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`${__styles_steez_radial_menu_overlay_1.node} ${isActive ? __styles_steez_radial_menu_overlay_1.nodeActive : ""}`}
                      style={
                        {
                          "--wheel-angle": `${angle}deg`,
                        } as React.CSSProperties
                      }
                      onMouseEnter={() => {
                        if (!isDragging) {
                          setActiveId(item.id);
                        }
                      }}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => {
                        setActiveId(item.id);
                        triggerItem(item);
                      }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className={__styles_steez_radial_menu_overlay_1.nodeConnector} aria-hidden="true" />
                      <span className={__styles_steez_radial_menu_overlay_1.nodeMarker}>
                        {item.shortLabel ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={__styles_steez_radial_menu_overlay_1.nodeLabel}>{item.label}</span>
                    </button>
                  );
                })}

                <div className={__styles_steez_radial_menu_overlay_1.core} aria-hidden="true" />
                <div
                  className={__styles_steez_radial_menu_overlay_1.stickZone}
                  onPointerDown={(event) => {
                    dragPointerIdRef.current = event.pointerId;
                    setIsDragging(true);
                    updateStickFromPointer(event.clientX, event.clientY);
                  }}
                >
                  <div
                    className={__styles_steez_radial_menu_overlay_1.stickStem}
                    style={
                      {
                        "--stick-angle": `${stickAngle}rad`,
                        "--stick-length": `${stickLength}px`,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <div
                    className={`${__styles_steez_radial_menu_overlay_1.stickKnob} ${isDragging ? __styles_steez_radial_menu_overlay_1.stickKnobDragging : ""} ${
                      isPending ? __styles_steez_radial_menu_overlay_1.stickKnobPending : ""
                    }`}
                    style={
                      {
                        "--stick-x": `${stickOffset.x}px`,
                        "--stick-y": `${stickOffset.y}px`,
                      } as React.CSSProperties
                    }
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={__styles_steez_radial_menu_overlay_1.footer}>
            <div className={__styles_steez_radial_menu_overlay_1.footerHint}>Press Esc to close</div>
            {footer ? <div className={__styles_steez_radial_menu_overlay_1.footerContent}>{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadialMenuOverlay;
