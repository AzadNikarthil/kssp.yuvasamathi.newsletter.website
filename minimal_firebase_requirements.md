  
**Minimal Website Requirements**

Newsletter Hosting on Firebase

KSSP Yuvasamithi  •  Kerala Shastra Sahitya Parishath

Version 1.0  |  April 2026  |  Minimal / MVP Edition

*A lightweight approach: upload HTML newsletters and PDF files*

*to Firebase Hosting with a simple landing page and archive.*

# **1\. Concept — What We’re Building**

Instead of a full CMS-driven website, this minimal approach treats Firebase Hosting as a simple file server. Each month, the editorial team uploads two files: the newsletter HTML (like the existing March 2026 issue) and a PDF version. A lightweight landing page ties everything together.

## **1.1 How It Works**

The workflow is intentionally simple: **create the newsletter HTML → convert to PDF → upload both to Firebase → done.** No databases, no CMS logins, no server maintenance.

## **1.2 What You Get**

* A public website at a custom domain (e.g., newsletter.ksspyuvasamithi.org).

* Each newsletter issue as a standalone, beautifully rendered HTML page.

* A downloadable PDF for each issue.

* A landing page showing the latest issue \+ archive of past issues.

* Free hosting with global CDN, SSL, and fast load times.

* Zero monthly cost (Firebase free tier covers everything).

# **2\. Architecture**

## **2.1 Tech Stack**

| Component | Technology | Cost |
| :---- | :---- | :---- |
| Hosting | Firebase Hosting (Spark/free plan) | Free |
| CDN & SSL | Firebase built-in (powered by Fastly) | Free |
| Domain | Custom domain via Firebase | ₹800–1,200/year |
| Landing Page | Static HTML/CSS (single index.html) | Free |
| Newsletter Pages | Self-contained HTML files (as-is) | Free |
| PDF Versions | Static PDF files served from /pdfs/ | Free |
| Deployment | Firebase CLI (firebase deploy) | Free |

## **2.2 Firebase Free Tier Limits**

| Resource | Free Limit | Sufficient? |
| :---- | :---- | :---- |
| Storage | 10 GB | Yes — years of newsletters (\~5 MB/issue) |
| Data Transfer | 360 MB/day | Yes — \~70 full page loads/day minimum |
| Custom Domain | Supported | Yes |
| SSL Certificate | Auto-provisioned | Yes |
| Deployments | Unlimited | Yes |

# **3\. Project Folder Structure**

This is the complete file structure for the Firebase project. Everything lives inside a single public/ folder:

kssp-newsletter/  
├── firebase.json              ← Firebase config  
├── .firebaserc                ← Project alias  
└── public/                    ← Everything served to users  
    ├── index.html             ← Landing page (home)  
    ├── archive.html           ← All issues page  
    ├── about.html             ← About KSSP Yuvasamithi  
    ├── css/  
    │   └── style.css          ← Shared styles (landing, archive)  
    ├── images/  
    │   ├── kssp-logo.png  
    │   └── yuvasamithi-logo.png  
    ├── issues/                ← Each newsletter \= one folder  
    │   ├── 2026-march/  
    │   │   ├── index.html     ← The newsletter HTML  
    │   │   └── photos/        ← All images for this issue  
    │   │       ├── cover.png  
    │   │       └── ...  
    │   ├── 2026-april/  
    │   │   ├── index.html  
    │   │   └── photos/  
    │   └── ...  
    └── pdfs/                  ← Downloadable PDFs  
        ├── 2026-march.pdf  
        ├── 2026-april.pdf  
        └── ...

Each issue folder is self-contained. The newsletter HTML file references its images using relative paths (e.g., photos/cover.png), so everything works as a standalone unit.

# **4\. Page Requirements**

## **4.1 Landing Page (index.html)**

The home page is a simple, clean page that showcases the latest issue and provides access to the archive. It should match the newsletter’s visual identity.

### **Must-have elements**

1. Header bar with KSSP and Yuvasamithi logos, organisation name in Malayalam and English.

2. Hero section: cover image / title of the latest issue with a prominent “Read Latest Issue” button.

3. Latest issue preview: theme title (Malayalam), date, and a 2–3 line summary.

4. Two action buttons: “Read Online” (links to /issues/2026-march/) and “Download PDF” (links to /pdfs/2026-march.pdf).

