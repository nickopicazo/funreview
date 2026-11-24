export function SpeechBubble({
  speaker,
  text,
  lang,
}: {
  speaker: "ana" | "ben"
  text: string
  lang?: "fil" | "en"
}) {
  const name = speaker === "ana" ? "Ana" : "Ben"
  return (
    <div className={`bubble bubble-${speaker}`}>
      <div className="avatar" aria-hidden="true">
        {speaker === "ana" ? "👧" : "👦"}
      </div>
      <div className="bubble-copy">
        <p className="bubble-name">{name}</p>
        <p lang={lang}>{text}</p>
      </div>
    </div>
  )
}
