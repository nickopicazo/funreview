export const ACTIVITY_IDS = [
  "recap",
  "riddles",
  "flashcards",
  "matching",
  "wordSearch",
  "quiz",
] as const

export type ActivityId = (typeof ACTIVITY_IDS)[number]

export type Choice = { id: string; label: string }

export type PromptItem = {
  prompt: string
  choices: Choice[]
  correctId: string
  explanation: string
}

export type WeekContent = {
  id: string
  title: string
  badgeName: string
  recap?: { speaker: "ana" | "ben"; text: string }[]
  riddles?: PromptItem[]
  flashcards?: { front: string; name: string; place: string; fact: string }[]
  matching?: { left: string; right: string }[]
  wordSearch?: { words: string[] }
  quiz?: PromptItem[]
}

export type QuizScore = {
  correct: number
  total: number
  gintongBituin: boolean
}

export type WeekSave = {
  completedActivities: ActivityId[]
  quiz?: QuizScore
  badgeEarned: boolean
}

export type SaveFile = {
  version: 1
  weeks: Record<string, WeekSave>
}