5. Archive section: grid of 3–6 most recent past issues with thumbnails and titles.

6. “View All Issues” link to archive.html.

7. Footer: org info, slogan (ശാസ്ത്രം ജനനന്മയ്ക്ക്), editorial team names, contact email.

### **Design specifications**

* Max-width: 960px, centered.

* Fonts: Noto Sans Malayalam (body), Noto Serif Malayalam (headings), Playfair Display (English titles), Space Mono (labels).

* Colour palette: match the newsletter — \#C1121F (red), \#1B4F72 (teal), \#2D6A4F (green), \#F48C06 (amber).

* Responsive: works on mobile (single column) and desktop (2-column grid for archive).

* Dark background header section (matching newsletter cover aesthetic).

## **4.2 Archive Page (archive.html)**

1. Grid layout: each issue shown as a card with cover thumbnail, title, date, and theme.

2. Each card has two links: “Read” (to the HTML version) and “PDF” (to the PDF file).

3. Reverse chronological order (newest first).

4. Simple category/year filter (optional, can be added later via JavaScript).

## **4.3 About Page (about.html)**

1. Organisation description: KSSP and Yuvasamithi mission and history.

2. Editorial team list with names and roles.

3. Contact information: email, social media links.

4. WhatsApp/Telegram group links for newsletter notifications.

## **4.4 Newsletter Issue Page (/issues/YYYY-month/index.html)**

This is the existing newsletter HTML file (like the March 2026 file) placed directly into the folder. Minimal modifications needed:

1. Add a simple navigation bar at the top: Home | Archive | About | Download PDF.

2. Add social share buttons (WhatsApp, Facebook, Telegram, copy link) — can be a small floating bar.

3. Add a “Back to Home” link at the bottom.

4. Ensure all image paths use relative references (photos/filename.png).

5. Add Open Graph meta tags for rich social media previews when shared.

# **5\. Newsletter HTML Modifications**

The existing newsletter HTML is already well-built. To make it work as a website page, add these elements to each issue:

## **5.1 Head Section Additions**

\<\!-- Add to \<head\> of each newsletter HTML \--\>  
\<meta property="og:title" content="സമത്വത്തിന്റെ വഴികള്‍ \- March 2026" /\>  
\<meta property="og:description" content="KSSP Yuvasamithi Newsletter" /\>  
\<meta property="og:image" content="/issues/2026-march/photos/cover.png" /\>  
\<meta property="og:url" content="https://yoursite.web.app/issues/2026-march/" /\>  
\<meta property="og:type" content="article" /\>

\<\!-- WhatsApp specific \--\>  
\<meta property="og:site\_name" content="KSSP Yuvasamithi" /\>

## **5.2 Navigation Bar (add before \<body\> content)**

\<nav class="site-nav"\>  
  \<a href="/"\>ഹോം\</a\>  
  \<a href="/archive.html"\>ആര്‍ക്കൈവ്\</a\>  
  \<a href="/about.html"\>കുറിച്ച്\</a\>  
  \<a href="/pdfs/2026-march.pdf" download\>ഡൗൺലോഡ് PDF\</a\>  
\</nav\>

## **5.3 Share Buttons (add at the bottom)**

\<div class="share-bar"\>  
  \<span\>ഷെയര്‍ ചെയ്യുക:\</span\>  
  \<a href="whatsapp://send?text=..." \>WhatsApp\</a\>  
  \<a href="https://t.me/share/url?url=..." \>Telegram\</a\>  
  \<a href="https://www.facebook.com/sharer/..." \>Facebook\</a\>  
  \<button onclick="copyLink()"\>Copy Link\</button\>  
\</div\>

# **6\. Firebase Setup & Deployment**

## **6.1 One-Time Setup**

These steps are done once to initialise the project:

1. Install Firebase CLI: npm install \-g firebase-tools

2. Login: firebase login

3. Create project: firebase init hosting (select “public” as directory, single-page app \= No)

4. Connect custom domain in Firebase Console → Hosting → Add custom domain.

## **6.2 firebase.json Configuration**

