# FunReview — Q3 Filipino, English and Math Plan

> Status: **Planned** (24 Nov 2026). Docs only; nothing is built yet.
> Sources: [`lessons/q3/filipino`](./lessons/q3/filipino), [`lessons/q3/english`](./lessons/q3/english), [`lessons/q3/math`](./lessons/q3/math) (index in [`lessons/README.md`](./lessons/README.md)).
> How new lessons get here: [`ADDING-LESSONS.md`](./ADDING-LESSONS.md).

## 0. Ground rules
- **Makabansa stays exactly as it is.** Same content file, same activities, same path order, same save keys, same map. Every change below is additive and optional.
- **Language:** the app menus stay English. Lesson text follows the subject: Filipino and Makabansa in Filipino, English and Math in English (the Math PDFs are in English).
- **Decisions from [`FIXES-PLAN.md`](./FIXES-PLAN.md) apply to every subject:**
  - Analytics is always on. Same events only (page view, lesson opened, activity completed, quiz score band, badge earned). Never send typed answers, names, or save data.
  - Backup is removed. Progress stays in `localStorage` on the device.
  - A star counts only on the first try. A wrong answer shows the right answer and the explanation, then **Next**. 8+ of 10 = Golden Star. The week badge is earned by finishing the quiz in order.
- Same kid-first UX: chunky ≥48px targets, tap (never drag-only), gentle instant feedback, 2–5 minute activities, no hearts, no streak resets, no leaderboards, no timers that punish.
- Content is written by hand from the PDFs. Fix source errors (lists below); never copy them.

---

## 1. Filipino (Q3, Weeks 14–20, in Filipino)

| Week | Topic | Core idea for the app |
| --- | --- | --- |
| 14 | Salitang Dinaglat | Pantawag at daglat: G. (Ginoo), Gng. (Ginang), Bb. (Binibini), Dr. (Doktor), Atty. (Attorney/Abogado), Engr. (Engineer/Inhinyero), Gob. (Gobernador), Kgg. (Kagalang-galang), Cong. (Kongresista). Daglat ay tanda ng paggalang. |
| 15 | Uri ng Pang-abay | Pamanahon (kailan), Panlunan (saan; sa/kay/kina), Pamaraan (paano; nang/na/-ng). |
| 16 | Salitang Pangkayarian / Pang-ugnay | Pangatnig (at, pati, saka, ngunit, dahil, upang, kung…), Pang-ukol (sa, ng, ni/nina, kay/kina, ayon sa, para sa, tungkol sa…), Pang-angkop (na, -ng, -g). |
| 17 | Kuwentong-bayan | "Ang Punong Kawayan": tauhan, tagpuan, aral (kababaang-loob). Mga uri: mito, alamat, pabula. |
| 18 | Magagalang na Salita* | po/opo, pagbati, pasasalamat, paghingi ng pahintulot ("Maaari po ba…?", "Paki…"), paghingi ng paumanhin. |
| 19 | Wastong Pagsulat ng Talata | Talata = magkakaugnay na pangungusap sa isang paksa. Malaking letra, wastong baybay, bantas (. ? !), pamagat sa gitna, pasok sa unang linya, palugit. |
| 20 | Pagbuo ng Talata tungkol sa Karanasan | Anim na gabay na tanong: Ano, Saan at kailan, Sino ang kasama, Ano ang ginawa, Ano ang naramdaman, Ano ang natutuhan. |

\*W18 file name says "Q2 W18"; filed as Q3 W18 (see lessons README). Confirm with Eunice.

### Corrections (do not copy from source)
Page numbers are PDF pages. Most Filipino text is OCR, so recheck the PDF page before writing content.
- **W14 dinaglat**
  - p12–15 "gingamit" → "ginagamit".
  - p17 vs p26: the vet is "Dr. John Remegio" in one slide and "Remigio" in another. Use one spelling.
  - p17 "Awditoryom" → "Awditoryum".
