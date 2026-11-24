import { useState } from "react"
import { Button } from "../components/Button.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"

export function Flashcards({
  cards,
  onFinish,
  lang,
}: {
  cards: NonNullable<WeekContent["flashcards"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})
  const [seen, setSeen] = useState<number[]>([])
  const ready = seen.length === cards.length

  function flip(index: number) {
    setFlipped((current) => ({ ...current, [index]: !current[index] }))
    setSeen((current) => (current.includes(index) ? current : [...current, index]))
  }

  return (
    <div className="stack">
      <p className="step">
        {seen.length} of {cards.length} cards flipped
      </p>
      <p className="hint">Tap a card to see the back.</p>
      <div className="card-grid">
        {cards.map((card, index) => {
          const open = flipped[index] === true
          return (
            <button
              key={card.name}
              type="button"
              className={`flip${open ? " is-open" : ""}`}
              lang={lang}
              aria-pressed={open}
              onClick={() => flip(index)}
            >
              {open ? (
                <>
                  <strong>{card.name}</strong>
                  <span>{card.place}</span>
                  <span>{card.fact}</span>
                </>
              ) : (
                <strong className="flip-front">{card.front}</strong>
              )}
            </button>
          )
        })}
      </div>
      <Button block disabled={!ready} onClick={onFinish}>
        Done!
      </Button>
    </div>
  )
}
