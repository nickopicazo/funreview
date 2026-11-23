import { useState } from "react"
import { Link } from "react-router-dom"
import { PageEnter } from "../components/PageEnter.tsx"
import { SpeechBubble } from "../components/SpeechBubble.tsx"
import { landmarks, type Landmark } from "../content/map.ts"
import { useAppState } from "../lib/appState.tsx"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"

function unlocked(weekId: Landmark["weekId"], badges: Record<string, boolean>) {
  return badges[`q3/makabansa/${weekId}`] === true
}

export function MapPage() {
  const { save } = useAppState()
  const [openId, setOpenId] = useState<string | null>(null)
  useTitle("FunReview — Trip", {
    description: "A trip around the Philippines for Grade 3.",
  })
  const badges = Object.fromEntries(
    Object.entries(save.weeks).map(([key, week]) => [key, week.badgeEarned]),
  )
  const selected = landmarks.find((item) => item.id === openId) ?? null
  const selectedOpen = selected ? unlocked(selected.weekId, badges) : false

  return (
    <PageEnter>
      <Link className="back" to={paths.home}>
        ← Home
      </Link>
      <h1>A trip around the Philippines</h1>
      <SpeechBubble
        speaker="ana"
        text="Finish a week and earn its badge. Then you can visit that place."
      />
      <div className="map-frame">
        <svg className="map-svg" viewBox="0 0 320 560" role="img" aria-label="Map of the Philippines">
          <path
            className="island"
            d="M168 28c28 8 52 28 58 58 18 10 28 36 18 58-6 28-28 42-36 62-16 8-40 4-52-12-22 6-46-8-52-30-16-8-28-36-16-58 8-28 28-48 52-62 8-10 18-18 28-16z"
          />
          <ellipse className="island" cx="118" cy="286" rx="28" ry="16" />
          <ellipse className="island" cx="168" cy="300" rx="22" ry="14" />
          <ellipse className="island" cx="214" cy="274" rx="26" ry="18" />
          <path
            className="island"
            d="M96 360c30-18 70-16 108-4 28 10 62 8 78 28 10 28-8 58-30 74-28 20-70 28-104 16-34-8-62-28-64-58-2-24 4-42 12-56z"
          />
          <text x="150" y="118">Luzon</text>
          <text x="150" y="248">Visayas</text>
          <text x="150" y="430">Mindanao</text>
        </svg>
        {landmarks.map((place) => {
          const open = unlocked(place.weekId, badges)
          return (
            <button
              key={place.id}
              type="button"
              className={`pin${open ? " is-open" : ""}`}
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              aria-label={place.name}
              onClick={() => setOpenId(place.id)}
            />
          )
        })}
      </div>
      {selected ? (
        <SpeechBubble
          speaker="ben"
          text={
            selectedOpen
              ? `${selected.name}, ${selected.place}. ${selected.fact}`
              : `${selected.name}. Finish this week first. Then you can visit.`
          }
        />
      ) : null}
      {(["Luzon", "Visayas", "Mindanao"] as const).map((region) => (
        <section key={region} className="stack">
          <h2>{region}</h2>
          {landmarks
            .filter((place) => place.region === region)
            .map((place) => {
              const open = unlocked(place.weekId, badges)
              return (
                <button
                  key={place.id}
                  type="button"
                  className="card place-btn"
                  onClick={() => setOpenId(place.id)}
                >
                  <strong>{place.name}</strong>
                  <span>{open ? place.place : "Coming soon!"}</span>
                </button>
              )
            })}
        </section>
      ))}
    </PageEnter>
  )
}
