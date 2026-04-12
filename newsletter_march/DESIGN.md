```markdown
# Design System Strategy: The Scientific Editorial

## 1. Overview & Creative North Star: "The Radical Lab"
This design system is built to bridge the gap between rigorous scientific inquiry and bold grassroots activism. Our Creative North Star is **"The Radical Lab"**—an aesthetic that mirrors a high-end scientific journal but is infused with the raw energy of a protest poster. 

We reject the "standard" web look. Instead of grids of boxes, we utilize **Asymmetric Tension**. By combining massive Serif headlines with technical Monospaced "eyebrows," we create a layout that feels curated and urgent. The experience should feel like a physical broadsheet newspaper discovered in a modern laboratory: tactile, authoritative, and unapologetically progressive.

---

## 2. Colors & Surface Architecture
Our palette uses high-contrast tonal shifts to define hierarchy, moving away from the "boxed-in" UI of the last decade.

### The Palette
*   **Primary (#970012 / #C1121F):** Our "Activism Red." Used for high-impact calls to action and critical data points.
*   **Secondary (#8E4F00 / #F48C06):** "Energy Amber." Used for highlighting, warnings, and energetic accents.
*   **Tertiary (#29513F):** "Deep Forest." Represents the environment and grounded scientific stability.
*   **Neutral Foundation:** `surface` (#FCF9F8) provides an "off-white" paper feel, while `on-surface` (#1C1B1B) ensures maximum legibility.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. We define boundaries through:
1.  **Tonal Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Structural Rules:** 4px or 8px thick rules (using `primary` or `on-surface`) to separate major editorial segments, mimicking a newspaper’s masthead.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper. 
*   **Level 0 (Base):** `surface`
*   **Level 1 (Subtle Inset):** `surface-container-low` for secondary content regions.
*   **Level 2 (Floating Cards):** `surface-container-lowest` (pure #FFFFFF) to create a natural, sharp "lift" against the off-white background.

### Signature Textures
Apply a subtle 2-3% monochromatic noise texture to the `surface` and `surface-variant` layers. This breaks the digital "flatness" and gives the organization's voice a tactile, grassroots grit.

---

## 3. Typography: The Intellectual Dialogue
We use a three-font system to create a "Scientific Editorial" hierarchy.

*   **The Voice (Display/Headline):** **Noto Serif Malayalam.** Used in large scales (`display-lg` to `headline-sm`). Its elegant curves provide the "Intellectual" and "Progressive" weight.
*   **The Narrative (Body/Title):** **Inter (or Noto Sans Malayalam).** A neutral, highly readable sans-serif. Used for long-form reading and interface elements.
*   **The Evidence (Labels/Eyebrows):** **Space Grotesk (Mono).** Our "Scientific" font. Use this for data points, dates, and "eyebrow" text above headlines. Always uppercase with +5% letter spacing.

---

## 4. Elevation, Depth & Roundedness
In this system, **sharpness is a virtue.**

*   **The Radius Rule:** All components (buttons, cards, inputs) have a **0px border-radius**. Sharp corners communicate precision, authority, and a modern "Brutalist" edge.
*   **Tonal Layering:** Depth is achieved by stacking. A `surface-container-highest` element provides focus without the need for traditional shadows.
*   **Ambient Shadows:** If an element must float (e.g., a modal), use a highly diffused shadow: `box-shadow: 0 20px 40px rgba(28, 27, 27, 0.06);`. The shadow color is a tint of our `on-surface` charcoal, never a generic grey.
*   **The Ghost Border:** For accessibility in forms, use `outline-variant` at 20% opacity. Avoid 100% opaque lines which clutter the minimalist aesthetic.

---

## 5. Components

### Buttons: The "Activist" Primary
*   **Primary:** Solid `primary` background, `on-primary` text. 0px radius. On hover, shift to `primary-container`.
*   **Secondary:** Solid `on-surface` background, `surface` text. This high-contrast flip is used for secondary actions.
*   **Tertiary:** No background. Bold `primary` text with a 2px underline that expands on hover.

### Cards & Feed Items
*   **Forbid Dividers:** Do not use lines between list items. Use 32px/48px of vertical white space or a subtle shift to `surface-container-low`.
*   **Visual Motif:** Every card should feature a "Circular Motif"—a small geometric graphic or a circular crop for imagery—to contrast against the sharp 0px corners of the container.

### The "Data-Point" Chip
*   Used for scientific categories. Background: `tertiary-container`. Text: `on-tertiary-fixed`. No border. These should look like labels in a laboratory specimen file.

### Input Fields
*   **Style:** Underline-only (2px `outline`). No 4-sided boxes. When focused, the underline transitions to `primary` (#C1121F).
*   **Labels:** Always use the Monospaced `label-md` for field descriptors.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Allow headlines to breathe. A `display-lg` headline should often stand alone with significant padding.
*   **Use Thick Rules:** Use 4pt or 8pt lines for structural emphasis (e.g., separating the navigation from the hero).
*   **Mix Alignments:** Use a rigid left-aligned grid for text, but allow images or "circular motifs" to break the margin, creating an intentional, editorial "break."

### Don’t:
*   **No Rounded Corners:** Never use `border-radius`. It softens the "Scientific" and "Bold" personality we are aiming for.
*   **No Drop Shadows on Text:** Legibility must be maintained through high-contrast color choices alone.
*   **No Generic Icons:** Use ultra-clean, thin-stroke geometric iconography. Avoid "bubbly" or overly illustrative icon sets.
*   **No Center Alignment for Long Text:** Editorial layouts rely on the strength of the left-hand margin. Center-alignment should be reserved strictly for small labels or circular stamps.