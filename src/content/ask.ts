import type { NumberItem, PromptItem } from "./types.ts"

export function ask(
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): PromptItem {
  if (options.length < 2 || options.length > 4) {
    throw new Error(`A question needs 2 to 4 choices: ${prompt}`)
  }
  if (correctIndex < 0 || correctIndex >= options.length) {
    throw new Error(`The correct choice is missing: ${prompt}`)
  }
  const ids = ["a", "b", "c", "d"]
  return {
    prompt,
    choices: options.map((label, index) => ({ id: ids[index] ?? String(index), label })),
    correctId: ids[correctIndex] ?? "a",
    explanation,
  }
}

export function numberAsk(prompt: string, answer: number, explanation: string): NumberItem {
  return { kind: "number", prompt, answer, explanation }
}
