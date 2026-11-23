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
        text="Para ito sa magulang. Sagutin ang bagong pagdaragdag para magpatuloy."
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
          aria-label="Sagot"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value)
            setWrong(false)
          }}
        />
        {wrong ? <p className="form-note">Hindi iyan ang sagot. Subukan ulit.</p> : null}
        <Button type="submit" block>
          Pumasok
        </Button>
      </form>
    </PageEnter>
  )
}
