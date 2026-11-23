const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
] as const

export type WordSearchPuzzle = {
  grid: string[][]
  words: string[]
}

export function normalizeWord(word: string) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
}

export function seedFromText(text: string) {
  return [...text].reduce((sum, char) => (Math.imul(sum, 33) + char.charCodeAt(0)) >>> 0, 5381)
}

function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function canPlace(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dRow: number,
  dCol: number,
) {
  const size = grid.length
  for (let index = 0; index < word.length; index += 1) {
    const nextRow = row + dRow * index
    const nextCol = col + dCol * index
    if (nextRow < 0 || nextCol < 0 || nextRow >= size || nextCol >= size) return false
    const existing = grid[nextRow]?.[nextCol]
    if (existing && existing !== word[index]) return false
  }
  return true
}

function place(
  grid: string[][],
  word: string,
  random: () => number,
) {
  const size = grid.length
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const direction = DIRECTIONS[Math.floor(random() * DIRECTIONS.length)] ?? DIRECTIONS[0]
    const row = Math.floor(random() * size)
    const col = Math.floor(random() * size)
    if (!canPlace(grid, word, row, col, direction[0], direction[1])) continue
    for (let index = 0; index < word.length; index += 1) {
      const nextRow = row + direction[0] * index
      const nextCol = col + direction[1] * index
      const line = grid[nextRow]
      if (line) line[nextCol] = word[index] ?? ""
    }
    return true
  }
  return false
}

export function createWordSearch(rawWords: string[], seed: number): WordSearchPuzzle {
  const words = rawWords.map(normalizeWord).filter((word) => word.length >= 3)
  const longest = words.reduce((max, word) => Math.max(max, word.length), 0)
  const ordered = [...words].sort((a, b) => b.length - a.length)

  for (let extra = 0; extra <= 4; extra += 1) {
    const size = Math.max(8, longest + extra)
    const random = mulberry32(seed + extra * 997)
    const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ""))
    const placed = ordered.every((word) => place(grid, word, random))
    if (!placed) continue
    for (const line of grid) {
      for (let col = 0; col < line.length; col += 1) {
        if (!line[col]) {
          line[col] = ALPHABET[Math.floor(random() * ALPHABET.length)] ?? "A"
        }
      }
    }
    return { grid, words }
  }

  throw new Error("Hindi magawa ang hanap-salita.")
}

export function lineBetween(
  start: { row: number; col: number },
  end: { row: number; col: number },
) {
  const rowStep = Math.sign(end.row - start.row)
  const colStep = Math.sign(end.col - start.col)
  const rowDistance = Math.abs(end.row - start.row)
  const colDistance = Math.abs(end.col - start.col)
  if (rowDistance !== 0 && colDistance !== 0 && rowDistance !== colDistance) return null
  const steps = Math.max(rowDistance, colDistance)
  const cells: Array<{ row: number; col: number }> = []
  for (let index = 0; index <= steps; index += 1) {
    cells.push({ row: start.row + rowStep * index, col: start.col + colStep * index })
  }
  return cells
}
