import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleList } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function SentenceBuilder({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["builder"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [placed, setPlaced] = useState<string[]>([])
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  const tray = useMemo(() => {
    if (!item) return []
    return shuffleList([...item.tiles, ...(item.extraTiles ?? [])], `${seedKey}:builder:${index}`)
  }, [item, seedKey, index])
  if (!item) return null
  const last = index === items.length - 1
  const answer = item.tiles.map((tile) => tile.text).join(" ")

  function add(id: string) {
    if (phase !== "open" || placed.includes(id)) return
    setPlaced((current) => [...current, id])
  }

  function remove(id: string) {
    if (phase !== "open") return
    setPlaced((current) => current.filter((tileId) => tileId !== id))
  }

  function check() {
    if (phase !== "open") return
    const correct = placed.join("|") === item.tiles.map((tile) => tile.id).join("|")
    if (correct) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  function textFor(id: string) {
    return tray.find((tile) => tile.id === id)?.text ?? ""
  }

  return (
    <div className="stack">
      <p className="step">
        Sentence {index + 1} of {items.length}
      </p>
      <h2 className="prompt" lang={lang}>{item.prompt}</h2>
      <div className="sentence-line" lang={lang}>
        {phase === "wrong" ? (
          <p>{answer}</p>
        ) : placed.length === 0 ? (
          <p className="hint">Tap the words below.</p>
        ) : (
          placed.map((id) => (
            <button key={id} type="button" className="chip ok" disabled={phase !== "open"} onClick={() => remove(id)}>
              {textFor(id)}
            </button>
          ))
        )}
      </div>
      <div className="chips">
        {tray.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className="chip"
            lang={lang}
            disabled={phase !== "open" || placed.includes(tile.id)}
            onClick={() => add(tile.id)}
          >
            {tile.text}
          </button>
        ))}
      </div>
      {phase === "open" ? (
        <Button block disabled={placed.length === 0} onClick={check}>
          Check
        </Button>
      ) : null}
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
            setPlaced([])
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
