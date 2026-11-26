# FunReview — Q3 Filipino, English, Math and Computer Plan

> Status: **Built** (26 Nov 2026) for Filipino W14–W20, English W14–W19, Math W14–W17, and Computer W14–W20.
> Data-model choices for path order, Math Week 14, and the new activity ids are locked in section 5.
> Sources: [`lessons/q3/filipino`](./lessons/q3/filipino), [`lessons/q3/english`](./lessons/q3/english), [`lessons/q3/math`](./lessons/q3/math), [`lessons/q3/computer`](./lessons/q3/computer) (index in [`lessons/README.md`](./lessons/README.md)).
> How new lessons get here: [`ADDING-LESSONS.md`](./ADDING-LESSONS.md).

## 0. Ground rules
- **Makabansa stays exactly as it is.** Same content file, same activities, same path order, same save keys, same map. Every change below is additive and optional.
- **Language:** the app menus stay English. Lesson text follows the subject: Filipino and Makabansa in Filipino; English, Math, and Computer in English (their PDFs are in English).
- **Decisions from [`FIXES-PLAN.md`](./FIXES-PLAN.md) apply to every subject:**
  - Analytics is always on. Same events only (page view, lesson opened, activity completed, quiz score band, badge earned). Never send typed answers, names, or save data.
  - Backup is removed. Progress stays in `localStorage` on the device.
  - A star counts only on the first try of a **quiz** item. A wrong quiz answer shows the right answer and the explanation, then **Next**. 8+ of 10 = Golden Star. The week badge is earned by finishing the quiz in order. Other activities do not award stars; the node is done when the last item is finished.
- New activities use that same wrong-answer rule (show the right answer and the explanation, then **Next**). The existing Who Am I? activity keeps **Try again**, so Makabansa does not change.
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
| 15 | Story; **Sort** sentences into Pamanahon / Panlunan / Pamaraan; **Tap the word** (tap the pang-abay in a sentence); **Match up** question word ↔ kind (kailan ↔ pamanahon, saan ↔ panlunan, paano ↔ pamaraan); Quiz. |
| 16 | Story; **Sort** words into Pangatnig / Pang-ukol / Pang-angkop; **Fill the gap** (choose na / -ng / -g: "maganda__ bata"); **Tap the word** (find the pang-ugnay); Quiz. |
| 17 | **Read** "Ang Punong Kawayan" (short pages with Ana & Ben, then the feelings and aral questions on that same node); **Order the story** (5 events); **Match up** tree ↔ katangian (Santol: hitik sa bunga, Mangga: mayabong, Kabalyero: mabulaklak, Niyog: tuwid, Kawayan: mababang-loob); Quiz. |
| 18 | Story; **Sort** polite or not (magalang / hindi magalang); **Fix it** (add *po*); **Match up** situation → right expression (pagbati, pasasalamat, pahintulot, paumanhin); Quiz. |
| 19 | Story (rules of a talata); **Fix it** (capital letter, spelling, bantas); **Order the paragraph** (put 4 sentences of a talata in order); Read a short talata (Bohol, corrected) and answer; Quiz. |
| 20 | Story (6 gabay na tanong); **Build a paragraph**: pick one answer for each guide question and see the talata form; **Order the paragraph**; Quiz. No free typing; this is tap-to-choose. |

Word search fits W14 (daglat words), W15–W16 (term words) and W17 (tree names). Leave it out where the words are function words (na, ng, sa), which are too short.

The path for each week follows that row (`activityOrder`). One node per activity.

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
| 14 | Story; **Fill the gap** (Who/Whom/Whose/Which/What); **Match up** question word ↔ what it asks about; **Sentence builder** (tap tiles to build "Whose bag is this?"); Quiz. |
| 15 | Story; **Read and infer** (several short situations on one node: feeling, then trait); **Sort** words into Feeling / Trait; **Who Am I?** (who said it: Aesop lines from the slides); Quiz. |
| 16 | Story; **Sort** Cause / Effect halves; **Match up** cause ↔ effect; **Sentence builder** with *because* / *so*; Quiz. |
| 17 | Story; **Read and predict** (story pages, then "What happens next?" with 3 endings: one believable, one silly, one not matching the clues; explanation says why); Quiz. |
| 18 | Story; **Order the story** (Beginning / Middle / End cards for Graham and Snow White); **Sort** Myth / Legend / Fable; **Match up** story elements (characters, setting, problem, solution); Quiz. |
| 19 | Story; **Sort** Before a noun / Stands alone; **Fill the gap** ("That dog is ___ (my/mine)."); **Sentence builder** ("This is mine."); Quiz. |

Tap-to-hear phonics is **not** needed for these topics (they are grammar and reading comprehension). Keep it as a later option only.

The path for each week follows that row (`activityOrder`). One node per activity.

---

## 3. Math (Q3, Weeks 14–17, in English)

