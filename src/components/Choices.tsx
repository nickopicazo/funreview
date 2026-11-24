import type { Choice, LessonLang } from "../content/types.ts"

export function Choices({
  choices,
  pickedId,
  correctId,
  revealed,
  onPick,
  lang,
}: {
  choices: Choice[]
  pickedId: string | null
  correctId: string
  revealed: boolean
  onPick: (id: string) => void
  lang: LessonLang
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
            lang={lang}
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
