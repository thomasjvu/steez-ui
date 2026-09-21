"use client";

import {
  CheckIcon,
  EyeIcon,
  InfoIcon,
  RefreshIcon,
  SlidersIcon,
} from "@steez-ui/icons";
import { RuntimeOrbitDiagram } from "@steez-ui/ui/blocks";

import styles from "../component-docs.module.css";

export default function RuntimeOrbitDiagramPreview() {
  return (
    <div className={styles.orbitPreviewShell}>
      <RuntimeOrbitDiagram
        durationSeconds={5.2}
        nodes={[
          { id: "character", label: "Character", icon: EyeIcon, x: 50, y: 10 },
          { id: "site", label: "Site", icon: InfoIcon, x: 84, y: 38 },
          { id: "business", label: "Business", icon: CheckIcon, x: 70, y: 82 },
          { id: "automations", label: "Automations", icon: RefreshIcon, x: 30, y: 82 },
          { id: "operations", label: "Operations", icon: SlidersIcon, x: 16, y: 38 },
        ]}
        pathOrder={["character", "site", "business", "automations", "operations"]}
      />
    </div>
  );
}
