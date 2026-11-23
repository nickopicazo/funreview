# FunReview — Project Plan

> Status: **Planning** (as of 23 Nov 2026). Nothing beyond the Vite starter is built yet.

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
| Progress | `localStorage` on her device only | Free, no backend, no login |
| Backup | Export/import a save code or JSON file | Move to a new device or restore after the browser is cleared |
| Analytics | Google Analytics 4 | Usage insight (weeks opened, quiz completion) |
| Considered, not chosen | Next.js SSR, Remix/React Router framework mode | Need a running Node server; more RAM, more cost, not needed |

### Analytics rules (kid safety)
- Never send her name or any personal data.
- Turn off Google Signals and ad personalization features.
- Track only app events: lesson opened, activity completed, quiz score band, badge earned.

## 4. Content structure
```
src/content/
  q3/
    makabansa.ts      # weeks 14–20
    science.ts        # later
    filipino.ts       # later
  ...
```
Each subject file lists weeks; each week holds: recap, riddles, flashcards, matching sets, quiz items, word-search words.
Other subjects and quarters show as "Malapit na!" (coming soon) until filled in.

Source lessons live in [`docs/lessons/`](./lessons/README.md).

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
1. **Lesson recap** — short, with Ana and Ben as guides.
2. **"Sino/Ano Ako?" riddles** — e.g. "Ako ang 'tao ng dagat.' Ang lepa o vinta ang aking bahay." (Badjao)
3. **Tap-to-flip flashcards** — picture/term on front; name, place, one fact on back.
4. **Matching** — kasuotan ↔ pangkat, pista ↔ lugar, pangkat ↔ tatak (tap-to-select, no drag-only).
5. **Word search / crossword** — key vocabulary (bayanihan, T'nalak, Singkil, kulintang, binagol).
6. **Star quiz** — 10 items, 1 star each; 8+ = **Gintong Bituin**; gentle feedback with explanations.
7. **Week badge** — earned on finishing the quiz (Makabayan → Mindanao).
Bonus: **"Paglalakbay sa Pilipinas" map** for W17–W20 (Luzon, Visayas, Mindanao) with landmarks.

## 7. UI/UX (Duolingo-inspired, kid-first)
**Borrow**
- A guided **path** per week: nodes per activity; done = gold, current = pulsing, later = softly locked with "practice anyway".
- **Ana and Ben** as recurring guides who cheer her on (never sad or guilt-tripping).
- **Bite-sized** sessions (2–5 min) ending with "Tapos na!" and "Isa pa?" / "Bumalik sa landas".
- **Instant feedback**: "Tama!" + ding + green pulse; wrong = soft tone, show answer, "Subukan ulit".
- **Celebrations** at lesson/week end: confetti, progress bar fill, badge.
- **Chunky buttons**: big tap targets (≥48px), rounded, 3D press shadow.
- Optional **tap-to-hear** for key words; always-visible mute.
- Parent settings (reset progress, backup) behind a simple parent gate.

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
- Sound: a few short SFX via HTMLAudioElement / Web Audio (Howler only if needed).

## 8. Name
**FunReview** — checked 23 Nov 2026 (best-effort, not a trademark search): no app or web app found with that name. `funreview.app`, `.io`, `.ph` looked unregistered; `funreview.com` is registered but not serving a site.

## 9. Milestones
1. ✅ Init Vite + React + TS app (`/Users/nickopicazo/Apps/funreview`).
2. ⬜ Design system: colors, fonts, buttons, feedback components.
3. ⬜ App shell: home → quarter → subject → week path; routing; progress store + backup.
4. ⬜ Activity components: recap, riddles, flashcards, matching, word search, quiz, badge.
5. ⬜ Content: Q3 Makabansa W14–W20 from `docs/lessons`.
6. ⬜ Map journey (W17–W20).
7. ⬜ Google Analytics (kid-safe config).
8. ⬜ Railway deploy config + domain.
9. ⬜ Add next subjects/quarters as lessons arrive.

## 10. Open questions
- Domain: buy `funreview.app`?
- Railway plan: Free (sleeps when idle) vs Hobby ($5/mo, always on, custom domain).
- Narration: record voice clips, use text-to-speech, or skip for v1?
- Mascot art: Ana and Ben as illustrations — who draws them, or use simple CSS/emoji first?
