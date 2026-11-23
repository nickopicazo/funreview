const OPT_IN_KEY = "funreview-analytics-opt-in"
const openedLessons = new Set<string>()

type AnalyticsEvent =
  | "lesson_opened"
  | "activity_completed"
  | "quiz_score_band"
  | "badge_earned"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const DEFAULT_MEASUREMENT_ID = "G-RLTWHLBZGW"

export function measurementId() {
  return (import.meta.env.VITE_GA_MEASUREMENT_ID ?? DEFAULT_MEASUREMENT_ID).trim()
}

export function readAnalyticsOptIn() {
  return localStorage.getItem(OPT_IN_KEY) === "1"
}

export function writeAnalyticsOptIn(on: boolean) {
  localStorage.setItem(OPT_IN_KEY, on ? "1" : "0")
  if (on) loadAnalytics()
}

let started = false

export function loadAnalytics() {
  const id = measurementId()
  if (!id || started || !readAnalyticsOptIn()) return
  started = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }
  window.gtag("js", new Date())
  window.gtag("config", id, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  })
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
}

export function scoreBand(correct: number) {
  if (correct >= 8) return "8-10"
  if (correct >= 5) return "5-7"
  return "0-4"
}

export function track(event: AnalyticsEvent, params: Record<string, string>) {
  if (!readAnalyticsOptIn()) return
  loadAnalytics()
  if (!measurementId() || !window.gtag) return
  window.gtag("event", event, params)
}

export function trackLessonOpened(week: string) {
  if (openedLessons.has(week)) return
  openedLessons.add(week)
  track("lesson_opened", { week })
}
