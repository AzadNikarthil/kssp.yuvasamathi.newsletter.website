# Design System Strategy: The Digital Editorial

## 1. Overview & Creative North Star
The design system is centered around the Creative North Star: **"The Sophisticated Archivist."** 

This is not a generic management tool; it is a high-end digital publishing platform that treats newsletters as artifacts of value. The aesthetic moves away from the "SaaS-standard" look of heavy borders and rigid grids, opting instead for an editorial experience characterized by **Asymmetric Balance** and **Intentional Depth**. We utilize the authority of the newsroom—deep reds and stark grays—and soften it with a parchment-inspired surface palette (`#fcf9f8`) to ensure long-form reading is effortless.

By using high-contrast typography scales and overlapping layered surfaces, we create a sense of tactile materiality. The interface should feel like a well-curated broadsheet newspaper translated into a fluid, digital-first environment.

---

## 2. Colors & Surface Philosophy

The palette leverages high-chroma accents against a sophisticated neutral base. The color roles are defined not just by hue, but by their "physical" position in the interface stack.

### Tonal Foundations
*   **Primary (`#970012`) & Primary Container (`#c1121f`):** Used for critical brand moments and urgent calls to action.
*   **Secondary (`#a33e00`) & Tertiary (`#6f3d00`):** Reserved for administrative metadata, categorization, and organizational status updates.
*   **Surface Base (`#fcf9f8`):** The canvas. A warm, off-white that prevents the eye fatigue associated with pure #FFFFFF.

### The "No-Line" Rule
To achieve a premium editorial feel, **prohibit the use of 1px solid borders for sectioning.** Boundaries must be defined through:
1.  **Background Shifts:** A `surface-container-low` section sitting directly on a `surface` background.
2.  **Vertical Whitespace:** Using the spacing scale to create mental boundaries rather than physical ones.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets. 
*   **Background:** `surface`
*   **Main Content Areas:** `surface-container-low`
*   **Interactive Cards/Modules:** `surface-container-lowest` (to create a subtle "lift")
*   **Persistent Overlays:** `surface-bright`

### The Glass & Gradient Rule
For floating elements, such as navigation bars or "New Issue" action buttons, use semi-transparent surface colors with a `backdrop-blur` effect (Glassmorphism). Main CTAs should utilize a subtle linear gradient from `primary` to `primary-container` (top-to-bottom) to add visual "soul" and depth.

---

## 3. Typography

The typography strategy is a dialogue between the authoritative tradition of Serif and the modern precision of Sans-serif.

*   **Display & Headlines (Noto Serif):** These are the "voice" of the newsletter. Large, bold, and unapologetic. Use `display-lg` for issue titles to evoke the feel of a newspaper masthead.
*   **Titles & Body (Inter):** While the brand profile mentions Noto Sans, we utilize **Inter** for the UI elements to ensure maximum legibility at small sizes. The body-lg (`1rem`) is the workhorse for long-form newsletter reading, providing generous line height for accessibility.
*   **Labels (Space Grotesk):** This monospace-leaning font is used for administrative metadata—date stamps, issue numbers, and technical stats. It provides a "brutalist" contrast to the elegant serifs.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The change in lightness creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** When a floating state is required (e.g., a dropdown or modal), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(28, 27, 27, 0.06);`. The shadow must be tinted with the `on-surface` color to look like natural light.
*   **The Ghost Border Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** Use semi-transparent layers for the admin sidebar or top navigation. This allows the primary brand colors from the content to bleed through, integrating the UI into the content.

---

## 5. Components

### Cards & Issues
*   **Style:** No borders. Use `surface-container-lowest` background. 
*   **Layout:** Asymmetric. The issue thumbnail should slightly overlap the container edge or sit offset from the text to break the "grid" feel.
*   **Separation:** No horizontal dividers. Use 32px or 48px of vertical padding to separate archived issues.

### Buttons
*   **Primary:** Gradient from `primary` to `primary-container`. `9999px` (full) roundedness for high-level actions; `lg` (0.5rem) for administrative tasks.
*   **Tertiary:** No background or border. Use `primary` text with an underline that appears only on hover.

### Input Fields
*   **Style:** Minimalist. Only a bottom-weighted "Ghost Border" or a subtle `surface-container-high` background fill. 
*   **Focus State:** Transition the background to `surface-container-highest` and thicken the bottom accent line using the `primary` color.

### Chips & Tags
*   **Style:** Use `secondary-fixed-dim` for background with `on-secondary-fixed` for text. Keep the corners at `md` (0.375rem) to differentiate them from the fully rounded buttons.

---

## 6. Do's and Don'ts

### Do
*   **Do** use expansive white space. If a layout feels "crowded," double the padding.
*   **Do** use `Noto Serif` for any text that is meant to be "read" (articles, quotes).
*   **Do** use `Space Grotesk` for data-heavy admin views to maintain a "professional tool" feel.
*   **Do** ensure high contrast for long-form text (Body-lg on Surface).

### Don't
*   **Don't** use black (`#000000`) for text. Use `on-surface` (`#1c1b1b`) to maintain tonal softness.
*   **Don't** use 1px solid lines to separate list items. Use tonal shifts in the background of every second item or increased vertical spacing.
*   **Don't** use standard "blue" for links. Use `primary` or `secondary` to stay within the brand's heat-map.
*   **Don't** use heavy, dark shadows. If a component doesn't look elevated through color alone, re-evaluate the surface nesting.