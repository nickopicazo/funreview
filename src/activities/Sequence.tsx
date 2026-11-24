import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleList } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function Sequence({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["sequence"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  const order = useMemo(() => {
    if (!item) return []
    const mixed = shuffleList(
      item.steps.map((_, step) => step),
      `${seedKey}:sequence:${index}`,
    )
    if (mixed.length > 1 && mixed.every((value, place) => value === place)) {
      const first = mixed[0] ?? 0
      mixed[0] = mixed[1] ?? 1
      mixed[1] = first
    }
    return mixed
  }, [item, seedKey, index])
  if (!item) return null
  const last = index === items.length - 1

  function tap(step: number) {
    if (phase !== "open") return
    if (picked.includes(step)) {
      setPicked((current) => current.filter((value) => value !== step))
      return
    }
    const next = [...picked, step]
    setPicked(next)
    if (next.length < item.steps.length) return
    const correct = next.every((value, place) => value === place)
    if (correct) {
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
        Set {index + 1} of {items.length}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      <p className="hint">Tap the cards in order. Tap a card again to put it back.</p>
      <div className="stack">
        {phase === "wrong"
          ? item.steps.map((step, stepIndex) => (
              <p key={step} className="choice ok" lang={lang}>
                {stepIndex + 1}. {step}
              </p>
            ))
          : order.map((step) => {
              const place = picked.indexOf(step)
              return (
                <button
                  key={item.steps[step]}
                  type="button"
                  className={`choice${place >= 0 ? " picked" : ""}`}
                  lang={lang}
                  disabled={phase !== "open"}
                  onClick={() => tap(step)}
                >
                  {place >= 0 ? `${place + 1}. ` : ""}
                  {item.steps[step]}
                </button>
              )
            })}
      </div>
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={item.explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setPicked([])
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
