import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button.tsx"
import { PageEnter } from "../components/PageEnter.tsx"
import { ParentGate } from "../components/ParentGate.tsx"
import { measurementId } from "../lib/analytics.ts"
import { useAppState } from "../lib/appState.tsx"
import { paths } from "../lib/routes.ts"
import { encodeBackup, parseBackup, prettySave } from "../lib/save.ts"
import { useTitle } from "../lib/useTitle.ts"

export function SettingsPage() {
  const [open, setOpen] = useState(false)
  useTitle("FunReview — Settings")
  if (!open) return <ParentGate onPass={() => setOpen(true)} />
  return <SettingsPanel />
}

function SettingsPanel() {
  const { save, resetProgress, replaceSave, analyticsOptIn, setAnalyticsOptIn } = useAppState()
  const [confirmReset, setConfirmReset] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [importText, setImportText] = useState("")
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)
  const backup = encodeBackup(save)

  function download() {
    const blob = new Blob([prettySave(save)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "funreview-backup.json"
    link.click()
    URL.revokeObjectURL(url)
    setNote("Backup downloaded.")
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(backup)
      setCopied(true)
    } catch {
      setCopied(false)
      setShowCode(true)
    }
  }

  function importBackup() {
    const next = parseBackup(importText)
    if (!next) {
      setNote("That backup isn't valid. It needs version 1.")
      return
    }
    replaceSave(next)
    setImportText("")
    setNote("Progress restored.")
  }

  return (
    <PageEnter>
      <Link className="back" to={paths.home}>
        Back
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
              onClick={() => {
                resetProgress()
                setConfirmReset(false)
                setNote("Progress reset.")
              }}
            >
              Yes, reset
            </Button>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Never mind
            </Button>
          </div>
        ) : (
          <Button variant="coral" onClick={() => setConfirmReset(true)}>
            Reset progress
          </Button>
        )}
      </section>

      <section className="panel">
        <h2>Backup</h2>
        <p>Download the JSON, or copy the code for another device.</p>
        <div className="stack">
          <Button onClick={download}>Download JSON</Button>
          <Button variant="blue" onClick={() => void copyCode()}>
            {copied ? "Copied!" : "Copy the code"}
          </Button>
          <Button variant="ghost" onClick={() => setShowCode((value) => !value)}>
            {showCode ? "Hide the code" : "Show the code"}
          </Button>
          {showCode ? <textarea className="field" readOnly rows={5} value={backup} /> : null}
          <label className="field-label" htmlFor="backup-import">
            Paste the JSON or code
          </label>
          <textarea
            id="backup-import"
            className="field"
            rows={5}
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
          />
          <Button variant="green" onClick={importBackup}>
            Restore backup
          </Button>
        </div>
      </section>

      <section className="panel">
        <h2>Analytics</h2>
        <p>
          This stays off until a parent agrees. No name or personal data is sent.
          Only app events: lesson opened, activity finished, score band, and badge.
        </p>
        {measurementId() ? null : (
          <p className="form-note">No measurement is connected yet, so nothing will be sent.</p>
        )}
        <button
          type="button"
          className={`switch${analyticsOptIn ? " is-on" : ""}`}
          aria-pressed={analyticsOptIn}
          onClick={() => setAnalyticsOptIn(!analyticsOptIn)}
        >
          {analyticsOptIn ? "Consent is on" : "Consent is off"}
        </button>
      </section>
      {note ? <p className="form-note">{note}</p> : null}
    </PageEnter>
  )
}
