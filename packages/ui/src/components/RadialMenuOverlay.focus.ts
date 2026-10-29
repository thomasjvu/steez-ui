import React from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
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

/** Wraps Tab and Shift+Tab inside `root`; returns the element to focus, if any. */
function wrapTabFocus(root: HTMLElement, shiftKey: boolean): HTMLElement | null | undefined {
  const focusable = getFocusableElements(root);
  if (focusable.length === 0) return null;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  const outside = !active || !root.contains(active);

  if (shiftKey) return active === first || outside ? last : undefined;
  return active === last || outside ? first : undefined;
}

interface ModalOverlayOptions {
  open: boolean;
  /** Contained overlays live inside a preview: no focus trap or restore. */
  contained: boolean;
  overlayRef: React.RefObject<HTMLElement | null>;
  initialFocusRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}

/**
 * While open: locks body scroll, closes on Escape and, unless contained,
 * moves focus in, traps Tab, and restores focus on close.
 */
export function useModalOverlay({
  open,
  contained,
  overlayRef,
  initialFocusRef,
  onClose,
}: ModalOverlayOptions) {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (!open || typeof window === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const trapFocus = !contained;
    const previousFocus =
      trapFocus && document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (trapFocus) {
      const focusTarget =
        initialFocusRef.current ??
        (overlayRef.current ? getFocusableElements(overlayRef.current)[0] : undefined);
      focusTarget?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      const root = overlayRef.current;
      if (!trapFocus || event.key !== "Tab" || !root) return;

      const target = wrapTabFocus(root, event.shiftKey);
      if (target === undefined) return;
      event.preventDefault();
      target?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [contained, initialFocusRef, open, overlayRef]);
}