- **W15 pang-abay**
  - p11 "bibisitahin … nang linggo-linggo" is awkward. Use e.g. "Binibisita niya ang puntod ng kaniyang ina tuwing Linggo."
  - p14 "pinangyarihan, pangyayarihan" (duplicate, typo) → "pinangyarihan".
  - p19 "para magpapayo sa aking takdang-aralin" means "to give advice". Use "para magpaturo" or "para humingi ng payo".
- **W16 pang-ugnay**
  - p9 rule says "-g" is used when the word ends in **n** (correct: masunurin → masunuring), but the example "Maruming damit" is wrong for that rule: *marumi* ends in a vowel, so it takes **-ng**.
  - The slides never state the vowel rule. The app teaches three rules: **na** after a consonant (except n), **-ng** after a vowel (magandang, maruming), **-g** after n (masunuring).
  - p4 "Nag-trabaho siya ng mabuti" → "Nagtrabaho siya **nang** mabuti" (pamaraan uses *nang*).
  - p14–15 examples about COVID-19 case counts and the IATF are dated and heavy for a child. Replace them with everyday sentences.
- **W17 kuwentong-bayan**
  - p22 says folk tales were "nabuo ng mga manunulat". Folk tales are oral and anonymous, passed down by elders (the slide itself says so on p24). The app says "kuwentong ipinasa nang pasalita mula sa matatanda".
  - p23 lists *Parabula* as a kind of kuwentong-bayan. A parable comes from the Bible, not Philippine folklore. Teach mito, alamat and pabula, and leave out parabula.
  - "Maari" → "Maaari".
- **W18 magagalang na salita**
  - "Kamusta" → "Kumusta".
  - "maari" → "maaari".
  - p16 "magala na salita" → "magalang na salita".
  - "Maam" → "Ma'am".
  - p12 "Spolarium" → "Spoliarium".
  - p6–7 "ninya" → "ninyo" (check the PDF).
  - p18–19 the examples ("Ate Luisa maari ba akong…", "Teacher! maari ba akong…") have no *po*, and "Teacher!" is not polite. Use them as "Ayusin: idagdag ang po" items, with corrected answers.
  - The facts check out: the national bird is the Agila (Philippine eagle), the national tree is the narra, and Spoliarium is by Juan Luna.
- **W19 talata**
  - p8/p15 "tandang panamdam" → "tandang **padamdam**".
  - "Gumamit **nang** wastong bantas" → "Gumamit **ng** wastong bantas".
  - p14 "Ang Chocolate Hills ay ang **pinakaordinaryong** tanawin" → "**pinakatanyag** na tanawin".
  - p17 "Ang Tarsier … pinakamaliit na **unggoy** sa daigdig" is wrong: a tarsier is not a monkey and not the smallest primate. Say "isa sa pinakamaliliit na primate sa mundo; makikita sa Bohol".
  - p25 "tulang mga Pilipino" → "tula ng mga Pilipino".
- **W20 pagbuo ng talata**
  - p4 heading "Answer the Question" is English on a Filipino slide. Use "Sagutin ang tanong".
  - p8 "narin" → "na rin".
  - p26 word bank has "proud". Use "ipinagmamalaki" or "masaya at buong-pagmamalaki".

