import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Feedback } from "../components/Feedback.tsx"
import { BIN_ID, DESK_ID } from "../content/computerLayout.ts"
import type { LessonLang, WeekContent } from "../content/types.ts"
import { playCorrect, playWrong } from "../lib/sounds.ts"

type DeskFile = NonNullable<WeekContent["fileDesk"]>[number]["files"][number]
type Goal = NonNullable<WeekContent["fileDesk"]>[number]["goal"]

type Commit = {
  action: Goal["action"]
  fileId?: string
  destId?: string
  newName?: string
}

function sameGoal(goal: Goal, commit: Commit) {
  if (goal.action !== commit.action) return false
  if (goal.action === "emptyBin") return true
  if (goal.action === "delete") return goal.fileId === commit.fileId
  if (goal.action === "createFolder") return goal.destId === commit.destId && goal.newName === commit.newName
  if (goal.action === "rename") return goal.fileId === commit.fileId && goal.newName === commit.newName
  return goal.fileId === commit.fileId && goal.destId === commit.destId
}

export function FileDesk({
  items,
  onFinish,
  lang,
}: {
  items: NonNullable<WeekContent["fileDesk"]>
  onFinish: () => void
  lang: LessonLang
}) {
  const [index, setIndex] = useState(0)
  const [here, setHere] = useState(DESK_ID)
  const [selected, setSelected] = useState<string | null>(null)
  const [clip, setClip] = useState<{ id: string; mode: "cut" | "copy" } | null>(null)
  const [naming, setNaming] = useState<"rename" | "create" | null>(null)
  const [sure, setSure] = useState(false)
  const [phase, setPhase] = useState<"open" | "right" | "wrong">("open")
  const item = items[index]
  if (!item) return null
  const last = index === items.length - 1
  const open = phase === "open"
  const current = item.files.find((file) => file.id === here)
  const parent = current?.parentId ?? DESK_ID
  const visible = item.files.filter((file) => file.parentId === here)
  const picked = item.files.find((file) => file.id === selected) ?? null
  const crumbs = crumb(item.files, here)

  function finishCommit(commit: Commit) {
    if (sameGoal(item.goal, commit)) {
      playCorrect()
      setPhase("right")
      return
    }
    playWrong()
    setPhase("wrong")
  }

  function chooseName(name: string) {
    if (!open || !naming) return
    if (naming === "rename") {
      if (!picked) return
      finishCommit({ action: "rename", fileId: picked.id, newName: name })
      return
    }
    finishCommit({ action: "createFolder", destId: here, newName: name })
  }

  const pasteDest = picked?.kind === "folder" ? picked.id : here

  return (
    <div className="stack">
      <p className="step">
        Desk {index + 1} of {items.length}
      </p>
      <p className="sort-card" lang={lang}>{item.prompt}</p>
      <p className="hint" lang={lang}>{crumbs}</p>
      <div className="desk">
        {here !== DESK_ID ? (
          <button type="button" className="choice" disabled={!open} onClick={() => { setHere(parent); setSelected(null); setNaming(null) }}>
            Up
          </button>
        ) : null}
        {visible.map((file) => (
          <button
            key={file.id}
            type="button"
            className={`choice${selected === file.id ? " picked" : ""}`}
            lang={lang}
            disabled={!open}
            onClick={() => {
              setSelected(file.id)
              setNaming(null)
              setSure(false)
            }}
          >
            {file.kind === "folder" ? "Folder" : "File"}: {file.name}
          </button>
        ))}
      </div>
      <div className="chips">
        <button type="button" className="chip" disabled={!open || picked?.kind !== "folder"} onClick={() => { if (picked?.kind === "folder") { setHere(picked.id); setSelected(null); setNaming(null) } }}>
          Open
        </button>
        <button type="button" className="chip" disabled={!open || !picked || picked.id === BIN_ID} onClick={() => { if (picked && picked.id !== BIN_ID) { setClip({ id: picked.id, mode: "cut" }); setNaming(null) } }}>
          Cut
        </button>
        <button type="button" className="chip" disabled={!open || !picked || picked.id === BIN_ID} onClick={() => { if (picked && picked.id !== BIN_ID) { setClip({ id: picked.id, mode: "copy" }); setNaming(null) } }}>
          Copy
        </button>
        <button
          type="button"
          className="chip"
          disabled={!open || !clip}
          onClick={() => {
            if (!clip) return
            finishCommit({
              action: clip.mode === "cut" ? "move" : "copy",
              fileId: clip.id,
              destId: pasteDest,
            })
          }}
        >
          Paste
        </button>
        <button type="button" className="chip" disabled={!open || picked?.kind !== "file" || !item.nameChoices?.length} onClick={() => setNaming("rename")}>
          Rename
        </button>
        <button
          type="button"
          className="chip"
          disabled={!open || picked?.kind !== "file"}
          onClick={() => {
            if (picked?.kind === "file") finishCommit({ action: "delete", fileId: picked.id })
          }}
        >
          Delete
        </button>
        <button type="button" className="chip" disabled={!open || !item.nameChoices?.length} onClick={() => { setNaming("create"); setSure(false) }}>
          New folder
        </button>
        <button type="button" className="chip" disabled={!open || (here !== BIN_ID && selected !== BIN_ID)} onClick={() => setSure(true)}>
          Empty
        </button>
      </div>
      {clip ? (
        <p className="hint">
          {clip.mode === "cut" ? "Cut" : "Copied"}: {item.files.find((file) => file.id === clip.id)?.name}. Tap the destination, then Paste.
        </p>
      ) : (
        <p className="hint">Tap a file or folder, then tap an action. Open a folder to look inside.</p>
      )}
      {naming && item.nameChoices ? (
        <div className="chips">
          {item.nameChoices.map((name) => (
            <button key={name} type="button" className="chip" lang={lang} disabled={!open} onClick={() => chooseName(name)}>
              {name}
            </button>
          ))}
          <button type="button" className="chip" disabled={!open} onClick={() => setNaming(null)}>
            Back
          </button>
        </div>
      ) : null}
      {sure ? (
        <div className="stack">
          <p className="hint">Are you sure you want to empty the Recycle Bin?</p>
          <div className="chips">
            <button type="button" className="chip" disabled={!open} onClick={() => finishCommit({ action: "emptyBin" })}>
              Yes
            </button>
            <button type="button" className="chip" disabled={!open} onClick={() => setSure(false)}>
              No
            </button>
          </div>
        </div>
      ) : null}
      {phase === "right" ? <Feedback tone="ok" title="Correct!" text={item.explanation} textLang={lang} /> : null}
      {phase === "wrong" ? <Feedback tone="retry" title="Not quite" text={item.explanation} textLang={lang} /> : null}
      {!open ? (
        <Button
          block
          onClick={() => {
            if (last) {
              onFinish()
              return
            }
            setIndex((value) => value + 1)
            setHere(DESK_ID)
            setSelected(null)
            setClip(null)
            setNaming(null)
            setSure(false)
            setPhase("open")
          }}
        >
          {last ? "Done!" : "Next"}
        </Button>
      ) : null}
    </div>
  )
}

function crumb(files: DeskFile[], here: string) {
  const names: string[] = []
  let id = here
  const seen = new Set<string>()
  while (id !== DESK_ID && !seen.has(id)) {
    seen.add(id)
    const file = files.find((entry) => entry.id === id)
    if (!file) break
    names.unshift(file.name)
    id = file.parentId
  }
  return ["Desktop", ...names].join(" / ")
}
