import type { ReactNode } from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { CopyCommand } from "@/components/copy-command"
import { categoryLabels, installCommand, type RegistryItem } from "@/lib/registry-items"
import { cn } from "@/lib/utils"

export function PreviewFrame({
  item,
  baseUrl,
  children,
  className,
  stageClassName,
}: {
  item: RegistryItem
  baseUrl: string
  children: ReactNode
  className?: string
  stageClassName?: string
}) {
  return (
    <section
      id={item.name}
      className={cn(
        "scroll-mt-20 flex flex-col gap-4 rounded-sm border border-border bg-card/40 p-4 sm:p-5",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <span className="rounded-sm border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {categoryLabels[item.category]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">{item.description}</p>
        </div>
        <OpenInV0Button name={item.name} className="w-fit shrink-0" />
      </div>

      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-sm border border-border/80 bg-background/60",
          item.compact ? "min-h-[140px] py-6" : "min-h-[400px] p-4 sm:p-6",
          stageClassName
        )}
      >
        {children}
      </div>

      <CopyCommand command={installCommand(item.name, baseUrl)} />
    </section>
  )
}
