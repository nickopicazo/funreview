import { Button } from "../components/Button.tsx"
import { ConfettiBurst } from "../components/ConfettiBurst.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import type { QuizScore } from "../content/types.ts"

export function DoneScreen({
  practice,
  review,
  badgeName,
  awardedBadge,
  quiz,
  nextTo,
  nextLabel,
  backTo,
}: {
  practice: boolean
  review: boolean
  badgeName: string
  awardedBadge: boolean
  quiz: QuizScore | null
  nextTo: string | null
  nextLabel: string | null
  backTo: string
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
          {quiz.gintongBituin ? <p className="gold-label">Golden Star!</p> : (
            <p>8 or more earns a Golden Star. You can keep going.</p>
          )}
        </section>
      ) : null}
      {awardedBadge ? (
        <section className="medal">
          <p className="badge-emoji" aria-hidden="true">🏅</p>
          <p className="gold-label">You earned: {badgeName}</p>
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
