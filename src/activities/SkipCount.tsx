import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleList } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

function optionsFor(correct: number, step: number) {
  const raw = [correct, correct + step, correct + 1, Math.abs(correct - step)]
  const unique: number[] = []
  for (const value of raw) {
    if (!unique.includes(value)) unique.push(value)
  }
  return unique.slice(0, 3)
}

export function SkipCount({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["skipCount"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [hop, setHop] = useState(0)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  const correct = item ? item.start + item.step * (hop + 1) : 0
  const choices = useMemo(
    () => shuffleList(optionsFor(correct, item?.step ?? 1), `${seedKey}:hop:${index}:${hop}`),
    [correct, item?.step, seedKey, index, hop],
  )
  if (!item) return null
  const landed = Array.from({ length: hop + 1 }, (_, place) => item.start + item.step * place)
  const lastHop = hop === item.hops - 1
  const lastItem = index === items.length - 1

  function choose(value: number) {
    if (phase !== "open") return
    if (value === correct) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  function advance() {
    if (!lastHop) {
      setHop((value) => value + 1)
      setPhase("open")
      return
    }
    if (lastItem) {
      onFinish()
      return
    }
    setIndex((value) => value + 1)
    setHop(0)
    setPhase("open")
  }

  return (
    <div className="stack">
      <p className="step">
        Hop {hop + 1} of {item.hops}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      <div className="pads" aria-label="Count so far">
        {landed.map((value) => (
          <span key={value} className="pad-lily">
            {value}
          </span>
        ))}
        <span className="pad-lily next">{phase === "open" ? "?" : correct}</span>
      </div>
      <div className="bins">
        {choices.map((value) => {
          const right = phase !== "open" && value === correct
          const wrong = phase === "wrong" && value !== correct
          return (
            <button
              key={value}
              type="button"
              className={`choice${right ? " ok" : ""}${wrong && phase === "wrong" ? "" : ""}`}
              disabled={phase !== "open"}
              onClick={() => choose(value)}
            >
              {value}
            </button>
          )
        })}
      </div>
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={`${correct} comes next.`} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={item.explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button block onClick={advance}>
          {lastHop && lastItem ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
