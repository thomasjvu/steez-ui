import type { Metadata } from "next";
import { DocsSiteLayout } from "@/components/docs/site-layout";
import { ComponentDetail } from "@/components/docs/component-detail";
import {
  COMPONENT_DOCS,
  getComponentDoc,
} from "@/lib/docs/component-catalog";

export function generateStaticParams() {
  return COMPONENT_DOCS.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);
  if (!component) {
    return { title: "Component not found — Steez UI" };
  }
  return {
    title: `${component.title} — Steez UI`,
    description: component.summary,
  };
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  return (
    <DocsSiteLayout
      currentNav="components"
      title={component?.title ?? "Component not found"}
      description={component?.summary}
    >
      <ComponentDetail slug={slug} />
    </DocsSiteLayout>
  );
}
