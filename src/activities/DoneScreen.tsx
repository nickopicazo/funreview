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
    ? "Magaling ang pagsasanay! Hindi pa ito bibilang sa landas."
    : review
      ? "Nagawa mo na ito. Ang galing mong bumalik!"
      : "Tapos na! Proud ako sa iyo."

  return (
    <PageEnter>
      <ConfettiBurst />
      <h1>Tapos na!</h1>
      <SpeechBubble speaker="ana" text={cheer} />
      {quiz ? (
        <section className="medal">
          <p className="medal-score">
            {quiz.correct} sa {quiz.total}
          </p>
          {quiz.gintongBituin ? <p className="gold-label">Gintong Bituin!</p> : (
            <p>Ang Gintong Bituin ay 8 pataas. Puwede ka pa ring magpatuloy.</p>
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
            Isa pa?
          </Button>
        ) : null}
        <Button to={backTo} variant="blue" block>
          Bumalik sa landas
        </Button>
      </div>
    </PageEnter>
  )
}
