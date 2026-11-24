import { Button } from "../components/Button.tsx"
import { ConfettiBurst } from "../components/ConfettiBurst.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import type { LessonLang, QuizScore } from "../content/types.ts"

export function DoneScreen({
  practice,
  review,
  badgeName,
  awardedBadge,
  quiz,
  newBest = false,
  nextTo,
  nextLabel,
  backTo,
  badgeLang,
}: {
  practice: boolean
  review: boolean
  badgeName: string
  awardedBadge: boolean
  quiz: QuizScore | null
  newBest?: boolean
  nextTo: string | null
  nextLabel: string | null
  backTo: string
  badgeLang: LessonLang
}) {
  const cheer = practice
    ? "Nice practice! No check for this one yet."
    : review
      ? "You already did this. Great job coming back!"
      : "Done! I'm proud of you."

  return (
    <PageEnter>
      <ConfettiBurst />
      <h1>Done!</h1>
      <SpeechBubble speaker="ana" text={cheer} />
      {quiz ? (
        <section className="medal">
          <p className="medal-score">
            {quiz.correct} of {quiz.total}
          </p>
          {newBest ? <p className="gold-label">New best!</p> : null}
          {quiz.gintongBituin ? <p className="gold-label">Golden Star!</p> : (
            <p>8 or more earns a Golden Star. You can keep going.</p>
          )}
        </section>
      ) : null}
      {awardedBadge ? (
        <section className="medal">
          <p className="badge-emoji" aria-hidden="true">🏅</p>
          <p className="gold-label">You earned: <span lang={badgeLang}>{badgeName}</span></p>
        </section>
      ) : null}
      <div className="stack">
        {nextTo && nextLabel && !practice ? (
          <Button to={nextTo} block>
            Next: {nextLabel}
          </Button>
        ) : null}
        <Button to={backTo} variant="blue" block>
          ← This week
        </Button>
      </div>
    </PageEnter>
  )
}
