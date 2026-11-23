# FunReview

A child-friendly Grade 3 reviewer. Lessons are organized as quarter, subject, and week. Progress stays on the device in `localStorage` (`funreview-save-v1`). Only Q3 Makabansa, weeks 14–20, is open. Other quarters and subjects say “Coming soon!”. The shell is English. Makabansa lesson text stays Filipino.

## Local

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`. `npm start` serves that folder and listens on `PORT` (or 4173).

## Connect this repo on Railway

The app is a static site. Railway builds it, then runs a tiny server so client-side routes such as `/quarter/q3` still load.

1. Push `main` to GitHub (`nickopicazo/funreview`). This README assumes that push is done.
2. Open [railway.com/new](https://railway.com/new).
3. Choose **Deploy from GitHub repo** and select `nickopicazo/funreview`, branch `main`.
4. Leave the build and start commands empty. `railway.toml` already sets them:
   - Build: `npm run build`
   - Start: `npm start` (`serve -s dist` on `0.0.0.0:$PORT`)
5. Deploy. When it is live, open the service → **Settings** → **Networking** → **Generate Domain**.
6. Open that `*.railway.app` URL. The home page should show Q1–Q4, with only Quarter 3 open.

Do not attach a custom domain yet. `funreview.app` is only a candidate and has not been purchased.

No environment variables are required. Progress is stored in the browser, so there is no database.

### Optional analytics

Leave this unset to send nothing. The parent switch in Settings stays off until someone turns it on, and the measurement script is not in the HTML.

To allow that switch to work later, set this on the Railway service **before** the next build (Vite reads it at build time):

```
VITE_GA_MEASUREMENT_ID=
```

Events, if a parent opts in, are only: lesson opened, activity completed, quiz score band, and badge earned. No names are sent.
