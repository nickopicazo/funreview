export type AdditionProblem = {
  left: number
  right: number
  sum: number
}

export function makeAdditionProblem(): AdditionProblem {
  const left = 5 + Math.floor(Math.random() * 8)
  const right = 5 + Math.floor(Math.random() * 8)
  return { left, right, sum: left + right }
}
