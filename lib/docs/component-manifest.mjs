/** @typedef {"actions"|"forms"|"surfaces"|"layout"|"feedback"} ComponentCategory */
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
    "description": "Core button primitive with standard and cyberpunk-styled variants.",
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
    "slug": "cyberpunk-input",
    "title": "Cyberpunk Input",
    "description": "Monospace input with shared Steez form framing.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkInput"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkInput.tsx",
        "target": "components/steez/CyberpunkInput.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkInput.module.css",
        "target": "components/steez/CyberpunkInput.module.css",
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
      "icon-provider"
    ],
    "previewLoader": "cyberpunk-input"
  },
  {
    "slug": "cyberpunk-select",
    "title": "Cyberpunk Select",
    "description": "Select primitive with the shared Steez framing and arrow treatment.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkSelect"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkSelect.tsx",
        "target": "components/steez/CyberpunkSelect.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkSelect.module.css",
        "target": "components/steez/CyberpunkSelect.module.css",
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
      "icon-provider"
    ],
    "previewLoader": "cyberpunk-select"
  },
  {
    "slug": "cyberpunk-textarea",
    "title": "Cyberpunk Textarea",
    "description": "Textarea primitive with the shared Steez form framing.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkTextarea"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkTextarea.tsx",
        "target": "components/steez/CyberpunkTextarea.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkTextarea.module.css",
        "target": "components/steez/CyberpunkTextarea.module.css",
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
      "icon-provider"
    ],
    "previewLoader": "cyberpunk-textarea"
  },
  {
    "slug": "cyberpunk-checkbox",
    "title": "Cyberpunk Checkbox",
    "description": "Checkbox primitive for Steez forms.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkCheckbox"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkCheckbox.tsx",
        "target": "components/steez/CyberpunkCheckbox.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkCheckbox.module.css",
        "target": "components/steez/CyberpunkCheckbox.module.css",
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
    "previewLoader": "cyberpunk-checkbox"
  },
  {
    "slug": "cyberpunk-radio",
    "title": "Cyberpunk Radio",
    "description": "Radio and radio group primitives.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkRadioGroup"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkRadio.tsx",
        "target": "components/steez/CyberpunkRadio.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkRadio.module.css",
        "target": "components/steez/CyberpunkRadio.module.css",
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
    "previewLoader": "cyberpunk-radio"
  },
  {
    "slug": "cyberpunk-slider",
    "title": "Cyberpunk Slider",
    "description": "Slider primitive with Steez progress styling.",
    "category": "forms",
    "packageEntrypoint": "@steez-ui/ui",
    "packageExports": [
      "CyberpunkSlider"
    ],
    "registryFiles": [
      {
        "source": "packages/ui/src/components/CyberpunkSlider.tsx",
        "target": "components/steez/CyberpunkSlider.tsx",
        "type": "registry:component"
      },
      {
        "source": "packages/ui/src/components/CyberpunkSlider.module.css",
        "target": "components/steez/CyberpunkSlider.module.css",
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
    "previewLoader": "cyberpunk-slider"
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
      "CyberpunkTile",
      "CyberTile"
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
  }
];
