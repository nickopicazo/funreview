import { ACTIVITY_IDS, type ActivityId, type QuizScore, type SaveFile, type WeekSave } from "../content/types.ts"

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
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return emptySave()
    return sanitizeSave(JSON.parse(raw)) ?? emptySave()
  } catch {
    return emptySave()
  }
}

export function writeSave(save: SaveFile) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save))
}

export function prettySave(save: SaveFile) {
  return JSON.stringify(save, null, 2)
}

export function encodeBackup(save: SaveFile) {
  const json = prettySave(save)
  const bytes = new TextEncoder().encode(json)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeBase64(value: string) {
  try {
    const binary = atob(value.replace(/\s/g, ""))
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}

export function parseBackup(input: string): SaveFile | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  const jsonText = trimmed.startsWith("{") ? trimmed : decodeBase64(trimmed)
  if (!jsonText) return null
  try {
    return sanitizeSave(JSON.parse(jsonText))
  } catch {
    return null
  }
}
