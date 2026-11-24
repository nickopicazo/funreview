import type { Choice } from "../content/types.ts"
import { mulberry32, seedFromText } from "./wordSearch.ts"

export const CHOICE_SALT = "11"

export function choiceSeed(weekKey: string, activity: string, index: number) {
  return `${weekKey}:${activity}:${index}`
}

export function shuffleChoices(choices: Choice[], seed: string): Choice[] {
  const random = mulberry32(seedFromText(`${CHOICE_SALT}:${seed}`))
  const next = [...choices]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = next[index]
    next[index] = next[swap] ?? current
    next[swap] = current
  }
  return next
}

export function correctPosition(choices: Choice[], correctId: string, seed: string) {
  return shuffleChoices(choices, seed).findIndex((choice) => choice.id === correctId)
}

export function shuffleList<T>(items: readonly T[], seed: string): T[] {
  const random = mulberry32(seedFromText(`${CHOICE_SALT}:${seed}`))
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = next[index] as T
    next[index] = next[swap] as T
    next[swap] = current
  }
  return next
}
