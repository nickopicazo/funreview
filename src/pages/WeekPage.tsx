import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import { ACTIVITY_META, activitiesIn } from "../content/activities.ts"
import { findWeek, getQuarter, getSubject } from "../content/catalog.ts"
import type { ActivityId } from "../content/types.ts"
import { useAppState } from "../lib/appState.tsx"
import { trackLessonOpened } from "../lib/analytics.ts"
import { paths, weekKey } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"
import { Missing } from "./Missing.tsx"

export function WeekPage() {
  const { quarterId = "", subjectId = "", weekId = "" } = useParams()
  const quarter = getQuarter(quarterId)
  const subject = getSubject(subjectId)
  const week = findWeek(quarterId, subjectId, weekId)
  const navigate = useNavigate()
  const { save, isDone, isCurrent } = useAppState()
  const [pending, setPending] = useState<ActivityId | null>(null)
  const key = weekKey(quarterId, subjectId, weekId)
  const order = week ? activitiesIn(week) : []
  const progress = save.weeks[key]
  useTitle(week ? `FunReview — Week ${week.id.slice(1)}` : "FunReview")

  useEffect(() => {
    if (week) trackLessonOpened(key)
  }, [key, week])

  if (!quarter || !subject || !week) return <Missing />

  const pendingMeta = pending ? ACTIVITY_META[pending] : null

  return (
    <PageEnter>
      <Link className="back" to={paths.subject(quarter.id, subject.id)}>
        ← {subject.title}
      </Link>
      <div className="title-block">
        <p className="kicker">Week {week.id.slice(1)}</p>
        <h1>{week.title}</h1>
      </div>
      <SpeechBubble speaker="ben" text="Do these in order. You've got this!" />
      <ol className="path">
        {order.map((activity) => {
          const meta = ACTIVITY_META[activity]
          const done = isDone(key, activity)
          const current = isCurrent(key, activity, order)
          const locked = !done && !current
          const state = done ? "done" : current ? "current" : "locked"
          return (
            <li key={activity}>
              <button
                type="button"
                className={`node node-${state}`}
                aria-current={current ? "step" : undefined}
                onClick={() => {
                  if (locked) setPending(activity)
                  else navigate(paths.activity(quarter.id, subject.id, week.id, activity))
                }}
              >
                <span className="node-icon" aria-hidden="true">
                  {done ? "✓" : meta.emoji}
                </span>
                <span className="node-copy">
                  <strong>{meta.label}</strong>
                  <small>{locked ? "Do the blue one first." : meta.hint}</small>
                </span>
              </button>
            </li>
          )
        })}
        <li>
          <div className={`node node-badge${progress?.badgeEarned ? " done" : " locked"}`}>
            <span className="node-icon" aria-hidden="true">🏅</span>
            <span className="node-copy">
              <strong>{progress?.badgeEarned ? week.badgeName : "Badge"}</strong>
              <small>
                {progress?.badgeEarned
                  ? "You got it!"
                  : "Finish the quiz to earn this."}
              </small>
            </span>
          </div>
        </li>
      </ol>
      {pending && pendingMeta ? (
        <div className="dialog-back" role="presentation" onClick={() => setPending(null)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="practice-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="practice-title">Do the blue one first</h2>
            <p>
              You can practice {pendingMeta.label} now. It will not get a check until you finish the earlier ones.
            </p>
            <div className="stack">
              <Button
                block
                onClick={() => {
                  navigate(paths.activity(quarter.id, subject.id, week.id, pending))
                }}
              >
                Practice anyway
              </Button>
              <Button variant="ghost" block onClick={() => setPending(null)}>
                Not now
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </PageEnter>
  )
}
