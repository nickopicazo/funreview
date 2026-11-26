import type { LessonLang, WeekContent } from "./types.ts"
import { computerWeeks } from "./q3/computer.ts"
import { englishWeeks } from "./q3/english.ts"
import { filipinoWeeks } from "./q3/filipino.ts"
import { makabansaWeeks } from "./q3/makabansa.ts"
import { mathematicsWeeks } from "./q3/mathematics.ts"

export type QuarterInfo = {
  id: string
  title: string
  order: string
}

export type SubjectInfo = {
  id: string
  title: string
  emoji: string
  lessonLang: LessonLang
}

export const quarters: QuarterInfo[] = [
  { id: "q1", title: "Quarter 1", order: "1" },
  { id: "q2", title: "Quarter 2", order: "2" },
  { id: "q3", title: "Quarter 3", order: "3" },
  { id: "q4", title: "Quarter 4", order: "4" },
]

export const subjects: SubjectInfo[] = [
  { id: "filipino", title: "Filipino", emoji: "📘", lessonLang: "fil" },
  { id: "english", title: "English", emoji: "📗", lessonLang: "en" },
  { id: "mathematics", title: "Mathematics", emoji: "🔢", lessonLang: "en" },
  { id: "science", title: "Science", emoji: "🔬", lessonLang: "en" },
  { id: "makabansa", title: "Makabansa", emoji: "🇵🇭", lessonLang: "fil" },
  { id: "gmrc", title: "GMRC", emoji: "💛", lessonLang: "fil" },
  { id: "computer", title: "Computer", emoji: "💻", lessonLang: "en" },
]

const lessons: Record<string, WeekContent[]> = {
  "q3/filipino": filipinoWeeks,
  "q3/english": englishWeeks,
  "q3/mathematics": mathematicsWeeks,
  "q3/makabansa": makabansaWeeks,
  "q3/computer": computerWeeks,
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
