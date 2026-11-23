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
  useTitle("FunReview — Setting")
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
    setNote("Na-download na ang backup.")
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
      setNote("Hindi tanggap ang backup. Kailangan version 1.")
      return
    }
    replaceSave(next)
    setImportText("")
    setNote("Naibalik ang progreso.")
  }

  return (
    <PageEnter>
      <Link className="back" to={paths.home}>
        Bumalik
      </Link>
      <h1>Mga setting</h1>
      <p>Para sa magulang. Nasa aparatong ito lang ang progreso.</p>

      <section className="panel">
        <h2>Progreso</h2>
        {confirmReset ? (
          <div className="stack">
            <p>Mabubura ang progreso sa aparatong ito. Sigurado ka?</p>
            <Button
              variant="coral"
              onClick={() => {
                resetProgress()
                setConfirmReset(false)
                setNote("Na-reset na ang progreso.")
              }}
            >
              Oo, i-reset
            </Button>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Huwag na
            </Button>
          </div>
        ) : (
          <Button variant="coral" onClick={() => setConfirmReset(true)}>
            I-reset ang progreso
          </Button>
        )}
      </section>

      <section className="panel">
        <h2>Backup</h2>
        <p>I-download ang JSON, o kopyahin ang code para sa ibang aparato.</p>
        <div className="stack">
          <Button onClick={download}>I-download ang JSON</Button>
          <Button variant="blue" onClick={() => void copyCode()}>
            {copied ? "Nakopya!" : "Kopyahin ang code"}
          </Button>
          <Button variant="ghost" onClick={() => setShowCode((value) => !value)}>
            {showCode ? "Itago ang code" : "Ipakita ang code"}
          </Button>
          {showCode ? <textarea className="field" readOnly rows={5} value={backup} /> : null}
          <label className="field-label" htmlFor="backup-import">
            Idikit ang JSON o code
          </label>
          <textarea
            id="backup-import"
            className="field"
            rows={5}
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
          />
          <Button variant="green" onClick={importBackup}>
            Ibalik ang backup
          </Button>
        </div>
      </section>

      <section className="panel">
        <h2>Pagsukat</h2>
        <p>
          Naka-off ito hanggang pumayag ang magulang. Walang pangalan o personal na datos.
          Mga pangyayari lang sa app: nabuksang aralin, natapos na gawain, banda ng iskor, at badge.
        </p>
        {measurementId() ? null : (
          <p className="form-note">Wala pang nakakabit na pagsukat, kaya walang ipapadalang datos.</p>
        )}
        <button
          type="button"
          className={`switch${analyticsOptIn ? " is-on" : ""}`}
          aria-pressed={analyticsOptIn}
          onClick={() => setAnalyticsOptIn(!analyticsOptIn)}
        >
          {analyticsOptIn ? "Naka-on ang pahintulot" : "Naka-off ang pahintulot"}
        </button>
      </section>
      {note ? <p className="form-note">{note}</p> : null}
    </PageEnter>
  )
}
