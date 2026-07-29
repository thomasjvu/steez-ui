import * as React from "react";
import { cn } from "../lib/cn";

export type MediaProps = Omit<React.ComponentProps<"img">, "src"> & {
  src: string;
  /** Prefer fill for absolute cover inside a sized parent. */
  fill?: boolean;
  /** Target display width for remote optimizers (Unsplash/Cloudinary-style). */
  displayWidth?: number;
};

/** Append common CDN size params when safe (Unsplash, etc.). */
export function optimizeImageUrl(
  src: string,
  opts?: { width?: number; quality?: number },
): string {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return src;
  try {
    const u = new URL(src, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    const w = opts?.width ?? 800;
    const q = opts?.quality ?? 75;

    if (u.hostname.includes("images.unsplash.com")) {
      if (!u.searchParams.has("w")) u.searchParams.set("w", String(w));
      if (!u.searchParams.has("q")) u.searchParams.set("q", String(q));
      if (!u.searchParams.has("auto")) u.searchParams.set("auto", "format");
      if (!u.searchParams.has("fit")) u.searchParams.set("fit", "crop");
      return u.toString();
    }

    // Generic query hints some CDNs accept
    if (
      u.hostname.includes("cloudinary.com") ||
      u.hostname.includes("imgix.net")
    ) {
      return src;
    }

    return src;
  } catch {
    return src;
  }
}

/**
 * Optimized image: lazy by default, async decode, CDN width hints.
 */
export function Media({
  src,
  alt = "",
  fill,
  displayWidth = 800,
  className,
  loading = "lazy",
  decoding = "async",
  ...props
}: MediaProps) {
  const optimized = optimizeImageUrl(src, { width: displayWidth });

  return (
    <img
      src={optimized}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn(fill ? "sz-media-fill" : "sz-media", className)}
      {...props}
    />
  );
}
