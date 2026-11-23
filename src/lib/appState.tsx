import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { scoreBand, track } from "./analytics.ts"
import { emptySave, loadSave, writeSave } from "./save.ts"
import { readMuted, writeMuted } from "./sounds.ts"
import type { ActivityId, QuizScore, SaveFile } from "../content/types.ts"

type AppState = {
  save: SaveFile
  muted: boolean
  toggleMuted: () => void
  isDone: (key: string, activity: ActivityId) => boolean
  isCurrent: (key: string, activity: ActivityId, order: ActivityId[]) => boolean
  completeActivity: (
    key: string,
    activity: ActivityId,
    order: ActivityId[],
    quiz?: QuizScore,
  ) => boolean
  resetProgress: () => void
  replaceSave: (next: SaveFile) => void
}

const Context = createContext<AppState | null>(null)

function firstOpen(done: ActivityId[], order: ActivityId[]) {
  return order.find((activity) => !done.includes(activity)) ?? null
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveFile>(() => loadSave())
  const [muted, setMuted] = useState(() => readMuted())
  const saveRef = useRef(save)

  useEffect(() => {
    saveRef.current = save
  }, [save])

  const commit = useCallback((next: SaveFile) => {
    saveRef.current = next
    writeSave(next)
    setSave(next)
  }, [])

  const value = useMemo<AppState>(() => {
    return {
      save,
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
      resetProgress: () => commit(emptySave()),
      replaceSave: (next) => commit(next),
    }
  }, [commit, muted, save])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppState() {
  const value = useContext(Context)
  if (!value) throw new Error("Nawawala ang AppStateProvider.")
  return value
}
