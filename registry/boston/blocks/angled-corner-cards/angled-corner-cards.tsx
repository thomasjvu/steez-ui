"use client"

import * as React from "react"
import "./angled-corner-cards.css"

type AngledCardItem = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
}

type AngledCornerCardsProps = {
  items?: AngledCardItem[]
  theme?: "dark" | "sand" | "paper"
  className?: string
}

const defaultItems: AngledCardItem[] = [
  {
    id: "odysseus",
    title: "Odysseus",
    subtitle:
      "Odysseus is the clever, resilient king of Ithaca, renowned for his wit and determination.",
    description:
      "The Odyssey recounts Odysseus's long struggle to return home after the Trojan War, as he survives divine hostility, monsters, and constant hardship through ingenuity and endurance.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Venice_MAN_98_Statue_of_Odysseus_01.jpg/960px-Venice_MAN_98_Statue_of_Odysseus_01.jpg",
    imageAlt: "Statue of Odysseus",
  },
  {
    id: "penelope",
    title: "Penelope",
    subtitle:
      "Penelope is Odysseus's loyal and intelligent wife, admired for her patience and cunning.",
    description:
      "While besieged by suitors, Penelope maintains stability in Ithaca by using careful delays and protecting her household. Her steadfastness balances Odysseus's journey.",
    image: "https://www.pafa.org/sites/default/files/artworkpics/1851_2_l.jpg",
    imageAlt: "Painting of Penelope",
  },
  {
    id: "telemachus",
    title: "Telemachus",
    subtitle:
      "Telemachus is the young son of Odysseus who grows from a passive youth into a capable heir.",
    description:
      "Telemachus's arc marks his transformation into adulthood as he seeks news of his father and develops leadership, eventually helping restore order in Ithaca.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Telemachos_Saarbruecken.jpg/500px-Telemachos_Saarbruecken.jpg",
    imageAlt: "Statue of Telemachus",
  },
]

export function AngledCornerCards({
  items = defaultItems,
  theme = "dark",
  className,
}: AngledCornerCardsProps) {
  const [activeId, setActiveId] = React.useState(items[0]?.id)

  return (
    <section
      className={`steezy-angled-shell ${className ?? ""}`.trim()}
      data-theme={theme}
    >
      <div className="steezy-angled-cards">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <article
              className={`steezy-angled-card ${isActive ? "is-active" : ""}`}
              key={item.id}
            >
              <div className="steezy-border-outer steezy-card-background">
                <div className="steezy-border-inner">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                </div>
              </div>

              <div className="steezy-border-outer steezy-card-content">
                <div className="steezy-border-inner">
                  <div className="steezy-card-content-layout">
                    <h2 className="steezy-vertical-title">{item.title}</h2>
                    <div className="steezy-card-copy">
                      <h2>{item.title}</h2>
                      <h3>{item.subtitle}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="steezy-toggle"
                    aria-expanded={isActive}
                    aria-label={`Toggle ${item.title}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
