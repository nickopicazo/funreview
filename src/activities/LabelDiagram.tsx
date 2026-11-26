import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { FINGERS } from "../content/computerLayout.ts"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"
import { KeyboardBoard } from "./KeyboardBoard.tsx"

export function LabelDiagram({
  data,
  onFinish,
  lang,
}: {
  data: NonNullable<WeekContent["labelDiagram"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [badId, setBadId] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = data.items[index]
  if (!item) return null
  const last = index === data.items.length - 1
  const revealed = phase !== "open"
  const lit = new Set(revealed ? item.correctIds : picked)

  function choose(id: string) {
    if (phase !== "open" || picked.includes(id)) return
    if (!item.correctIds.includes(id)) {
      playWrong()
      setBadId(id)
      setPhase("wrong")
      return
    }
    const next = [...picked, id]
    setPicked(next)
    if (item.correctIds.every((correct) => next.includes(correct))) {
      playCorrect()
      setPhase("right")
    }
  }

  return (
    <div className="stack">
      <p className="step">
        {index + 1} of {data.items.length}
      </p>
      <p className="hint" lang={lang}>{data.title}</p>
      <p className="sort-card" lang={lang}>{item.prompt}</p>
      {item.kind === "keyboard" ? (
        <KeyboardBoard lit={lit} badId={badId} disabled={revealed} onKey={choose} />
      ) : (
        <div className="hands">
          {(["left", "right"] as const).map((hand) => (
            <div key={hand} className="hand-block">
              <p className="hint">{hand === "left" ? "Left hand" : "Right hand"}</p>
              <div className="hand">
                {FINGERS.filter((finger) => finger.hand === hand).map((finger) => {
                  const ok = lit.has(finger.id)
                  const bad = badId === finger.id
                  return (
                    <button
                      key={finger.id}
                      type="button"
                      className={`key finger${ok ? " ok" : ""}${bad ? " bad" : ""}`}
                      disabled={revealed}
                      onClick={() => choose(finger.id)}
                    >
                      {finger.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
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
            setPicked([])
            setBadId(null)
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
