import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import type { WeekContent } from "../content/types.ts"

export function Recap({
  slides,
  onFinish,
}: {
  slides: NonNullable<WeekContent["recap"]>
  onFinish: () => void
}) {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  if (!slide) return null
  const last = index === slides.length - 1

  return (
    <div className="stack">
      <p className="step">
        Page {index + 1} of {slides.length}
      </p>
      <SpeechBubble speaker={slide.speaker} text={slide.text} lang="fil" />
      <div className="dots" aria-hidden="true">
        {slides.map((item, dot) => (
          <span key={`${item.speaker}-${dot}`} className={dot === index ? "on" : ""} />
        ))}
      </div>
      <div className="row">
        {index > 0 ? (
          <Button variant="ghost" onClick={() => setIndex((value) => value - 1)}>
            ← Back
          </Button>
        ) : null}
        <Button
          block
          onClick={() => {
            if (last) onFinish()
            else setIndex((value) => value + 1)
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      </div>
    </div>
  )
}