| Week | Topic | Core idea for the app |
| --- | --- | --- |
| 14a | Interpreting a Single Bar Graph | Title, vertical axis (values), horizontal axis (categories); higher bar = higher value; read values, compare ("how many more"), add ("altogether"). |
| 14b | Probability | Certain, likely, unlikely, impossible; compare how many of each item. |
| 15 | Multiplication Tables 6–9 | Skip counting, arrays, 7 days × weeks, 8 octopus arms, 9s finger trick; facts 6×1 … 9×10. |
| 16 | Properties of Multiplication | Commutative (4×5 = 5×4), Identity (×1), Zero (×0), Distributive (7×6 = 5×6 + 2×6). |
| 17 | Multiplying by a 1-digit number | L1 without regrouping (21×4, 312×3), L2 with regrouping (26×3, 246×4), L3 multiples of 10/100/1,000 (70×8, 500×9, 2,000×4). |

W14 is two catalog weeks, not one week with two quizzes. `w14` is the bar graph. `w14b` is probability. Both kickers say **Week 14**; the title tells them apart (`weekLabel: "14"` on `w14b`, because `week.id.slice(1)` would show "14b"). Each has its own story, activities, 10-item quiz, badge, and save key: `q3/mathematics/w14` and `q3/mathematics/w14b`.

W17 stays one week. L1 and L2 are two stages inside the column-multiply node (no regrouping, then regrouping, including 3-digit regrouping such as 246×4). L3 is the zero-pattern node, which is what that PDF teaches. Word problems are the number-pad node.

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
| 14a (`w14`) | Story; **Bar graph reader** (tap a bar to see its value; questions: which most, how many, how many more, altogether). Numeric questions use the number pad inside this node. Quiz. |
| 14b (`w14b`) | Story; **Probability bag** (see the counters, then **Sort** each event into Certain / Likely / Unlikely / Impossible); Quiz. |
| 15 | Story; **Skip-count hop** (tap the next number on lily pads); **Array builder** (tap rows × columns to show 6×4); **Number pad** fact practice, Level 1 (×1–×5) → Level 2 (×6–×10) → Level 3 (word problems: weeks, octopus, cookie boxes); **9s finger trick** (tap a finger to fold it, see the tens and ones); Quiz. |
| 16 | Story; **Array flip** (rotate 4×2 → 2×4: same total); **Sort** facts by property (Commutative / Identity / Zero / Distributive); **Break it down** as number-pad items that show the split (7×6 = 5×6 + 2×6); Quiz. |
| 17 | Story; **Column multiply** step by step (ones → tens → hundreds, carry box, H/T/O colours), Level 1 no regrouping → Level 2 regrouping (2-digit and 3-digit); **Zero pattern** (the L3 PDF: basic fact, then add zeros); **Word problems** with number pad; Quiz. |

The path for each week follows that row (`activityOrder`). One node per activity. Quizzes keep 10 items. Math quiz items can be multiple choice or number-pad answers. The first try decides the quiz star. Practice nodes do not award stars.

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
| **Read and answer** | Fil W17, W19; Eng W15, W17 | One path node. The field is an array of passages: English W15 holds several short situations, and one story (Fil W17, Eng W17, Fil W19) is one item with several pages. Short pages (2–4 lines each) with Ana & Ben, then 3–5 tap-to-choose questions. "Look back" button reopens the text. |
| **Build a paragraph** | Fil W20 | Own activity id (`paragraph`). Six guide questions; pick an answer chip for each; the talata assembles in a card. Choices only; no free typing. Finishing the last guide completes the node. No stars. |
| **Skip-count hop** | Math W15 | Own activity id (`skipCount`). Lily pads show the count so far; tap the next number. Wrong → show the right number and the explanation, then Next. |
| **Number pad** | Math W15, W16, W17, and inside W14a / quizzes | On-screen keypad 0–9, ⌫, ✓; keys ≥64px; phone keyboard never opens (`inputMode="none"`, read-only display). Also the keypad for numeric bar-graph questions, number quiz items, and W16 "Break it down" prompts. W14a has no separate number-pad node. |
| **Counters and arrays** | Math W15, W16 | Tap to add rows; rotate button shows commutative (4×2 → 2×4, same total). |
| **Column multiply** | Math W17 | Two stages in one node: Level 1 no regrouping, then Level 2 regrouping (2-digit and 3-digit). Vertical layout with H/T/O columns; one highlighted step at a time; carry box above; the child types each step's digit on the number pad. The L3 PDF is the zero-pattern node, not a third column stage. |
| **Zero pattern** | Math W17 L3 | Shows basic fact tiles (5 × 9 = 45); zero tiles slide in after it (4,500). Own path node. |
| **Bar graph reader** | Math W14a | SVG bar graph (title, axes, gridlines); tap a bar to show its value; questions below. Numeric answers use the number pad inside this node. |
| **Probability bag** | Math W14b | Emoji counters in a bag (8 🥭, 2 🍎); a "how likely?" meter with the four words. |
| **9s finger trick** | Math W15 | Ten finger buttons; tap one to fold it; the tens and ones counts show, then the next fact. Guided demo. Finishing the last fact completes the node. No stars. |
| **Graded levels** | Math W15 number pad; Math W17 column multiply | Items inside one node go easy, then harder. W15 number pad: Level 1 (×1–×5), Level 2 (×6–×10), Level 3 (word problems). W17 column multiply: Level 1 no regrouping, then Level 2 regrouping. The node is done when the last item is finished. Stars stay on the quiz. Levels are not a second lock; the path still has one node per activity. |

