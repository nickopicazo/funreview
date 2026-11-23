import { ACTIVITY_IDS, type ActivityId, type QuizScore, type SaveFile, type WeekSave } from "../content/types.ts"
import { safeGet, safeSet } from "./storage.ts"

export const SAVE_KEY = "funreview-save-v1"

export function emptySave(): SaveFile {
  return { version: 1, weeks: {} }
}

function isActivityId(value: unknown): value is ActivityId {
  return typeof value === "string" && ACTIVITY_IDS.includes(value as ActivityId)
}

function sanitizeQuiz(value: unknown): QuizScore | undefined {
  if (!value || typeof value !== "object") return undefined
  const quiz = value as Record<string, unknown>
  if (
    typeof quiz.correct !== "number" ||
    typeof quiz.total !== "number" ||
    typeof quiz.gintongBituin !== "boolean"
  ) {
    return undefined
  }
  return {
    correct: quiz.correct,
    total: quiz.total,
    gintongBituin: quiz.gintongBituin,
  }
}

function sanitizeWeek(value: unknown): WeekSave | null {
  if (!value || typeof value !== "object") return null
  const week = value as Record<string, unknown>
  if (!Array.isArray(week.completedActivities)) return null
  const seen = new Set<ActivityId>()
  const completedActivities: ActivityId[] = []
  for (const activity of week.completedActivities) {
    if (isActivityId(activity) && !seen.has(activity)) {
      seen.add(activity)
      completedActivities.push(activity)
    }
  }
  const quiz = sanitizeQuiz(week.quiz)
  return {
    completedActivities,
    badgeEarned: week.badgeEarned === true,
    ...(quiz ? { quiz } : {}),
  }
}

export function sanitizeSave(value: unknown): SaveFile | null {
  if (!value || typeof value !== "object") return null
  const save = value as Record<string, unknown>
  if (save.version !== 1 || !save.weeks || typeof save.weeks !== "object" || Array.isArray(save.weeks)) {
    return null
  }
  const weeks: SaveFile["weeks"] = {}
  for (const [key, week] of Object.entries(save.weeks)) {
    const clean = sanitizeWeek(week)
    if (clean) weeks[key] = clean
  }
  return { version: 1, weeks }
}

export function loadSave(): SaveFile {
  try {
    const raw = safeGet(SAVE_KEY)
    if (!raw) return emptySave()
    return sanitizeSave(JSON.parse(raw)) ?? emptySave()
  } catch {
    return emptySave()
  }
}

export function writeSave(save: SaveFile) {
  return safeSet(SAVE_KEY, JSON.stringify(save))
}
