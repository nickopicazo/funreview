# Adding new lessons (any subject, any quarter)

A reusable procedure for turning a batch of DepEd lesson PDFs into FunReview content. It can be saved as an agent skill. Nothing here is specific to one week.

## Inputs
- Lesson PDFs, usually emailed by Eunice as Google Drive links (sometimes as attachments).
- This repo: `docs/lessons/`, `docs/PLAN.md`, `docs/FIXES-PLAN.md`, `docs/SUBJECTS-PLAN.md`, `src/content/`.

## 1. Collect
1. Search the mail for the new lesson emails (sender, then unread or recent). Read only: don't reply, label, or mark them read.
2. List each email's subject, date (Asia/Manila), and every attachment or Drive link. Write down the count per email.
3. Download every file into a scratch folder outside the repo (`<scratch>/raw/<subject>/`). For public Drive files: `curl -sL "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t" -o <file>.pdf`.
4. Check each file with `pdfinfo` (valid PDF, page count). Retry failures. If a file can't be opened, report it; never guess its content.

## 2. Extract
1. For each page: `pdftotext -layout -f N -l N`. If the page has fewer than ~80 non-space characters, it's an image, so OCR it: `pdftoppm -r 120 -png`, then `OMP_THREAD_LIMIT=1 tesseract page.png - -l <fil+eng | eng> --psm 3`. Run pages in parallel (`xargs -P8`), one thread per tesseract process.
2. Join the pages into `<name>.extracted.txt` with `--- page N ---` markers. Start the file with a header: source file name, email subject and date, and "OCR text; check the PDF before writing content".

## 3. Identify
1. Read the cover and first slides of each file. Take the **quarter, week and topic from the content**, not the file name; file names are often wrong or reused.
2. If the cover and file name disagree, use the cover and note the mismatch. If the quarter or week can't be found, mark it as an assumption to confirm with Eunice.
3. Map the subject to its folder: `filipino`, `english`, `math`, `science`, `makabansa`, `gmrc`. (The app id for math is `mathematics`.)

## 4. File
1. Place each file at `docs/lessons/<quarter>/<subject>/w<NN>/w<NN>-<topic-kebab>.pdf` with the matching `.extracted.txt` beside it. Two-digit week; if a week has several lessons, use `w<NN>-l1-…`, `w<NN>-l2-…`.
2. Leave files from earlier weeks and subjects alone.
3. Update `docs/lessons/README.md`: add a summary row (subject, weeks, file count, date received), a table per subject (week, topic, original file name), and notes on assumptions, missing weeks, and OCR quality.
4. Keep each file under 100 MB. If a PDF is larger, compress it (`gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook`) and note it.

## 5. Review the content
For every week, read the extracted text and the PDF pages behind it:
1. Write a one-line core idea per week (what Eunice must know).
2. List corrections with page numbers: spelling and grammar, wrong facts, wrong or ambiguous examples, broken rules, wrong math. Recompute **every** math answer. Mark OCR-only doubts "check PDF".
3. Note material to leave out: dated or sensitive examples, school logistics (dates, rubrics), topics the slides mention but never teach.

## 6. Plan
1. Add a section per subject and quarter to `docs/SUBJECTS-PLAN.md` (or a new `<QUARTER>-PLAN.md` for a new quarter): week table, corrections, activities per week, any new UI patterns, code changes, milestones.
2. Choose activities from what already exists first (story, riddles, flip cards, match up, word search, sort, tap the word, fill the gap, fix it, sentence builder, order, read and answer, number pad, column multiply…). Propose a new pattern only when a topic needs it, and say which weeks use it.
3. Keep the rules:
   - Existing subjects and weeks stay as they are.
   - Only additive type changes: new activity ids are appended, new fields are optional, the save version stays the same.
   - English menus; lesson language follows the subject (`lessonLang`).
   - FIXES-PLAN decisions: analytics on with no personal data, no backup feature, a star only on the first try, 8+ of 10 = Golden Star, badge on finishing the quiz.
   - Kid-first: tap only, 48px+ targets, 2–5 minute activities, no timers or penalties.
4. List open questions for Eunice (unclear quarter or week, missing weeks, suspected wrong titles).
5. Link the plan from `docs/PLAN.md`.

## 7. Commit
1. `git status` should only show `docs/`. Don't change `src/**` until Nicko says to build.
2. Commit with a message naming the quarter, subjects and weeks. Don't push or deploy without approval.

## 8. Build (only when approved)
1. Write `src/content/<quarter>/<subjectId>.ts` from the corrected plan, never straight from OCR.
2. Register the subject in `catalog.ts` `lessons` (`"<quarter>/<subjectId>"`).
3. Run the content checks (10 quiz items, valid ids, balanced answer positions, computed math answers), `npm run build`, and a phone check at 320px. Then do a regression check on the existing subjects.

## Report back
Emails (subject, date, count) · files placed per subject and week · assumptions · key corrections · proposed new patterns · plan path · commit hash · open questions.
