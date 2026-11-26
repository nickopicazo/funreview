import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { KEYBOARD_ROWS, targetKeyIds } from "../content/computerLayout.ts"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"
import { KeyboardBoard } from "./KeyboardBoard.tsx"

function labelFor(id: string) {
  for (const row of KEYBOARD_ROWS) {
    const key = row.find((cap) => cap.id === id)
    if (key) return key.label
  }
  return id
}

export function OnScreenKeyboard({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["keyboard"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState<string[]>([])
  const [badId, setBadId] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const keys = targetKeyIds(item.target) ?? []
  const last = index === items.length - 1
  const revealed = phase !== "open"
  const shown = revealed ? keys : typed
  const lit = new Set(shown)

  function onKey(id: string) {
    if (phase !== "open") return
    const expected = keys[typed.length]
    if (id === expected) {
      const next = [...typed, id]
      setTyped(next)
      if (next.length === keys.length) {
        playCorrect()
        setPhase("right")
      }
      return
    }
    playWrong()
    setBadId(id)
    setPhase("wrong")
  }

  return (
    <div className="stack">
      <p className="step">
        {index + 1} of {items.length}
      </p>
      <p className="hint">Home keys are blue. F and J have a bump.</p>
      <p className="sort-card" lang={lang}>{item.prompt}</p>
      <p className="key-word" lang={lang} aria-label={revealed ? item.target : undefined}>
        {keys.map((id, place) => (
          <span key={`${id}-${place}`} className={shown[place] ? "is-on" : ""}>
            {shown[place] ? labelFor(shown[place]) : "·"}
          </span>
        ))}
      </p>
      <KeyboardBoard lit={lit} badId={badId} disabled={revealed} onKey={onKey} />
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
            setTyped([])
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
