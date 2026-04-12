# Newsletter Creation Process

## Overview
This documents how to create a KSSP Yuvasamithi newsletter from content to PDF.

## Files & Structure

```
newsletter/
├── DESIGN.md                          # Design system ("The Radical Lab")
├── PROCESS.md                         # This file
├── photos/March/                      # Images for the March-April issue
├── <content>.md                       # Malayalam content with <<image>> placeholders
├── kssp_newsletter_2026.html          # Example/reference newsletter HTML
├── newsletter_equality_march_2026.html  # Generated newsletter HTML
└── newsletter_equality_march_2026.pdf   # Final shareable PDF
```

## Step-by-Step Process

### 1. Prepare Content
- Write content in a `.md` file in Malayalam (and English where needed)
- Mark image placements using `<<filename.ext>>` placeholders
- Place all photos in `photos/March/` (or a relevant subdirectory)

### 2. Map Image Placeholders
Identify every `<<filename.ext>>` in the content and confirm the file exists in `photos/March/`.

### 3. Create HTML Newsletter
Create a new HTML file (e.g., `newsletter_<issue>.html`) based on `kssp_newsletter_2026.html`:

**Standard page sections (in order):**
1. Cover page — campaign title, visual grid with photos, date range
2. Table of Contents — list all article sections
3. Editorial note — intro text + `yuvasamithi intro.png` (or equivalent)
4. Campaign overview — main campaign description + campaign photo
5. Articles (repeat `article-spread` div for each) — category icon, title, subtitle, image, body text, pullquotes
6. Environment article
7. Health article with `tips-box`
8. Science news — one `science-card` per finding, each with image + DOI
9. Editorial special feature (dark `antiwar-block` style) — e.g. Artemis, special events
10. Anti-war / campaign section (dark `antiwar-block`) — images side by side
11. Back cover — April science days grid

**CSS classes to reuse from existing HTML:**
- `.cover`, `.cover-cell`, `.cover-title-ml`, `.cover-title-en`
- `.contents-page`, `.toc-list`, `.toc-item`, `.toc-tag`
- `.editorial-banner`, `.editorial-text`
- `.article-spread`, `.article-header`, `.article-body`, `.article-title`
- `.article-category-icon` + `.cat-gender`, `.cat-env`, `.cat-health`, `.cat-science`, `.cat-campaign`
- `.pullquote`, `.source-tag`, `.article-divider`
- `.science-card`, `.science-card-header`, `.science-card-body`, `.doi-link`
- `.tips-box`, `.tips-list`
- `.antiwar-block`, `.antiwar-title`, `.antiwar-body`
- `.back-cover`, `.april-days-grid`, `.april-day-card`

**Image CSS classes (added in newsletter_equality_march_2026.html):**
- `.intro-img` — full-width hero image in editorial banner
- `.article-img` — full-width image between article header and body
- `.science-img` — image at top of each science card (height: 160px)
- `.editorial-img` — wide image in dark editorial block
- `.editorial-img-half` — two images side by side (50% width each)
- `.editorial-imgs-row` — wrapper for side-by-side images
- `.antiwar-img` — side-by-side images (50% width each) in dark block
- `.antiwar-imgs` — wrapper for side-by-side antiwar images
- `.cover-hero-img` — background overlay image in cover cells

### 4. Generate PDF

```bash
google-chrome --headless --no-sandbox \
  --print-to-pdf=newsletter_<issue>.pdf \
  --print-to-pdf-no-header \
  "file:///home/azad/person/kssp/newsletter/newsletter_<issue>.html"
```

The GPU warnings in the output are harmless. Look for `bytes written to file` to confirm success.

### 5. Verify
- Open the HTML in a browser to check layout and fonts
- Open the PDF to verify: Malayalam text renders, all images appear, page breaks are clean

## Design Principles (from DESIGN.md)

- **Colors:** Red `#C1121F`, Amber `#F48C06`, Forest `#29513F`, Charcoal `#1A1A1A`
- **Fonts:** Noto Serif Malayalam (headlines), Noto Sans Malayalam (body), Space Mono (labels/eyebrows)
- **No rounded corners** — 0px border-radius everywhere
- **No divider lines** — use tonal shifts and thick rules instead
- **Pullquotes** — use `.pullquote` for key statements, always left-border red
- **Drop caps** — use `.drop-cap` class on first paragraph of each article

## Notes
- The PDF is generated via Chrome headless, which correctly renders Google Fonts and Malayalam text
- WeasyPrint is also available but Chrome gives better font results for web fonts
- Images use relative paths from the HTML file location (`photos/March/filename`)
- File size is typically 10–15 MB due to embedded photos
