import { getComponentDoc } from "../lib/docs/component-catalog";

export function pageMetadata(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const component = path.startsWith("/components/")
    ? getComponentDoc(path.slice(12))
    : undefined;
  if (component)
    return {
      title: `${component.title} — Steez UI`,
      description: component.summary,
    };
  const pages: Record<string, { title: string; description: string }> = {
    "/": {
      title: "Steez UI — React components",
      description:
        "React components, design tokens, and icons. Preview components and install the package, registry source, or standalone file.",
    },
    "/components": {
      title: "Components — Steez UI",
      description:
        "Browse React components by category, with live previews and usage examples.",
    },
    "/docs": {
      title: "Getting started — Steez UI",
      description:
        "Install Steez UI packages, registry source, or standalone React components.",
    },
    "/packages": {
      title: "Packages — Steez UI",
      description:
        "The canonical Steez UI theme, icons, and React component packages.",
    },
    "/registry": {
      title: "Registry — Steez UI",
      description:
        "Install React component source with shadcn or download standalone files.",
    },
  };
  return (
    pages[path] ?? {
      title: "Page not found — Steez UI",
      description:
        "This page could not be found. Browse the Steez UI component library.",
    }
  );
}
