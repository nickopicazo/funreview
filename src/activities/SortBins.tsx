import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleList } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function SortBins({
  data,
  seedKey,
  onFinish,
  lang,
}: {
  data: NonNullable<WeekContent["sort"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const items = useMemo(() => shuffleList(data.items, `${seedKey}:sort`), [data.items, seedKey])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const last = index === items.length - 1

  function choose(binId: string) {
    if (phase !== "open") return
    setPicked(binId)
    if (binId === item.binId) {
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
        Card {index + 1} of {items.length}
      </p>
      <p className="hint">Tap the bin where this belongs.</p>
      <p className={`sort-card${phase === "wrong" ? " is-shake" : ""}`} lang={lang}>{item.text}</p>
      <div className="bins">
        {data.bins.map((bin) => {
          const right = phase !== "open" && bin.id === item.binId
          const wrong = phase === "wrong" && picked === bin.id && bin.id !== item.binId
          return (
            <button
              key={bin.id}
              type="button"
              className={`choice${right ? " ok" : ""}${wrong ? " bad" : ""}`}
              lang={lang}
              disabled={phase !== "open"}
              onClick={() => choose(bin.id)}
            >
              {bin.label}
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
