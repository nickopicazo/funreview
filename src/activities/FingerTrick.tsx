import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

function parts(fact: number) {
  const tens = fact - 1
  const ones = 10 - fact
  return { tens, ones, product: tens * 10 + ones }
}

export function FingerTrick({
  facts,
  onFinish,
  lang,
}: {
  facts: NonNullable<WeekContent["fingerTrick"]>["facts"]
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [folded, setFolded] = useState<number | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const fact = facts[index]
  if (!fact) return null
  const result = parts(fact)
  const last = index === facts.length - 1
  const show = phase !== "open" ? fact : folded
  const explanation = `Fold finger ${fact}. Fingers on the left are the tens (${result.tens}). Fingers on the right are the ones (${result.ones}). 9 × ${fact} = ${result.product}.`

  function choose(finger: number) {
    if (phase !== "open") return
    setFolded(finger)
    if (finger === fact) {
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
        Fact {index + 1} of {facts.length}
      </p>
      <h2 className="prompt" lang={lang}>9 × {fact}. Tap finger {fact} to fold it.</h2>
      <div className="fingers">
        {Array.from({ length: 10 }, (_, finger) => {
          const number = finger + 1
          const isFolded = show === number
          return (
            <button
              key={number}
              type="button"
              className={`finger${isFolded ? " is-folded" : ""}`}
              disabled={phase !== "open"}
              onClick={() => choose(number)}
              aria-label={`Finger ${number}`}
            >
              {number}
            </button>
          )
        })}
      </div>
      {phase !== "open" ? (
        <p className="prompt" role="status">
          Tens {result.tens} · Ones {result.ones} · 9 × {fact} = {result.product}
        </p>
      ) : null}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setFolded(null)
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
