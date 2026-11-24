import { useState } from "react"
import { Button } from "../components/Button.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect } from "../lib/sounds.ts"

export function Paragraph({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["paragraph"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [itemIndex, setItemIndex] = useState(0)
  const [guideIndex, setGuideIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [sentences, setSentences] = useState<string[]>([])
  const item = items[itemIndex]
  const guide = item?.guides[guideIndex]
  if (!item || !guide) return null
  const lastGuide = guideIndex === item.guides.length - 1
  const lastItem = itemIndex === items.length - 1

  function choose(id: string) {
    const choice = guide.choices.find((option) => option.id === id)
    if (!choice) return
    playCorrect()
    setPicked(id)
    setSentences((current) => {
      const next = current.slice(0, guideIndex)
      next[guideIndex] = choice.sentence
      return next
    })
  }

  return (
    <div className="stack">
      <p className="step">
        Question {guideIndex + 1} of {item.guides.length}
      </p>
      <h2 className="prompt" lang={lang}>{guide.prompt}</h2>
      <div className="bins">
        {guide.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className={`choice${picked === choice.id ? " ok" : ""}`}
            lang={lang}
            onClick={() => choose(choice.id)}
          >
            {choice.text}
          </button>
        ))}
      </div>
      <section className="panel">
        <p className="kicker">Your paragraph</p>
        <p lang={lang}>
          {sentences.filter(Boolean).join(" ") ||
            (lang === "fil" ? "Dito lalabas ang talata." : "Your paragraph will grow here.")}
        </p>
      </section>
      {picked ? (
        <Button
          block
          onClick={() => {
            if (!lastGuide) {
              setGuideIndex((value) => value + 1)
              setPicked(null)
              return
            }
            if (lastItem) {
              onFinish()
              return
            }
            setItemIndex((value) => value + 1)
            setGuideIndex(0)
            setPicked(null)
            setSentences([])
          }}
        >
          {lastGuide && lastItem ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
