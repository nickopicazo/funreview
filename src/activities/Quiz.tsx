import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Choices } from "../components/Choices.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { PromptItem, QuizScore } from "../content/types.ts"
import { choiceSeed, shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function Quiz({
  items,
  seedKey,
  onFinish,
}: {
  items: PromptItem[]
  seedKey: string
  onFinish: (score: QuizScore) => void
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "wrong" | "right">("open")
  const [results, setResults] = useState<boolean[]>(() => items.map(() => false))
  const item = items[index]
  const choices = useMemo(
    () => (item ? shuffleChoices(item.choices, choiceSeed(seedKey, "quiz", index)) : []),
    [item, seedKey, index],
  )
  if (!item) return null
  const stars = results.filter(Boolean).length
  const last = index === items.length - 1

  function pick(id: string) {
    if (phase !== "open") return
    setPicked(id)
    if (id === item?.correctId) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
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
    setPhase("open")
  }

  return (
    <div className="stack">
      <p className="step">
        Question {index + 1} of {items.length} · {stars} {stars === 1 ? "star" : "stars"}
      </p>
      <h2 className="prompt" lang="fil">{item.prompt}</h2>
      <Choices
        choices={choices}
        pickedId={picked}
        correctId={item.correctId}
        revealed={phase !== "open"}
        onPick={pick}
      />
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} textLang="fil" /> : null}
      {phase === "wrong" ? (
        <Feedback tone="retry" title="Not quite" text={item.explanation} textLang="fil" />
      ) : null}
      {phase === "wrong" ? (
        <Button block onClick={() => advance(false)}>
          {last ? "See my stars" : "Next"}
        </Button>
      ) : null}
      {phase === "right" ? (
        <Button block onClick={() => advance(true)}>
          {last ? "See my stars" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
