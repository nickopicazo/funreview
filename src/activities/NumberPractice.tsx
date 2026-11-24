import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { NumberPad } from "../components/NumberPad.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function NumberPractice({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["numberPad"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [entry, setEntry] = useState("")
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const last = index === items.length - 1

  function submit() {
    if (phase !== "open" || entry.trim() === "") return
    if (Number(entry) === item.answer) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setEntry(String(item.answer))
    setPhase("wrong")
  }

  return (
    <div className="stack">
      <p className="step">
        Level {item.level} · Problem {index + 1} of {items.length}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      <NumberPad
        value={phase === "open" ? entry : String(item.answer)}
        onChange={setEntry}
        onSubmit={submit}
        disabled={phase !== "open"}
      />
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
            setEntry("")
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
