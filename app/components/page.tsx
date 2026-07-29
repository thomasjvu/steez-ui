import { DocsSiteLayout } from "@/components/docs/site-layout";
import { ComponentsCatalog } from "@/components/docs/components-catalog";

export default function ComponentsPage() {
  return (
    <DocsSiteLayout
      currentNav="components"
      title="Components"
      description="Browse the catalog, then open a single primitive for preview and install."
    >
      <ComponentsCatalog />
    </DocsSiteLayout>
  );
}
