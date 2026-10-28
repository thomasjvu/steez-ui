import { createElement, type ComponentType } from "react";
import {
  Button, Input, Textarea, Select, Checkbox, RadioGroup, Slider,
  LoadingProgressBar, HeartbeatPulse, StatusMessage, StatCard, ThemedCard,
  DisplacementFilter, GlowFilter, GrainFilter, ChromaticAberrationFilter,
  BoilingLines, BlinkText, KineticSwipeText, CyberpunkTile, QuartzCrystal,
  StrokedText, ErrorMessage, OverlayButton, CharacterAfterimage, PixelTooltip,
  DuotoneFilter, PosterizeFilter, EmbossFilter, IconBackground,
} from "@steez-ui/ui";
import { AccordionFeatureCard } from "@steez-ui/ui/blocks";
import { exampleChildren, exampleProps, PREVIEW_EXAMPLES, type PreviewValues } from "../preview-config";

const components = {
  Button, Input, Textarea, Select, Checkbox, RadioGroup, Slider,
  LoadingProgressBar, HeartbeatPulse, StatusMessage, StatCard, ThemedCard,
  DisplacementFilter, GlowFilter, GrainFilter, ChromaticAberrationFilter,
  BoilingLines, BlinkText, KineticSwipeText, CyberpunkTile, QuartzCrystal,
  StrokedText, ErrorMessage, OverlayButton, CharacterAfterimage, PixelTooltip,
  DuotoneFilter, PosterizeFilter, EmbossFilter, IconBackground, AccordionFeatureCard,
};

export default function ConfiguredPreview({ slug, values }: { slug: string; values: PreviewValues }) {
  const example = PREVIEW_EXAMPLES[slug];
  const component = components[example.name] as ComponentType<Record<string, unknown>>;
  const text = exampleChildren(slug, values);
  const children = example.childImage
    ? createElement("img", { src: example.childImage, width: 280, height: 160, alt: "SteezUI logo", style: { maxWidth: "100%", height: "auto", display: "block" } })
    : example.childButton ? createElement("button", { type: "button" }, text) : text;
  return createElement(component, { key: JSON.stringify(values), ...exampleProps(slug, values) }, children);
}