### Activities that fit
| Week | Activities |
| --- | --- |
| 14 | Story (Ana & Ben); **Match up** daglat ↔ buong salita; Flip cards (daglat → salita → halimbawang pangungusap); Who Am I? riddles (from the slide: doktor, abogado, inhinyero, Ginang, Ginoo); **Fix it** (tap the wrong daglat or missing period: "Gng" → "Gng."); Quiz. |
| 15 | Story; **Sort** sentences into Pamanahon / Panlunan / Pamaraan; **Tap the word** (tap the pang-abay in a sentence); question-word match (kailan ↔ pamanahon, saan ↔ panlunan, paano ↔ pamaraan); Quiz. |
| 16 | Story; **Sort** words into Pangatnig / Pang-ukol / Pang-angkop; **Fill the gap** (choose na / -ng / -g: "maganda__ bata"); **Tap the word** (find the pang-ugnay); Quiz. |
| 17 | **Read** "Ang Punong Kawayan" (short pages with Ana & Ben); **Order the story** (5 events); feelings/aral questions; Match up tree ↔ katangian (Santol: hitik sa bunga, Mangga: mayabong, Kabalyero: mabulaklak, Niyog: tuwid, Kawayan: mababang-loob); Quiz. |
| 18 | Story; **Polite or not?** (Sort: magalang / hindi magalang); **Fix it** (add *po*); situation → right expression (pagbati, pasasalamat, pahintulot, paumanhin); Quiz. |
| 19 | Story (rules of a talata); **Fix it** (capital letter, spelling, bantas); **Order the paragraph** (put 4 sentences of a talata in order); Read a short talata (Bohol, corrected) and answer; Quiz. |
| 20 | Story (6 gabay na tanong); **Build a paragraph**: pick one answer for each guide question and see the talata form; **Order the paragraph**; Quiz. No free typing; this is tap-to-choose. |

Word search fits W14 (daglat words), W15–W16 (term words) and W17 (tree names). Leave it out where the words are function words (na, ng, sa), which are too short.

---

## 2. English (Q3, Weeks 14–19, in English)

