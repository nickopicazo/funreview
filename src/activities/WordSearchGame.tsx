import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { playCorrect, playWrong } from "../lib/sounds.ts"
import { createWordSearch, lineBetween, normalizeWord, seedFromText } from "../lib/wordSearch.ts"

type Cell = { row: number; col: number }

export function WordSearchGame({
  words,
  seedKey,
  onFinish,
}: {
  words: string[]
  seedKey: string
  onFinish: () => void
}) {
  const puzzle = useMemo(
    () => createWordSearch(words, seedFromText(seedKey)),
    [seedKey, words],
  )
  const [anchor, setAnchor] = useState<Cell | null>(null)
  const [found, setFound] = useState<string[]>([])
  const [foundCells, setFoundCells] = useState<string[]>([])
  const [miss, setMiss] = useState(false)
  const ready = found.length === puzzle.words.length

  function keyOf(cell: Cell) {
    return `${cell.row}-${cell.col}`
  }

  function tap(cell: Cell) {
    setMiss(false)
    if (!anchor) {
      setAnchor(cell)
      return
    }
    if (anchor.row === cell.row && anchor.col === cell.col) {
      setAnchor(null)
      return
    }
    const line = lineBetween(anchor, cell)
    if (!line) {
      setAnchor(cell)
      return
    }
    const letters = line.map((item) => puzzle.grid[item.row]?.[item.col] ?? "").join("")
    const reversed = [...letters].reverse().join("")
    const match = puzzle.words.find((word) => word === letters || word === reversed)
    if (!match || found.includes(match)) {
      playWrong()
      setMiss(true)
      setAnchor(null)
      return
    }
    playCorrect()
    setFound((current) => [...current, match])
    setFoundCells((current) => [...current, ...line.map(keyOf)])
    setAnchor(null)
  }

  return (
    <div className="stack">
      <p className="hint">Tap the first letter, then the last letter, in a straight line.</p>
      <ul className="word-list">
        {words.map((word) => {
          const clean = normalizeWord(word)
          return (
            <li key={word} className={found.includes(clean) ? "found" : ""}>
              {word}
            </li>
          )
        })}
      </ul>
      <div className="letter-wrap">
        <div
          className="letter-grid"
          style={{ gridTemplateColumns: `repeat(${puzzle.grid.length}, minmax(48px, 1fr))` }}
        >
          {puzzle.grid.map((line, row) =>
            line.map((letter, col) => {
              const id = `${row}-${col}`
              const selected = anchor?.row === row && anchor.col === col
              return (
                <button
                  key={id}
                  type="button"
                  className={`letter${selected ? " selected" : ""}${foundCells.includes(id) ? " found" : ""}`}
                  aria-label={`Letter ${letter}`}
                  onClick={() => tap({ row, col })}
                >
                  {letter}
                </button>
              )
            }),
          )}
        </div>
      </div>
      {miss ? <Feedback tone="retry" title="Try again" text="That's not one of the words." /> : null}
      <div className="row">
        <Button variant="ghost" disabled={!anchor} onClick={() => setAnchor(null)}>
          Unpick
        </Button>
        <Button block disabled={!ready} onClick={onFinish}>
          Done!
        </Button>
      </div>
    </div>
  )
}
