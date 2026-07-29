import { Marquee } from "../components/marquee";
import { cn } from "../lib/cn";

/** Full-width hype ticker for drops / launches. */
export function HypeStrip({
  items = ["DROP", "BUILD", "SHIP", "OWN THE RAILS"],
  className,
}: {
  items?: string[];
  className?: string;
}) {
  const text = items.map((i) => `${i}  ◆  `).join("");
  return (
    <div className={cn(className)}>
      <Marquee text={text} speedSeconds={20} />
    </div>
  );
}
