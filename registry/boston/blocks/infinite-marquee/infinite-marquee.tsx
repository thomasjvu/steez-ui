import "./infinite-marquee.css"

type InfiniteMarqueeProps = {
  text?: string
  speedSeconds?: number
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteMarquee({
  text = "COOL TEXT ☻ COOL TEXT ☻ COOL TEXT ☻ COOL TEXT ☻",
  speedSeconds = 10,
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const contentClassName = pauseOnHover
    ? "steezy-marquee-track is-pausable"
    : "steezy-marquee-track"

  return (
    <div className={`steezy-marquee ${className ?? ""}`.trim()}>
      <div
        className={contentClassName}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        <span>
          <div>{text}&nbsp;</div>
        </span>
        <span>
          <div>{text}&nbsp;</div>
        </span>
      </div>
    </div>
  )
}
