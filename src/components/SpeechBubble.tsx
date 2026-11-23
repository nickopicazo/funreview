export function SpeechBubble({
  speaker,
  text,
}: {
  speaker: "ana" | "ben"
  text: string
}) {
  const name = speaker === "ana" ? "Ana" : "Ben"
  return (
    <div className={`bubble bubble-${speaker}`}>
      <div className="avatar" aria-hidden="true">
        {speaker === "ana" ? "👧" : "👦"}
      </div>
      <div className="bubble-copy">
        <p className="bubble-name">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}
