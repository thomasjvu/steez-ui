/** @typedef {"actions"|"forms"|"surfaces"|"layout"|"feedback"|"filters"} ComponentCategory */
/**
 * Canonical metadata for every public @steez-ui/ui registry component.
 *
 * @typedef {{
 *   slug: string;
 *   title: string;
 *   description: string;
 *   category: ComponentCategory;
 *   packageEntrypoint: string;
 *   packageExports: string[];
 *   registryFiles: Array<{source: string; target: string; type: string}>;
 *   dependencies: string[];
 *   registryDependencies: string[];
 *   previewLoader?: string;
 * }} ComponentManifestEntry
 */

/** @type {readonly ComponentManifestEntry[]} */
export const COMPONENT_MANIFEST = [
  {
    "slug": "quartz-crystal",
    "title": "Quartz Crystal",
    "description": "Decorative nine-facet crystal with slow floating motion, rotating faces, optional bounded pointer parallax, and reduced-motion support.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "QuartzCrystal"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/QuartzCrystal.tsx",
        "target": "components/steez/QuartzCrystal.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/QuartzCrystal.module.css",
        "target": "components/steez/QuartzCrystal.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "quartz-crystal"
  },
  {
    "slug": "ascii-ripple-text",
    "title": "ASCII Ripple Text",
    "description": "Hover-driven ASCII glitch ripple for editorial text links and mono-heavy navigation moments.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "AsciiRippleText"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/AsciiRippleText.tsx",
        "target": "components/steez/AsciiRippleText.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/AsciiRippleText.module.css",
        "target": "components/steez/AsciiRippleText.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "ascii-ripple-text"
  },
  {
    "slug": "avatar-stage",
    "title": "Avatar Stage",
    "description": "Stable avatar viewport shell with backdrop and bottom divider support.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "AvatarStage"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/AvatarStage.tsx",
        "target": "components/steez/AvatarStage.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/AvatarStage.module.css",
        "target": "components/steez/AvatarStage.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "avatar-stage"
  },
  {
    "slug": "blink-text",
    "title": "Blink Text",
    "description": "Hover and mount-triggered blink text treatment for small attention cues.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "BlinkText"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/BlinkText.tsx",
        "target": "components/steez/BlinkText.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/BlinkText.module.css",
        "target": "components/steez/BlinkText.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "blink-text"
  },
  {
    "slug": "button",
    "title": "Button",
    "description": "Native button or link with shared variants and an optional crystal shape.",
    "category": "actions",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Button"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Button.tsx",
        "target": "components/steez/Button.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/styles/Buttons.module.css",
        "target": "components/styles/Buttons.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "button"
  },
  {
    "slug": "character-afterimage",
    "title": "Character Afterimage",
    "description": "Character artwork with cycling holographic silhouettes and an optional entrance trail.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CharacterAfterimage"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CharacterAfterimage.tsx",
        "target": "components/steez/CharacterAfterimage.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CharacterAfterimage.module.css",
        "target": "components/steez/CharacterAfterimage.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "character-afterimage"
  },
  {
    "slug": "copy-button",
    "title": "Copy Button",
    "description": "Clipboard button with built-in success feedback.",
    "category": "actions",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CopyButton"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CopyButton.tsx",
        "target": "components/steez/CopyButton.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CopyButton.module.css",
        "target": "components/steez/CopyButton.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "copy-button"
  },
  {
    "slug": "input",
    "title": "Input",
    "description": "Monospace input with shared Steez form framing.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Input"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Input.tsx",
        "target": "components/steez/Input.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Input.module.css",
        "target": "components/steez/Input.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "field-frame"
    ],
    "previewLoader": "input"
  },
  {
    "slug": "select",
    "title": "Select",
    "description": "Native browser selection with optional cut label, icon stack, helper text, and validation.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Select"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Select.tsx",
        "target": "components/steez/Select.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Select.module.css",
        "target": "components/steez/Select.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "field-frame"
    ],
    "previewLoader": "select"
  },
  {
    "slug": "textarea",
    "title": "Textarea",
    "description": "Native multiline input with a plain or notched label.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Textarea"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Textarea.tsx",
        "target": "components/steez/Textarea.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Textarea.module.css",
        "target": "components/steez/Textarea.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "field-frame"
    ],
    "previewLoader": "textarea"
  },
  {
    "slug": "checkbox",
    "title": "Checkbox",
    "description": "Checkbox primitive for Steez forms.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Checkbox"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Checkbox.tsx",
        "target": "components/steez/Checkbox.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "checkbox"
  },
  {
    "slug": "radio",
    "title": "Radio",
    "description": "Radio and radio group primitives.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "RadioGroup"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Radio.tsx",
        "target": "components/steez/Radio.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Radio.module.css",
        "target": "components/steez/Radio.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "radio"
  },
  {
    "slug": "slider",
    "title": "Slider",
    "description": "Native range input with progress and value display. The diamond variant has a slim track and a solid square thumb that rotates while held; both variants retain native keyboard controls.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Slider"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Slider.tsx",
        "target": "components/steez/Slider.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Slider.module.css",
        "target": "components/steez/Slider.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "slider"
  },
  {
    "slug": "themed-card",
    "title": "Themed Card",
    "description": "Default Steez card surface.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "ThemedCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/ThemedCard.tsx",
        "target": "components/steez/ThemedCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/ThemedCard.module.css",
        "target": "components/steez/ThemedCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "themed-card"
  },
  {
    "slug": "cyberpunk-tile",
    "title": "Cyberpunk Tile",
    "description": "Angular tile surface for dashboards, docs, and launch pages.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkTile"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkTile.tsx",
        "target": "components/steez/CyberpunkTile.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkTile.module.css",
        "target": "components/steez/CyberpunkTile.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "cyberpunk-tile"
  },
  {
    "slug": "fui-button-tile",
    "title": "FUI Button Tile",
    "description": "Square HUD tile button with icon, label, and corner chevron for launcher grids and tool pickers.",
    "category": "actions",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "FUIButtonTile"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/FUIButtonTile.tsx",
        "target": "components/steez/FUIButtonTile.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/FUIButtonTile.module.css",
        "target": "components/steez/FUIButtonTile.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "fui-button-tile"
  },
  {
    "slug": "accordion-feature-card",
    "title": "Accordion Feature Card",
    "description": "Expandable feature card with media panel, vertical title, and collapsible body.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "AccordionFeatureCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/AccordionFeatureCard.tsx",
        "target": "components/steez/AccordionFeatureCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/AccordionFeatureCard.module.css",
        "target": "components/steez/AccordionFeatureCard.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "accordion-feature-card"
  },
  {
    "slug": "corner-bracket-card",
    "title": "Corner Bracket Card",
    "description": "Bracketed featured surface with accent corners.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CornerBracketCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CornerBracketCard.tsx",
        "target": "components/steez/CornerBracketCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CornerBracketCard.module.css",
        "target": "components/steez/CornerBracketCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "corner-bracket-card"
  },
  {
    "slug": "dotted-halo-card",
    "title": "Dotted Halo Card",
    "description": "Flat content card with a dotted field extending beyond the main border.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "DottedHaloCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/DottedHaloCard.tsx",
        "target": "components/steez/DottedHaloCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/DottedHaloCard.module.css",
        "target": "components/steez/DottedHaloCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "dotted-halo-card"
  },
  {
    "slug": "segmented-control",
    "title": "Segmented Control",
    "description": "Shared segmented control for compact workspace switching.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "SegmentedControl"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/SegmentedControl.tsx",
        "target": "components/steez/SegmentedControl.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/SegmentedControl.module.css",
        "target": "components/steez/SegmentedControl.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "segmented-control"
  },
  {
    "slug": "tabbed-panel",
    "title": "Tabbed Panel",
    "description": "Simple tabbed panel for registry consumers.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "TabbedPanel"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/TabbedPanel.tsx",
        "target": "components/steez/TabbedPanel.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/TabbedPanel.module.css",
        "target": "components/steez/TabbedPanel.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "tabbed-panel"
  },
  {
    "slug": "page-header",
    "title": "Page Header",
    "description": "Neutral page header with optional icon, brand, and controls.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "PageHeader"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/PageHeader.tsx",
        "target": "components/steez/PageHeader.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/PageHeader.module.css",
        "target": "components/steez/PageHeader.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "page-header"
  },
  {
    "slug": "page-template",
    "title": "Page Template",
    "description": "Layout wrapper that composes the Steez page header and subtabs.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "PageTemplate"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/PageTemplate.tsx",
        "target": "components/steez/PageTemplate.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/PageTemplate.module.css",
        "target": "components/steez/PageTemplate.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "page-header"
    ],
    "previewLoader": "page-template"
  },
  {
    "slug": "notched-viewport-frame",
    "title": "Notched Viewport Frame",
    "description": "Unified notched outline shell for viewport framing and overlay chrome.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "NotchedViewportFrame"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/NotchedViewportFrame.tsx",
        "target": "components/steez/NotchedViewportFrame.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/NotchedViewportFrame.module.css",
        "target": "components/steez/NotchedViewportFrame.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "notched-viewport-frame"
  },
  {
    "slug": "radial-menu-overlay",
    "title": "Radial Menu Overlay",
    "description": "Full-screen radial navigation surface built around the notched viewport shell.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "RadialMenuOverlay"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/RadialMenuOverlay.tsx",
        "target": "components/steez/RadialMenuOverlay.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/RadialMenuOverlay.module.css",
        "target": "components/steez/RadialMenuOverlay.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "notched-viewport-frame"
    ],
    "previewLoader": "radial-menu-overlay"
  },
  {
    "slug": "theme-toggle",
    "title": "Theme Toggle",
    "description": "Shared dark and light theme toggle.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "ThemeToggle"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/ThemeToggle.tsx",
        "target": "components/steez/ThemeToggle.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/ThemeToggle.module.css",
        "target": "components/steez/ThemeToggle.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "theme-toggle"
  },
  {
    "slug": "loading-screen",
    "title": "Loading Screen",
    "description": "Fullscreen or contained loading shell with progress, cross field, and neutral branding hooks.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "LoadingScreen",
      "useLoadingProgress"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/LoadingScreen.tsx",
        "target": "components/steez/LoadingScreen.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/LoadingScreen.module.css",
        "target": "components/steez/LoadingScreen.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "loading-screen"
  },
  {
    "slug": "loading-overlay-crystalline",
    "title": "Loading Overlay Crystalline",
    "description": "Compact centered loading overlay for viewer and media surfaces.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "LoadingOverlayCrystalline"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/LoadingOverlayCrystalline.tsx",
        "target": "components/steez/LoadingOverlayCrystalline.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/LoadingOverlayCrystalline.module.css",
        "target": "components/steez/LoadingOverlayCrystalline.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "loading-overlay-crystalline"
  },
  {
    "slug": "loading-progress-bar",
    "title": "Loading Progress Bar",
    "description": "Progress bar with segmented loading bars.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "LoadingProgressBar"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/LoadingProgressBar.tsx",
        "target": "components/steez/LoadingProgressBar.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/LoadingProgressBar.module.css",
        "target": "components/steez/LoadingProgressBar.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "loading-progress-bar"
  },
  {
    "slug": "heartbeat-pulse",
    "title": "Heartbeat Pulse",
    "description": "Orb and line heartbeat indicators for recurring runtime activity.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "HeartbeatPulse"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/HeartbeatPulse.tsx",
        "target": "components/steez/HeartbeatPulse.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/HeartbeatPulse.module.css",
        "target": "components/steez/HeartbeatPulse.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "heartbeat-pulse"
  },
  {
    "slug": "hexagon-grid",
    "title": "Hexagon Grid",
    "description": "Animated hex field backdrop for avatars, hero surfaces, and ambient panels.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui/hexagon-grid",
    "packageExports": [
      "HexagonGrid"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/HexagonGrid.tsx",
        "target": "components/steez/HexagonGrid.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/HexagonGrid.module.css",
        "target": "components/steez/HexagonGrid.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "hexagon-grid"
  },
  {
    "slug": "overlay-button",
    "title": "Overlay Button",
    "description": "Compact floating control button for viewer and media overlays.",
    "category": "actions",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "OverlayButton"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/OverlayButton.tsx",
        "target": "components/steez/OverlayButton.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/OverlayButton.module.css",
        "target": "components/steez/OverlayButton.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "overlay-button"
  },
  {
    "slug": "pixel-tooltip",
    "title": "Pixel Tooltip",
    "description": "Compact hover tooltip for terse control hints.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "PixelTooltip"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/PixelTooltip.tsx",
        "target": "components/steez/PixelTooltip.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/PixelTooltip.module.css",
        "target": "components/steez/PixelTooltip.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/hooks/useStableId.ts",
        "target": "components/hooks/useStableId.ts",
        "type": "registry:file"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "pixel-tooltip"
  },
  {
    "slug": "quick-info-card",
    "title": "Quick Info Card",
    "description": "Compact multi-stat summary surface with an optional storage meter.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "QuickInfoCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/QuickInfoCard.tsx",
        "target": "components/steez/QuickInfoCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/QuickInfoCard.module.css",
        "target": "components/steez/QuickInfoCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "quick-info-card"
  },
  {
    "slug": "widget-card",
    "title": "Widget Card",
    "description": "Dashboard widget shell with size presets and optional overlay content.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "WidgetCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/WidgetCard.tsx",
        "target": "components/steez/WidgetCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/WidgetCard.module.css",
        "target": "components/steez/WidgetCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "widget-card"
  },
  {
    "slug": "marquee-strip",
    "title": "Marquee Strip",
    "description": "Continuous horizontal marquee track for providers, skills, and launch lanes.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "MarqueeStrip"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/MarqueeStrip.tsx",
        "target": "components/steez/MarqueeStrip.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/MarqueeStrip.module.css",
        "target": "components/steez/MarqueeStrip.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "marquee-strip"
  },
  {
    "slug": "section",
    "title": "Section",
    "description": "Simple content section with optional monospace title treatment.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "Section"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/Section.tsx",
        "target": "components/steez/Section.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/Section.module.css",
        "target": "components/steez/Section.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "section"
  },
  {
    "slug": "section-header",
    "title": "Section Header",
    "description": "Framed header row for settings and control panels with optional actions.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "SectionHeader"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/SectionHeader.tsx",
        "target": "components/steez/SectionHeader.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/SectionHeader.module.css",
        "target": "components/steez/SectionHeader.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "section-header"
  },
  {
    "slug": "stat-card",
    "title": "Stat Card",
    "description": "Compact metric surface with optional tone and subvalue.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "StatCard"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/StatCard.tsx",
        "target": "components/steez/StatCard.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/StatCard.module.css",
        "target": "components/steez/StatCard.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "stat-card"
  },
  {
    "slug": "status-message",
    "title": "Status Message",
    "description": "Success, error, and info toast primitive.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "StatusMessage"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/StatusMessage.tsx",
        "target": "components/steez/StatusMessage.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/StatusMessage.module.css",
        "target": "components/steez/StatusMessage.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "status-message"
  },
  {
    "slug": "stroked-text",
    "title": "Stroked Text",
    "description": "Outlined accent text with an optional mount-time stroke-to-fill blink.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "StrokedText"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/StrokedText.tsx",
        "target": "components/steez/StrokedText.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/StrokedText.module.css",
        "target": "components/steez/StrokedText.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme"
    ],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "stroked-text"
  },
  {
    "slug": "runtime-orbit-diagram",
    "title": "Runtime Orbit Diagram",
    "description": "Animated workspace topology diagram with icon nodes and moving path marker.",
    "category": "layout",
    "packageEntrypoint": "@steez-ui/ui/blocks",
    "packageExports": [
      "RuntimeOrbitDiagram"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/RuntimeOrbitDiagram.tsx",
        "target": "components/steez/RuntimeOrbitDiagram.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/RuntimeOrbitDiagram.module.css",
        "target": "components/steez/RuntimeOrbitDiagram.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider"
    ],
    "previewLoader": "runtime-orbit-diagram"
  },
  {
    "slug": "error-message",
    "title": "Error Message",
    "description": "Inline, card, and fullscreen error message surface.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "ErrorMessage"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/ErrorMessage.tsx",
        "target": "components/steez/ErrorMessage.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/ErrorMessage.module.css",
        "target": "components/steez/ErrorMessage.module.css",
        "type": "registry:style"
      },
      {
        "source": "packages/ui/src/styles/Buttons.module.css",
        "target": "components/styles/Buttons.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [
      "@steez-ui/theme",
      "@steez-ui/icons"
    ],
    "registryDependencies": [
      "theme-tokens",
      "icon-provider",
      "button"
    ],
    "previewLoader": "error-message"
  },
  {
    "slug": "boiling-lines",
    "title": "Boiling Lines",
    "description": "Hand-drawn line motion with subtle, default, and intense presets.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "BoilingLines"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/BoilingLines.tsx",
        "target": "components/steez/BoilingLines.tsx",
        "type": "registry:file"
      },
      {
        "source": "packages/ui/src/components/BoilingLines.module.css",
        "target": "components/steez/BoilingLines.module.css",
        "type": "registry:file"
      }
    ],
    "dependencies": [],
    "registryDependencies": [
      "theme-tokens"
    ],
    "previewLoader": "boiling-lines"
  },
  {
    "slug": "kinetic-swipe-text",
    "title": "Kinetic Swipe Text",
    "description": "Heavy display type that snaps through a looping horizontal or vertical split.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticSwipeText"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticSwipeText.tsx",
        "target": "components/steez/KineticSwipeText.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticSwipeText.module.css",
        "target": "components/steez/KineticSwipeText.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "kinetic-swipe-text"
  },
  {
    "slug": "displacement-filter",
    "title": "Displacement Filter",
    "description": "Reusable SVG turbulence displacement for text, icons, and component content.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "DisplacementFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/DisplacementFilter.tsx",
        "target": "components/steez/DisplacementFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "displacement-filter"
  },
  {
    "slug": "kinetic-glyph",
    "title": "Kinetic Glyph",
    "description": "Nested contour animation for a letter, number, or icon with a soft displacement ripple.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticGlyph"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticGlyph.tsx",
        "target": "components/steez/KineticGlyph.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticGlyph.module.css",
        "target": "components/steez/KineticGlyph.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [
      "displacement-filter"
    ],
    "previewLoader": "kinetic-glyph"
  },
  {
    "slug": "kinetic-text-ramp",
    "title": "Kinetic Text Ramp",
    "description": "Oversized repeated type moves across a receding perspective plane with a hard extruded edge.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticTextRamp"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticTextRamp.tsx",
        "target": "components/steez/KineticTextRamp.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticTextRamp.module.css",
        "target": "components/steez/KineticTextRamp.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "kinetic-text-ramp"
  },
  {
    "slug": "kinetic-text-ring",
    "title": "Kinetic Text Ring",
    "description": "Repeated display type follows a rotating elliptical path using SVG and CSS.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticTextRing"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticTextRing.tsx",
        "target": "components/steez/KineticTextRing.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticTextRing.module.css",
        "target": "components/steez/KineticTextRing.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "kinetic-text-ring"
  },
  {
    "slug": "kinetic-text-globe",
    "title": "Kinetic Text Globe",
    "description": "Bold display type wraps around a rotating, high contrast sphere.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticTextGlobe"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticTextGlobe.tsx",
        "target": "components/steez/KineticTextGlobe.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticTextGlobe.module.css",
        "target": "components/steez/KineticTextGlobe.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "kinetic-text-globe"
  },
  {
    "slug": "kinetic-text-volume",
    "title": "Kinetic Text Volume",
    "description": "Repeated type ripples across the three faces of a perspective text volume.",
    "category": "feedback",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "KineticTextVolume"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/KineticTextVolume.tsx",
        "target": "components/steez/KineticTextVolume.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/KineticTextVolume.module.css",
        "target": "components/steez/KineticTextVolume.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "kinetic-text-volume"
  },
  {
    "slug": "chromatic-aberration-filter",
    "title": "Chromatic Aberration Filter",
    "description": "Separate red and cyan channels around text, icons, images, or interactive content.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "ChromaticAberrationFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/ChromaticAberrationFilter.tsx",
        "target": "components/steez/ChromaticAberrationFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "chromatic-aberration-filter"
  },
  {
    "slug": "glow-filter",
    "title": "Glow Filter",
    "description": "Alpha-derived colored halo with a crisp content layer.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "GlowFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/GlowFilter.tsx",
        "target": "components/steez/GlowFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "glow-filter"
  },
  {
    "slug": "grain-filter",
    "title": "Grain Filter",
    "description": "Monochrome film grain clipped to the content alpha, with optional animated seeds.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "GrainFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/GrainFilter.tsx",
        "target": "components/steez/GrainFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "grain-filter"
  },
  {
    "slug": "duotone-filter",
    "title": "Duotone Filter",
    "description": "Map luminance to a two-color palette while preserving transparency.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "DuotoneFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/DuotoneFilter.tsx",
        "target": "components/steez/DuotoneFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "duotone-filter"
  },
  {
    "slug": "posterize-filter",
    "title": "Posterize Filter",
    "description": "Reduce continuous colors to distinct stepped bands.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "PosterizeFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/PosterizeFilter.tsx",
        "target": "components/steez/PosterizeFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "posterize-filter"
  },
  {
    "slug": "emboss-filter",
    "title": "Emboss Filter",
    "description": "Raise diagonal edges into a textured relief while preserving transparency.",
    "category": "filters",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "EmbossFilter"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/EmbossFilter.tsx",
        "target": "components/steez/EmbossFilter.tsx",
        "type": "registry:component"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "emboss-filter"
  },
  {
    "slug": "icon-background",
    "title": "Icon Background",
    "description": "A decorative icon grid with optional pointer-facing magnetic rotation.",
    "category": "surfaces",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "IconBackground"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/IconBackground.tsx",
        "target": "components/steez/IconBackground.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/IconBackground.module.css",
        "target": "components/steez/IconBackground.module.css",
        "type": "registry:style"
      }
    ],
    "dependencies": [],
    "registryDependencies": [],
    "previewLoader": "icon-background"
  }
];
