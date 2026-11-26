import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { shuffleChoices, shuffleList } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

type Miss = "query" | "result" | "fact" | null

export function SearchPractice({
  items,
  seedKey,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["searchPractice"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)
  const [phase, setPhase] = useState<"query" | "results" | "facts" | "right" | "wrong">("query")
  const [miss, setMiss] = useState<Miss>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const item = items[index]
  const queries = useMemo(
    () => (item ? shuffleChoices(item.queries, `${seedKey}:search:query:${index}`) : []),
    [item, seedKey, index],
  )
  const results = useMemo(
    () => (item ? shuffleList(item.results, `${seedKey}:search:results:${index}`) : []),
    [item, seedKey, index],
  )
  if (!item) return null
  const last = index === items.length - 1
  const facts = item.facts ?? []
  const fact = facts[factIndex]
  const revealed = phase === "right" || phase === "wrong"

  function fail(kind: Exclude<Miss, null>, id: string) {
    playWrong()
    setMiss(kind)
    setPicked(id)
    setPhase("wrong")
  }

  return (
    <div className="stack">
      <p className="step">
        Search {index + 1} of {items.length}
      </p>
      <p className="hint">These results stay in the app. Nothing opens a website.</p>
      {phase === "query" || miss === "query" ? (
        <>
          <p className="sort-card" lang={lang}>Which search should we use?</p>
          <div className="chips">
            {queries.map((choice) => {
              const ok = revealed && choice.id === item.correctQueryId
              const bad = miss === "query" && picked === choice.id && choice.id !== item.correctQueryId
              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`chip${ok ? " ok" : ""}${bad ? " bad" : ""}`}
                  lang={lang}
                  disabled={phase !== "query"}
                  onClick={() => {
                    if (choice.id === item.correctQueryId) {
                      playCorrect()
                      setPhase("results")
                      return
                    }
                    fail("query", choice.id)
                  }}
                >
                  {choice.label}
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <p className="sort-card" lang={lang}>Search: {item.query}</p>
      )}
      {phase === "results" || phase === "facts" || phase === "right" || miss === "result" || miss === "fact" ? (
        <div className="stack">
          {results.map((result) => {
            const ok = (phase === "facts" || phase === "right" || miss === "fact" || miss === "result") && result.id === item.correctId
            const bad = miss === "result" && picked === result.id && result.id !== item.correctId
            return (
              <button
                key={result.id}
                type="button"
                className={`choice${ok ? " ok" : ""}${bad ? " bad" : ""}`}
                lang={lang}
                disabled={phase !== "results"}
                onClick={() => {
                  if (result.id !== item.correctId) {
                    fail("result", result.id)
                    return
                  }
                  playCorrect()
                  if (facts.length > 0 && item.bins?.length) {
                    setPhase("facts")
                    return
                  }
                  setPhase("right")
                }}
              >
                <strong>{result.title}</strong>
                <span className="result-blurb">{result.blurb}</span>
              </button>
            )
          })}
        </div>
      ) : null}
      {phase === "facts" && fact && item.bins ? (
        <div className="stack">
          <p className="hint">
            Fact {factIndex + 1} of {facts.length}. Tap the bin.
          </p>
          <p className="sort-card" lang={lang}>{fact.text}</p>
          <div className="bins">
            {item.bins.map((bin) => (
              <button
                key={bin.id}
                type="button"
                className="choice"
                lang={lang}
                onClick={() => {
                  if (bin.id === fact.binId) {
                    playCorrect()
                    if (factIndex === facts.length - 1) {
                      setPhase("right")
                      return
                    }
                    setFactIndex((value) => value + 1)
                    return
                  }
                  fail("fact", bin.id)
                }}
              >
                {bin.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {miss === "fact" && fact && item.bins ? (
        <p className="hint" lang={lang}>
          The right bin is {item.bins.find((bin) => bin.id === fact.binId)?.label}.
        </p>
      ) : null}
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
            setFactIndex(0)
            setPhase("query")
            setMiss(null)
            setPicked(null)
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
