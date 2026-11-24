import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

const WORDS = [
  { id: "certain", label: "Certain" },
  { id: "likely", label: "Likely" },
  { id: "unlikely", label: "Unlikely" },
  { id: "impossible", label: "Impossible" },
] as const

export function ProbabilityBag({
  data,
  onFinish,
  lang,
}: {
  data: NonNullable<WeekContent["probability"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const event = data.events[index]
  if (!event) return null
  const last = index === data.events.length - 1

  function choose(id: string) {
    if (phase !== "open") return
    setPicked(id)
    if (id === event.answer) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  return (
    <div className="stack">
      <p className="step">
        Event {index + 1} of {data.events.length}
      </p>
      <div className="bag" aria-label="Counters in the bag">
        {data.bag.flatMap((item) =>
          Array.from({ length: item.count }, (_, copy) => (
            <span key={`${item.emoji}-${copy}`} className="bag-piece">
              {item.emoji}
            </span>
          )),
        )}
      </div>
      <h2 className="prompt" lang={lang}>{event.text}</h2>
      <div className="bins">
        {WORDS.map((word) => {
          const right = phase !== "open" && word.id === event.answer
          const wrong = phase === "wrong" && picked === word.id && word.id !== event.answer
          return (
            <button
              key={word.id}
              type="button"
              className={`choice${right ? " ok" : ""}${wrong ? " bad" : ""}`}
              disabled={phase !== "open"}
              onClick={() => choose(word.id)}
            >
              {word.label}
            </button>
          )
        })}
      </div>
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={event.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={event.explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setPicked(null)
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
