import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"
import { seedFromText } from "../lib/wordSearch.ts"

function orderOf(length: number, seed: number) {
  const order = Array.from({ length }, (_, index) => index)
  let state = seed >>> 0
  for (let index = length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const swap = state % (index + 1)
    const current = order[index] ?? index
    order[index] = order[swap] ?? swap
    order[swap] = current
  }
  if (order.every((value, index) => value === index) && length > 1) {
    const first = order[0] ?? 0
    order[0] = order[1] ?? 1
    order[1] = first
  }
  return order
}

export function Matching({
  pairs,
  seedKey,
  onFinish,
}: {
  pairs: NonNullable<WeekContent["matching"]>
  seedKey: string
  onFinish: () => void
}) {
  const rightOrder = useMemo(() => orderOf(pairs.length, seedFromText(seedKey)), [pairs.length, seedKey])
  const [leftPick, setLeftPick] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [wrong, setWrong] = useState(false)
  const ready = matched.length === pairs.length

  function pickRight(rightIndex: number) {
    if (leftPick === null || matched.includes(leftPick)) return
    const pairIndex = rightOrder[rightIndex]
    if (pairIndex === leftPick) {
      playCorrect()
      setMatched((current) => [...current, leftPick])
      setLeftPick(null)
      setWrong(false)
      return
    }
    playWrong()
    setWrong(true)
    setLeftPick(null)
  }

  return (
    <div className="stack">
      <p className="hint">I-tap ang kaliwa, tapos ang pares nito sa kanan.</p>
      <div className="match-grid">
        <div className="stack">
          {pairs.map((pair, index) => {
            const done = matched.includes(index)
            return (
              <button
                key={pair.left}
                type="button"
                className={`choice${done ? " ok" : ""}${leftPick === index ? " picked" : ""}`}
                disabled={done}
                onClick={() => {
                  setLeftPick(index)
                  setWrong(false)
                }}
              >
                {pair.left}
              </button>
            )
          })}
        </div>
        <div className="stack">
          {rightOrder.map((pairIndex, index) => {
            const pair = pairs[pairIndex]
            const done = matched.includes(pairIndex)
            if (!pair) return null
            return (
              <button
                key={pair.right}
                type="button"
                className={`choice${done ? " ok" : ""}`}
                disabled={done || leftPick === null}
                onClick={() => pickRight(index)}
              >
                {pair.right}
              </button>
            )
          })}
        </div>
      </div>
      {wrong ? <Feedback tone="retry" title="Subukan ulit" text="Hindi iyan ang pares." /> : null}
      <Button block disabled={!ready} onClick={onFinish}>
        Tapos na!
      </Button>
    </div>
  )
}