{  
  "hosting": {  
    "public": "public",  
    "ignore": \["firebase.json", "\*\*/node\_modules/\*\*"\],  
    "cleanUrls": true,  
    "trailingSlash": false,  
    "headers": \[  
      {  
        "source": "\*\*/\*.html",  
        "headers": \[  
          { "key": "Cache-Control", "value": "public, max-age=3600" }  
        \]  
      },  
      {  
        "source": "\*\*/\*.pdf",  
        "headers": \[  
          { "key": "Cache-Control", "value": "public, max-age=86400" },  
          { "key": "Content-Disposition", "value": "inline" }  
        \]  
      },  
      {  
        "source": "\*\*/photos/\*\*",  
        "headers": \[  
          { "key": "Cache-Control", "value": "public, max-age=604800" }  
        \]  
      }  
    \],  
    "rewrites": \[  
      { "source": "/latest", "destination": "/issues/2026-march/index.html" }  
    \]  
  }  
}

## **6.3 Monthly Deployment Workflow**

Every month, the editorial team follows this checklist:

| Step | Action | Who |
| :---- | :---- | :---- |
| 1 | Finalise newsletter HTML (editorial review complete) | Editor |
| 2 | Create photos/ folder with all optimised images | Designer |
| 3 | Generate PDF version (print from browser or use tool) | Designer |
| 4 | Create folder: public/issues/YYYY-month/ | Deployer |
| 5 | Copy index.html \+ photos/ into the issue folder | Deployer |
| 6 | Copy PDF to public/pdfs/YYYY-month.pdf | Deployer |
| 7 | Update index.html landing page (new issue link, archive grid) | Deployer |
| 8 | Update /latest rewrite in firebase.json to point to new issue | Deployer |
| 9 | Run: firebase deploy | Deployer |
| 10 | Verify on live site, share link on WhatsApp/Telegram groups | Editor |

# **7\. Total Cost**

| Item | One-Time | Monthly | Annual |
| :---- | :---- | :---- | :---- |
| Firebase Hosting (Spark plan) | ₹0 | ₹0 | ₹0 |
| Domain name (.org) | ₹900 | — | ₹900/year |
| Firebase CLI (npm tool) | ₹0 | — | ₹0 |
| SSL Certificate | ₹0 (auto) | — | ₹0 |
| Image editing tools | ₹0 (use free tools) | — | ₹0 |
| TOTAL | ₹900 | ₹0 | ₹900/year |

**Total cost: approximately ₹75/month** (domain only). Firebase Hosting, CDN, SSL, and deployment are all completely free under the Spark plan.

# **8\. Image Optimisation Guidelines**

Since Firebase free tier has a 360 MB/day transfer limit, image optimisation is important:

| Image Type | Recommended Size | Format | Tool |
| :---- | :---- | :---- | :---- |
| Article illustrations | 800px wide, max 150 KB | WebP or compressed JPEG | Squoosh.app (free) |
| Science card images | 600px wide, max 100 KB | WebP or JPEG | Squoosh.app |
| Event/campaign photos | 800px wide, max 200 KB | JPEG (quality 80%) | Squoosh.app |
| Logos | 200px wide, max 20 KB | PNG (transparent) | Any editor |
| Cover/hero images | 900px wide, max 250 KB | WebP or JPEG | Squoosh.app |

Target: each full newsletter issue (HTML \+ all images \+ PDF) should be under 5 MB total. This means the free tier can serve approximately 70+ complete page loads per day, which is sufficient for the initial audience.

# **9\. Minimal SEO Requirements**

Even a minimal site needs basic SEO to be discoverable:

8. Every page must have a unique \<title\> tag in Malayalam and English.

9. Meta description tag on each page (50–160 characters).

10. Open Graph tags on every newsletter issue page (for WhatsApp/Facebook/Telegram previews).

11. A sitemap.xml listing all issue URLs (can be manually maintained).

12. A robots.txt file allowing all crawlers.

13. Proper lang="ml" on Malayalam content and lang="en" on English sections.

14. Alt text on all images (in Malayalam where the image relates to Malayalam content).

## **9.1 Sample sitemap.xml**

\<?xml version="1.0" encoding="UTF-8"?\>  
\<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\>  
  \<url\>\<loc\>https://yoursite.web.app/\</loc\>\</url\>  
  \<url\>\<loc\>https://yoursite.web.app/archive\</loc\>\</url\>  
  \<url\>\<loc\>https://yoursite.web.app/about\</loc\>\</url\>  
  \<url\>\<loc\>https://yoursite.web.app/issues/2026-march/\</loc\>\</url\>  
  \<\!-- Add new issues here each month \--\>  
