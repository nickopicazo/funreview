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
  const fromEnv = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim()
  return fromEnv || DEFAULT_MEASUREMENT_ID
}

let started = false

export function loadAnalytics() {
  const id = measurementId()
  if (!id || started) return
  started = true
  window.dataLayer = window.dataLayer ?? []
  // gtag.js only sends commands stored as an `arguments` object, not a normal array.
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", id, {
    // GA4 does not store IP addresses.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  })
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
}

let lastPageView = ""

export function trackPageView(path: string) {
  loadAnalytics()
  if (!measurementId() || !window.gtag) return
  const key = `${path}\n${document.title}`
  if (lastPageView === key) return
  lastPageView = key
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function scoreBand(correct: number) {
  if (correct >= 8) return "8-10"
  if (correct >= 5) return "5-7"
  return "0-4"
}

export function track(event: AnalyticsEvent, params: Record<string, string>) {
  loadAnalytics()
  if (!measurementId() || !window.gtag) return
  window.gtag("event", event, params)
}

export function trackLessonOpened(week: string) {
  if (openedLessons.has(week)) return
  openedLessons.add(week)
  track("lesson_opened", { week })
}
