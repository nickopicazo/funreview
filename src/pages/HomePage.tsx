import { Link } from "react-router-dom"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import { quarterHasContent, quarters } from "../content/catalog.ts"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"

export function HomePage() {
  useTitle("FunReview")
  return (
    <PageEnter>
      <p className="kicker">Para sa Grade 3</p>
      <h1>FunReview</h1>
      <p className="lede">Mag-review nang masaya!</p>
      <SpeechBubble speaker="ana" text="Handa ka na ba? Piliin ang markahan." />
      <div className="card-grid">
        {quarters.map((quarter) => {
          const open = quarterHasContent(quarter.id)
          if (!open) {
            return (
              <article key={quarter.id} className="card is-locked">
                <span className="card-order">{quarter.order}</span>
                <h2>{quarter.title}</h2>
                <span className="pill">Malapit na!</span>
              </article>
            )
          }
          return (
            <Link key={quarter.id} className="card" to={paths.quarter(quarter.id)}>
              <span className="card-order">{quarter.order}</span>
              <h2>{quarter.title}</h2>
              <span className="pill pill-open">Bukas</span>
            </Link>
          )
        })}
      </div>
    </PageEnter>
  )
}
