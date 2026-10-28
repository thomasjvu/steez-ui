import steezLogoSvg from "../../public/brand/steezui-logo.svg?raw";

export const CHARACTER_AFTERIMAGE_PREVIEW_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="144" height="220" viewBox="0 0 144 220"><path fill="#f0c7a4" d="M49 54c0-21 10-34 24-34s24 13 24 34v16H49z"/><path fill="#171923" d="M44 61c-6-30 9-49 29-49s35 19 29 49l-9-13-5-20-16 8-17-6-4 21z"/><path fill="#8ce7dc" d="M47 72h50l15 26-11 16H43L32 98z"/><path fill="#f6f1df" d="M45 77h19v12H45zm31 0h19v12H76z"/><path fill="#171923" d="M64 82h7v5h-7zm31 0h7v5h-7zM66 103h14v4H66z"/><path fill="#f2a6c8" d="m43 111 57 0 20 31-13 58H37l-13-58z"/><path fill="#f6f1df" d="m43 112 29 20 28-20 10 22-25 21H58l-24-21z"/><path fill="#6e62b5" d="M37 197h31v15H31zm39 0h31l7 15H76z"/><path fill="#171923" d="M27 210h45v7H24zm49 0h43v7H76z"/></svg>',
)}`;

/** Embed the canonical logo so copied filter examples stay self-contained. */
const filterLogo = steezLogoSvg
  .replace('<svg ', '<svg x="16" y="48" width="248" height="64" ')
  .replace('fill="currentColor"', 'fill="url(#steez-filter-ink)"');
export const FILTER_PREVIEW_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="160" viewBox="0 0 280 160"><defs><linearGradient id="steez-filter-ink" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff5df"/><stop offset=".55" stop-color="#d7c8ad"/><stop offset="1" stop-color="#8f8270"/></linearGradient></defs><rect width="280" height="160" rx="12" fill="#171717"/>${filterLogo}</svg>`,
)}`;
