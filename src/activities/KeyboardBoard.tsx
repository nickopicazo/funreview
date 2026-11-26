import { BUMP_KEY_IDS, HOME_KEY_IDS, KEYBOARD_ROWS } from "../content/computerLayout.ts"

export function KeyboardBoard({
  lit,
  badId,
  disabled,
  onKey,
}: {
  lit: ReadonlySet<string>
  badId?: string | null
  disabled: boolean
  onKey: (id: string) => void
}) {
  return (
    <div className="key-scroll">
      <div className="key-board" role="group" aria-label="Keyboard">
        {KEYBOARD_ROWS.map((row) => (
          <div className="key-row" key={row.map((key) => key.id).join("")}>
            {row.map((key) => {
              const home = HOME_KEY_IDS.includes(key.id)
              const bump = BUMP_KEY_IDS.includes(key.id)
              const ok = lit.has(key.id)
              const bad = badId === key.id
              return (
                <button
                  key={key.id}
                  type="button"
                  className={`key${home ? " home" : ""}${bump ? " bump" : ""}${ok ? " ok" : ""}${bad ? " bad" : ""}`}
                  disabled={disabled}
                  onClick={() => onKey(key.id)}
                >
                  {key.label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
