import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { DoneScreen } from "../activities/DoneScreen.tsx"
import { Flashcards } from "../activities/Flashcards.tsx"
import { Matching } from "../activities/Matching.tsx"
import { Quiz } from "../activities/Quiz.tsx"
import { Recap } from "../activities/Recap.tsx"
import { Riddles } from "../activities/Riddles.tsx"
import { WordSearchGame } from "../activities/WordSearchGame.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { ACTIVITY_IDS, type ActivityId, type QuizScore, type WeekContent } from "../content/types.ts"
import { ACTIVITY_META, activitiesIn } from "../content/activities.ts"
import { findWeek } from "../content/catalog.ts"
import { useAppState } from "../lib/appState.tsx"
import { paths, weekKey } from "../lib/routes.ts"
import { playDone } from "../lib/sounds.ts"
import { useTitle } from "../lib/useTitle.ts"
import { Missing } from "./Missing.tsx"

export function ActivityPage() {
  const { quarterId = "", subjectId = "", weekId = "", activityId = "" } = useParams()
  const week = findWeek(quarterId, subjectId, weekId)
  const activity = ACTIVITY_IDS.find((id) => id === activityId)
  if (!week || !activity || !activitiesIn(week).includes(activity)) return <Missing />
  return (
    <ActivitySession
      key={`${quarterId}/${subjectId}/${week.id}/${activity}`}
      quarterId={quarterId}
      subjectId={subjectId}
      week={week}
      activity={activity}
    />
  )
}

function ActivitySession({
  quarterId,
  subjectId,
  week,
  activity,
}: {
  quarterId: string
  subjectId: string
  week: WeekContent
  activity: ActivityId
}) {
  const key = weekKey(quarterId, subjectId, week.id)
  const order = activitiesIn(week)
  const { isDone, isCurrent, completeActivity } = useAppState()
  const done = isDone(key, activity)
  const current = isCurrent(key, activity, order)
  const practice = !current && !done
  const meta = ACTIVITY_META[activity]
  const [finished, setFinished] = useState(false)
  const [awarded, setAwarded] = useState(false)
  const [mode, setMode] = useState<"fresh" | "practice" | "review">("fresh")
  const [quiz, setQuiz] = useState<QuizScore | null>(null)
  useTitle(`FunReview — ${meta.label}`, {
    description: `${meta.label} for Week ${week.id.slice(1)}.`,
  })

  const next = order[order.indexOf(activity) + 1]
  const backTo = paths.week(quarterId, subjectId, week.id)

  function finish(score?: QuizScore) {
    const counted = completeActivity(key, activity, order, score)
    setAwarded(counted && activity === "quiz")
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
        nextTo={next ? paths.activity(quarterId, subjectId, week.id, next) : null}
        nextLabel={next ? ACTIVITY_META[next].label : null}
        backTo={backTo}
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
        <h1>{week.title}</h1>
      </div>
      {practice ? (
        <p className="banner">Practice only. No check yet.</p>
      ) : null}
      {activity === "recap" && week.recap ? (
        <Recap slides={week.recap} onFinish={() => finish()} />
      ) : null}
      {activity === "riddles" && week.riddles ? (
        <Riddles items={week.riddles} onFinish={() => finish()} />
      ) : null}
      {activity === "flashcards" && week.flashcards ? (
        <Flashcards cards={week.flashcards} onFinish={() => finish()} />
      ) : null}
      {activity === "matching" && week.matching ? (
        <Matching pairs={week.matching} seedKey={key} onFinish={() => finish()} />
      ) : null}
      {activity === "wordSearch" && week.wordSearch ? (
        <WordSearchGame words={week.wordSearch.words} seedKey={key} onFinish={() => finish()} />
      ) : null}
      {activity === "quiz" && week.quiz ? (
        <Quiz items={week.quiz} onFinish={(score) => finish(score)} />
      ) : null}
    </PageEnter>
  )
}
