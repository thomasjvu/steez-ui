import { CHARACTER_AFTERIMAGE_PREVIEW_SRC, FILTER_PREVIEW_SRC } from "./preview-assets";
import type { ComponentProps } from "react";
import type * as UI from "@steez-ui/ui";
import type * as Blocks from "@steez-ui/ui/blocks";
type Components = typeof UI & typeof Blocks;
export type PreviewValues = Record<string, string | number | boolean | string[]>;
export type PreviewControl = { prop: string; label: string; choices?: string[]; min?: number; max?: number; multiple?: boolean };
type ExampleName = "Button" | "Input" | "Textarea" | "Select" | "Checkbox" | "RadioGroup" | "Slider" | "LoadingProgressBar" | "HeartbeatPulse" | "StatusMessage" | "StatCard" | "ThemedCard" | "DisplacementFilter" | "GlowFilter" | "GrainFilter" | "ChromaticAberrationFilter" | "BoilingLines" | "BlinkText" | "KineticSwipeText" | "CyberpunkTile" | "QuartzCrystal" | "StrokedText" | "ErrorMessage" | "OverlayButton" | "AccordionFeatureCard" | "CharacterAfterimage" | "PixelTooltip" | "DuotoneFilter" | "PosterizeFilter" | "EmbossFilter" | "IconBackground";
type Example = { [Name in ExampleName]: { name: Name; props: Omit<ComponentProps<Components[Name]>, "children">; children?: string; childButton?: boolean; childImage?: string; controls: PreviewControl[] } }[ExampleName];
const labelControl = { prop: "labelStyle", label: "Label", choices: ["plain", "notch"] };
const widthControl = { prop: "variant", label: "Width", choices: ["default", "long", "full"] };
export const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
const options = [{ value: "fast", label: "Fast" }, { value: "balanced", label: "Balanced" }, { value: "quality", label: "Quality" }];
export const PREVIEW_EXAMPLES: Record<string, Example> = {
  button: { name: "Button", props: { variant: "primary", shape: "default", size: "medium", orientation: "horizontal", cutCorners: ["top-right", "bottom-left"], cutSize: "12px", disabled: false }, children: "Deploy", controls: [
    { prop: "shape", label: "Shape", choices: ["default", "crystal", "cut"] },
    { prop: "variant", label: "Color", choices: ["primary", "secondary", "danger", "cyberpunk3", "cyberpunk6"] },
    { prop: "size", label: "Size", choices: ["small", "medium", "large"] },
    { prop: "orientation", label: "Orientation", choices: ["horizontal", "vertical"] },
    { prop: "cutCorners", label: "Cut corners", choices: corners, multiple: true },
    { prop: "cutSize", label: "Cut depth", choices: ["6px", "12px", "20px"] },
    { prop: "disabled", label: "Disabled" },
  ] },
  input: { name: "Input", props: { label: "Companion name", defaultValue: "rally", labelStyle: "plain", variant: "default" }, controls: [labelControl, widthControl] },
  textarea: { name: "Textarea", props: { label: "System prompt", defaultValue: "You are a polished AI companion with a clear visual voice.", rows: 5, labelStyle: "plain", variant: "default" }, controls: [labelControl, widthControl] },
  select: { name: "Select", props: { label: "Rendering mode", defaultValue: "balanced", options, labelStyle: "plain", variant: "default", iconStack: false }, controls: [labelControl, widthControl, { prop: "iconStack", label: "Icon stack" }] },
  checkbox: { name: "Checkbox", props: { label: "Enable publishing queue", defaultChecked: true, labelStyle: "plain" }, controls: [labelControl] },
  radio: { name: "RadioGroup", props: { label: "Runtime mode", name: "runtime-mode", defaultValue: "hosted", options: [{ value: "hosted", label: "Hosted" }, { value: "self-hosted", label: "Self-hosted" }], labelStyle: "plain" }, controls: [labelControl] },
  slider: { name: "Slider", props: { label: "Volume", defaultValue: 62, labelStyle: "plain", variant: "default" }, controls: [labelControl, { prop: "variant", label: "Thumb", choices: ["default", "diamond"] }] },
  "loading-progress-bar": { name: "LoadingProgressBar", props: { progress: 72, variant: "default" }, controls: [{ prop: "variant", label: "Style", choices: ["default", "hp"] }, { prop: "progress", label: "Progress", min: 0, max: 100 }] },
  "heartbeat-pulse": { name: "HeartbeatPulse", props: { variant: "orb" }, controls: [{ prop: "variant", label: "Style", choices: ["orb", "line"] }] },
  "status-message": { name: "StatusMessage", props: { type: "success", message: "Packages are ready to install." }, controls: [{ prop: "type", label: "Status", choices: ["success", "info", "error"] }] },
  "stat-card": { name: "StatCard", props: { label: "Messages", value: "1,248", color: "default" }, controls: [{ prop: "color", label: "Color", choices: ["default", "success", "warning", "danger"] }] },
  "themed-card": { name: "ThemedCard", props: { variant: "default" }, children: "Your content", controls: [{ prop: "variant", label: "Style", choices: ["default", "featured"] }] },
};
const intensity = { prop: "intensity", label: "Intensity", choices: ["subtle", "default", "intense"] };
for (const [slug, name] of Object.entries({ "displacement-filter": "DisplacementFilter", "glow-filter": "GlowFilter", "grain-filter": "GrainFilter", "chromatic-aberration-filter": "ChromaticAberrationFilter", "duotone-filter": "DuotoneFilter", "posterize-filter": "PosterizeFilter", "emboss-filter": "EmbossFilter" } as const)) {
  PREVIEW_EXAMPLES[slug] = { name, props: { intensity: "default", trigger: slug === "displacement-filter" ? "always" : "static" }, childImage: FILTER_PREVIEW_SRC, controls: [intensity, { prop: "trigger", label: "Trigger", choices: ["static", "always", "hover"] }] };
}
PREVIEW_EXAMPLES["duotone-filter"].controls.push(
  { prop: "shadowColor", label: "Shadows", choices: ["#222244", "#16352c", "#321826"] },
  { prop: "highlightColor", label: "Highlights", choices: ["#ffb87a", "#9aefd1", "#f5a6da"] },
);
Object.assign(PREVIEW_EXAMPLES["duotone-filter"].props, { shadowColor: "#222244", highlightColor: "#ffb87a" });
const extraExamples: Record<string, Example> = {
  "icon-background": { name: "IconBackground", props: { variant: "magnetic", columns: 9, rows: 7, size: 40, gap: 24, color: "#fece00", icon: "square", paused: false }, controls: [
    { prop: "variant", label: "Style", choices: ["static", "magnetic"] },
    { prop: "icon", label: "Icon", choices: ["square", "✦", "→"] },
    { prop: "columns", label: "Columns", min: 1, max: 12 },
    { prop: "rows", label: "Rows", min: 1, max: 9 },
    { prop: "paused", label: "Pause" },
  ] },
  "boiling-lines": { name: "BoilingLines", props: { intensity: "default" }, children: "BOILING", controls: [intensity] },
  "blink-text": { name: "BlinkText", props: { trigger: "mount" }, children: "SYSTEM ONLINE", controls: [{ prop: "trigger", label: "Trigger", choices: ["mount", "hover"] }] },
  "kinetic-swipe-text": { name: "KineticSwipeText", props: { direction: "horizontal" }, children: "SWIPE", controls: [{ prop: "direction", label: "Direction", choices: ["horizontal", "vertical"] }] },
  "cyberpunk-tile": { name: "CyberpunkTile", props: { variant: "default", center: false }, children: "Site runtime", controls: [{ prop: "variant", label: "Style", choices: ["default", "small", "big", "scrollable", "ios"] }, { prop: "center", label: "Center content" }] },
  "character-afterimage": { name: "CharacterAfterimage", props: { src: CHARACTER_AFTERIMAGE_PREVIEW_SRC, alt: "Pixel explorer with holographic afterimages", width: 144, height: 220, entrance: false }, controls: [{ prop: "entrance", label: "Entrance trail" }] },
  "pixel-tooltip": { name: "PixelTooltip", props: { content: "Save configuration", position: "top" }, children: "Hover or focus", childButton: true, controls: [{ prop: "position", label: "Position", choices: ["top", "bottom", "left", "right"] }] },
  "stroked-text": { name: "StrokedText", props: { color: "#ff7a72", animateOnMount: true }, children: "SPELLBINDING", controls: [{ prop: "color", label: "Color", choices: ["#ff7a72", "#8ef0ff", "currentColor"] }, { prop: "animateOnMount", label: "Animate on mount" }] },
  "error-message": { name: "ErrorMessage", props: { variant: "inline", title: "Build failed", message: "Registry generation could not finish." }, controls: [{ prop: "variant", label: "Style", choices: ["inline", "card", "fullScreen"] }] },
  "overlay-button": { name: "OverlayButton", props: { active: false, disabled: false, "aria-label": "Open viewer" }, children: "↗", controls: [{ prop: "active", label: "Active" }, { prop: "disabled", label: "Disabled" }] },
  "accordion-feature-card": { name: "AccordionFeatureCard", props: { title: "Signal mesh", subtitle: "Collapsible feature strip", description: "Expand to reveal the details.", defaultExpanded: true, imageSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%234eae76'/%3E%3C/svg%3E", imageAlt: "" }, children: "Body content", controls: [{ prop: "defaultExpanded", label: "Start expanded" }] },
  "quartz-crystal": { name: "QuartzCrystal", props: { width: 120, height: 240, paused: false, parallax: false, distortion: 0 }, controls: [{ prop: "paused", label: "Pause motion" }, { prop: "parallax", label: "Pointer parallax" }, { prop: "distortion", label: "Distortion", min: 0, max: 100 }] },
};
Object.assign(PREVIEW_EXAMPLES, extraExamples);
export function exampleProps(slug: string, values: PreviewValues): Record<string, unknown> {
  const props: Record<string, unknown> = { ...PREVIEW_EXAMPLES[slug].props, ...values };
  if (slug === "icon-background" && props.icon === "square") delete props.icon;
  if (slug === "button") {
    if (props.shape !== "crystal") delete props.orientation;
    if (props.shape !== "cut") { delete props.cutCorners; delete props.cutSize; }
  }
  if (slug === "select" && props.iconStack) {
    props.options = options.map(option => ({ ...option, icons: [{ id: option.value, label: option.label, icon: option.label.slice(0, 1) }] }));
  }
  return props;
}
export function exampleChildren(slug: string, values: PreviewValues) {
  return slug === "button" && exampleProps(slug, values).orientation === "vertical" ? "+" : PREVIEW_EXAMPLES[slug].children;
}
export function exampleCode(slug: string, values: PreviewValues) {
  const example = PREVIEW_EXAMPLES[slug];
  const props = exampleProps(slug, values);
  const text = exampleChildren(slug, values);
  const children = example.childImage
    ? `<img src=${JSON.stringify(example.childImage)} width={280} height={160} alt="SteezUI logo" style={{ maxWidth: "100%", height: "auto", display: "block" }} />`
    : example.childButton ? `<button type="button">${text}</button>` : text;
  const attributes = Object.entries(props).map(([key, value]) => {
    if (value === false) return "";
    if (value === true) return `  ${key}`;
    return `  ${key}=${typeof value === "string" ? JSON.stringify(value) : `{${JSON.stringify(value, null, 2).replace(/\n/g, "\n  ")}}`}`;
  }).filter(Boolean).join("\n");
  return `import { ${example.name} } from "${example.name === "AccordionFeatureCard" ? "@steez-ui/ui/blocks" : "@steez-ui/ui"}";\n\n<${example.name}\n${attributes}\n${children ? `>\n  ${children}\n</${example.name}>` : "/>"}`;
}
