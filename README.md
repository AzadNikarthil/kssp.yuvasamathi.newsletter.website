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

The landing page and archive are **data-driven** — both read from `public/issues.json`. You never edit the HTML of `index.html` or `archive.html` to add an issue. Five steps:

1. **Author** the newsletter HTML + photos in `newsletter_march/` (or a sibling authoring folder) following `newsletter_march/PROCESS.md`, and generate the PDF via Chrome headless.
2. **Drop files** into `public/`:
   ```bash
   SLUG=2026-april    # change per issue
   mkdir -p public/issues/$SLUG
   cp newsletter_<issue>.html public/issues/$SLUG/index.html
   cp -r photos               public/issues/$SLUG/photos
   cp newsletter_<issue>.pdf  public/pdfs/$SLUG.pdf
   ```
3. **Inject site chrome** into the new `public/issues/$SLUG/index.html`: nav bar, Open Graph meta tags, share bar, back link. Use `public/issues/2026-march/index.html` as a template — copy the injected `<style>` block, `<header class="issue-site-nav">`, `<div class="issue-share-bar">`, and `.issue-back-link`. Update the OG `og:image` and `og:url` to match the new issue.
4. **Prepend one entry** to `public/issues.json` (new issue becomes `issues[0]`):
   ```json
   {
     "slug": "2026-april",
     "date": "2026-04",
     "label": "April 2026",
     "issue_no": "02",
     "title_ml": "...",
     "title_en": "...",
     "summary_ml": "...",
     "cover": "photos/April/cover.jpg",
     "pdf": "/pdfs/2026-april.pdf"
   }
   ```
   The `cover` field is **relative to the issue folder** — pick any image inside `public/issues/$SLUG/`.
5. **Optional but nice**: append the new URL to `public/sitemap.xml`. Then `firebase deploy --only hosting` → verify → share.

**Do not edit** the card markup in `public/index.html` or `public/archive.html`. They read from the manifest; any hand-edits drift and confuse future-you.

## Image budget

Firebase free tier allows 360 MB/day egress. Target **< 5 MB per full issue** (HTML + images + PDF). Optimise images with [Squoosh](https://squoosh.app/) — see spec §8 for per-image targets. The current March 2026 issue exceeds this budget (≈27 MB); consider recompressing before the site gets real traffic.

## Things deliberately not included

Per spec §10, these are deferred and should not be bolted on without a real need: email subscriptions, search, CMS, analytics, dark mode, comments. Upgrade path is documented in the spec §11.

## References

- [`CLAUDE.md`](CLAUDE.md) — notes for Claude Code agents working in this repo.
- [`minimal_firebase_requirements.md`](minimal_firebase_requirements.md) — full spec.
- [`newsletter_march/DESIGN.md`](newsletter_march/DESIGN.md) — visual design system.
- [`newsletter_march/PROCESS.md`](newsletter_march/PROCESS.md) — how to create a newsletter from content to PDF.
