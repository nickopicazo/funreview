import { createContext, useContext } from "react"
import type { ActivityId, QuizScore, SaveFile } from "../content/types.ts"

export type AppState = {
  save: SaveFile
  canSave: boolean
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
  recordQuizScore: (key: string, score: QuizScore) => boolean
  resetProgress: () => void
}

export const AppStateContext = createContext<AppState | null>(null)

export function useAppState() {
  const value = useContext(AppStateContext)
  if (!value) throw new Error("AppStateProvider is missing.")
  return value
}
