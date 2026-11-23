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
        text="This is for a parent. Answer a new addition problem to continue."
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
        {wrong ? <p className="form-note">That isn't the answer. Try again.</p> : null}
        <Button type="submit" block>
          Continue
        </Button>
      </form>
    </PageEnter>
  )
}
