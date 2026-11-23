import { useEffect, useState } from "react"
import { makeParentProblem } from "../lib/parentGate.ts"
import { Button } from "./Button.tsx"
import { PageEnter } from "./PageEnter.tsx"
import { SpeechBubble } from "./SpeechBubble.tsx"

export function ParentGate({ onPass }: { onPass: () => void }) {
  const [problem, setProblem] = useState(makeParentProblem)
  const [answer, setAnswer] = useState("")
  const [wrong, setWrong] = useState(false)
  const [misses, setMisses] = useState(0)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (!locked) return
    const timer = window.setTimeout(() => setLocked(false), 30_000)
    return () => window.clearTimeout(timer)
  }, [locked])

  function submit() {
    if (locked) return
    if (Number(answer) === problem.product) {
      onPass()
      return
    }
    const nextMisses = misses + 1
    setWrong(true)
    setAnswer("")
    setProblem(makeParentProblem())
    if (nextMisses >= 3) {
      setMisses(0)
      setLocked(true)
      return
    }
    setMisses(nextMisses)
  }

  return (
    <PageEnter>
      <SpeechBubble speaker="ben" text="Grown-ups only. What is the answer?" />
      <form
        className="gate"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <p className="gate-sum">
          {problem.left} × {problem.right} = ?
        </p>
        <p className="hint">{problem.words}</p>
        <input
          className="field"
          inputMode="numeric"
          autoComplete="off"
          aria-label="Answer"
          value={answer}
          disabled={locked}
          onChange={(event) => {
            setAnswer(event.target.value)
            setWrong(false)
          }}
        />
        {locked ? <p className="form-note">Ask a grown-up</p> : null}
        {wrong && !locked ? <p className="form-note">Not quite. Try again.</p> : null}
        <Button type="submit" block disabled={locked}>
          Check
        </Button>
      </form>
    </PageEnter>
  )
}
