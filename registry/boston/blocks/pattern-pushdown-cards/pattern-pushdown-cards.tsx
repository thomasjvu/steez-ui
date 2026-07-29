import "./pattern-pushdown-cards.css"

const skills = [
  "ES6+",
  "C#",
  "Ruby on Rails",
  "Java",
  "CSS",
  "HTML",
  "PHP",
  "Some more...",
]

const social = [
  { label: "CodePen", href: "https://codepen.io/niklasnoldin" },
  { label: "Twitter", href: "https://twitter.com/niklasnold_in" },
  { label: "Behance", href: "https://behance.net/niklasnoldin" },
  { label: "GitHub", href: "https://github.com/niklasnoldin" },
  { label: "LinkedIn", href: "https://linkedin.com/in/niklasnoldin" },
]

export function PatternPushdownCards() {
  return (
    <section className="steezy-pattern-shell">
      <div className="steezy-pattern-grid">
        <h3 className="steezy-pattern-title">Niklas Noldin</h3>

        <p className="steezy-pattern-description">
          Currently studying Multimedia Technology at Salzburg University of
          Applied Sciences. Graphic design specialist focused on poster,
          editorial, and web experiences, with a strong interest in team-based
          problem solving.
        </p>

        <div
          className="steezy-card steezy-pattern-art"
          aria-label="Pattern decoration"
        />

        <p className="steezy-pattern-big steezy-card">
          Portfolio at <a href="https://niklasnold.in">niklasnold.in</a>
        </p>

        {skills.map((skill, index) => (
          <p
            className={`steezy-card steezy-skill steezy-skill-${index + 1}`}
            key={skill}
          >
            {skill}
          </p>
        ))}

        <h4 className="steezy-pattern-subtitle">social media</h4>

        {social.map((item, index) => (
          <a
            className={`steezy-card steezy-social steezy-social-${index + 1}`}
            href={item.href}
            key={item.label}
            target="_blank"
            rel="noreferrer"
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}
