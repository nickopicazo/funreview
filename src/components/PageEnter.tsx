import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

export function PageEnter({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className="page">{children}</div>
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
