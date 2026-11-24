import { useMemo, useState } from "react"
import { Button } from "../components/Button.tsx"
import { Choices } from "../components/Choices.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { choiceSeed, shuffleChoices } from "../lib/shuffle.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

export function Reading({
  passages,
  seedKey,
  onFinish,
  lang,
}: {
  passages: NonNullable<WeekContent["reading"]>
  seedKey: string
  onFinish: () => void
  lang: LessonLang
}) {
  const [passageIndex, setPassageIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [lookingBack, setLookingBack] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const passage = passages[passageIndex]
  const question = passage?.questions[questionIndex]
  const askedBefore = passages
    .slice(0, passageIndex)
    .reduce((sum, item) => sum + item.questions.length, questionIndex)
  const choices = useMemo(
    () => (question ? shuffleChoices(question.choices, choiceSeed(seedKey, "reading", askedBefore)) : []),
    [question, seedKey, askedBefore],
  )
  if (!passage || !question) return null
  const page = passage.pages[pageIndex]
  const lastPage = pageIndex === passage.pages.length - 1
  const lastQuestion = questionIndex === passage.questions.length - 1
  const lastPassage = passageIndex === passages.length - 1

  function pick(id: string) {
    if (phase !== "open") return
    setPicked(id)
    if (id === question.correctId) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  function nextQuestion() {
    if (!lastQuestion) {
      setQuestionIndex((value) => value + 1)
      setPicked(null)
      setPhase("open")
      setLookingBack(false)
      return
    }
    if (lastPassage) {
      onFinish()
      return
    }
    setPassageIndex((value) => value + 1)
    setPageIndex(0)
    setQuestionIndex(0)
    setPicked(null)
    setPhase("open")
    setLookingBack(false)
  }

  if (pageIndex < passage.pages.length && page) {
    return (
      <div className="stack">
        {passage.title ? <h2 lang={lang}>{passage.title}</h2> : null}
        <p className="step">
          Page {pageIndex + 1} of {passage.pages.length}
        </p>
        {page.speaker ? (
          <SpeechBubble speaker={page.speaker} text={page.text} lang={lang} />
        ) : (
          <p className="panel" lang={lang}>{page.text}</p>
        )}
        <div className="row">
          {pageIndex > 0 ? (
            <Button variant="ghost" onClick={() => setPageIndex((value) => value - 1)}>
              ← Back
            </Button>
          ) : null}
          <Button
            block
            onClick={() => {
              if (lastPage) setPageIndex(passage.pages.length)
              else setPageIndex((value) => value + 1)
            }}
          >
            {lastPage ? "Questions" : "Next"}
          </Button>
        </div>
      </div>
    )
  }

  if (lookingBack) {
    return (
      <div className="stack">
        <p className="step">Look back</p>
        {passage.pages.map((item, dot) =>
          item.speaker ? (
            <SpeechBubble key={dot} speaker={item.speaker} text={item.text} lang={lang} />
          ) : (
            <p key={dot} className="panel" lang={lang}>{item.text}</p>
          ),
        )}
        <Button block onClick={() => setLookingBack(false)}>
          Back to the question
        </Button>
      </div>
    )
  }

  return (
    <div className="stack">
      {passage.title ? <p className="kicker" lang={lang}>{passage.title}</p> : null}
      <p className="step">
        Question {questionIndex + 1} of {passage.questions.length}
      </p>
      <h2 className="prompt" lang={lang}>{question.prompt}</h2>
      <Choices
        choices={choices}
        pickedId={picked}
        correctId={question.correctId}
        revealed={phase !== "open"}
        onPick={pick}
        lang={lang}
      />
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={question.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={question.explanation} textLang={lang} /> : null}
      <div className="row">
        <Button variant="blue" onClick={() => setLookingBack(true)}>
          Look back
        </Button>
        {phase !== "open" ? (
          <Button block onClick={nextQuestion}>
            {lastQuestion && lastPassage ? "Done!" : "Next"}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
