import type { ActivityId, WeekContent } from "./types.ts"

export const ACTIVITY_META: Record<
  ActivityId,
  { label: string; emoji: string; hint: string }
> = {
  recap: {
    label: "Story",
    emoji: "📖",
    hint: "Read with Ana and Ben",
  },
  riddles: {
    label: "Who Am I?",
    emoji: "❓",
    hint: "Pick the answer",
  },
  flashcards: {
    label: "Flip cards",
    emoji: "🃏",
    hint: "Tap to flip",
  },
  matching: {
    label: "Match up",
    emoji: "🤝",
    hint: "Tap a pair",
  },
  wordSearch: {
    label: "Word Search",
    emoji: "🔤",
    hint: "First letter, then last",
  },
  quiz: {
    label: "Quiz",
    emoji: "⭐",
    hint: "10 questions",
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
