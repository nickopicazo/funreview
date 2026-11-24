import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import { ACTIVITY_META, activitiesIn, weekNumber } from "../content/activities.ts"
import { findWeek, getQuarter, getSubject } from "../content/catalog.ts"
import type { ActivityId } from "../content/types.ts"
import { useAppState } from "../lib/useAppState.ts"
import { trackLessonOpened } from "../lib/analytics.ts"
import { SITE_TITLE } from "../lib/seo.ts"
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
  const number = week ? weekNumber(week) : ""
  useTitle(
    week ? `FunReview — Week ${number}` : SITE_TITLE,
    week
      ? {
          description: subject
            ? `${subject.title}, Week ${number}: ${week.title}.`
            : `Week ${number}: ${week.title}.`,
        }
      : undefined,
  )

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
        <p className="kicker">Week {number}</p>
        <h1 lang={subject.lessonLang}>{week.title}</h1>
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
                  <small>
                    {activity === "quiz" && done && progress?.quiz
                      ? `${progress.quiz.correct} of ${progress.quiz.total}${progress.quiz.gintongBituin ? " · Golden Star" : ""}`
                      : locked
                        ? "Do the blue one first."
                        : meta.hint}
                  </small>
                </span>
              </button>
            </li>
          )
        })}
        <li>
          <div className={`node node-badge${progress?.badgeEarned ? " done" : " locked"}`}>
            <span className="node-icon" aria-hidden="true">🏅</span>
            <span className="node-copy">
              <strong lang={progress?.badgeEarned ? subject.lessonLang : undefined}>
                    {progress?.badgeEarned ? week.badgeName : "Badge"}
                  </strong>
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
        <PracticeDialog
          label={pendingMeta.label}
          onPractice={() => {
            navigate(paths.activity(quarter.id, subject.id, week.id, pending))
          }}
          onClose={() => setPending(null)}
        />
      ) : null}
    </PageEnter>
  )
}

function PracticeDialog({
  label,
  onPractice,
  onClose,
}: {
  label: string
  onPractice: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const scrollY = window.scrollY
    const body = document.body
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    }
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    dialog.showModal()
    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      window.scrollTo(0, scrollY)
      if (!dialog.open) return
      dialog.addEventListener("close", (event) => event.stopPropagation(), {
        capture: true,
        once: true,
      })
      dialog.close()
    }
  }, [])

  function requestClose() {
    ref.current?.close()
  }

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="practice-title"
      aria-describedby="practice-text"
      onClose={onClose}
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect()
        const inside =
          event.clientX >= box.left &&
          event.clientX <= box.right &&
          event.clientY >= box.top &&
          event.clientY <= box.bottom
        if (!inside) requestClose()
      }}
    >
      <h2 id="practice-title">Do the blue one first</h2>
      <p id="practice-text">
        You can practice {label} now. It will not get a check until you finish the earlier ones.
      </p>
      <div className="stack">
        <Button block onClick={onPractice}>
          Practice anyway
        </Button>
        <Button variant="ghost" block onClick={requestClose}>
          Not now
        </Button>
      </div>
    </dialog>
  )
}
