# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repo currently contains only `minimal_firebase_requirements.md` — the specification for an unbuilt project. No code, `public/` folder, or `firebase.json` exists yet. When asked to implement, scaffold according to the spec rather than assuming files are present.

## Project

A static newsletter site for **KSSP Yuvasamithi** (Kerala Shastra Sahitya Parishath), hosted on Firebase Hosting free tier. Bilingual (Malayalam + English). Deliberately MVP: no backend, no CMS, no database. Each month's issue is a self-contained folder with HTML + images, plus a matching PDF.

## Architecture (per spec)

- **Hosting only.** Everything lives under `public/`; `firebase deploy` pushes it. No build step, no framework.
- **Per-issue isolation.** Each newsletter goes in `public/issues/YYYY-month/` with its own `index.html` and `photos/` subfolder. HTML uses **relative** image paths (`photos/cover.png`) so an issue folder is portable and standalone — do not rewrite these to absolute paths.
- **Landing page and archive are data-driven.** `public/index.html` and `public/archive.html` are template shells; both fetch `public/issues.json` at runtime and render cards from it via `public/js/render.js`. To add or edit an issue, **update `issues.json`** — do NOT hand-edit card markup in the HTML files. Each HTML file ships a `<noscript>` fallback card for the newest issue so the page still works if JS fails.
- The `cover` field in `issues.json` is **relative to the issue folder** (`/issues/{slug}/`), so the same value works for both the landing-page thumbnail and any future issue-page reference.
- **No `/latest` rewrite.** The landing page is always the newest entry in the manifest, so there's nothing to repoint per release.
- **Caching headers** in `firebase.json` are tiered intentionally: HTML 1h, PDF 1d, photos 1w. Preserve this when editing config.
- **Forward compatibility.** Folder layout (`/issues/YYYY-month/`) is chosen so a future migration to Astro/Next.js keeps existing URLs working. Don't introduce URL schemes that would break this.

## Design constraints to respect

- **Free-tier budget.** 360 MB/day transfer cap → target <5 MB per full issue (HTML + images + PDF). Optimise images aggressively (see spec §8 for per-image-type targets); prefer WebP.
- **Fonts:** Noto Sans Malayalam (body), Noto Serif Malayalam (headings), Playfair Display (English titles), Space Mono (labels).
- **Colours:** `#C1121F` red, `#1B4F72` teal, `#2D6A4F` green, `#F48C06` amber. Match existing newsletter identity.
- **Max width 960px, centered.** Mobile = single column; desktop archive = 2-column grid.
- **`lang` attributes** must be set correctly (`lang="ml"` on Malayalam, `lang="en"` on English sections) and all images need alt text.
- **Open Graph tags** are required on every issue page for WhatsApp/Telegram/Facebook previews — this is a primary distribution channel.

## Common commands (once scaffolded)

```bash
npm install -g firebase-tools    # one-time
firebase login                   # one-time
firebase init hosting            # one-time; public dir = "public", SPA = No
firebase deploy                  # deploy everything
firebase deploy --only hosting   # same, explicit
firebase hosting:channel:deploy preview   # preview channel before going live
firebase serve                   # local preview at localhost:5000
```

There is no test suite, linter, or build pipeline — the site is plain static HTML/CSS.
