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
  backTo,
}: {
  practice: boolean
  review: boolean
  badgeName: string
  awardedBadge: boolean
  quiz: QuizScore | null
  nextTo: string | null
  backTo: string
}) {
  const cheer = practice
    ? "Nice practice! This won't count on the path yet."
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
            <p>Golden Star is 8 or more. You can still continue.</p>
          )}
        </section>
      ) : null}
      {awardedBadge ? (
        <section className="medal">
          <p className="badge-emoji" aria-hidden="true">🏅</p>
          <p className="gold-label">Badge: {badgeName}</p>
        </section>
      ) : null}
      <div className="stack">
        {nextTo && !practice ? (
          <Button to={nextTo} block>
            One more?
          </Button>
        ) : null}
        <Button to={backTo} variant="blue" block>
          Back to the path
        </Button>
      </div>
    </PageEnter>
  )
}
