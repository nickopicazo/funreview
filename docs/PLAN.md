# FunReview — Project Plan

> Status: **Milestones 2–8 built** (23 Nov 2026). Analytics stays off until a parent opts in. No custom domain yet.

## 1. What it is
FunReview is a child-friendly, interactive reviewer web app for a Grade 3 student in the Philippines (DepEd curriculum). It replaces printed reviewers with short, game-like lessons she can open on a tablet, phone, or computer. The look and feel is inspired by Duolingo.

## 2. Goals
- Make reviewing fun and self-guided for a Grade 3 learner (age 8–9).
- Organize content by **Quarter → Subject → Week**, so new lessons can be added just by adding content files.
- Keep hosting nearly free.
- Save progress on her device, with a way to back it up.

## 3. Tech decisions
| Area | Decision | Why |
| --- | --- | --- |
| Framework | React + Vite + TypeScript, built as a **static site** | Cheapest to host; no server needed |
| Routing | React Router (client-side) | Quarter / subject / week pages |
| Hosting | Railway, serving the built `dist/` with a tiny static server (e.g. Caddy or `serve`) honoring `PORT` | ~30–50 MB RAM; fits Railway Free plan ($1/mo credit) or Hobby ($5/mo, always on) |
| Progress | Versioned JSON in `localStorage` on her device only | Free, no backend, no login |
| Backup | Same JSON as a pretty-printed file download, plus a copyable base64 string | Move to a new device or restore after the browser is cleared |
| Analytics | Google Analytics 4, **milestone 7 only, off until a parent opts in** | Usage insight without loading a script during the shell |
| Considered, not chosen | Next.js SSR, Remix/React Router framework mode | Need a running Node server; more RAM, more cost, not needed |

### Analytics rules (kid safety)
- Do not add the GA4 script in milestones 2–6. When it lands, load it only after a parent opt-in in settings. Default is off.
- Never send her name or any personal data.
- Turn off Google Signals and ad personalization features.
- Track only app events: lesson opened, activity completed, quiz score band, badge earned.

### Progress record
No account and no server. One versioned save under `localStorage` key `funreview-save-v1`:

```ts
type SaveFile = {
  version: 1
  weeks: Record<
    string, // "q3/makabansa/w14"
    {
      completedActivities: Array<
        "recap" | "riddles" | "flashcards" | "matching" | "wordSearch" | "quiz"
      >
      quiz?: { correct: number; total: number; gintongBituin: boolean }
      badgeEarned: boolean
    }
  >
}
```

Backup exports that object as pretty-printed JSON and as a base64 string of the same JSON. Import accepts either form and replaces the local save only when `version` is `1`.

## 4. Content structure
```
src/content/
  catalog.ts          # Q1–Q4 × six subjects; only q3/makabansa is available
  types.ts            # WeekContent
  q3/
    makabansa.ts      # weeks 14–20
```

Do not add empty subject files for later lessons. A subject or quarter with no file stays a placeholder in `catalog.ts`.

Source lessons live in [`docs/lessons/`](./lessons/README.md). Those extracts are OCR slide text, not activities. Author each week by hand into `WeekContent`. Check the PDF when the extract is unclear. A week may omit an activity; the path only shows the ones present.

### Catalog
Home shows **Q1, Q2, Q3, Q4**. Inside a quarter, six Grade 3 areas, in this order:

1. Filipino
2. English
3. Mathematics
4. Science
5. Makabansa
6. GMRC

Only **Q3 Makabansa** opens. Every other quarter and subject shows **“Malapit na!”**.

### Week schema
```ts
type Choice = { id: string; label: string }

type WeekContent = {
  id: string // "w14"
  title: string
  badgeName: string
  recap?: { speaker: "ana" | "ben"; text: string }[]
  riddles?: {
    prompt: string
    choices: Choice[]
    correctId: string
    explanation: string
  }[]
  flashcards?: { front: string; name: string; place: string; fact: string }[]
  matching?: { left: string; right: string }[]
  wordSearch?: { words: string[] }
  quiz?: {
    prompt: string
    choices: Choice[] // 2–4
    correctId: string
    explanation: string
  }[] // 10 items when present
}
```

Build the shell against this type with one sample week before authoring all seven. A content check later is “every week file typechecks and matches `WeekContent`,” not a UI test suite.

## 5. First unit: Q3 Makabansa (Weeks 14–20, in Filipino)
| Week | Topic |
| --- | --- |
| 14 | Katangian ng mga Pilipino (makabayan, Lupang Hinirang, produktong Pilipino) |
| 15 | Katangian ng Mamamayang Pilipino (paladasal, magalang, bayanihan, hospitalidad, pamilya) |
| 16 | Katangian at Pagkakakilanlan ng mga Pilipino (magkakaiba pero nagkakaisa; kuwento nina Ana at Ben) |
| 17 | Mga Tradisyonal na Kasuotan at Pagdiriwang |
| 18 | Mga Pangkat-Etniko sa Luzon |
| 19 | Mga Pangkat-Etniko sa Visayas |
| 20 | Mga Pangkat-Etniko sa Mindanao |

### Content corrections (do not copy from source)
- W19 review slide says Kalinga is in Gitnang Luzon. It is in the **Cordillera (CAR, Tabuk)**, as W18 correctly states.
- Use **Aeta/Agta**, not "Negrito".
- Fix filename typos in titles ("Katangain" → Katangian, "Pngkat" → Pangkat).

## 6. Activities (per week)
v1 has one set of activities. **Word search only** — a crossword is a later game. Riddles and the quiz are tap-to-choose, not typed answers.

