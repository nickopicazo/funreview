import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Choices } from "../components/Choices.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { PromptItem } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function Riddles({
  items,
  onFinish,
}: {
  items: PromptItem[]
  onFinish: () => void
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "wrong" | "right">("open")
  const item = items[index]
  if (!item) return null
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

  return (
    <div className="stack">
      <p className="step">
        Riddle {index + 1} of {items.length}
      </p>
      <h2 className="prompt">{item.prompt}</h2>
      <Choices
        choices={item.choices}
        pickedId={picked}
        correctId={item.correctId}
        revealed={phase !== "open"}
        onPick={pick}
      />
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} /> : null}
      {phase === "wrong" ? (
        <Feedback tone="retry" title="Try again" text={item.explanation} />
      ) : null}
      {phase === "wrong" ? (
        <Button
          variant="blue"
          block
          onClick={() => {
            setPicked(null)
            setPhase("open")
          }}
        >
          Try again
        </Button>
      ) : null}
      {phase === "right" ? (
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
