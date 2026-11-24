const PLACES = ["ones", "tens", "hundreds", "thousands"] as const

export type ColumnStep = {
  place: (typeof PLACES)[number]
  digit: number
  incoming: number
  raw: number
  sum: number
  write: number
  carryOut: number
}

export function columnSteps(top: number, bottom: number): ColumnStep[] {
  const digits = [...String(top)].reverse().map((char) => Number(char))
  const steps: ColumnStep[] = []
  let carry = 0
  for (let index = 0; index < digits.length; index += 1) {
    const digit = digits[index] ?? 0
    const raw = digit * bottom
    const sum = raw + carry
    const place = PLACES[index]
    if (!place) break
    steps.push({
      place,
      digit,
      incoming: carry,
      raw,
      sum,
      write: sum % 10,
      carryOut: Math.floor(sum / 10),
    })
    carry = Math.floor(sum / 10)
  }
  if (carry > 0) {
    const place = PLACES[digits.length]
    if (place) {
      steps.push({
        place,
        digit: 0,
        incoming: carry,
        raw: 0,
        sum: carry,
        write: carry % 10,
        carryOut: Math.floor(carry / 10),
      })
    }
  }
  return steps
}

export function hasColumnCarry(top: number, bottom: number) {
  return columnSteps(top, bottom).some((step) => step.carryOut > 0)
}

export function stepPrompt(step: ColumnStep, bottom: number) {
  const place = step.place[0]?.toUpperCase() + step.place.slice(1)
  if (step.raw === 0 && step.incoming > 0) {
    return `${place}: write the ${step.incoming} you carried.`
  }
  if (step.incoming === 0) {
    return `${place}: ${step.digit} × ${bottom}. Which digit do you write?`
  }
  return `${place}: ${step.digit} × ${bottom}, plus the ${step.incoming} you carried. Which digit do you write?`
}

export function stepExplanation(step: ColumnStep, bottom: number) {
  if (step.raw === 0 && step.incoming > 0) {
    return `Write the ${step.write} you carried.`
  }
  if (step.incoming === 0 && step.carryOut === 0) {
    return `${step.digit} × ${bottom} = ${step.sum}. Write ${step.write}.`
  }
  if (step.incoming === 0) {
    return `${step.digit} × ${bottom} = ${step.sum}. Write ${step.write}. Carry ${step.carryOut}.`
  }
  const carried = step.carryOut > 0 ? ` Carry ${step.carryOut}.` : ""
  return `${step.digit} × ${bottom} = ${step.raw}, plus ${step.incoming} is ${step.sum}. Write ${step.write}.${carried}`
}
