# Spectra Assets — Category hero banner prompts

Big cinematic banner images that sit **behind** each category page's hero
(the navy section with the huge "Wealth Creation", "Insurance & Protection"
etc. headline). The site darkens them ~55% and adds a bottom navy fade so
the headline stays readable on top.

Drop the generated files into `public/images/heroes/` with **exactly** these
file names. If a file is missing the site falls back to the plain navy
background (no visible error).

## Specs

- **Aspect ratio:** 16:9 landscape (site uses full-bleed cover crop)
- **Size:** ~1920×1080, JPG, ~250–400 KB each
- **Mood:** cinematic, editorial, premium private-banking. Deep colour grade,
  natural light, warm/cool contrast. Anything shot from a distance or from
  behind — the image is a *backdrop*, not the subject.
- **Composition:** subject slightly left or right so the centre stays
  relatively calm (the heading and CTA sit in the middle over the darkest
  part of the gradient). Room for the bottom third to fade to darker tones.
- **Absolutely no:** faces staring at the camera, readable text, logos,
  watermarks, or UI overlays.

## Shared style suffix (append to every prompt)

> Cinematic editorial photograph, ultra-wide 16:9 crop, moody golden-hour
> or late afternoon light, deep colour grade, quiet premium private-banking
> mood, shallow depth of field on the subject, background softly falling
> off to darker tones for text overlay, ultra-realistic, high resolution.
> No faces looking at the camera, no readable text, no logos, no watermarks.

Midjourney flag: `--ar 16:9 --style raw --v 6`. For ChatGPT / Imagen 3, ask
for **"cinematic landscape 16:9"** and remove the Midjourney flag.

---

## 1. Wealth Creation

**File:** `wealth.jpg`
**Heading in site:** *Wealth Creation*

**Prompt:**
A wide cinematic view of a modern private-banking meeting room at golden
hour. In the foreground, a long polished walnut table with a bound
portfolio report, a printed line chart trending upward, a fountain pen and
two ceramic espresso cups. Two people are cropped out of frame — only a
suit sleeve and a hand resting on the table are visible on the left. The
entire back wall is floor-to-ceiling glass overlooking the softly blurred
Mumbai skyline at sunset, warm ambers washing across the room. Brass
fixtures glint. Subtle teal accent from a ceramic vase.

---

## 2. Financial Planning

**File:** `planning.jpg`
**Heading in site:** *Financial Planning*

**Prompt:**
A wide cinematic view of a serene modern home study at soft morning light.
An oak desk in the foreground with a leather notebook open to a hand-drawn
long-term timeline, a fountain pen resting across it, and a small
architectural model of a house nearby. A single hand (cropped at the wrist)
rests on the notebook. Big linen-curtained window fills the right side with
diffused honeyed light, a green plant softly out of focus in the corner.
Quiet, unhurried, planning-for-tomorrow mood.

---

## 3. Insurance & Protection

**File:** `insurance.jpg`
**Heading in site:** *Insurance & Protection*

**Prompt:**
A wide cinematic view from inside a calm modern office at dusk. A single
figure is seen from behind, silhouetted against a floor-to-ceiling window
with soft rain streaking down the glass; city lights blurred in the
distance. The room's interior is warm and sheltered — muted greys and dark
walnut, a single desk lamp casting a pool of golden light. Feeling of a
storm outside, safety inside.

---

## 4. Loans & Financing

**File:** `loans.jpg`
**Heading in site:** *Loans & Financing*

**Prompt:**
A wide cinematic view of a bright, newly-finished modern apartment
interior at afternoon light. Floor-to-ceiling windows on the right open
onto a softly blurred cityscape; on a marble kitchen island in the
foreground, a small set of brass keys rests on a folded architectural
drawing next to a single glass of water. Warm oak floors, minimalist
Scandinavian furniture. The space feels ready to be lived in — the
beginning of a new chapter.

---

## 5. Securities & Capital Markets

**File:** `securities.jpg`
**Heading in site:** *Securities & Capital Markets*

**Prompt:**
A wide cinematic view of a modern minimalist analyst desk at dusk. Two
ultra-thin monitors on the desk show soft, abstract, blurred market
charts (no readable numbers or logos). A single hand cropped at the wrist
rests on a mouse. Behind the desk, a floor-to-ceiling window looks over a
darkening city skyline with the first lights coming on, deep teal-blue
tones dominating. Composed, thoughtful, not frantic — the opposite of a
trading floor cliche.

---

## Bulk generation recipe

1. Copy prompt + append the shared style suffix from the top of this file.
2. Add the model flag:
   - Midjourney: `--ar 16:9 --style raw --v 6`
   - ChatGPT / Imagen 3 / Gemini: end with `"landscape 16:9 crop"`
3. Pick the frame where the subject is off-centre and text-space (middle
   band) is calmest.
4. Save as JPG, ~1920×1080, quality 80. If >400 KB, compress at
   [tinypng.com](https://tinypng.com).
5. Drop into `public/images/heroes/` with the exact filename above.
6. **Crop Gemini watermark:** if the model bakes a sparkle in the corner,
   the same crop-8%-off-bottom-right rule applies (a small utility in the
   scratchpad already handles this — ask Claude to run it).
