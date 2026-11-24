import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Choices } from "../components/Choices.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { NumberPad } from "../components/NumberPad.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { isNumberItem } from "../content/types.ts"
import { shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

const COLORS = ["#2f7de1", "#1f9d6a", "#f0b429", "#ef6d6d", "#7c6cf0"]

export function BarGraph({
  data,
  seedKey,
  onFinish,
  lang,
}: {
  data: NonNullable<WeekContent["barGraph"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [open, setOpen] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [entry, setEntry] = useState("")
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const question = data.questions[index]
  const choices = useMemo(
    () => (question && !isNumberItem(question) ? shuffleChoices(question.choices, `${seedKey}:graph:${index}`) : []),
    [question, seedKey, index],
  )
  if (!question) return null
  const max = Math.max(...data.bars.map((bar) => bar.value), 1)
  const last = index === data.questions.length - 1
  const width = 320
  const height = 220
  const plotLeft = 42
  const plotBottom = 36
  const plotTop = 16
  const plotWidth = width - plotLeft - 12
  const plotHeight = height - plotBottom - plotTop
  const slot = plotWidth / data.bars.length

  function reveal(label: string) {
    setOpen((current) => (current.includes(label) ? current : [...current, label]))
  }

  function lock(correct: boolean) {
    if (correct) playCorrect()
    else playWrong()
    setPhase(correct ? "right" : "wrong")
  }

  function pick(id: string) {
    if (phase !== "open" || isNumberItem(question)) return
    setPicked(id)
    lock(id === question.correctId)
  }

  function submit() {
    if (phase !== "open" || !isNumberItem(question) || entry.trim() === "") return
    const correct = Number(entry) === question.answer
    if (!correct) setEntry(String(question.answer))
    lock(correct)
  }

  return (
    <div className="stack">
      <h2 lang={lang}>{data.title}</h2>
      <p className="hint">Tap a bar to see its value.</p>
      <svg className="graph-svg" viewBox={`0 0 ${width} ${height}`} role="group" aria-label={data.title}>
        {[0, 0.5, 1].map((mark) => {
          const y = plotTop + plotHeight - mark * plotHeight
          const value = Math.round(max * mark)
          return (
            <g key={mark}>
              <line x1={plotLeft} x2={width - 12} y1={y} y2={y} className="gridline" />
              <text x={plotLeft - 6} y={y + 4} textAnchor="end" className="axis-label">
                {value}
              </text>
            </g>
          )
        })}
        <line x1={plotLeft} x2={plotLeft} y1={plotTop} y2={plotTop + plotHeight} className="axis" />
        <line x1={plotLeft} x2={width - 12} y1={plotTop + plotHeight} y2={plotTop + plotHeight} className="axis" />
        {data.bars.map((bar, barIndex) => {
          const barHeight = (bar.value / max) * plotHeight
          const x = plotLeft + barIndex * slot + slot * 0.18
          const barWidth = slot * 0.64
          const y = plotTop + plotHeight - barHeight
          const seen = open.includes(bar.label)
          return (
            <g key={bar.label} onClick={() => reveal(bar.label)} className="graph-bar">
              <rect x={x} y={y} width={barWidth} height={barHeight} rx={8} fill={COLORS[barIndex % COLORS.length]} />
              {seen ? (
                <text x={x + barWidth / 2} y={Math.max(plotTop + 12, y - 6)} textAnchor="middle" className="bar-value">
                  {bar.value}
                </text>
              ) : null}
            </g>
          )
        })}
      </svg>
      <div className="bins">
        {data.bars.map((bar) => (
          <button key={bar.label} type="button" className="choice" onClick={() => reveal(bar.label)}>
            {bar.label}
            {open.includes(bar.label) ? `: ${bar.value}` : ""}
          </button>
        ))}
      </div>
      <p className="hint">
        {data.valueLabel} · {data.categoryLabel}
      </p>
      <p className="step">
        Question {index + 1} of {data.questions.length}
      </p>
      <h2 className="prompt" lang={lang}>{question.prompt}</h2>
      {isNumberItem(question) ? (
        <NumberPad
          value={phase === "open" ? entry : String(question.answer)}
          onChange={setEntry}
          onSubmit={submit}
          disabled={phase !== "open"}
        />
      ) : (
        <Choices
          choices={choices}
          pickedId={picked}
          correctId={question.correctId}
          revealed={phase !== "open"}
          onPick={pick}
          lang={lang}
        />
      )}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={question.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={question.explanation} textLang={lang} /> : null}
      {phase !== "open" ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setPicked(null)
            setEntry("")
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}
