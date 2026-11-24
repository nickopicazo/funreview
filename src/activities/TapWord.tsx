import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function TapWord({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["tapWord"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const last = index === items.length - 1

  function choose(wordIndex: number) {
    if (phase !== "open") return
    setPicked(wordIndex)
    if (wordIndex === item.correctIndex) {
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
      <p className="hint">Tap the word that fits.</p>
      <div className="chips" lang={lang}>
        {item.words.map((word, wordIndex) => {
          const right = phase !== "open" && wordIndex === item.correctIndex
          const wrong = phase === "wrong" && picked === wordIndex && wordIndex !== item.correctIndex
          return (
            <button
              key={`${word}-${wordIndex}`}
              type="button"
              className={`chip${right ? " ok" : ""}${wrong ? " bad" : ""}`}
              disabled={phase !== "open"}
              onClick={() => choose(wordIndex)}
            >
              {word}
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
