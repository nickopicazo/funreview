import { Link, useParams } from "react-router-dom"
import { PageEnter } from "../components/PageEnter.tsx"
import { getQuarter, getWeeks, subjects } from "../content/catalog.ts"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"
import { Missing } from "./Missing.tsx"

export function QuarterPage() {
  const { quarterId = "" } = useParams()
  const quarter = getQuarter(quarterId)
  useTitle(quarter ? `FunReview — ${quarter.title}` : "FunReview")
  if (!quarter) return <Missing />

  return (
    <PageEnter>
      <Link className="back" to={paths.home}>
        ← Home
      </Link>
      <h1>{quarter.title}</h1>
      <div className="stack">
        {subjects.map((subject) => {
          const open = Boolean(getWeeks(quarter.id, subject.id))
          if (!open) {
            return (
              <article key={subject.id} className="card is-locked">
                <h2>
                  <span aria-hidden="true">{subject.emoji} </span>
                  {subject.title}
                </h2>
                <span className="pill">Coming soon!</span>
              </article>
            )
          }
          return (
            <Link key={subject.id} className="card" to={paths.subject(quarter.id, subject.id)}>
              <h2>
                <span aria-hidden="true">{subject.emoji} </span>
                {subject.title}
              </h2>
              <span className="pill pill-open">Let's go</span>
            </Link>
          )
        })}
      </div>
    </PageEnter>
  )
}
