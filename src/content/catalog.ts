import type { WeekContent } from "./types.ts"
import { makabansaWeeks } from "./q3/makabansa.ts"

export type QuarterInfo = {
  id: string
  title: string
  order: string
}

export type SubjectInfo = {
  id: string
  title: string
  emoji: string
}

export const quarters: QuarterInfo[] = [
  { id: "q1", title: "Unang Markahan", order: "1" },
  { id: "q2", title: "Ikalawang Markahan", order: "2" },
  { id: "q3", title: "Ikatlong Markahan", order: "3" },
  { id: "q4", title: "Ikaapat na Markahan", order: "4" },
]

export const subjects: SubjectInfo[] = [
  { id: "filipino", title: "Filipino", emoji: "📘" },
  { id: "english", title: "English", emoji: "📗" },
  { id: "mathematics", title: "Mathematics", emoji: "🔢" },
  { id: "science", title: "Science", emoji: "🔬" },
  { id: "makabansa", title: "Makabansa", emoji: "🇵🇭" },
  { id: "gmrc", title: "GMRC", emoji: "💛" },
]

const lessons: Record<string, WeekContent[]> = {
  "q3/makabansa": makabansaWeeks,
}

export function subjectKey(quarterId: string, subjectId: string) {
  return `${quarterId}/${subjectId}`
}

export function getQuarter(quarterId: string) {
  return quarters.find((quarter) => quarter.id === quarterId) ?? null
}

export function getSubject(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId) ?? null
}

export function getWeeks(quarterId: string, subjectId: string) {
  return lessons[subjectKey(quarterId, subjectId)] ?? null
}

export function findWeek(quarterId: string, subjectId: string, weekId: string) {
  return getWeeks(quarterId, subjectId)?.find((week) => week.id === weekId) ?? null
}

export function quarterHasContent(quarterId: string) {
  return subjects.some((subject) => getWeeks(quarterId, subject.id))
}
