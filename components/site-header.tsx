import Link from "next/link"
import { Button } from "@/registry/boston/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-sm border border-[var(--steez-signal,#3dffa8)]/40 bg-[var(--steez-signal,#3dffa8)]/10 font-mono text-[10px] font-bold tracking-tighter text-[var(--steez-signal,#3dffa8)]"
          >
            SZ
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Steezy UI
            <span className="ml-1.5 font-normal text-muted-foreground">Registry</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#components" className="transition-colors hover:text-foreground">
            Components
          </a>
          <a href="#install" className="transition-colors hover:text-foreground">
            Install
          </a>
          <a href="#previews" className="transition-colors hover:text-foreground">
            Previews
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="/r/registry.json" target="_blank" rel="noreferrer">
              registry.json
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-[var(--steez-signal,#3dffa8)] text-black hover:bg-[var(--steez-signal,#3dffa8)]/90"
          >
            <a href="#install">Get started</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
