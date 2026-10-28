/**
 * Shared source with one owning registry item. Components that import one of
 * these depend on its item instead of copying the file.
 *
 * Sources are relative to packages/ui/src. Components install to
 * components/steez; hooks, utils and styles keep their own folder.
 */
const HELPERS = [
  ["choice-label", "components/ChoiceLabel.tsx"],
  ["button-shape-styles", "components/ButtonShape.module.css"],
  ["choice-control-styles", "components/ChoiceControl.module.css"],
  ["filter-frame", "components/FilterFrame.tsx"],
  ["filter-frame-styles", "components/FilterFrame.module.css"],
  ["reduced-motion", "hooks/usePrefersReducedMotion.ts"],
  ["motion-activity", "hooks/useMotionActivity.ts"],
  ["numeric-bounds", "utils/numbers.ts"],
  ["value-tone", "styles/ValueTone.module.css"],
  ["stable-id", "hooks/useStableId.ts"],
  ["field-description", "hooks/useFieldDescription.ts"],
  ["roving-tabs", "hooks/useRovingTabs.ts"],
  ["button-styles", "styles/Buttons.module.css"],
  ["card-frame", "components/CardFrame.tsx"],
  ["card-frame-styles", "components/CardFrame.module.css"],
  ["tab-list", "components/TabList.tsx"],
  ["tab-list-styles", "components/TabList.module.css"],
];

/** @type {ReadonlyArray<{ name: string; source: string; target: string }>} */
export const SHARED_REGISTRY_HELPERS = HELPERS.map(([name, file]) => ({
  name,
  source: `packages/ui/src/${file}`,
  target: `components/${file.replace(/^components\//, "steez/")}`,
}));
