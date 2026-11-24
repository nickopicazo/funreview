export function NumberPad({
  value,
  onChange,
  onSubmit,
  disabled = false,
  maxDigits = 7,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  maxDigits?: number
}) {
  function press(key: string) {
    if (disabled) return
    if (key === "⌫") {
      onChange(value.slice(0, -1))
      return
    }
    if (key === "✓") {
      onSubmit()
      return
    }
    if (value.length >= maxDigits) return
    onChange(`${value}${key}`)
  }

  return (
    <div className="pad">
      <input
        className="pad-display"
        value={value}
        readOnly
        inputMode="none"
        aria-label="Your answer"
        tabIndex={-1}
        onFocus={(event) => event.currentTarget.blur()}
      />
      <div className="pad-keys">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((key) => (
          <button
            key={key}
            type="button"
            className="pad-key"
            onClick={() => press(key)}
            disabled={disabled}
            aria-label={key === "⌫" ? "Delete" : key === "✓" ? "Check" : key}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}
