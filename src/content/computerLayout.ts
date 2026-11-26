export const DESK_ID = "desk"
export const BIN_ID = "bin"

export type KeyCap = { id: string; label: string }

export const KEYBOARD_ROWS: KeyCap[][] = [
  [..."qwertyuiop"].map((id) => ({ id, label: id.toUpperCase() })),
  [
    ...[..."asdfghjkl"].map((id) => ({ id, label: id.toUpperCase() })),
    { id: "semicolon", label: ";" },
  ],
  [..."zxcvbnm"].map((id) => ({ id, label: id.toUpperCase() })),
]

export const KEY_IDS = KEYBOARD_ROWS.flat().map((key) => key.id)

export const HOME_KEY_IDS = ["a", "s", "d", "f", "j", "k", "l", "semicolon"]

export const BUMP_KEY_IDS = ["f", "j"]

export type FingerCap = { id: string; label: string; hand: "left" | "right" }

export const FINGERS: FingerCap[] = [
  { id: "left-pinky", label: "Pinky", hand: "left" },
  { id: "left-ring", label: "Ring", hand: "left" },
  { id: "left-middle", label: "Middle", hand: "left" },
  { id: "left-index", label: "Index", hand: "left" },
  { id: "left-thumb", label: "Thumb", hand: "left" },
  { id: "right-thumb", label: "Thumb", hand: "right" },
  { id: "right-index", label: "Index", hand: "right" },
  { id: "right-middle", label: "Middle", hand: "right" },
  { id: "right-ring", label: "Ring", hand: "right" },
  { id: "right-pinky", label: "Pinky", hand: "right" },
]

export const FINGER_IDS = FINGERS.map((finger) => finger.id)

export function targetKeyIds(target: string) {
  if (target.length < 1 || target.length > 8) return null
  const ids: string[] = []
  for (const char of target.toLowerCase()) {
    const id = char === ";" ? "semicolon" : char
    if (!KEY_IDS.includes(id)) return null
    ids.push(id)
  }
  return ids
}