Not needed for these topics: pantig/word building (no syllable lesson in the set) and tap-to-hear phonics (no phonics lesson). Keep both as later ideas.

Accessibility for all new patterns: `lang` from the subject on lesson text, `role="status"` feedback, visible focus, works with `prefers-reduced-motion`. On a 320px screen there's no sideways scroll except the word search's own grid rules.

---

## 5. How it fits the current code (extension only)
Read against `src/content/types.ts` and `src/content/catalog.ts` at commit `feb6567`.

**Catalog** (`catalog.ts`)
- Add `lessonLang: "fil" | "en"` to `SubjectInfo`: Filipino `fil`, English `en`, Mathematics `en`, Makabansa `fil` (same as today), Science and GMRC set when their lessons arrive.
- Register new week arrays in `lessons`: `"q3/filipino"`, `"q3/english"`, `"q3/mathematics"`. The subject id stays `mathematics` (routes and save keys). The docs folder is `math`.
- A subject with no file stays "Coming soon!" (unchanged).
- New content files: `src/content/q3/filipino.ts`, `src/content/q3/english.ts`, `src/content/q3/mathematics.ts`. Leave `src/content/q3/makabansa.ts` byte-for-byte the same, including the load-time checks at the bottom of that file. Do not extract that loop. New files carry their own checks.

**Lesson language**
- Wire `lessonLang` onto lesson text. `lang="fil"` is hardcoded today and must follow the subject, or English and Math will be announced as Filipino. Menus, activity labels, and feedback chrome stay English. Set `lang` from the subject in: `SubjectPage` (week title and badge name), `WeekPage` (title and badge name), `ActivityPage` (title), `Recap`, `Quiz`, `Riddles`, `Choices`, `Matching`, `Flashcards`, `WordSearchGame`, and `DoneScreen` (badge name). `MapPage` stays `lang="fil"`; it is Makabansa content.

**Types** (`types.ts`): only additive.
- Milestone 2 appends the language ids at the **end** of `ACTIVITY_IDS`: `"sort"`, `"tapWord"`, `"fillGap"`, `"fixIt"`, `"builder"`, `"sequence"`, `"reading"`, `"paragraph"`.
- Milestone 6 appends the math ids after those: `"numberPad"`, `"arrays"`, `"columnMultiply"`, `"zeroPattern"`, `"barGraph"`, `"probability"`, `"fingerTrick"`, `"skipCount"`.
- Saved ids stay valid because nothing is inserted in front of an id that has already shipped. `quiz` stays `PromptItem[]` in milestone 2, so `Quiz.tsx` still typechecks. Milestone 6 defines `NumberItem = { kind: "number"; prompt: string; answer: number; explanation: string }` and widens `quiz` to `(PromptItem | NumberItem)[]`. Makabansa's quiz items are plain `PromptItem`, so they still typecheck.
- Add optional fields to `WeekContent`. Language fields land in milestone 2; math fields land in milestone 6:
  ```ts
  weekLabel?: string // kicker number only. w14b sets "14". Default is id without the leading "w".
  activityOrder?: ActivityId[]
  sort?: { bins: Choice[]; items: { text: string; binId: string; explanation: string }[] }
  tapWord?: { words: string[]; correctIndex: number; explanation: string }[]
  fillGap?: { before: string; after: string; choices: Choice[]; correctId: string; explanation: string }[]
  fixIt?: { words: string[]; wrongIndex: number; choices: Choice[]; correctId: string; explanation: string }[]
  builder?: { prompt: string; tiles: { id: string; text: string }[]; extraTiles?: { id: string; text: string }[]; explanation: string }[] // tiles in correct order
  sequence?: { prompt: string; steps: string[]; explanation: string }[] // steps in correct order
  reading?: { title?: string; pages: { speaker?: "ana" | "ben"; text: string }[]; questions: PromptItem[] }[]
  paragraph?: { guides: { prompt: string; choices: { id: string; text: string; sentence: string }[] }[] }[]
  numberPad?: { prompt: string; answer: number; level: 1 | 2 | 3; explanation: string }[]
  arrays?: { rows: number; cols: number; prompt: string }[]
  columnMultiply?: { top: number; bottom: number; level: 1 | 2 }[] // 1 = no carry, 2 = at least one carry. Steps computed in code.
  zeroPattern?: { factorA: number; factorB: number; zeros: number }[]
  barGraph?: { title: string; valueLabel: string; categoryLabel: string; bars: { label: string; value: number }[]; questions: (PromptItem | NumberItem)[] }
  probability?: { bag: { emoji: string; count: number }[]; events: { text: string; answer: "certain" | "likely" | "unlikely" | "impossible"; explanation: string }[] }
  fingerTrick?: { facts: number[] } // 9 × n, in order. Guided demo. No stars.
  skipCount?: { prompt: string; start: number; step: number; hops: number; explanation: string }[]
  ```
  There is no `Visual` type. Arrays, the bar graph, and the probability bag are their own activities. `paragraph` has no single correct answer: `sentence` is the clause added to the talata when that chip is tapped. `skipCount` pads are computed from `start` and `step`.
