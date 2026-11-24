import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Arrays } from "../activities/Arrays.tsx"
import { BarGraph } from "../activities/BarGraph.tsx"
import { ColumnMultiply } from "../activities/ColumnMultiply.tsx"
import { DoneScreen } from "../activities/DoneScreen.tsx"
import { FillGap } from "../activities/FillGap.tsx"
import { FingerTrick } from "../activities/FingerTrick.tsx"
import { FixIt } from "../activities/FixIt.tsx"
import { Flashcards } from "../activities/Flashcards.tsx"
import { Matching } from "../activities/Matching.tsx"
import { NumberPractice } from "../activities/NumberPractice.tsx"
import { Paragraph } from "../activities/Paragraph.tsx"
import { ProbabilityBag } from "../activities/ProbabilityBag.tsx"
import { Quiz } from "../activities/Quiz.tsx"
import { Reading } from "../activities/Reading.tsx"
import { Recap } from "../activities/Recap.tsx"
import { Riddles } from "../activities/Riddles.tsx"
import { SentenceBuilder } from "../activities/SentenceBuilder.tsx"
import { Sequence } from "../activities/Sequence.tsx"
import { SkipCount } from "../activities/SkipCount.tsx"
import { SortBins } from "../activities/SortBins.tsx"
import { TapWord } from "../activities/TapWord.tsx"
import { WordSearchGame } from "../activities/WordSearchGame.tsx"
import { ZeroPattern } from "../activities/ZeroPattern.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { ACTIVITY_META, activitiesIn, weekNumber } from "../content/activities.ts"
import { findWeek, getSubject } from "../content/catalog.ts"
import { ACTIVITY_IDS, type ActivityId, type QuizScore, type WeekContent } from "../content/types.ts"
import { useAppState } from "../lib/useAppState.ts"
import { paths, weekKey } from "../lib/routes.ts"
import { playDone } from "../lib/sounds.ts"
import { useTitle } from "../lib/useTitle.ts"
import { Missing } from "./Missing.tsx"

export function ActivityPage() {
  const { quarterId = "", subjectId = "", weekId = "", activityId = "" } = useParams()
  const week = findWeek(quarterId, subjectId, weekId)
  const subject = getSubject(subjectId)
  const activity = ACTIVITY_IDS.find((id) => id === activityId)
  if (!week || !subject || !activity || !activitiesIn(week).includes(activity)) return <Missing />
  return (
    <ActivitySession
      key={`${quarterId}/${subjectId}/${week.id}/${activity}`}
      quarterId={quarterId}
      subjectId={subjectId}
      week={week}
      activity={activity}
      lang={subject.lessonLang}
    />
  )
}

function ActivitySession({
  quarterId,
  subjectId,
  week,
  activity,
  lang,
}: {
  quarterId: string
  subjectId: string
  week: WeekContent
  activity: ActivityId
  lang: "fil" | "en"
}) {
  const key = weekKey(quarterId, subjectId, week.id)
  const order = activitiesIn(week)
  const { isDone, isCurrent, completeActivity, recordQuizScore } = useAppState()
  const done = isDone(key, activity)
  const current = isCurrent(key, activity, order)
  const practice = !current && !done
  const meta = ACTIVITY_META[activity]
  const [finished, setFinished] = useState(false)
  const [awarded, setAwarded] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const [mode, setMode] = useState<"fresh" | "practice" | "review">("fresh")
  const [quiz, setQuiz] = useState<QuizScore | null>(null)
  const number = weekNumber(week)
  useTitle(`FunReview — ${meta.label}`, {
    description: `${meta.label} for Week ${number}.`,
  })

  const next = order[order.indexOf(activity) + 1]
  const backTo = paths.week(quarterId, subjectId, week.id)

  function finish(score?: QuizScore) {
    const counted = completeActivity(key, activity, order, score)
    const improved =
      activity === "quiz" && score && !practice ? recordQuizScore(key, score) : false
    setAwarded(counted && activity === "quiz")
    setNewBest(improved)
    setMode(counted ? "fresh" : practice ? "practice" : "review")
    setQuiz(score ?? null)
    setFinished(true)
    playDone()
  }

  if (finished) {
    return (
      <DoneScreen
        practice={mode === "practice"}
        review={mode === "review"}
        badgeName={week.badgeName}
        awardedBadge={awarded}
        quiz={quiz}
        newBest={newBest}
        nextTo={next ? paths.activity(quarterId, subjectId, week.id, next) : null}
        nextLabel={next ? ACTIVITY_META[next].label : null}
        backTo={backTo}
        badgeLang={lang}
      />
    )
  }

  return (
    <PageEnter>
      <Link className="back" to={backTo}>
        ← This week
      </Link>
      <div className="title-block">
        <p className="kicker">{meta.emoji} {meta.label}</p>
        <h1 lang={lang}>{week.title}</h1>
      </div>
      {practice ? <p className="banner">Practice only. No check yet.</p> : null}
      {activity === "recap" && week.recap ? (
        <Recap slides={week.recap} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "riddles" && week.riddles ? (
        <Riddles items={week.riddles} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "flashcards" && week.flashcards ? (
        <Flashcards cards={week.flashcards} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "matching" && week.matching ? (
        <Matching pairs={week.matching} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "wordSearch" && week.wordSearch ? (
        <WordSearchGame words={week.wordSearch.words} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "quiz" && week.quiz ? (
        <Quiz items={week.quiz} seedKey={key} onFinish={(score) => finish(score)} lang={lang} />
      ) : null}
      {activity === "sort" && week.sort ? (
        <SortBins data={week.sort} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "tapWord" && week.tapWord ? (
        <TapWord items={week.tapWord} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "fillGap" && week.fillGap ? (
        <FillGap items={week.fillGap} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "fixIt" && week.fixIt ? (
        <FixIt items={week.fixIt} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "builder" && week.builder ? (
        <SentenceBuilder items={week.builder} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "sequence" && week.sequence ? (
        <Sequence items={week.sequence} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "reading" && week.reading ? (
        <Reading passages={week.reading} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "paragraph" && week.paragraph ? (
        <Paragraph items={week.paragraph} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "skipCount" && week.skipCount ? (
        <SkipCount items={week.skipCount} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "arrays" && week.arrays ? (
        <Arrays items={week.arrays} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "numberPad" && week.numberPad ? (
        <NumberPractice items={week.numberPad} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "fingerTrick" && week.fingerTrick ? (
        <FingerTrick facts={week.fingerTrick.facts} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "columnMultiply" && week.columnMultiply ? (
        <ColumnMultiply items={week.columnMultiply} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "zeroPattern" && week.zeroPattern ? (
        <ZeroPattern items={week.zeroPattern} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "barGraph" && week.barGraph ? (
        <BarGraph data={week.barGraph} seedKey={key} onFinish={() => finish()} lang={lang} />
      ) : null}
      {activity === "probability" && week.probability ? (
        <ProbabilityBag data={week.probability} onFinish={() => finish()} lang={lang} />
      ) : null}
    </PageEnter>
  )
}
