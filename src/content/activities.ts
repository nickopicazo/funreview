import type { ActivityId, WeekContent } from "./types.ts"

export const ACTIVITY_META: Record<
  ActivityId,
  { label: string; emoji: string; hint: string }
> = {
  recap: {
    label: "Balik-Aral",
    emoji: "📖",
    hint: "Maikling kwento nina Ana at Ben",
  },
  riddles: {
    label: "Sino/Ano Ako?",
    emoji: "❓",
    hint: "Piliin ang tamang sagot",
  },
  flashcards: {
    label: "Mga Kard",
    emoji: "🃏",
    hint: "I-tap para baligtarin",
  },
  matching: {
    label: "Pagpares",
    emoji: "🤝",
    hint: "I-tap ang pares",
  },
  wordSearch: {
    label: "Hanap-Salita",
    emoji: "🔤",
    hint: "I-tap ang una at huling letra",
  },
  quiz: {
    label: "Pagsusulit",
    emoji: "⭐",
    hint: "Sampung tanong",
  },
}

export function activitiesIn(week: WeekContent): ActivityId[] {
  const present: ActivityId[] = []
  if (week.recap?.length) present.push("recap")
  if (week.riddles?.length) present.push("riddles")
  if (week.flashcards?.length) present.push("flashcards")
  if (week.matching?.length) present.push("matching")
  if (week.wordSearch?.words.length) present.push("wordSearch")
  if (week.quiz?.length) present.push("quiz")
  return present
}
