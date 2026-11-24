export const ACTIVITY_IDS = [
  "recap",
  "riddles",
  "flashcards",
  "matching",
  "wordSearch",
  "quiz",
  "sort",
  "tapWord",
  "fillGap",
  "fixIt",
  "builder",
  "sequence",
  "reading",
  "paragraph",
  "numberPad",
  "arrays",
  "columnMultiply",
  "zeroPattern",
  "barGraph",
  "probability",
  "fingerTrick",
  "skipCount",
] as const

export type ActivityId = (typeof ACTIVITY_IDS)[number]

export type LessonLang = "fil" | "en"

export type Choice = { id: string; label: string }

export type PromptItem = {
  prompt: string
  choices: Choice[]
  correctId: string
  explanation: string
}

export type NumberItem = {
  kind: "number"
  prompt: string
  answer: number
  explanation: string
}

export type QuizItem = PromptItem | NumberItem

export function isNumberItem(item: QuizItem): item is NumberItem {
  return "kind" in item && item.kind === "number"
}

export type WeekContent = {
  id: string
  title: string
  badgeName: string
  weekLabel?: string
  activityOrder?: ActivityId[]
  recap?: { speaker: "ana" | "ben"; text: string }[]
  riddles?: PromptItem[]
  flashcards?: { front: string; name: string; place: string; fact: string }[]
  matching?: { left: string; right: string }[]
  wordSearch?: { words: string[] }
  quiz?: QuizItem[]
  sort?: { bins: Choice[]; items: { text: string; binId: string; explanation: string }[] }
  tapWord?: { words: string[]; correctIndex: number; explanation: string }[]
  fillGap?: { before: string; after: string; choices: Choice[]; correctId: string; explanation: string }[]
  fixIt?: { words: string[]; wrongIndex: number; choices: Choice[]; correctId: string; explanation: string }[]
  builder?: {
    prompt: string
    tiles: { id: string; text: string }[]
    extraTiles?: { id: string; text: string }[]
    explanation: string
  }[]
  sequence?: { prompt: string; steps: string[]; explanation: string }[]
  reading?: {
    title?: string
    pages: { speaker?: "ana" | "ben"; text: string }[]
    questions: PromptItem[]
  }[]
  paragraph?: {
    guides: { prompt: string; choices: { id: string; text: string; sentence: string }[] }[]
  }[]
  numberPad?: { prompt: string; answer: number; level: 1 | 2 | 3; explanation: string }[]
  arrays?: { rows: number; cols: number; prompt: string }[]
  columnMultiply?: { top: number; bottom: number; level: 1 | 2 }[]
  zeroPattern?: { factorA: number; factorB: number; zeros: number }[]
  barGraph?: {
    title: string
    valueLabel: string
    categoryLabel: string
    bars: { label: string; value: number }[]
    questions: QuizItem[]
  }
  probability?: {
    bag: { emoji: string; count: number }[]
    events: { text: string; answer: "certain" | "likely" | "unlikely" | "impossible"; explanation: string }[]
  }
  fingerTrick?: { facts: number[] }
  skipCount?: { prompt: string; start: number; step: number; hops: number; explanation: string }[]
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
