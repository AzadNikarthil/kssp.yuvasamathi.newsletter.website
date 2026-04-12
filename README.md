# KSSP Yuvasamithi Newsletter Website

Static Firebase-hosted site for the KSSP Yuvasamithi monthly newsletter. No backend, no CMS, no build step — every issue is a self-contained HTML folder with photos + a PDF, tied together by a hand-edited landing page.

Design system: **"The Radical Lab"** — see [`newsletter_march/DESIGN.md`](newsletter_march/DESIGN.md).
Full specification: [`minimal_firebase_requirements.md`](minimal_firebase_requirements.md).

## Repository layout

```
.
├── firebase.json              Hosting config (cache tiers, /latest rewrite)
├── .firebaserc                Firebase project alias  →  kssp-yuvasamithi-media
├── public/                    ← everything served to users
│   ├── index.html             landing page
│   ├── archive.html           all issues grid
│   ├── about.html             org + team + contact
│   ├── 404.html               not-found
│   ├── robots.txt / sitemap.xml
│   ├── css/style.css          shared site chrome styles
│   ├── images/                site logos
│   ├── issues/
│   │   └── 2026-march/
│   │       ├── index.html     the newsletter HTML (self-contained, inline CSS)
│   │       └── photos/March/  issue images
│   └── pdfs/
│       └── 2026-march.pdf
└── newsletter_march/          authoring workspace (source HTML, PDF, photos, DESIGN.md, PROCESS.md)
```

`newsletter_march/` is the authoring workspace where newsletters are drafted. Once finalised, HTML + photos + PDF are copied into `public/issues/YYYY-month/` and `public/pdfs/` respectively.

## Setup (one-time)

```bash
npm install -g firebase-tools
firebase login
```

The project alias is already set to `kssp-yuvasamithi-media` in `.firebaserc`.

## Local preview

```bash
firebase serve
# → http://localhost:5000
```

Visit:
- `/` — landing
- `/archive` — archive
- `/about` — about
- `/issues/2026-march/` — the newsletter
- `/latest` — rewrites to the current issue

## Deploy

```bash
firebase deploy --only hosting
```

For safer releases, deploy to a preview channel first:

```bash
firebase hosting:channel:deploy review
```

## Adding a new issue (monthly workflow)

Condensed from the spec's §6.3 checklist:

1. Draft the newsletter in `newsletter_march/` (or a sibling authoring folder). Follow `newsletter_march/PROCESS.md`.
2. Generate the PDF via Chrome headless:
   ```bash
   google-chrome --headless --no-sandbox \
     --print-to-pdf=newsletter_<issue>.pdf \
     --print-to-pdf-no-header \
     "file://$PWD/newsletter_<issue>.html"
   ```
3. Copy artefacts into `public/`:
   ```bash
   mkdir -p public/issues/YYYY-month
   cp newsletter_<issue>.html public/issues/YYYY-month/index.html
   cp -r photos                public/issues/YYYY-month/photos
   cp newsletter_<issue>.pdf   public/pdfs/YYYY-month.pdf
   ```
4. Inject site chrome into the new `index.html`: nav bar, Open Graph meta tags, share bar, back link. Use `public/issues/2026-march/index.html` as a template.
5. Update `public/index.html` — hero, latest-issue card.
6. Update `public/archive.html` — prepend a new card.
7. Update `public/sitemap.xml` — add the new issue URL.
8. Update `firebase.json` — repoint `/latest` rewrite at the new issue.
9. `firebase deploy --only hosting` → verify on live site → share the link.

## Image budget

Firebase free tier allows 360 MB/day egress. Target **< 5 MB per full issue** (HTML + images + PDF). Optimise images with [Squoosh](https://squoosh.app/) — see spec §8 for per-image targets. The current March 2026 issue exceeds this budget (≈27 MB); consider recompressing before the site gets real traffic.

## Things deliberately not included

Per spec §10, these are deferred and should not be bolted on without a real need: email subscriptions, search, CMS, analytics, dark mode, comments. Upgrade path is documented in the spec §11.

## References

- [`CLAUDE.md`](CLAUDE.md) — notes for Claude Code agents working in this repo.
- [`minimal_firebase_requirements.md`](minimal_firebase_requirements.md) — full spec.
- [`newsletter_march/DESIGN.md`](newsletter_march/DESIGN.md) — visual design system.
- [`newsletter_march/PROCESS.md`](newsletter_march/PROCESS.md) — how to create a newsletter from content to PDF.
