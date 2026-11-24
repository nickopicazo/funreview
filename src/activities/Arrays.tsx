import { useState } from "react"
import { Button } from "../components/Button.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect } from "../lib/sounds.ts"

export function Arrays({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["arrays"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [built, setBuilt] = useState(0)
  const [turned, setTurned] = useState(false)
  const item = items[index]
  if (!item) return null
  const rows = turned ? item.cols : item.rows
  const cols = turned ? item.rows : item.cols
  const shown = turned ? rows : built
  const product = item.rows * item.cols
  const ready = built >= item.rows
  const last = index === items.length - 1

  return (
    <div className="stack">
      <p className="step">
        Array {index + 1} of {items.length}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      <div className="array-board" aria-hidden="true">
        {Array.from({ length: shown }, (_, row) => (
          <div key={row} className="array-row">
            {Array.from({ length: cols }, (_, col) => (
              <span key={col} className="array-dot" />
            ))}
          </div>
        ))}
      </div>
      <p className="prompt">
        {turned ? `${item.cols} × ${item.rows}` : ready ? `${item.rows} × ${item.cols}` : `${built} rows`} = {turned || ready ? product : "?"}
      </p>
      {turned ? <p className="feedback feedback-ok" role="status"><span className="feedback-title">Same total!</span></p> : null}
      {!ready ? (
        <Button
          block
          onClick={() => {
            playCorrect()
            setBuilt((value) => value + 1)
          }}
        >
          Add a row
        </Button>
      ) : null}
      {ready && !turned ? (
        <Button
          block
          variant="blue"
          onClick={() => {
            playCorrect()
            setTurned(true)
          }}
        >
          Turn it
        </Button>
      ) : null}
      {turned ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setBuilt(0)
            setTurned(false)
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
