import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function FixIt({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["fixIt"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"find" | "choose" | "right" | "wrong">("find")
  const item = items[index]
  const choices = useMemo(
    () => (item ? shuffleChoices(item.choices, `${seedKey}:fix:${index}`) : []),
    [item, seedKey, index],
  )
  if (!item) return null
  const last = index === items.length - 1
  const answer = item.choices.find((choice) => choice.id === item.correctId)?.label ?? ""
  const revealed = phase === "right" || phase === "wrong"

  function tapWord(wordIndex: number) {
    if (phase !== "find") return
    if (wordIndex === item.wrongIndex) {
      playCorrect()
      setPhase("choose")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  function choose(id: string) {
    if (phase !== "choose") return
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
      <p className="hint">{phase === "choose" ? "Now tap the fix." : "Tap the part that is wrong."}</p>
      <div className="chips" lang={lang}>
        {item.words.map((word, wordIndex) => {
          const showFix = revealed && wordIndex === item.wrongIndex
          const marked = wordIndex === item.wrongIndex && phase !== "find"
          return (
            <button
              key={`${word}-${wordIndex}`}
              type="button"
              className={`chip${showFix ? " ok" : ""}${marked && !showFix ? " picked" : ""}`}
              disabled={phase !== "find"}
              onClick={() => tapWord(wordIndex)}
            >
              {showFix ? answer : word}
            </button>
          )
        })}
      </div>
      {phase === "choose" || phase === "right" || (phase === "wrong" && picked) ? (
        <div className="bins">
          {choices.map((choice) => {
            const right = revealed && choice.id === item.correctId
            const wrong = phase === "wrong" && picked === choice.id && choice.id !== item.correctId
            return (
              <button
                key={choice.id}
                type="button"
                className={`choice${right ? " ok" : ""}${wrong ? " bad" : ""}`}
                lang={lang}
                disabled={phase !== "choose"}
                onClick={() => choose(choice.id)}
              >
                {choice.label}
              </button>
            )
          })}
        </div>
      ) : null}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={item.explanation} textLang={lang} /> : null}
      {revealed ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setPicked(null)
            setPhase("find")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
