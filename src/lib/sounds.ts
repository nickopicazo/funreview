import { safeGet, safeSet } from "./storage.ts"

const MUTE_KEY = "funreview-muted"

let audio: AudioContext | null = null

export function readMuted() {
  return safeGet(MUTE_KEY) === "1"
}

export function writeMuted(muted: boolean) {
  safeSet(MUTE_KEY, muted ? "1" : "0")
}

function context() {
  if (!audio) audio = new AudioContext()
  if (audio.state === "suspended") void audio.resume()
  return audio
}

function tone(frequency: number, start: number, duration: number, volume: number) {
  const ctx = context()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = "sine"
  osc.frequency.value = frequency
  const when = ctx.currentTime + start
  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(when)
  osc.stop(when + duration + 0.02)
}

function play(notes: Array<[number, number, number]>) {
  if (readMuted()) return
  notes.forEach(([frequency, start, duration], index) => {
    tone(frequency, start, duration, index === notes.length - 1 ? 0.08 : 0.06)
  })
}

export function playCorrect() {
  play([
    [523.25, 0, 0.12],
    [659.25, 0.1, 0.16],
  ])
}

export function playWrong() {
  play([[196, 0, 0.18]])
}

export function playDone() {
  play([
    [523.25, 0, 0.12],
    [659.25, 0.12, 0.12],
    [783.99, 0.24, 0.22],
  ])
}