- The existing shapes are reused as they are: `recap` (Ana & Ben), `riddles`, `matching`, `wordSearch`, `flashcards`. For non-Makabansa cards, `name` = term, `place` = category, `fact` = example. No rename, so Makabansa is untouched. Riddles keep **Try again**.

**Path and save**
- `activitiesIn()`: if `activityOrder` is absent, the path is today's order for the six current ids only (recap, riddles, flashcards, matching, word search, quiz), skipping any that have no content. Makabansa does not set `activityOrder`, so its path and save keys stay the same. New weeks set `activityOrder` to the sequence in that week's activity table, one id each, quiz last when there is a quiz.
- Table labels map to ids: Story `recap`, Who Am I? `riddles`, Flip cards `flashcards`, Match up `matching`, Word Search `wordSearch`, Sort `sort`, Tap the word `tapWord`, Fill the gap `fillGap`, Fix it `fixIt`, Sentence builder `builder`, Order `sequence`, Read `reading`, Build a paragraph `paragraph`, Skip-count hop `skipCount`, Array `arrays`, Number pad `numberPad`, 9s finger trick `fingerTrick`, Column multiply `columnMultiply`, Zero pattern `zeroPattern`, Bar graph `barGraph`, Probability bag `probability`, Quiz `quiz`.
- The week kicker is `Week ${week.weekLabel ?? week.id.slice(1)}` on `SubjectPage` and `WeekPage`. `w14b` sets `weekLabel` to `"14"`.
- Save keys follow the pattern `q3/<subjectId>/<weekId>` (e.g. `q3/mathematics/w17`, `q3/mathematics/w14`, `q3/mathematics/w14b`). There is no migration and the save stays `version: 1`; `sanitizeSave` accepts the appended ids.
- The badge and Golden Star rules are the same as Makabansa (FIXES-PLAN M2 and S4: best score kept). Stars are the quiz score only. `w14` and `w14b` each earn their own badge.
- The map stays Makabansa-only. `SubjectPage` currently renders "A trip around the Philippines" for every subject that has weeks. Gate that card on `subject.id === "makabansa"`. The header Map link and `MapPage` stay as they are.

**Checks (in each new content file; do not edit the Makabansa checks)**
- Each week has 10 quiz items, and every `correctId` exists.
- Correct-answer positions stay balanced after the seeded shuffle.
- `activityOrder` lists exactly the activities that have content, each once, and ends with `quiz` when the week has one.
- `sequence` and `builder` need at least 3 steps or tiles; every `sort` item's `binId` exists; every builder tile `id` is unique.
- `columnMultiply`: `top * bottom` is the product, level 1 has no column carry, level 2 has at least one.
- `zeroPattern`: the basic fact is `factorA * factorB`, and the shown result is that fact followed by `zeros` zeros (`factorA * factorB * 10^zeros`).
- Number-pad word problems and bar-graph question answers are reviewed by hand. They are not machine-checked.

**Analytics**: no new event names. `activity_completed` carries the new activity id; nothing typed is sent.

---

## 6. Milestones (build later, when Nicko says start)
1. **Confirm sources.** Filipino W18 quarter; English "The Rabbit and the Grasshopper"; whether Math W18–W20 and English W20 are coming. This does not block types or shared components. It blocks the Filipino W18 quarter label, the English fable title, and any week whose PDF is not in `docs/lessons/README.md`. English W20 and Math W18–W20 stay out until those files arrive.
2. **Types and catalog extension.** Add `lessonLang`, `weekLabel`, and `activityOrder`. Append the language ids and their fields only (`sort` through `paragraph`). Register empty subject arrays. Wire `lessonLang` through the components listed in section 5. Gate the subject-page map card on Makabansa. Leave `quiz` as `PromptItem[]`. Accept: build passes; Makabansa pages, path, saves, and map unchanged (manual check of W14–W20); Filipino, English, and Math subject pages do not show the Philippines trip card.
3. **Shared language components.** Sort, Tap the word, Fill the gap, Fix it, Sentence builder, Order, Read and answer (array of passages, one path node), Build a paragraph. Accept: each works by tap only at 320px; a wrong answer shows the right one and the explanation, then Next. Who Am I? still says Try again.
4. **Filipino content W14–W20** in `q3/filipino.ts`, with the corrections above. Each week sets `activityOrder` from its activity row. Accept: that file's content checks pass; a Filipino reviewer reads every item; lesson text is `lang="fil"`. W18's quarter label waits on milestone 1.
5. **English content W14–W19** in `q3/english.ts`. Each week sets `activityOrder` from its activity row. Accept: that file's content checks pass; lesson text is `lang="en"`; the p28 possessive error is not present. The fable title waits on milestone 1.
6. **Math components.** Append the math ids and fields (`numberPad` through `skipCount`). Define `NumberItem` and widen `quiz` and bar-graph questions to `(PromptItem | NumberItem)[]`. Number pad, number quiz items, arrays, skip-count hop, column multiply (two stages), zero pattern, bar graph, probability bag, finger trick (guided demo, no stars), graded levels as specified for W15 and W17. Accept: number pad never opens the phone keyboard; column steps show carries correctly for 26×3, 37×3, and 246×4.
7. **Math content W14–W17** in `q3/mathematics.ts`: `w14`, `w14b` (kicker Week 14), `w15`, `w16`, `w17`. Each week sets `activityOrder` from its activity row. Accept: `columnMultiply` and `zeroPattern` match the load-time checks; word-problem and bar-graph answers were checked by hand; full 6–9 tables; lesson text is `lang="en"`.
8. **QA and release.** Phone and tablet pass, analytics events seen in GA4 DebugView, Makabansa regression check, then deploy when Nicko approves.

