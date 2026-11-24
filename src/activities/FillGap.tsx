import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function FillGap({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["fillGap"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  const choices = useMemo(
    () => (item ? shuffleChoices(item.choices, `${seedKey}:fill:${index}`) : []),
    [item, seedKey, index],
  )
  if (!item) return null
  const last = index === items.length - 1
  const answer = item.choices.find((choice) => choice.id === item.correctId)?.label ?? ""

  function choose(id: string) {
    if (phase !== "open") return
    setPicked(id)
    if (id === item.correctId) {
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
        Sentence {index + 1} of {items.length}
      </p>
      <p className="gap-line" lang={lang}>
        <span>{item.before}</span>
        <span className={`gap${phase === "open" ? "" : " is-filled"}`}>{phase === "open" ? "" : answer}</span>
        <span>{item.after}</span>
      </p>
      <div className="bins">
        {choices.map((choice) => {
          const right = phase !== "open" && choice.id === item.correctId
          const wrong = phase === "wrong" && picked === choice.id && choice.id !== item.correctId
          return (
            <button
              key={choice.id}
              type="button"
              className={`choice${right ? " ok" : ""}${wrong ? " bad" : ""}`}
              lang={lang}
              disabled={phase !== "open"}
              onClick={() => choose(choice.id)}
            >
              {choice.label}
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
