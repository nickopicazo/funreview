import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { NumberPad } from "../components/NumberPad.tsx"
import { columnSteps, stepExplanation, stepPrompt, type ColumnStep } from "../content/multiply.ts"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

const PLACE_LABEL = ["O", "T", "H", "Th"]

function Board({
  top,
  bottom,
  steps,
  stepIndex,
  revealed,
}: {
  top: number
  bottom: number
  steps: ColumnStep[]
  stepIndex: number
  revealed: boolean
}) {
  const product = top * bottom
  const width = Math.max(String(top).length, String(product).length, steps.length)
  const topText = String(top).padStart(width, " ")
  const done = revealed ? stepIndex + 1 : stepIndex
  return (
    <div className="column-sum" style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}>
      {Array.from({ length: width }, (_, fromLeft) => {
        const place = width - 1 - fromLeft
        const carryStep = steps[place - 1]
        const showCarry = carryStep && carryStep.carryOut > 0 && place - 1 < done
        return (
          <span key={`carry-${place}`} className="carry">
            {showCarry ? carryStep.carryOut : ""}
          </span>
        )
      })}
      {Array.from({ length: width }, (_, fromLeft) => {
        const place = width - 1 - fromLeft
        return (
          <span key={`label-${place}`} className="place-label">
            {PLACE_LABEL[place] ?? ""}
          </span>
        )
      })}
      {Array.from({ length: width }, (_, fromLeft) => (
        <span key={`top-${fromLeft}`} className="digit">
          {topText[fromLeft] === " " ? "" : topText[fromLeft]}
        </span>
      ))}
      {Array.from({ length: width }, (_, fromLeft) => {
        const place = width - 1 - fromLeft
        return (
          <span key={`times-${place}`} className="digit">
            {place === 0 ? bottom : place === 1 ? "×" : ""}
          </span>
        )
      })}
      {Array.from({ length: width }, (_, fromLeft) => {
        const place = width - 1 - fromLeft
        const step = steps[place]
        const active = place === stepIndex
        const show = step && place < done
        return (
          <span key={`answer-${place}`} className={`digit answer${active ? " is-on" : ""}`}>
            {show ? step.write : active ? "?" : ""}
          </span>
        )
      })}
    </div>
  )
}

export function ColumnMultiply({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["columnMultiply"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [entry, setEntry] = useState("")
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const steps = columnSteps(item.top, item.bottom)
  const step = steps[stepIndex]
  if (!step) return null
  const lastStep = stepIndex === steps.length - 1
  const lastItem = index === items.length - 1
  const explanation = stepExplanation(step, item.bottom)

  function submit() {
    if (phase !== "open" || entry.trim() === "") return
    if (Number(entry) === step.write) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setEntry(String(step.write))
    setPhase("wrong")
  }

  function advance() {
    if (!lastStep) {
      setStepIndex((value) => value + 1)
      setEntry("")
      setPhase("open")
      return
    }
    if (lastItem) {
      onFinish()
      return
    }
    setIndex((value) => value + 1)
    setStepIndex(0)
    setEntry("")
    setPhase("open")
  }

  return (
    <div className="stack">
      <p className="step">
        Level {item.level} · Problem {index + 1} of {items.length} · Step {stepIndex + 1} of {steps.length}
      </p>
      <Board top={item.top} bottom={item.bottom} steps={steps} stepIndex={stepIndex} revealed={phase !== "open"} />
      <h2 className="prompt" lang={lang}>{stepPrompt(step, item.bottom)}</h2>
      <NumberPad
        value={phase === "open" ? entry : String(step.write)}
        onChange={setEntry}
        onSubmit={submit}
        disabled={phase !== "open"}
        maxDigits={1}
      />
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button block onClick={advance}>
          {lastStep && lastItem ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
