import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Choices } from "../components/Choices.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { NumberPad } from "../components/NumberPad.tsx"
import type { LessonLang, QuizItem, QuizScore } from "../content/types.ts"
import { isNumberItem } from "../content/types.ts"
import { choiceSeed, shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function Quiz({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: QuizItem[]
  seedKey: string
  onFinish: (score: QuizScore) => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [entry, setEntry] = useState("")
  const [phase, setPhase] = useState<"open" | "wrong" | "right">("open")
  const [results, setResults] = useState<boolean[]>(() => items.map(() => false))
  const item = items[index]
  const choices = useMemo(
    () => (item && !isNumberItem(item) ? shuffleChoices(item.choices, choiceSeed(seedKey, "quiz", index)) : []),
    [item, seedKey, index],
  )
  if (!item) return null
  const stars = results.filter(Boolean).length
  const last = index === items.length - 1

  function lock(correct: boolean) {
    if (correct) playCorrect()
    else playWrong()
    setPhase(correct ? "right" : "wrong")
  }

  function pick(id: string) {
    if (phase !== "open" || isNumberItem(item)) return
    setPicked(id)
    lock(id === item.correctId)
  }

  function submitNumber() {
    if (phase !== "open" || !isNumberItem(item)) return
    if (entry.trim() === "") return
    const correct = Number(entry) === item.answer
    if (!correct) setEntry(String(item.answer))
    lock(correct)
  }

  function advance(correct: boolean) {
    const next = [...results]
    next[index] = correct
    const correctCount = next.filter(Boolean).length
    if (last) {
      onFinish({
        correct: correctCount,
        total: items.length,
        gintongBituin: correctCount >= 8,
      })
      return
    }
    setResults(next)
    setIndex((value) => value + 1)
    setPicked(null)
    setEntry("")
    setPhase("open")
  }

  const correct = phase === "right"

  return (
    <div className="stack">
      <p className="step">
        Question {index + 1} of {items.length} · {stars} {stars === 1 ? "star" : "stars"}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      {isNumberItem(item) ? (
        <NumberPad
          value={phase === "open" ? entry : String(item.answer)}
          onChange={setEntry}
          onSubmit={submitNumber}
          disabled={phase !== "open"}
        />
      ) : (
        <Choices
          choices={choices}
          pickedId={picked}
          correctId={item.correctId}
          revealed={phase !== "open"}
          onPick={pick}
          lang={lang}
        />
      )}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={item.explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button block onClick={() => advance(correct)}>
          {last ? "See my stars" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
