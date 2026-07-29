"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/boston/ui/button"

export function CopyCommand({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore clipboard failures
    }
  }

  return (
    <div
      className={cn(
        "group flex items-stretch gap-0 overflow-hidden rounded-sm border border-border bg-card/80 font-mono text-xs sm:text-sm",
        className
      )}
    >
      <code className="flex-1 overflow-x-auto px-3 py-2.5 text-muted-foreground whitespace-nowrap">
        <span className="text-[var(--steez-signal,#3dffa8)] select-none">$ </span>
        {command}
      </code>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onCopy}
        className="h-auto shrink-0 rounded-none border-l border-border px-3 text-muted-foreground hover:bg-accent hover:text-foreground"
        aria-label={copied ? "Copied" : "Copy command"}
      >
        {copied ? <Check className="size-4 text-[var(--steez-signal,#3dffa8)]" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}
