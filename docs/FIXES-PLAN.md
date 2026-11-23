# FunReview — Fixes Plan

> Status: **Planned** (24 Nov 2026). Based on the review of commit `a049067` (live at https://funreview.up.railway.app/). Nothing here is built yet.
> Line numbers refer to `a049067`. Re-check them before editing.

## Decisions (from Nicko)
- **Analytics stays on for every visitor.** This is the intended implementation. No opt-in. Keep no personal data, keep Google Signals and ad personalization off.
- **Remove all backup features.** No export, import, save code, or JSON/base64 backup. Progress lives only in `localStorage` on the device.
- **Quiz scoring:** a star counts only on the first try. 8+ of 10 = Golden Star.
- **Badge rule (proposal, confirm with Nicko):** the week badge is earned by finishing the quiz in path order, whatever the score. The Golden Star is separate and needs 8+.

---

## Must

### M1. The right answer is almost always first
- **Problem:** Choices are never shuffled. 69 of 102 correct answers are option "a". W19 and W20 quizzes are 10/10 "a"; W20 riddles 5/5 "a". In W15 the correct choice is the longest one in 10/10 questions.
- **Fix:**
  - Add a deterministic shuffle (seeded by week key + item index, e.g. reuse `seedFromText` + a small PRNG) applied when choices are shown. Same order every visit, different position per question.
  - Rewrite W15 distractors so the correct answer is not always the longest (similar lengths).
  - Add a load-time content check: no week has more than ~50% of correct answers in one position after shuffling.
- **Files:** `src/components/Choices.tsx` or `src/content/q3/makabansa.ts` (`ask()`, lines 3–22), `src/lib/shuffle.ts` (new, or extend `src/lib/wordSearch.ts` helpers), W15 quiz in `makabansa.ts` (lines ~284–345).
- **Accept:** A script that counts the shown position of the correct answer per week finds no week above 50% in one position. In W15 the correct answer is the longest option in at most 4 of 10. Order is the same after a refresh.

### M2. The Golden Star means nothing
- **Problem:** On a wrong answer the correct option turns green, the explanation gives the answer, and "Try again" still earns the star (`src/activities/Quiz.tsx:73–82`, `src/components/Choices.tsx:17–19`). Every quiz ends 10/10.
- **Fix:**
  - Quiz: the first tap decides the star. Wrong → show the correct answer and the explanation, then a **Next** button only (no Try again, no Skip). Right → "Correct!" + Next.
  - Golden Star when `correct >= 8` (unchanged).
  - Riddles keep "Try again" (they are practice, no score).
  - Update `PLAN.md` "Completion and scoring" (around line 144) to the new rule and the badge proposal.
- **Files:** `src/activities/Quiz.tsx`, `docs/PLAN.md`.
- **Accept:** Answering every question wrong gives 0/10 and no Golden Star. 7 right gives "7 of 10", no Golden Star. 8 right gives a Golden Star. A wrong answer can't be changed into a star.

### M3. Analytics on for every visitor (keep, update the docs)
- **Problem:** The code already tracks every visit (commit 9c188dc), but PLAN.md still says "off until a parent opts in". `anonymize_ip: true` does nothing in GA4.
- **Fix:**
  - Keep the code as it is. Remove `anonymize_ip` from `src/lib/analytics.ts:36` and add a one-line comment that GA4 never stores IP addresses.
  - Keep `allow_google_signals: false`, `allow_ad_personalization_signals: false`, `send_page_view: false`.
  - Update PLAN.md: line 3 (status), line 22 (tech table), line 26 (analytics rules), line 190 (milestone 7), line 207 (locked for v1) to say: GA4 loads on every visit, no personal data, no save data, ad signals and personalization off.
  - Optional only (not required): Google Consent Mode defaults or a short cookie notice in the footer.
- **Files:** `src/lib/analytics.ts`, `docs/PLAN.md`, `README.md` (Analytics section is already correct; re-read).
- **Accept:** `grep -n "opt" docs/PLAN.md` finds no opt-in wording for analytics. The live bundle still has `allow_google_signals:!1` and `allow_ad_personalization_signals:!1` and no `anonymize_ip`. GA4 Realtime shows a visit.

---

## Should

### S1. Parent gate is too easy
- **Problem:** The gate asks a sum of two numbers 5–12 (`src/lib/parentGate.ts:7–11`). A Grade 3 child can solve it. The problem never changes and tries are unlimited (`src/components/ParentGate.tsx:200`).
- **Fix:**
  - Use a harder problem: two-digit × one-digit (e.g. 23 × 7), or two-digit × two-digit addition with carrying. Show the problem in words as well, e.g. "twenty-three times seven".
  - Make a new problem after each wrong answer.
  - After 3 wrong answers, lock the gate for 30 seconds with a calm message ("Ask a grown-up").
  - Optional: an extra "press and hold for 3 seconds" step before the problem.
- **Files:** `src/lib/parentGate.ts`, `src/components/ParentGate.tsx`.
- **Accept:** A wrong answer shows a different problem. 3 wrong answers disable the input for 30 s. Answers are never under 100 for multiplication.

### S2. The app can fail to load
- **Problem:** `readMuted` (`src/lib/sounds.ts:4`) and `writeSave` (`src/lib/save.ts:74–76`) touch `localStorage` without try/catch. If storage is blocked or full, the app crashes on start. There is no error screen.
- **Fix:**
  - Add `src/lib/storage.ts` with `safeGet`, `safeSet`, `safeRemove` (try/catch, return `null`/`false` on failure). Use it everywhere `localStorage` is touched.
  - If saving fails, keep progress in memory for this visit and show a small note on the home page: "Progress can't be saved on this browser."
  - Add a React error boundary around `<App />` in `src/main.tsx` with a friendly screen (Ana and Ben, "Something went wrong", a **Reload** button and a **Home** link).
- **Files:** `src/lib/storage.ts` (new), `src/lib/save.ts`, `src/lib/sounds.ts`, `src/lib/appState.tsx`, `src/components/ErrorBoundary.tsx` (new), `src/main.tsx`.
- **Accept:** With storage blocked (e.g. DevTools override that throws on `localStorage`), the app loads and plays. A forced render error shows the friendly screen instead of a blank page. `grep -rn "localStorage" src` only matches `storage.ts`.

### S3. Remove all backup features
- **Problem:** Backup restore is fragile (paste only, silent overwrite, weak checks). Nicko decided to drop backup entirely.
- **Fix:**
  - Delete the Backup section from Settings (download, copy code, show code, paste and restore) in `src/pages/SettingsPage.tsx:93–125, 162–188`.
  - Delete `prettySave`, `encodeBackup`, `decodeBase64`, `parseBackup` from `src/lib/save.ts:78–112`, and `replaceSave` from `src/lib/appState.tsx`. Keep `sanitizeSave` for reading `localStorage`.
  - Settings keeps only **Reset progress** (with its confirm step) behind the parent gate.
  - Update `PLAN.md` lines 21 (Backup row), 50 (backup paragraph), 159, 166, 186, and `README.md`, to say progress stays on this device only, with no backup.
- **Files:** `src/pages/SettingsPage.tsx`, `src/lib/save.ts`, `src/lib/appState.tsx`, `docs/PLAN.md`, `README.md`.
- **Accept:** `grep -rniE "backup|base64|btoa|atob|parseBackup|encodeBackup|replaceSave" src README.md docs/PLAN.md` returns nothing. Settings shows only Reset. Build and typecheck pass.

### S4. A better quiz score is never saved
- **Problem:** Once the quiz is done, `completeActivity` returns early (`src/lib/appState.tsx:73`), so a later, higher score is shown but not saved.
- **Fix:** Add `recordQuizScore(key, score)` that saves the score when `correct` is higher than the saved one (and sets `gintongBituin` from the best score). Call it on every finished quiz that is not practice mode. The DoneScreen says "New best!" when it improves.
- **Files:** `src/lib/appState.tsx`, `src/pages/ActivityPage.tsx`, `src/activities/DoneScreen.tsx`.
- **Accept:** Score 5, redo and score 9 → the week shows 9 and the Golden Star after a refresh. Redo and score 3 → still 9.

### S5. Word search doesn't fit on phones
- **Problem:** 8×8 and 9×9 grids use cells of at least 48px (`src/activities/WordSearchGame.tsx:198`, `src/index.css:460–464`), so they are about 430–480px wide and scroll sideways. Words also run backwards and diagonally (`src/lib/wordSearch.ts:2–11`).
- **Fix:**
  - Cell size: `min(48px, (100vw - page padding - gaps) / columns)`, with a floor of about 28px (9 columns at 320px with 4px gaps). This is under the 48px rule; accept it for the grid only and make the selected cell very clear. Use a CSS variable for columns; remove `overflow-x` scrolling for grids that fit.
  - Directions: only right `[0,1]` and down `[1,0]`.
  - Keep the grid at most 9×9. Check at load that every week's words still place.
- **Files:** `src/lib/wordSearch.ts`, `src/activities/WordSearchGame.tsx`, `src/index.css`.
- **Accept:** At 320px and 360px wide, a 9×9 grid fits with no sideways scroll. Every word in W14–W20 reads left-to-right or top-to-bottom. All seven puzzles generate.

### S6. Analytics records the wrong page title
- **Problem:** `TrackVisits` (`src/App.tsx:14–21`) runs before the new page sets its title, so every page_view sends "FunReview — Grade 3 Reviewer".
- **Fix:** Send `page_view` from `useTitle` (in the same effect, right after `document.title` is set), and remove the page_view call from `TrackVisits` (keep `loadAnalytics()` there). Fire once per path.
- **Files:** `src/lib/useTitle.ts`, `src/App.tsx`, `src/lib/analytics.ts`.
- **Accept:** In GA4 DebugView, opening Week 14 sends one page_view with title "FunReview — Week 14" and the right path.

### S7. Map labels and overlapping pins
- **Problem:** Locked places say "Coming soon!" (`src/pages/MapPage.tsx`). Some 48px pins overlap, e.g. Kalibo (36,48) and Bacolod (42,51) in `src/content/map.ts`.
- **Fix:**
  - Locked label: "Finish Week N first" (N from `weekId`).
  - Move pin coordinates so no two pins are closer than one pin width at the smallest map size. Check all pairs (Visayas pins and Quiapo/Pasig are the likely ones).
- **Files:** `src/pages/MapPage.tsx`, `src/content/map.ts`.
- **Accept:** At 320px wide no two pins overlap. A locked place says "Finish Week 19 first" (or its week).

### S8. Content fixes (`src/content/q3/makabansa.ts`)
- **Problem → fix:**
  - **Line 287:** distractor "Lasing sa salita" → a kid-safe distractor, e.g. "Laging naglalaro".
  - **Lines 893, 1057, 1063, 1069:** mixed ako/kami. Make each riddle consistent, e.g. "Sayaw ako ng mga Maranao… Ano ako?", "Set ako ng maliliit na gong… Ano ako?", "Hinabi ako… Ano ako?".
  - **Lines 972, 1148:** "Saan pangunahing nasa mga …?" → "Saan pangunahing naninirahan ang mga Waray?" / "…ang mga Tausug?".
  - **Line 1172:** "Saan ginagawa ang T'nalak?" → "Sino ang gumagawa ng T'nalak?" (answer stays "Mga T'boli sa Lawa ng Sebu").
  - **Lines 1137, 633, 639:** replace "Tinikling lang ng ibang lugar", "Mabuhay cake", "Ani ng mansanas" with plausible distractors (e.g. "Tinikling", "Mabuhay", "Ani ng palay").
  - **Kalinga in the Visayas week (lines 864, 893, 1002):** keep the correction in W18. In W19 keep at most one short "Paalala" in the recap; drop the W19 Kalinga riddle and quiz item and replace them with Visayas items.
  - **map.ts:91:** move "debosyon sa Ina" off the Albay pin (it is Peñafrancia, Naga). Use a Mayon fact instead.
  - **Teacher answer-key note:** add a note for Nicko in `docs/lessons/README.md`: the W19 teacher slide says Kalinga is in Gitnang Luzon; the app teaches Cordillera. Her school test may expect the slide's answer.
- **Files:** `src/content/q3/makabansa.ts`, `src/content/map.ts`, `docs/lessons/README.md`.
- **Accept:** Each line above reads correctly in Filipino. `grep -n "Gitnang Luzon" makabansa.ts` shows no hits in the W19 riddles or quiz. Quiz count is still 10 per week.

---

## Nice

| # | Problem | Fix | Files | Accept |
|---|---|---|---|---|
| N1 | `og:image` is relative (`/og.png`) | Use `https://funreview.up.railway.app/og.png` (or build-time origin) for `og:image` and `twitter:image` | `index.html` | A link-preview tester shows the image |
| N2 | No Cache-Control on hashed assets | Add `serve.json` (`/assets/**` → `public, max-age=31536000, immutable`; `index.html` → `no-cache`), copied into `dist` | `public/serve.json` or `railway.toml`/start script | `curl -I` on a `/assets/*.js` shows `immutable`; `/` shows `no-cache` |
| N3 | Unknown pages are indexable | `Missing` calls `useTitle(..., { noindex: true })` | `src/pages/Missing.tsx` | `/nope` has `<meta name="robots" content="noindex">` |
| N4 | `robots.txt` allows everything | Keep allow, add `Disallow: /settings`; optionally decide noindex for the whole site | `public/robots.txt` | File served with the new rule |
| N5 | Filipino text read as English | Add `lang="fil"` to elements showing lesson text (week titles, recap, prompts, choices, cards, map facts) | activities, pages, `SpeechBubble.tsx` | Screen reader / DOM shows `lang="fil"` on lesson text |
| N6 | Dialog may flash before opening | Scope styles to `.dialog[open]` | `src/index.css:404` | No flash when tapping a locked node |
| N7 | Dev strings | Fix "Hindi tamang tamang sagot" (`makabansa.ts:13`); make dev error messages English to match the app chrome, incl. `appState.tsx:107` | `makabansa.ts`, `appState.tsx`, `wordSearch.ts:102` | grep shows fixed text |
| N8 | oxlint warning `appState.tsx:105` | Move `useAppState` (and context) to `src/lib/useAppState.ts` | `src/lib/appState.tsx`, new file, imports | `npx oxlint` shows 0 warnings |

---

## Order of work
1. Docs first: update `PLAN.md` for analytics always-on (M3), backup removal (S3), and new scoring and badge proposal (M2).
2. S2 safe storage + error boundary (everything else saves through it).
3. S3 remove backup code and Settings UI.
4. M2 quiz first-try scoring, then S4 best score.
5. M1 seeded shuffle + W15 rewrite + position check.
6. S8 content fixes (same file as M1; do together).
7. S5 word search size and directions.
8. M3 code tweak (drop `anonymize_ip`) and S6 page_view after title.
9. S1 stronger parent gate.
10. S7 map label and pins.
11. Nice items N1–N8.
12. `npm run build`, `npx oxlint`, run the test checklist, commit. Deploy only when Nicko says so.

## Test checklist
- [ ] `npm run build` and `npx tsc -b` pass; `npx oxlint` has 0 warnings.
- [ ] Correct-answer position check: no week above 50% in one position; same order after refresh.
- [ ] Quiz: all wrong = 0/10; 7 right = no Golden Star; 8 right = Golden Star; no way to retry a wrong item.
- [ ] Badge appears after finishing the quiz in order (per the proposal), even below 8.
- [ ] Redo quiz with a higher score → best score saved after refresh; lower score doesn't replace it.
- [ ] Storage blocked → app loads, plays, shows the "can't save" note. Forced error → friendly screen with Reload.
- [ ] No backup UI or code left (grep in step S3 returns nothing). Reset still works behind the gate.
- [ ] Parent gate: multiplication problem, new problem after a wrong answer, 30 s lockout after 3 wrong.
- [ ] Word search at 320px and 360px: fits, no sideways scroll, words only right or down, all 7 weeks generate.
- [ ] GA4 DebugView: one page_view per page with the correct title; events have no names or save data; no `anonymize_ip` in the bundle; signals and ad personalization still off.
- [ ] Map: locked places say "Finish Week N first"; no overlapping pins at 320px.
- [ ] Content lines in S8 read correctly; W19 has no Kalinga riddle or quiz item.
- [ ] Deep links (`/quarter/q3/makabansa/w14/quiz`) still load after refresh; `/nope` is noindex.
- [ ] `curl -I` shows `immutable` on `/assets/*` and `no-cache` on `/` (if N2 done).
- [ ] Mobile check on a phone and a tablet: tap targets ≥ 48px (word-search cells may go to ~28px on the smallest phones), mute works.
