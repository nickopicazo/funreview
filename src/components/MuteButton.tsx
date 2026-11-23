import { useAppState } from "../lib/appState.tsx"

export function MuteButton() {
  const { muted, toggleMuted } = useAppState()
  return (
    <button
      type="button"
      className={`icon-btn${muted ? " is-muted" : ""}`}
      aria-pressed={muted}
      onClick={toggleMuted}
    >
      <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
      {muted ? "Tahimik" : "Tunog"}
    </button>
  )
}
