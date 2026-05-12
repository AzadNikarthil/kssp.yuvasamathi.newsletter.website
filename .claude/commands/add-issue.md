# Add New Newsletter Issue

Add a new KSSP Yuvasamithi newsletter issue to the website. This skill walks through the full integration pipeline.

## Required inputs (ask the user if not provided)

1. **Content source**: Path to the markdown file with newsletter content (e.g., `some_folder/newsletter.md`)
2. **Image source**: Path to the folder containing images (e.g., `some_folder/image/`)
3. **Issue label**: The month range for this issue (e.g., "April–May 2026")
4. **Issue number**: Sequential issue number (e.g., "02")
5. **Title (Malayalam)**: Main title in Malayalam
6. **Title (English)**: Main title in English

## Steps

### Step 1: Read and understand the content
- Read the markdown file to understand the structure: editorial, campaign, other programs, science news, observance days
- Note all image references (`<<filename.jpg>>` notation in markdown)
- Identify the cover image

### Step 2: Determine the folder slug
- Use the **first month** of the issue label as the slug (e.g., "April–May 2026" → `2026-april`)
- This follows the existing pattern: "March–April 2026" → `2026-march`

### Step 3: Create the issue folder and copy images
- Create `public/issues/{slug}/photos/`
- Copy all images from the source image folder to `public/issues/{slug}/photos/`
- Copy logo files from the previous issue: `KSSP_Logo.png`, `Yuvasamathi_log.jpeg`

### Step 4: Build the HTML file
- Use the **most recent issue's `index.html`** as the design template (CSS, HTML structure, classes)
- Create `public/issues/{slug}/index.html` with:
  - All CSS from the template (keep identical styling)
  - `html { overflow-x: hidden; }` to prevent horizontal scrollbar
  - Proper `<title>`, `<meta>` tags, Open Graph tags
  - `lang="ml"` on Malayalam content, `lang="en"` on English
  - Alt text on all images
  - All image paths as **relative** (`photos/filename.jpg`)
  - Sections in order: cover page, table of contents, editorial banner, editorial article, campaign section with district reports, other programs, science news cards, back cover with observance days, share bar
- **CRITICAL**: Preserve ALL content from the markdown — do NOT shorten, summarize, or condense any paragraphs. Every paragraph must appear in full. References must include full author lists.
- For AI Art images by Azad Nikarthil: use `azad-cartoon-section` style (dark charcoal background, side-by-side grid, "Artwork · ചിത്രീകരണം" eyebrow, credit line)

### Step 5: Update `issues.json`
- Add new entry as the **first item** (newest first)
- Fields: `slug`, `date` (YYYY-MM using first month), `label`, `issue_no`, `title_ml`, `title_en`, `summary_ml`, `cover` (relative to issue folder), `pdf` (absolute path `/pdfs/{slug}.pdf`)
- Keep all existing entries

### Step 6: Update `public/index.html`
- Update hero section: eyebrow, title, summary, CTA links → point to new issue
- Update noscript fallback card: cover image, chip text, titles, summary, action links
- Update footer "Latest issue" link

### Step 7: Verify content fidelity
- Compare each section of the generated HTML against the source markdown
- Check that NO paragraphs were shortened or omitted
- Check that all district reports, all science articles, all references are complete
- Report any discrepancies to the user

### Step 8: Deploy
- Ask the user whether to deploy locally (`firebase serve`) or online (`firebase deploy --only hosting`)

## Important rules
- PDF generation is done separately — do not generate PDFs
- Image paths in issue HTML must be **relative** (`photos/filename.jpg`), never absolute
- The `cover` field in `issues.json` is relative to the issue folder
- Do NOT hand-edit card markup in `index.html` or `archive.html` — those are data-driven from `issues.json`
- Respect the free-tier budget: target < 5 MB per issue
