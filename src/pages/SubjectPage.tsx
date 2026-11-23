import { Link, useParams } from "react-router-dom"
import { PageEnter } from "../components/PageEnter.tsx"
import { activitiesIn } from "../content/activities.ts"
import { getQuarter, getSubject, getWeeks } from "../content/catalog.ts"
import { useAppState } from "../lib/appState.tsx"
import { paths, weekKey } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"
import { Missing } from "./Missing.tsx"

export function SubjectPage() {
  const { quarterId = "", subjectId = "" } = useParams()
  const quarter = getQuarter(quarterId)
  const subject = getSubject(subjectId)
  const weeks = quarter && subject ? getWeeks(quarter.id, subject.id) : null
  const { save } = useAppState()
  useTitle(subject && quarter ? `FunReview — ${subject.title}` : "FunReview")

  if (!quarter || !subject) return <Missing />
  if (!weeks) {
    return (
      <PageEnter>
        <Link className="back" to={paths.quarter(quarter.id)}>
          ← {quarter.title}
        </Link>
        <h1>{subject.title}</h1>
        <p className="pill">Coming soon!</p>
      </PageEnter>
    )
  }

  return (
    <PageEnter>
      <Link className="back" to={paths.quarter(quarter.id)}>
        ← {quarter.title}
      </Link>
      <div className="title-block">
        <h1>{subject.title}</h1>
        <p className="lede">{quarter.title}</p>
      </div>
      <div className="stack">
        {weeks.map((week) => {
          const key = weekKey(quarter.id, subject.id, week.id)
          const total = activitiesIn(week).length
          const done = save.weeks[key]?.completedActivities.length ?? 0
          const badge = save.weeks[key]?.badgeEarned === true
          return (
            <Link key={week.id} className="card" to={paths.week(quarter.id, subject.id, week.id)}>
              <p className="kicker">Week {week.id.slice(1)}</p>
              <h2>{week.title}</h2>
              <p>
                {done} of {total} finished
                {badge ? ` · Badge: ${week.badgeName}` : ""}
              </p>
            </Link>
          )
        })}
      </div>
      <Link className="card map-card" to={paths.map}>
        <h2>A trip around the Philippines</h2>
        <p>Luzon, Visayas, and Mindanao. Weeks 17 to 20.</p>
      </Link>
    </PageEnter>
  )
}
