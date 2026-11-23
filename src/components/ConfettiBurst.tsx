import confetti from "canvas-confetti"
import { useReducedMotion } from "motion/react"
import { useEffect } from "react"

const COLORS = ["#f0b429", "#1f9d6a", "#2f7de1", "#ff7a1a", "#fff6e8"]

export function ConfettiBurst() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    void confetti({ particleCount: 90, spread: 72, origin: { y: 0.68 }, colors: COLORS })
    const timer = window.setTimeout(() => {
      void confetti({ particleCount: 48, spread: 100, origin: { y: 0.4 }, colors: COLORS })
    }, 280)
    return () => window.clearTimeout(timer)
  }, [reduce])
  return null
}
