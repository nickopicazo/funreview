import { useState } from "react"
import { makeAdditionProblem } from "../lib/parentGate.ts"
import { Button } from "./Button.tsx"
import { PageEnter } from "./PageEnter.tsx"
import { SpeechBubble } from "./SpeechBubble.tsx"

export function ParentGate({ onPass }: { onPass: () => void }) {
  const [problem] = useState(makeAdditionProblem)
  const [answer, setAnswer] = useState("")
  const [wrong, setWrong] = useState(false)

  function submit() {
    if (Number(answer) === problem.sum) {
      onPass()
      return
    }
    setWrong(true)
  }

  return (
    <PageEnter>
      <SpeechBubble
        speaker="ben"
        text="Grown-ups only. What is the answer?"
      />
      <form
        className="gate"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <p className="gate-sum">
          {problem.left} + {problem.right} = ?
        </p>
        <input
          className="field"
          inputMode="numeric"
          autoComplete="off"
          aria-label="Answer"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value)
            setWrong(false)
          }}
        />
        {wrong ? <p className="form-note">Not quite. Try again.</p> : null}
        <Button type="submit" block>
          Check
        </Button>
      </form>
    </PageEnter>
  )
}