| Week | Topic | Core idea for the app |
| --- | --- | --- |
| 14 | Interrogative Pronouns | who (person), whom (person, formal), whose (owner), which (choice), what (thing). |
| 15 | Inferring Feelings and Traits | Feeling = how a character feels now (happy, nervous, bored…); trait = what they are like (helpful, honest, shy, polite…). Clues: what they say, how, and what they do. |
| 16 | Cause and Effect | Cause = why it happened; effect = what happened. Signal words: because, since, due to (cause); so, therefore, thus, consequently (effect). |
| 17 | Predicting Outcomes | Use story clues and your own experience to predict a believable ending ("The Golden Touch", "The Lion and the Poor Slave", "The Ant and the Dove"). |
| 18 | Retelling a Story | Myth, legend, fable; characters, setting, problem, solution; beginning, middle, end (Graham at the zoo, Snow White). |
| 19 | Possessive Pronouns | Before a noun: my, your, his, her, its, our, their. Stand alone: mine, yours, his, hers, ours, theirs. No apostrophe (its ≠ it's). |

No Week 20 was sent.

### Corrections (do not copy from source)
- **W14 interrogative**
  - Week labels disagree: the cover says Q3 W14, the file name says Q3W1, and the drills say W13. The app uses W14.
  - p4 "Which you like more, adobo or sinigang?" → "Which **do** you like more…?"
  - p7's second bullet ("Words that replace persons, places…") is the definition of *pronouns* in general, not interrogative pronouns.
  - p15 item 8 "______ book belongs to you?" fits both Which and Whose. Rewrite so only one answer works, e.g. "______ book is this? It's Ana's." → Whose.
- **W16 cause and effect**
  - p5 "the results, outcomes, result" → "the result or outcome".
  - p15 lists *if, when, then* as cause/effect words. These are mainly time or condition words, so leave them out.
  - p16 "because she **is** not feeling well" → "**was**".
  - p20 "Give three effect" → "effects".
  - p21 "Goldilocks ate their food , broke a chair. and slept in a bed." → "…ate their food, broke a chair, and slept in a bed."
- **W17 predicting**
  - p31 "What do mean by…" → "What do **we** mean by…".
  - p34 "write what you think what happen next" → "write what you think **will** happen next".
  - p34 "put it on coffee table" → "on **the** coffee table".
- **W18 retelling**
  - p3 says myths "usually feature **Greek** gods". Myths come from every culture, including Philippine myths (e.g. about Bathala).
  - p31 "let's you share" → "**lets** you share".
  - p34 "choos" → "choose".
  - p34 "The Rabbit and the Grasshopper" is probably "The Ant and the Grasshopper"; confirm with Eunice.
  - The performance-task dates (16–19 Nov 2026) are school logistics. Leave them out of the app.
- **W19 possessive**
  - The file name says "Q2 W5" but the cover says Q3 W19.
  - **p28 is wrong.** It says "Possessive pronouns that take the place of nouns are my, your, his, her, its, our and their." Those words come **before** a noun. The ones that **take the place of** a noun are mine, yours, his, hers, ours, theirs. The p25 table is right; follow it.
  - p4 Rule #1 talks about a "dog", but the example sentence is about a cello.
  - p7 "These books **belongs**" → "belong".
  - p13 "This is her pajamas" → "**These are** her pajamas".
  - p32 "things you **owned**" → "own".
  - p33 "stuck **on the** traffic" → "stuck **in** traffic".

### Activities that fit
| Week | Activities |
| --- | --- |
| 14 | Story; **Pick the question word** (Who/Whom/Whose/Which/What fill-in); **Match up** question word ↔ what it asks about; **Sentence builder** (tap tiles to build "Whose bag is this?"); Quiz. |
| 15 | Story; **Read and infer** (short situation → feeling, then trait); **Sort** words into Feeling / Trait; Who said it? (Aesop lines from the slides); Quiz. |
| 16 | Story; **Sort** Cause / Effect halves; **Match up** cause ↔ effect; **Sentence builder** with *because* / *so*; Quiz. |
| 17 | Story; **Read and predict** (story pages, then "What happens next?" with 3 endings: one believable, one silly, one not matching the clues; explanation says why); Quiz. |
| 18 | Story; **Order the story** (Beginning / Middle / End cards for Graham and Snow White); **Sort** Myth / Legend / Fable; story-elements match (characters, setting, problem, solution); Quiz. |
| 19 | Story; **Sort** Before a noun / Stands alone; **Fill the gap** ("That dog is ___ (my/mine)."); **Sentence builder** ("This is mine."); Quiz. |

Tap-to-hear phonics is **not** needed for these topics (they are grammar and reading comprehension). Keep it as a later option only.

---

## 3. Math (Q3, Weeks 14–17, in English)

| Week | Topic | Core idea for the app |
| --- | --- | --- |
| 14a | Interpreting a Single Bar Graph | Title, vertical axis (values), horizontal axis (categories); higher bar = higher value; read values, compare ("how many more"), add ("altogether"). |
| 14b | Probability | Certain, likely, unlikely, impossible; compare how many of each item. |
| 15 | Multiplication Tables 6–9 | Skip counting, arrays, 7 days × weeks, 8 octopus arms, 9s finger trick; facts 6×1 … 9×10. |
| 16 | Properties of Multiplication | Commutative (4×5 = 5×4), Identity (×1), Zero (×0), Distributive (7×6 = 5×6 + 2×6). |
| 17 | Multiplying by a 1-digit number | L1 without regrouping (21×4, 312×3), L2 with regrouping (26×3, 246×4), L3 multiples of 10/100/1,000 (70×8, 500×9, 2,000×4). |

I checked every worked answer in the Math PDFs; all the products are correct. The problems below are in how things are written, not in the arithmetic.

### Corrections (do not copy from source)
- **W14 bar graph**
  - Title "Bar Gaph" → "Bar Graph".
  - p9 "Books Read by Four Pupils" is drawn with text characters, and its bars don't line up with the names, so the values can't be read. The app draws its own data with clear bars.
  - Verified answers:
    - Likes: Arts and Crafts 600, Food Review 400, Museum Visit 400, Toy Review 200.
    - Pets: Dog 8, Cat 6, Bird 5, Fish 4. Most liked is Dog; 4 like fish; 4 more like dogs than fish; cats and birds together are 11.
    - Cute animals: Robin 70 − Polly 25 = 45 more.
- **W14 probability**
  - p10 "A coin may land heads up" fits none of the four words (it is an even chance). Leave it out or add "equal chance" later.
  - p18 mentions "frequency" and "total trials" without teaching them. Skip.
- **W15 tables**
  - The tables on the slides are incomplete:
    - 6s: 6×9 missing; 6×4 appears only as the array.
    - 7s: 7×2 and 7×10 missing.
    - 8s: 8×2 and 8×10 missing.
    - 9s: 9×5 and 9×10 missing.
  - The app teaches the full ×1 to ×10 for each.
  - The "digits add up to 9" rule holds for 9×1 to 9×10 only. Say that.
- **W16 properties**: all correct. The associative property is not covered; leave it out.
- **W17 L1**: all products correct (84, 96, 86, 88, 93, 936, 369, 824, 804, 848). "Toy Bakery" is an odd title for a cookie word problem.
- **W17 L2**
  - p4 writes "(3×3)+2 = 111", "(4×4)+2 = 180", "(6×5)+4 = 340". The step results are **11 tens**, **18 tens** and **34 tens**. The app shows each column step separately ("3×3 = 9, 9+2 = 11 → write 11"), with the product at the end.
  - p8–13 repeat the no-regrouping lesson, and p10 stacks the answer digits in a confusing layout. Ignore those pages.
- **W17 L3**
  - "20 + 00" and "(+ 1 zero)" look like addition. Say "write the basic fact, then put the zeros after it".
  - p2 "Leading digit is 4, followed by one zero (e.g., 20, 50, 80)": the examples don't match the digit. Say "a digit followed by one zero (40; also 20, 50, 80)".

### Activities that fit (graded difficulty inside each week)
| Week | Activities |
| --- | --- |
| 14a | Story; **Bar graph reader** (tap a bar to see its value; questions: which most, how many, how many more, altogether); **Number pad** answers; Quiz. |
| 14b | Story; **Probability bag** (see the counters, then **Sort** each event into Certain / Likely / Unlikely / Impossible); Quiz. |
| 15 | Story; **Skip-count hop** (tap the next number on lily pads); **Array builder** (tap rows × columns to show 6×4); **Number pad** fact practice, Level 1 (×1–×5) → Level 2 (×6–×10) → Level 3 (word problems: weeks, octopus, cookie boxes); **9s finger trick** (tap a finger to fold it, see the tens and ones); Quiz. |
| 16 | Story; **Array flip** (rotate 4×2 → 2×4: same total); **Sort** facts by property (Commutative / Identity / Zero / Distributive); **Break it down** (split 7 into 5 + 2 and add the parts); Quiz. |
| 17 | Story; **Column multiply** step by step (ones → tens → hundreds, carry box, H/T/O colours), Level 1 no regrouping → Level 2 regrouping → Level 3 3-digit regrouping; **Zero pattern** (basic fact, then add zeros); **Word problems** with number pad; Quiz. |

Quizzes keep 10 items. Math quiz items can be multiple choice or number-pad answers. The first try decides the star.

---

## 4. New UI/UX patterns (beyond Makabansa's)
These are shared components. Each is proposed only because a topic above needs it.

| Pattern | Used by | How it works (kid-first) |
| --- | --- | --- |
| **Sort into bins** | Fil W15, W16, W18; Eng W15, W16, W18, W19; Math W14b, W16 | One card at a time; tap a bin (2–4 big labelled buckets). Wrong → shake, explanation, card goes to the right bin, then Next. No dragging. |
| **Tap the word** | Fil W15, W16 | A sentence as big word chips; tap the target word (e.g. the pang-abay). |
| **Fill the gap** | Fil W16 (na/-ng/-g), Eng W14, W19 | Sentence with a blank; 2–4 chunky options; the answer appears in the blank. |
| **Fix it** | Fil W14, W18, W19 | Sentence with one mistake (missing *po*, no capital, wrong bantas, wrong daglat). Tap the wrong part, then choose the fix. |
| **Sentence builder** | Eng W14, W16, W19 | Word tiles in a tray; tap them in order to build the sentence; tap a placed tile to send it back. |
| **Order the story / paragraph** | Fil W17, W19, W20; Eng W18 | 3–5 event cards; tap them in order (1, 2, 3…). Wrong order → show the right order with the reason. |
| **Read and answer** | Fil W17, W19; Eng W15, W17 | Short pages (2–4 lines each) with Ana & Ben, then 3–5 tap-to-choose questions. "Look back" button reopens the text. |
| **Build a paragraph** | Fil W20 | Six guide questions; pick an answer chip for each; the talata assembles in a card. Choices only; no free typing. |
| **Number pad** | All Math | On-screen keypad 0–9, ⌫, ✓; keys ≥64px; phone keyboard never opens (`inputMode="none"`, read-only display). |
| **Counters and arrays** | Math W15, W16 | Tap to add rows; rotate button shows commutative; dot groups for skip counting. |
| **Column multiply** | Math W17 | Vertical layout with H/T/O columns; one highlighted step at a time; carry box above; the child types each step's digit on the number pad. |
| **Zero pattern** | Math W17 L3 | Shows basic fact tiles (5 × 9 = 45); zero tiles slide in after it (4,500). |
| **Bar graph reader** | Math W14a | SVG bar graph (title, axes, gridlines); tap a bar to show its value; questions below. |
| **Probability bag** | Math W14b | Emoji counters in a bag (8 🥭, 2 🍎); a "how likely?" meter with the four words. |
| **9s finger trick** | Math W15 | Ten finger buttons; tap one to fold it; the tens and ones counts show. |
| **Graded levels** | Math (all) | Each practice activity has Level 1 → 2 → 3 inside the same 2–5 min session; Level 3 is word problems. Levels are not locked; the path still uses one node per activity. |

Not needed for these topics: pantig/word building (no syllable lesson in the set) and tap-to-hear phonics (no phonics lesson). Keep both as later ideas.

Accessibility for all new patterns: `lang` from the subject on lesson text, `role="status"` feedback, visible focus, works with `prefers-reduced-motion`. On a 320px screen there's no sideways scroll except the word search's own grid rules.

---

## 5. How it fits the current code (extension only)
Read against `src/content/types.ts` and `src/content/catalog.ts` at commit `feb6567`.

**Catalog** (`catalog.ts`)
- Add `lessonLang: "fil" | "en"` to `SubjectInfo`: Filipino `fil`, English `en`, Mathematics `en`, Makabansa `fil` (same as today), Science and GMRC set when their lessons arrive.
- Register new week arrays in `lessons`: `"q3/filipino"`, `"q3/english"`, `"q3/mathematics"`. The subject id stays `mathematics` (routes and save keys). The docs folder is `math`.
- A subject with no file stays "Coming soon!" (unchanged).
- New content files: `src/content/q3/filipino.ts`, `src/content/q3/english.ts`, `src/content/q3/mathematics.ts`. `makabansa.ts` is not touched.

**Types** (`types.ts`): only additive.
- Append new ids at the **end** of `ACTIVITY_IDS` so the saved ids stay valid: `"sort"`, `"tapWord"`, `"fillGap"`, `"fixIt"`, `"builder"`, `"sequence"`, `"reading"`, `"numberPad"`, `"arrays"`, `"columnMultiply"`, `"zeroPattern"`, `"barGraph"`, `"probability"`, `"fingerTrick"`.
- Add optional fields to `WeekContent`, each with its own shape:
  ```ts
  sort?: { bins: Choice[]; items: { text: string; binId: string; explanation: string }[] }
  tapWord?: { words: string[]; correctIndex: number; explanation: string }[]
  fillGap?: { before: string; after: string; choices: Choice[]; correctId: string; explanation: string }[]
  fixIt?: { words: string[]; wrongIndex: number; choices: Choice[]; correctId: string; explanation: string }[]
  builder?: { prompt: string; tiles: string[]; extraTiles?: string[]; explanation: string }[] // tiles in correct order
  sequence?: { prompt: string; steps: string[]; explanation: string }[]                         // steps in correct order
  reading?: { title: string; pages: { speaker?: "ana" | "ben"; text: string }[]; questions: PromptItem[] }
  numberPad?: { prompt: string; answer: number; level: 1 | 2 | 3; explanation: string; visual?: Visual }[]
  arrays?: { rows: number; cols: number; prompt: string }[]
  columnMultiply?: { top: number; bottom: number; level: 1 | 2 | 3 }[]                         // steps computed in code
  zeroPattern?: { factorA: number; factorB: number }[]
  barGraph?: { title: string; valueLabel: string; categoryLabel: string; bars: { label: string; value: number }[]; questions: (PromptItem | NumberItem)[] }
  probability?: { bag: { emoji: string; count: number }[]; events: { text: string; answer: "certain" | "likely" | "unlikely" | "impossible"; explanation: string }[] }
  fingerTrick?: { facts: number[] } // 9 × n
  ```
  `NumberItem = { kind: "number"; prompt: string; answer: number; explanation: string }`. `quiz` becomes `(PromptItem | NumberItem)[]`. Makabansa's quiz items are plain `PromptItem`, so they still typecheck unchanged.
- The existing shapes are reused as they are: `recap` (Ana & Ben), `riddles`, `matching`, `wordSearch`, `flashcards`. For non-Makabansa cards, `name` = term, `place` = category, `fact` = example. No rename, so Makabansa is untouched.

**Path and save**
- `activitiesIn()` keeps today's order for the current ids. New ids slot in after `wordSearch` and before `quiz`, in the order listed. Makabansa weeks have none of the new fields, so their path is identical.
- Save keys follow the pattern `q3/<subjectId>/w<NN>` (e.g. `q3/mathematics/w17`). There is no migration and the save stays `version: 1`; `sanitizeSave` accepts the appended ids.
- The badge and Golden Star rules are the same as Makabansa (FIXES-PLAN M2 and S4: best score kept).
- The map stays Makabansa-only.

**Checks (extend the load-time checks Makabansa already has)**
- Each week has 10 quiz items, and every `correctId` exists.
- Correct-answer positions stay balanced after the seeded shuffle.
- Math: every `answer` equals the computed value (e.g. `top * bottom`; `factorA * factorB`), and every `columnMultiply` level matches whether it regroups.
- `sequence` and `builder` need at least 3 steps or tiles; every `sort` item's `binId` exists.

**Analytics**: no new event names. `activity_completed` carries the new activity id; nothing typed is sent.

---

## 6. Milestones (build later, when Nicko says start)
1. **Confirm sources.** Filipino W18 quarter; English "The Rabbit and the Grasshopper"; whether Math W18–W20 and English W20 are coming.
2. **Types and catalog extension.** Add `lessonLang` and the optional fields, append the ids, register empty subjects. Accept: build passes; Makabansa pages, path, saves and map unchanged (manual check of W14–W20).
3. **Shared language components.** Sort, Tap the word, Fill the gap, Fix it, Sentence builder, Order, Read and answer, Build a paragraph. Accept: each works by tap only at 320px; feedback follows the first-try rule.
4. **Filipino content W14–W20** in `q3/filipino.ts`, with the corrections above. Accept: content checks pass; a Filipino reviewer reads every item; `lang="fil"` on lesson text.
5. **English content W14–W19** in `q3/english.ts`. Accept: content checks pass; the p28 possessive error is not present.
6. **Math components.** Number pad, number quiz items, arrays, column multiply, zero pattern, bar graph, probability bag, finger trick, graded levels. Accept: number pad never opens the phone keyboard; column steps show carries correctly for 26×3, 37×3, 246×4.
7. **Math content W14–W17** in `q3/mathematics.ts`. Accept: every answer is computed and checked at load; full 6–9 tables.
8. **QA and release.** Phone and tablet pass, analytics events seen in GA4 DebugView, Makabansa regression check, then deploy when Nicko approves.