\</urlset\>

# **10\. What’s NOT Included (and When to Upgrade)**

This minimal version intentionally skips several features. Here’s what’s missing and when you should consider adding them:

| Feature | Not Included Because | Add When |
| :---- | :---- | :---- |
| Email subscriptions | Needs a backend/database | Subscriber count \> 50 (use Brevo free tier) |
| Search | Needs JavaScript indexing | Archive reaches 10+ issues (use Pagefind) |
| CMS / admin panel | Adds complexity and cost | Editorial team \> 5 or non-technical editors join |
| Analytics | Needs third-party service | Immediately if desired (add Umami or Plausible) |
| Dark mode | Extra CSS/JS work | Nice to have, add in Phase 2 |
| Automated PDF generation | Needs server-side tooling | Manual PDF creation works fine initially |
| Comments / reactions | Needs backend service | When community engagement is a priority |
| Multi-language toggle | Content is already bilingual inline | If separate ML/EN versions are needed |

# **11\. Upgrade Path**

The folder-based structure is designed to be forward-compatible. When you’re ready to grow:

## **Level 1 → Add Analytics (Week 1\)**

* Add Umami (self-hosted, free) or a Plausible script tag to all pages.

* Track page views per issue to understand readership.

## **Level 2 → Add Search (When 10+ issues exist)**

* Integrate Pagefind (static search, zero cost). Runs at build time, creates a search index.

* Add a search bar to the landing page and archive page.

## **Level 3 → Add Email Subscriptions (When 50+ readers)**

* Use Brevo (free: 300 emails/day) or Resend (free: 3,000/month).

* Add a simple subscription form to the landing page.

* Send a monthly email with the new issue link.

## **Level 4 → Migrate to Full Framework (When team grows)**

* Move to Astro or Next.js with the same folder structure.

* Add a headless CMS (Sanity) for non-technical editors.

* Keep Firebase Hosting or move to Vercel/Cloudflare Pages.

* All existing URLs (/issues/2026-march/) continue to work — no broken links.

# **12\. Implementation Checklist**

A step-by-step guide to get the site live. Estimated time: 1–2 days for a developer, or a focused weekend.

| \# | Task | Time | Status |
| :---- | :---- | :---- | :---- |
| 1 | Install Firebase CLI and create project | 15 min | □ |
| 2 | Create public/ folder structure as shown in Section 3 | 10 min | □ |
| 3 | Build landing page (index.html) with org branding and latest issue | 3–4 hours | □ |
| 4 | Build archive page (archive.html) with issue cards grid | 2 hours | □ |
| 5 | Build about page (about.html) | 1 hour | □ |
| 6 | Create shared CSS file (css/style.css) with design tokens | 2 hours | □ |
| 7 | Copy March 2026 newsletter into public/issues/2026-march/ | 15 min | □ |
| 8 | Add navigation bar and share buttons to the newsletter HTML | 1 hour | □ |
| 9 | Add Open Graph meta tags to the newsletter HTML | 30 min | □ |
| 10 | Optimise all images using Squoosh.app | 1 hour | □ |
| 11 | Generate PDF version and place in public/pdfs/ | 30 min | □ |
| 12 | Create sitemap.xml and robots.txt | 15 min | □ |
| 13 | Configure firebase.json (caching headers, /latest rewrite) | 15 min | □ |
| 14 | Run firebase deploy and test on the .web.app URL | 10 min | □ |
| 15 | Connect custom domain in Firebase Console | 30 min | □ |
| 16 | Test on mobile (Android Chrome, Samsung Internet) | 30 min | □ |
| 17 | Share the link with editorial team for review | 5 min | □ |
| 18 | Go live\! Share on WhatsApp/Telegram groups | — | □ |

**Total estimated effort: 12–15 hours** (one weekend or 2 working days).

*— End of Minimal Requirements Document —*

KSSP Yuvasamithi  •  ശാസ്ത്രം ജനനന്മയ്ക്ക്  •  ശാസ്ത്രം സാമൂഹ്യവിപ്ലവത്തിന്