## 7. Computer (Q3, Weeks 14–20, in English)

> Status: **Built** (26 Nov 2026).
> Sources: [`lessons/q3/computer`](./lessons/q3/computer). Other subjects in this file stay as they are.

**Catalog status:** `computer` is appended after GMRC in `src/content/catalog.ts`, with `q3/computer` registered. Science and GMRC are still listed and still have no lessons. Filipino, English, Math, and Makabansa were left as they were.

| Week | Topic | Core idea for the app |
| --- | --- | --- |
| 14–15* | Keyboarding | Keyboarding = typing on a computer. Styles: hunt-and-peck, buffering, thumbing, hybrid, touch typing. Home keys (A S D F  J K L ;), finger names, which finger presses which key. |
| 16 | Files and Folders | A file holds information (a picture, a song, a document) and has an icon. A folder holds files. File Explorer (Windows) finds, opens, creates, renames, and deletes them. Deleted files go to the Recycle Bin until it is emptied. |
| 17 | Moving and Copying Files | Move = the file leaves the old folder (Cut then Paste, or drag, or Ctrl+X then Ctrl+V). Copy = a second file stays in both places (Copy then Paste, Ctrl+drag, or Ctrl+C then Ctrl+V). |
| 18 | Introduction to the Internet and Email | The Internet is a worldwide network of computers. The World Wide Web is information we can open with a browser (Chrome, Safari, Edge, Firefox, Opera). Email is a fast message sent over the Internet (To, Subject, message). |
| 19 | Netiquette | Netiquette = etiquette on the Internet. Five rules: remember the human; respect privacy; don't abuse power; follow the Golden Rule; not everything online is true. |
| 20 | Organizing Information on the Internet | A search engine finds pages; a browser opens them. Be specific, then narrow the search; follow links. Practice with baked-in, child-safe results — never a live search. |

\*One 16-page deck covers both weeks (title slide: "Quarter 3 – Week 14 & 15"; page 1 says only "WEEK 14"). Filed once under `w14/w14-15-keyboarding`. In the app, split into two weeks unless Eunice prefers one combined week: **W14** styles and the definition, **W15** home keys and finger placement.

Language: English (the PDFs are in English). Menus stay English.

### Corrections (do not copy from source)
Page numbers are PDF pages. Image-heavy slides were OCR'd; check the PDF before writing content.

- **W14–15 keyboarding**
  - p5 "type using computer" → "type on a computer".
  - p8 "Buffering Style": "memorizes … and then looks … and type" → "memorize one or more sentences, then look at the keyboard and type them." The name "buffering" is uncommon; keep it because the slide uses it, and describe what it means.
  - p11 "looking to find keys" / "the character in the keyboard" → "without looking down to find the keys; the typist knows where they are **on** the keyboard."
  - **p14 is wrong.** The "Home Keys" picture highlights A S D F G H J K and leaves out L and `;`. Home keys are **A S D F** (left) and **J K L ;** (right), usually with bumps on F and J. Use the p15 colour chart (KS Computer Lab, CC BY-SA), which is the standard map, and draw a correct home-row picture for the app.
  - p1–2 are a Proverbs 10:9 verse and a prayer. Leave them out of the app (they are not the lesson).
