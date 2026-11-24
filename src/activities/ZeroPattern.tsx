import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { NumberPad } from "../components/NumberPad.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function ZeroPattern({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["zeroPattern"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(false)
  const [entry, setEntry] = useState("")
  const [phase, setPhase] = useState<"build" | "open" | "right" | "wrong">("build")
  const item = items[index]
  if (!item) return null
  const basic = item.factorA * item.factorB
  const answer = basic * 10 ** item.zeros
  const last = index === items.length - 1
  const explanation = `Write ${item.factorA} × ${item.factorB} = ${basic}, then put ${item.zeros} ${item.zeros === 1 ? "zero" : "zeros"} after it. That is ${answer.toLocaleString("en-US")}.`

  function submit() {
    if (phase !== "open" || entry.trim() === "") return
    if (Number(entry) === answer) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setEntry(String(answer))
    setPhase("wrong")
  }

  return (
    <div className="stack">
      <p className="step">
        Pattern {index + 1} of {items.length}
      </p>
      <div className="chips" lang={lang}>
        <span className="chip ok">{item.factorA}</span>
        <span className="chip">×</span>
        <span className="chip ok">{item.factorB}</span>
        <span className="chip">=</span>
        <span className="chip ok">{basic}</span>
        {shown
          ? Array.from({ length: item.zeros }, (_, zero) => (
              <span key={zero} className="chip zero-tile">
                0
              </span>
            ))
          : null}
      </div>
      {phase === "build" ? (
        <Button
          block
          onClick={() => {
            setShown(true)
            setPhase("open")
          }}
        >
          Put the zeros after it
        </Button>
      ) : (
        <NumberPad
          value={phase === "open" ? entry : String(answer)}
          onChange={setEntry}
          onSubmit={submit}
          disabled={phase !== "open"}
        />
      )}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={explanation} textLang={lang} /> : null}
      {phase === "right" || phase === "wrong" ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setShown(false)
            setEntry("")
            setPhase("build")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
