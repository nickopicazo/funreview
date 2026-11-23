import type { ActivityId, WeekContent } from "./types.ts"

export const ACTIVITY_META: Record<
  ActivityId,
  { label: string; emoji: string; hint: string }
> = {
  recap: {
    label: "Recap",
    emoji: "📖",
    hint: "A short story with Ana and Ben",
  },
  riddles: {
    label: "Who Am I?",
    emoji: "❓",
    hint: "Pick the right answer",
  },
  flashcards: {
    label: "Cards",
    emoji: "🃏",
    hint: "Tap to flip",
  },
  matching: {
    label: "Matching",
    emoji: "🤝",
    hint: "Tap the pair",
  },
  wordSearch: {
    label: "Word Search",
    emoji: "🔤",
    hint: "Tap the first and last letter",
  },
  quiz: {
    label: "Quiz",
    emoji: "⭐",
    hint: "Ten questions",
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
