import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { ActivityId, QuizScore, SaveFile } from "../content/types.ts"
import { scoreBand, track } from "./analytics.ts"
import { emptySave, loadSave, writeSave } from "./save.ts"
import { readMuted, writeMuted } from "./sounds.ts"
import { AppStateContext, type AppState } from "./useAppState.ts"

function firstOpen(done: ActivityId[], order: ActivityId[]) {
  return order.find((activity) => !done.includes(activity)) ?? null
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveFile>(() => loadSave())
  const [canSave, setCanSave] = useState(true)
  const [muted, setMuted] = useState(() => readMuted())
  const saveRef = useRef(save)

  useEffect(() => {
    saveRef.current = save
  }, [save])

  useEffect(() => {
    setCanSave(writeSave(saveRef.current))
  }, [])

  const commit = useCallback((next: SaveFile) => {
    saveRef.current = next
    setCanSave(writeSave(next))
    setSave(next)
  }, [])

  const value = useMemo<AppState>(() => {
    return {
      save,
      canSave,
      muted,
      toggleMuted: () => {
        setMuted((current) => {
          writeMuted(!current)
          return !current
        })
      },
      isDone: (key, activity) =>
        save.weeks[key]?.completedActivities.includes(activity) ?? false,
      isCurrent: (key, activity, order) => {
        const done = save.weeks[key]?.completedActivities ?? []
        return firstOpen(done, order) === activity
      },
      completeActivity: (key, activity, order, quiz) => {
        const current = saveRef.current
        const previous = current.weeks[key]
        const done = previous?.completedActivities ?? []
        if (done.includes(activity)) return false
        if (firstOpen(done, order) !== activity) return false
        const completedActivities = [...done, activity]
        const badgeEarned = activity === "quiz" && quiz ? true : (previous?.badgeEarned ?? false)
        const nextWeek = {
          completedActivities,
          badgeEarned,
          ...(activity === "quiz" && quiz
            ? { quiz }
            : previous?.quiz
              ? { quiz: previous.quiz }
              : {}),
        }
        commit({
          version: 1,
          weeks: { ...current.weeks, [key]: nextWeek },
        })
        track("activity_completed", { week: key, activity })
        if (activity === "quiz" && quiz) {
          track("quiz_score_band", { week: key, band: scoreBand(quiz.correct) })
          if (badgeEarned) track("badge_earned", { week: key })
        }
        return true
      },
      recordQuizScore: (key, score) => {
        const current = saveRef.current
        const previous = current.weeks[key]
        if (!previous?.completedActivities.includes("quiz")) return false
        const savedCorrect = previous.quiz?.correct ?? -1
        if (score.correct <= savedCorrect) return false
        const quiz: QuizScore = {
          correct: score.correct,
          total: score.total,
          gintongBituin: score.correct >= 8,
        }
        commit({
          version: 1,
          weeks: {
            ...current.weeks,
            [key]: { ...previous, quiz },
          },
        })
        track("quiz_score_band", { week: key, band: scoreBand(quiz.correct) })
        return true
      },
      resetProgress: () => commit(emptySave()),
    }
  }, [canSave, commit, muted, save])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