1. **Lesson recap** — short slides, with Ana and Ben as guides.
2. **"Sino/Ano Ako?" riddles** — prompt, choices, one correct id, explanation. Example: "Ako ang 'tao ng dagat.' Ang lepa o vinta ang aking bahay." (Badjao)
3. **Tap-to-flip flashcards** — picture/term on front; name, place, one fact on back.
4. **Matching** — kasuotan ↔ pangkat, pista ↔ lugar, pangkat ↔ tatak (tap-to-select, no drag-only).
5. **Word search** — key vocabulary (bayanihan, T'nalak, Singkil, kulintang, binagol).
6. **Star quiz** — 10 items, 2–4 choices, 1 star each; 8+ = **Gintong Bituin**; gentle feedback with explanations.
7. **Week badge** — earned on finishing the quiz in order (Makabayan → Mindanao), including a score below 8.
Bonus: **"Paglalakbay sa Pilipinas" map** for W17–W20 (Luzon, Visayas, Mindanao) with landmarks. This is milestone 6, not part of the week path.

### Completion and scoring
A node on the current path is done when she finishes it:

- Recap: the last slide.
- Riddles: every riddle answered correctly (retry allowed).
- Flashcards: every card flipped once.
- Matching: every pair matched.
- Word search: the puzzle solved.
- Quiz: the quiz submitted.

Wrong answers show the explanation and **“Subukan ulit”**. There is no penalty and no lost star. A quiz star is awarded once that item is correct, including after a retry. **Gintong Bituin** when `correct >= 8` of 10.

The path is sequential. Later nodes are softly locked and can be opened with **“Subukan pa rin”** (practice anyway). That play does not mark the node done and does not award the week badge. The badge is awarded only when the quiz is the current node (earlier nodes already done) and she submits it.

## 7. UI/UX (Duolingo-inspired, kid-first)
**Language.** All UI chrome is Filipino, including parent settings. Lesson text is Filipino. Placeholder copy is **“Malapit na!”**.

**Borrow**
- A guided **path** per week: nodes per activity that the week actually includes; done = gold, current = pulsing, later = softly locked with “Subukan pa rin”.
- **Ana and Ben** as recurring guides who cheer her on (never sad or guilt-tripping).
- **Bite-sized** sessions (2–5 min) ending with "Tapos na!" and "Isa pa?" / "Bumalik sa landas".
- **Instant feedback**: "Tama!" + ding + green pulse; wrong = soft tone, show answer, "Subukan ulit".
- **Celebrations** at lesson/week end: confetti, progress bar fill, badge.
- **Chunky buttons**: big tap targets (≥48px), rounded, 3D press shadow.
- Always-visible mute for the short sound effects.
- Parent settings (reset progress, backup) behind a parent gate.

**v1 art and audio**
- Ana and Ben are named speech bubbles with emoji or simple shapes until illustrations exist. No custom mascot art in v1.
- Sound is a few short SFX via HTMLAudioElement / Web Audio (Howler only if needed), plus mute. No narration and no text-to-speech in v1. No tap-to-hear until there is audio to play.

**Parent gate**
- Reset and backup sit behind one regenerated addition problem (for example 7 + 5). A new problem is created each time the gate opens. No stored PIN.

**Avoid**
- Hearts/lives that stop play after mistakes.
- Streaks that reset to zero, guilt notifications, sad mascot.
- Leaderboards, ads, paywalls, hard-to-exit loops.
- Drag-only interactions, tiny targets, dense text, English-only UI chrome.
- Copying Duolingo's owl, exact green, or wordmark.

**Visual style**
- Palette: fiesta-inspired — sun gold (CTA/XP), leaf green (success), sea blue (hints), Sinulog orange (celebrations), coral ("not yet"), cream background.
- Fonts (Google Fonts): **Fredoka** for titles/buttons, **Nunito** for body; ~18px body.
- Motion: Motion (framer-motion) for UI, `canvas-confetti` for celebrations; respect `prefers-reduced-motion`.

## 8. Name
**FunReview** — checked 23 Nov 2026 (best-effort, not a trademark search): no app or web app found with that name. `funreview.app`, `.io`, `.ph` looked unregistered; `funreview.com` is registered but not serving a site.

## 9. Milestones
1. ✅ Init Vite + React + TS app (`/Users/nickopicazo/Apps/funreview`).
2. ✅ Design system: colors, fonts, buttons, feedback components. Filipino chrome. Ana and Ben as speech bubbles.
3. ✅ App shell: home → quarter → subject → week path; routing; progress store + backup + parent gate. One sample week against `WeekContent`. No GA4 script.
4. ✅ Activity components: recap, riddles, flashcards, matching, word search, quiz, badge.
5. ✅ Content: author Q3 Makabansa W14–W20 into the schema, using `docs/lessons` as the source of facts (do not paste the OCR).
6. ✅ Map journey (W17–W20).
7. ✅ Google Analytics, still off until a parent opts in.
8. ✅ Railway deploy config. Custom domain was not purchased; `funreview.app` is still only a candidate.
9. ⬜ Add next subjects/quarters as lessons arrive.

## 10. Open questions
These do not block milestones 2–5.

- Domain: buy `funreview.app`?
- Railway plan: Free (sleeps when idle, which is awkward for a tablet opening the app cold) vs Hobby ($5/mo, always on, custom domain). Decide at milestone 8. A free static host is an alternative if always-on matters more than staying on Railway.
- Offline service worker / PWA: later. `localStorage` already survives a refresh.

### Locked for v1
- Word search only; crossword waits.
- Riddles and quiz are tap-to-choose.
- UI chrome is Filipino. Catalog is Q1–Q4 and the six subjects above; only Q3 Makabansa opens.
- Ana and Ben are emoji or simple shapes. No narration and no text-to-speech.
- Parent gate is a regenerated addition problem. No PIN.
- Analytics stays milestone 7 and defaults off.
