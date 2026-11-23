export type ParentProblem = {
  left: number
  right: number
  product: number
  words: string
}

const SMALL = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
]

const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

export function numberWords(value: number) {
  if (value < 20) return SMALL[value] ?? String(value)
  const tens = Math.floor(value / 10)
  const ones = value % 10
  const tenWord = TENS[tens] ?? String(value)
  if (ones === 0) return tenWord
  const oneWord = SMALL[ones] ?? String(ones)
  return `${tenWord}-${oneWord}`
}

export function makeParentProblem(): ParentProblem {
  let left = 10
  let right = 2
  let product = left * right
  while (product < 100) {
    left = 10 + Math.floor(Math.random() * 90)
    right = 2 + Math.floor(Math.random() * 8)
    product = left * right
  }
  return {
    left,
    right,
    product,
    words: `${numberWords(left)} times ${numberWords(right)}`,
  }
}