- **W16 files and folders**
  - p3 "digital **verion**" → "version". A simpler definition: "A file is information saved on a computer, like a picture, a song, or a document. Each file has an icon."
  - p5 is ungrammatical: "It is also called Windows Explorer, is used to search, view and organize files **to** your computer." → "File Explorer (once called Windows Explorer) is used to search, view, and organize files **on** your computer."
  - p20–22 "**imformation**" → "information" (repeated).
  - p27 "Recycled Bin" → "**Recycle** Bin" (the menu in the screenshot already says Recycle Bin).
  - The learning targets mention **saving** a file in the right place, but the slides never teach Save or Save As. Don't quiz on it unless a short, correct explanation is added.
  - The File Explorer screenshots show a teacher's OneDrive and folders for school year 2023–2024. Don't copy those into the app (dated, and they are someone else's files). Draw a clean, fictional desktop.
  - The whole lesson is Windows-only (File Explorer, Recycle Bin, Ctrl, taskbar). School PCs are probably Windows; add a short note that a Mac uses Finder, Trash, and the Command key, without building a second path.
- **W17 moving and copying**
  - "saved it to **other** folder" → "**another** folder."
  - "SELECT THE **FIE**" (p15, p31) → "**FILE**."
  - p19 "to bring along when we go out" is vague. Say copies are useful as a backup, or to put a file on a USB drive or in another folder, while the original stays put.
  - Several step slides are almost only a screenshot (the text was easy to miss in OCR). The missing lines, checked on the PDF, are: p13 "RELEASE THE MOUSE BUTTON."; p24 "THE FILE IS NOW COPIED TO ITS NEW LOCATION."
  - The closing slide is leftover Spanish template text (`¿Tienes alguna pregunta?`, a Freepik phone number). Leave it out.
- **W18 Internet and email**
  - The **file name** includes "netiquette", but the title slide is "Introduction to the Internet and Email" (Q3 W18). Netiquette is the next week. Filed as internet-and-email.
  - p4 objective 02 is cut off: "how it is used for". Complete it in the app: "I can describe what email is and how it is used."
  - p6 "invented by Tim Berners-Lee in 1991" is a common shortcut: he proposed the Web in 1989, and the first site was up in 1990–91. Say "Sir Tim Berners-Lee, around 1990–1991."
  - "Information Superhighway" is 1990s nickname. Mention it, but define the Internet as a worldwide network of connected computers.
  - **p14 "Services" copies the Business text** word for word ("Companies advertise… You can also sell and buy items") even though the picture is a flight-booking site. Write a new sentence: online services let you do a task (book a ticket, fill in a form) — always with a parent.
  - p20 "differebt tools for and convenience" → "different tools for convenience and productivity (calendar, address book, instant messaging, and more)."
  - p23 trailing comma: "at once," → "at once."
  - **p21 uses Facebook** as the example of signing up with an email address. Facebook requires users to be 13+. Don't use it. Say "a learning app your parent helps you join."
  - p1–2 are John 13:35 and a prayer. Leave them out of the app.
- **W19 netiquette**
  - "Five Essential Netiquettes" is awkward (netiquette is already the set of rules). Use "Five essential netiquette rules."
  - p7 "real **human**" → "a real **human**" or "real **people**."
  - p10 "treat other people **like how** you want to be respected" → "Treat other people the way you want to be treated."
  - Rule 3 ("Always be humble") is thin for Grade 3. Add a concrete example: if you are a group admin or you know a password, don't use that to hurt or embarrass someone.
  - The five rules never mention **personal information**. As a clearly marked addition (not on the slides), the app also teaches: don't share your full name, address, school, or photos with strangers; tell a parent if something feels wrong; don't click a strange link. This is for an eight-year-old's safety.
  - p1–2 are Ecclesiastes 3:1 and a prayer. Leave them out of the app.
- **W20 organizing information**
  - The **file name** says `comp3-q4-w20`, but the cover is **Quarter 3 – Week 20**. Filed as Q3 W20.
  - p5 "pages containing **we** need" → "pages that contain **what we** need."
  - p6 "information retrieval **system**" → "systems"; "**eneter**" → "enter."
  - p16 "Milk fish" → "**milkfish**" (bangus), one word.
  - p18 "Hyperlinks are words that are underlined and shaded blue." Many sites now style links differently. Say "A hyperlink is a word or picture you can tap to open another page. It is often blue and underlined, but not always."
  - **p14 "Mosaic… the very first graphical browser" is overstated.** Mosaic (1993) was the first widely popular graphical browser; earlier ones existed (WorldWideWeb/Nexus, Erwise, ViolaWWW). Say "an early and famous graphical browser from 1993," and keep modern browsers as the ones Eunice will actually use.
  - p13 "Most commonly used" shows the **old** blue Microsoft Edge / Internet Explorer "e", plus Chrome, Firefox, Opera, and Safari. Internet Explorer is discontinued. Show today's Chrome, Safari, Edge (current logo), Firefox, and Opera.
  - **Safe-search list is outdated or inaccurate (checked 26 Nov 2026):**
    - `https://kidrex.org` did not respond. A copy now lives at alarms.org/kidrex. Wikipedia notes that since August 2021 KidRex results have been sent on to Google and blocked terms are no longer blocked, so it is **not** a reliable child-safe search.
    - `https://kidtopia.info` returned an error (and has been reported without HTTPS / with an expired domain). Don't recommend it.
    - DuckDuckGo is a real privacy-focused search engine for everyone, **not** a children's safe search. Don't group it with the other two.
  - The app **must not** open live websites, search engines, or email. All practice uses baked-in, child-safe results (for example a short set of "milkfish" cards). A Grade 3 reviewer should not leave the app to search the real web.

### Activities that fit
Reuse existing patterns first. New patterns are listed only where these topics need them.

| Week | Activities |
| --- | --- |
| 14 | Story (Ana & Ben); Flip cards (the five typing styles); **Match up** style ↔ short description; Who Am I? ("I type with two fingers…"); Quiz. |
| 15 | Story (home keys and finger names); **Label the diagram** (tap the home keys; "Which finger types R?"); **On-screen keyboard** (home row lights up; tap the prompted letter or a short word: *sad*, *flask*, *hall*); Quiz. No speed timer and no words-per-minute score. |
| 16 | Story; **Sort** File / Folder (and later Recycle Bin); Flip cards (File Explorer, icon, Recycle Bin, rename); **File desk** (a small fictional desktop: create a folder, rename a file by picking a chip, delete to the Recycle Bin, empty it); **Order** the rename / delete steps; Quiz. |
| 17 | Story (move vs copy); **Sort** Move / Copy; **Match up** shortcut ↔ action (Ctrl+X cut, Ctrl+C copy, Ctrl+V paste); **File desk** (cut a file into another folder; copy a file so both folders have it); **Order** the Cut-Paste and Copy-Paste steps; Quiz. On a tablet there is no real mouse: every step is tap the file, tap the action, tap the destination. No drag-only gesture. |
| 18 | Story (Internet ≠ Web ≠ browser ≠ web page); **Sort** those four terms; Flip cards (browser logos: Chrome, Safari, Edge, Firefox, Opera); **Match up** email parts (To, Subject, message) and uses of the Internet (communication, learning, and so on — not shopping-only or Facebook); **Read and answer** (a paper letter vs an email: how are they alike and different?); Quiz. |
| 19 | Story; **Sort** Kind / Not kind only; Flip cards for the five rules; **Fix it** (one unkind word, then a kinder chip); Quiz, including the added personal-information items. True / Needs a check is in the story and the quiz. |
| 20 | Story (search engine vs browser); **Match up** logo ↔ name (Google, Bing; Yahoo only if the slide is used as history, not as a "use this" recommendation); **Search practice** (type a ready-made query by tapping chips, pick the most useful baked-in result, then **Sort** facts into a small table or list); Flip cards (be specific, narrow the search, follow a link); Quiz. |

Word search fits W14–W15 (HOME, ENTER, SHIFT, PINKY), W16 (FILE, FOLDER, RENAME), W18 (EMAIL, INTERNET, BROWSER), and W19 (PRIVACY, RESPECT). Skip very short words (CUT, WEB). It stays off the path, the same way Filipino and English left it off. The rows above are the path.

### New UI/UX patterns (Computer only, tap only)
These three are additive. Existing subjects do not use them, so their paths stay the same.

| Pattern | Used by | How it works (kid-first) |
| --- | --- | --- |
| **Label the diagram** | Comp W15 (home keys and finger map). Ready later for "parts of a computer" if that lesson arrives. | A big labelled picture (SVG keyboard or hands). A prompt ("Tap the home keys" / "Which finger types T?"). The child taps a region. Wrong → the right region lights up, with a short explanation, then Next. No dragging. |
| **On-screen keyboard** | Comp W15 | A simplified QWERTY with home keys highlighted and F/J bumps. Prompted letter or a short word. Keys ≥48px (wrap or two-step on a 320px screen if needed). `inputMode="none"`; the phone keyboard never opens. No timer, no WPM, no typo penalties beyond the usual first-try rule. |
| **File desk** | Comp W16, W17 | A small fictional desktop (2–3 folders, a few files, a Recycle Bin). The child taps a file, then an action chip (Open, Cut, Copy, Paste, Rename, Delete), then a destination. Rename uses a short list of name chips, not free typing. Emptying the Recycle Bin asks "Are you sure?" once. This is how move vs copy is taught on a tablet without a real mouse and without a drag-only gesture. |
| **Search practice** | Comp W20 | A fake search box. The query is chosen from chips (no free typing, no network). A short list of baked-in results appears; the child picks the most useful one, then sorts facts into a table or list (reuses **Sort**). The app never navigates to a real URL. |

**Label the computer parts** and a real mouse trainer are **not** in this quarter's slides, so they are not built now. If a hardware or mouse lesson arrives, Label the diagram and a tap-to-click / tap-hold-for-right-click practice can reuse the same components.

Safety and privacy for all Computer activities:
- No live Internet, no email send, no outbound links in the lesson.
- No real names, photos, or school file paths from the source screenshots.
- Lesson text `lang="en"`.
- Same first-try / Golden Star / badge / analytics rules as the other subjects.

### How it fits the current code (additions only)
Read against `src/content/types.ts` and `src/content/catalog.ts` at commit `84ce174`. Filipino, English, Math, and Makabansa stay untouched.

**Catalog**
- Append `{ id: "computer", title: "Computer", emoji: "💻", lessonLang: "en" }` to `subjects` (at the end, so today's home-screen order does not change).
- Register `"q3/computer"` in `lessons`. New file: `src/content/q3/computer.ts`.
- Weeks: `w14`, `w15` (same source deck, split as above), `w16`, `w17`, `w18`, `w19`, `w20`. If Eunice wants one combined W14–15 node, use one week with `weekLabel: "14 & 15"` instead.

**Types:** only additive.
- Append new ids at the **end** of `ACTIVITY_IDS` so saved ids stay valid: `"labelDiagram"`, `"keyboard"`, `"fileDesk"`, `"searchPractice"`.
- Optional fields on `WeekContent`:
  ```ts
  labelDiagram?: {
    title: string
    items: {
      prompt: string
      kind: "keyboard" | "fingers"
      correctIds: string[]
      explanation: string
    }[]
  }
  keyboard?: { prompt: string; target: string; explanation: string }[]  // one letter or a word of at most 8 letters
  fileDesk?: {
    prompt: string
    files: { id: string; name: string; kind: "file" | "folder"; parentId: string }[]
    nameChoices?: string[]
    goal: { action: "move" | "copy" | "rename" | "delete" | "createFolder" | "emptyBin"; fileId?: string; destId?: string; newName?: string }
    explanation: string
  }[]
  searchPractice?: {
    query: string
    queries: Choice[]
    correctQueryId: string
    results: { id: string; title: string; blurb: string; useful: boolean }[]
    correctId: string
    facts?: { text: string; binId: string }[]
    bins?: Choice[]
    explanation: string
  }[]
  ```
- Existing shapes (`recap`, `riddles`, `flashcards`, `matching`, `wordSearch`, `sort`, `sequence`, `reading`, `fixIt`, `quiz`) are reused as they are. `activityOrder` is set per week, same as the other new subjects.

**Path and save**
- New ids slot in before `quiz` when a week has them (or follow that week's `activityOrder`). Other subjects have none of the new fields, so their paths stay identical.
- Save keys: `q3/computer/w14` … `w20`. Save stays `version: 1`. `sanitizeSave` accepts the appended ids.
- The map stays Makabansa-only.
- Analytics: no new event names. `activity_completed` carries the new activity id; nothing typed is sent (and these activities don't take free typing anyway).

**Checks (extend the load-time checks)**
- Each week has 10 quiz items; every `correctId` exists; answer positions stay balanced after the seeded shuffle.
- `keyboard` targets use only keys that exist on the on-screen layout, and words stay short (≤ 8 letters).
- Every `fileDesk` goal is reachable from the starting files list (the destination folder exists; a rename target is in the chip list).
- Every `searchPractice` `correctId` is one of the results, and that result is marked `useful`. Fact `binId`s exist.
- `labelDiagram` `correctIds` refer to regions that exist for that item's `kind`.

### Locked for this build
These are the rules the code follows. The three source questions in milestone 1 are already decided here.

1. **Two weeks from the keyboarding deck.** W14 is typing styles. W15 is home keys and fingers. School computers are taught as Windows, with one sentence on Finder, Trash, and the Command key. W19 includes the extra personal-information items, marked as an addition.
2. **W19 has one Sort:** Kind / Not kind. True / Needs a check is in the story and the quiz. Sort stays one object.
3. **Fix it is one mistake.** Each item has one `wrongIndex`, then a kinder chip.
4. **Diagram regions are fixed.** Keyboard ids are every letter on the on-screen QWERTY plus `semicolon`. Home keys are `a s d f j k l semicolon`, with bumps on F and J. The p14 picture is not used. Finger ids are `left-pinky` through `left-thumb`, then `right-thumb` through `right-pinky`. Each label-diagram item sets its own `kind`, so one activity can ask about keys and about fingers. A wrong tap lights the right regions, then Next. If several ids are correct, she taps each of them; the first wrong tap ends the item.
5. **Keyboard, file desk, and search.** One keyboard prompt is one item. The first wrong key shows the target and Next. Keys are at least 48px and the board scrolls sideways on a narrow screen. There is no text field. Each file-desk prompt starts from its own `files` list. Rename and new-folder names come from `nameChoices`. Emptying the Recycle Bin asks "Are you sure?" once; No does not count as a miss. Search chips choose the query. A wrong query or a wrong result shows the right one and Next, and skips the fact sort. A right result may sort baked-in facts; a wrong bin shows the right bin and Next. No live URL.

### Milestones (build later, when Nicko says start)
1. **Confirm sources.** Whether W14 and W15 should be two app weeks or one combined week; whether school computers are Windows, Mac, or both; whether the added personal-information safety items for W19 are okay.
2. **Catalog and types.** Append the `computer` subject and the four optional activity fields. Accept: build passes; Filipino, English, Math, and Makabansa pages, paths, saves, and the map are unchanged.
3. **New components.** Label the diagram, on-screen keyboard, File desk, Search practice. Accept: tap only, 320px, first-try rule, no phone keyboard, no live network requests in the Computer activities.
4. **Computer content W14–W20** in `q3/computer.ts`, with the corrections above. Accept: content checks pass; the p14 home-row error and the Facebook / KidRex / Kidtopia recommendations are not present; lesson text is `lang="en"`.
5. **QA and release.** Phone and tablet pass, analytics events seen in GA4 DebugView, regression check on the four built subjects, then deploy when Nicko approves.
