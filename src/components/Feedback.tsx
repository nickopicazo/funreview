import { motion, useReducedMotion } from "motion/react"

export function Feedback({
  tone,
  title,
  text,
  textLang,
}: {
  tone: "ok" | "retry"
  title: string
  text?: string
  textLang?: "fil"
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`feedback feedback-${tone}`}
      role="status"
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <p className="feedback-title">{title}</p>
      {text ? <p lang={textLang}>{text}</p> : null}
    </motion.div>
  )
}
