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
  sort: {
    label: "Sort",
    emoji: "🗂️",
    hint: "Tap a bin",
  },
  tapWord: {
    label: "Tap the word",
    emoji: "👆",
    hint: "Tap the word that fits",
  },
  fillGap: {
    label: "Fill the gap",
    emoji: "✏️",
    hint: "Choose the missing part",
  },
  fixIt: {
    label: "Fix it",
    emoji: "🔧",
    hint: "Tap the mistake, then fix it",
  },
  builder: {
    label: "Sentence builder",
    emoji: "🧱",
    hint: "Tap the words in order",
  },
  sequence: {
    label: "Order",
    emoji: "🔢",
    hint: "Tap the cards in order",
  },
  reading: {
    label: "Read",
    emoji: "📚",
    hint: "Read, then answer",
  },
  paragraph: {
    label: "Build a paragraph",
    emoji: "📝",
    hint: "Tap a chip for each question",
  },
  numberPad: {
    label: "Number pad",
    emoji: "#️⃣",
    hint: "Tap the digits",
  },
  arrays: {
    label: "Array",
    emoji: "🟦",
    hint: "Add rows, then turn it",
  },
  columnMultiply: {
    label: "Column multiply",
    emoji: "✖️",
    hint: "One column at a time",
  },
  zeroPattern: {
    label: "Zero pattern",
    emoji: "0️⃣",
    hint: "Basic fact, then the zeros",
  },
  barGraph: {
    label: "Bar graph",
    emoji: "📊",
    hint: "Tap a bar, then answer",
  },
  probability: {
    label: "Probability bag",
    emoji: "🎒",
    hint: "How likely is it?",
  },
  fingerTrick: {
    label: "9s finger trick",
    emoji: "🖐️",
    hint: "Fold one finger",
  },
  skipCount: {
    label: "Skip-count hop",
    emoji: "🐸",
    hint: "Tap the next number",
  },
}

const LEGACY_IDS = ["recap", "riddles", "flashcards", "matching", "wordSearch", "quiz"] as const

export function weekNumber(week: Pick<WeekContent, "id" | "weekLabel">) {
  return week.weekLabel ?? week.id.slice(1)
}

export function hasActivity(week: WeekContent, id: ActivityId) {
  switch (id) {
    case "recap":
      return Boolean(week.recap?.length)
    case "riddles":
      return Boolean(week.riddles?.length)
    case "flashcards":
      return Boolean(week.flashcards?.length)
    case "matching":
      return Boolean(week.matching?.length)
    case "wordSearch":
      return Boolean(week.wordSearch?.words.length)
    case "quiz":
      return Boolean(week.quiz?.length)
    case "sort":
      return Boolean(week.sort && week.sort.items.length > 0)
    case "tapWord":
      return Boolean(week.tapWord?.length)
    case "fillGap":
      return Boolean(week.fillGap?.length)
    case "fixIt":
      return Boolean(week.fixIt?.length)
    case "builder":
      return Boolean(week.builder?.length)
    case "sequence":
      return Boolean(week.sequence?.length)
    case "reading":
      return Boolean(week.reading?.length)
    case "paragraph":
      return Boolean(week.paragraph?.length)
    case "numberPad":
      return Boolean(week.numberPad?.length)
    case "arrays":
      return Boolean(week.arrays?.length)
    case "columnMultiply":
      return Boolean(week.columnMultiply?.length)
    case "zeroPattern":
      return Boolean(week.zeroPattern?.length)
    case "barGraph":
      return Boolean(week.barGraph)
    case "probability":
      return Boolean(week.probability && week.probability.events.length > 0)
    case "fingerTrick":
      return Boolean(week.fingerTrick && week.fingerTrick.facts.length > 0)
    case "skipCount":
      return Boolean(week.skipCount?.length)
    default:
      return false
  }
}

export function activitiesIn(week: WeekContent): ActivityId[] {
  if (week.activityOrder?.length) return [...week.activityOrder]
  return LEGACY_IDS.filter((id) => hasActivity(week, id))
}
