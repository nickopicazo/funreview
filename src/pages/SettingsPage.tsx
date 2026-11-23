import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { ParentGate } from "../components/ParentGate.tsx"
import { useAppState } from "../lib/useAppState.ts"
import { paths } from "../lib/routes.ts"
import { useTitle } from "../lib/useTitle.ts"

export function SettingsPage() {
  const [open, setOpen] = useState(false)
  useTitle("FunReview — Settings", {
    description: "Parent settings for FunReview.",
    noindex: true,
  })
  if (!open) return <ParentGate onPass={() => setOpen(true)} />
  return <SettingsPanel />
}

function SettingsPanel() {
  const { resetProgress } = useAppState()
  const [confirmReset, setConfirmReset] = useState(false)
  const [note, setNote] = useState("")

  return (
    <PageEnter>
      <Link className="back" to={paths.home}>
        ← Home
      </Link>
      <h1>Settings</h1>
      <p>For a parent. Progress stays on this device only.</p>

      <section className="panel">
        <h2>Progress</h2>
        {confirmReset ? (
          <div className="stack">
            <p>This will erase progress on this device. Are you sure?</p>
            <Button
              variant="coral"
              block
              onClick={() => {
                resetProgress()
                setConfirmReset(false)
                setNote("Progress reset.")
              }}
            >
              Yes, reset
            </Button>
            <Button variant="ghost" block onClick={() => setConfirmReset(false)}>
              Never mind
            </Button>
          </div>
        ) : (
          <Button variant="coral" block onClick={() => setConfirmReset(true)}>
            Reset progress
          </Button>
        )}
      </section>
      {note ? <p className="form-note">{note}</p> : null}
    </PageEnter>
  )
}
