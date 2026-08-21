# Scentelligence — AI Perfume Intelligence Platform

Frontend prototype for the AI Perfume Intelligence Platform (React + Vite + Tailwind), covering all five modules from the functional spec:

1. AI Recommendation Engine — `/recommendation`
2. AI Perfume Consultant Chatbot — `/chatbot`
3. AI Sentiment Analysis — `/sentiment`
4. AI Marketing Studio — `/marketing`
5. Admin Analytics Dashboard — `/analytics`

## What's new in this version (v3)

- **Full visual system swap** to the requested SaaS palette (violet `#7C3AED` / purple `#A855F7` / pink `#EC4899`), glassmorphism cards, and a working **dark/light mode toggle** in the navbar (persisted, defaults to system preference). This was done via CSS variables in `src/index.css` + `tailwind.config.js`, so it applies app-wide without editing every component.
- **Recommendation Engine**: now scores on occasion, weather, season, budget, fragrance family, gender and age; each result includes brand, price, top/heart/base notes, longevity, projection, sillage, AI match %, a confidence score, pros/cons, a written reason, save/share actions, and a "View product" placeholder (clearly labeled as needing a real store integration, rather than a fake working link).
- **Chatbot**: no more "in the full build..." placeholder lines — it now answers with real note explanations, comparisons, cheaper/luxury alternative suggestions, lightweight markdown formatting, a session history sidebar, copy/regenerate/clear controls, and voice input via the browser's native Web Speech API (falls back gracefully where unsupported).
- **Sentiment Analysis**: adds top positive/negative keyword extraction, an AI-summary line, and a suggested-actions panel generated from the negative keywords found.
- **Marketing Studio**: added Platform and Campaign Goal inputs; generates Instagram, Facebook, LinkedIn, Twitter/X, Google Ads, SEO description, meta description, product description, email campaign, CTA and hashtags.
- **Analytics Dashboard**: added a user-growth line chart, a traffic-by-category pie chart, a recent-activity feed, and an AI-insight summary line, alongside the existing revenue/best-seller charts and CSV export.
- **404 page** and a **back-to-top** button added app-wide.
- A `server/` folder now contains a real, minimal **FastAPI backend scaffold** (`main.py`) showing the correct secure pattern for a live OpenAI integration — key read from a server-side `.env`, CORS-restricted, never exposed to the browser. It is not wired into the frontend yet; see the comments in that file for the exact next steps.

### Honest scope notes
A few items from the most detailed spec weren't attempted in this pass because they need infrastructure this environment can't provide — a live backend, a real product catalogue with photography, and a hosted OpenAI key. Everything UI-facing was built for real; nothing here is a placeholder screen.

## Getting started

```bash
cd client
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Notes on this prototype

- All "AI" logic (recommendation scoring, chatbot replies, sentiment
  classification, marketing copy) currently runs **client-side** with simple
  rule-based/template logic so the app works with zero backend and no API
  key. Every file that should eventually call a real model is commented
  with where that integration point goes.
- The architecture described in the spec is: **Frontend** (this app, React +
  Tailwind) → **Backend** (FastAPI) → **AI layer** (OpenAI-powered
  recommendation, chatbot, sentiment and content generation) → **Database**
  (PostgreSQL), with optional Shopify / WooCommerce / payment gateway / CRM
  integrations.
- `src/assets/logo.svg` is a small vector logo used in the navbar/footer —
  swap it for your real brand logo whenever you have one. The original file
  structure requested `logo.png` and `hero.jpg`; the hero section currently
  uses a CSS gradient instead of `hero.jpg` so the app runs without any
  binary assets. Drop a `hero.jpg` into `src/assets/` and reference it in
  `src/components/Hero.jsx` if you'd like a photographic hero image.
- `public/favicon.svg` is used instead of `favicon.ico` — most modern
  browsers support SVG favicons; replace with a real `.ico` if you need
  wider legacy support.

## Next steps to wire up real AI

- Replace the scoring logic in `pages/Recommendation.jsx` with a POST to a
  FastAPI `/recommend` endpoint.
- Replace `getReply()` in `pages/Chatbot.jsx` with a POST to `/chat` that
  calls the OpenAI API with your fragrance catalogue as context.
- Replace `classify()` in `pages/Sentiment.jsx` with a POST to `/sentiment`
  that runs a real classifier over stored reviews.
- Replace `buildContent()` in `pages/Marketing.jsx` with a POST to
  `/marketing/generate`.
- Replace the static arrays in `pages/Analytics.jsx` with data fetched from
  your PostgreSQL-backed analytics endpoints.
