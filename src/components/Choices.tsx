import type { Choice } from "../content/types.ts"

export function Choices({
  choices,
  pickedId,
  correctId,
  revealed,
  onPick,
}: {
  choices: Choice[]
  pickedId: string | null
  correctId: string
  revealed: boolean
  onPick: (id: string) => void
}) {
  return (
    <div className="choices">
      {choices.map((choice) => {
        const picked = pickedId === choice.id
        const showCorrect = revealed && choice.id === correctId
        const showWrong = revealed && picked && choice.id !== correctId
        const tone = showCorrect ? " ok" : showWrong ? " bad" : ""
        return (
          <button
            key={choice.id}
            type="button"
            className={`choice${tone}`}
            onClick={() => onPick(choice.id)}
            disabled={revealed}
          >
            {choice.label}
          </button>
        )
      })}
    </div>
  )
}
