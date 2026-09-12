# Spectra Assets — Website

A pixel-faithful recreation of the **Spectra Assets** design (from Claude Design) rebuilt as a **Next.js** app, populated with the real website content.

Brand: navy `#0F1729`, teal `#009B8D`, gold `#C9A84C`, Inter font.

---

## Fastest way to see it (no install needed)

Double-click **`spectra-standalone.html`** in this folder. It's a single self-contained file (React + all styles + the logo are inlined) and opens in any browser. *(It loads the Babel compiler from a CDN the first time, so keep an internet connection for that file.)*

---

## Running it as a real Next.js app (recommended for development / deployment)

Node.js **24.20.0 LTS** is already installed (portable) at
`C:\Users\HP\nodejs\node-v24.20.0-win-x64`, and dependencies are installed.

**Easiest:** double-click **`start-site.cmd`**, then open http://localhost:3000

**Or from a terminal** (Node isn't on the global PATH, so add it first):

```bash
set PATH=C:\Users\HP\nodejs\node-v24.20.0-win-x64;%PATH%
npm run dev
```

Open http://localhost:3000

> Tip: to make `node`/`npm` work in any terminal permanently, add that folder to your
> Windows PATH (Settings → "Edit environment variables for your account").

Build for production:

```bash
npm run build
npm start
```

Deploy: push to GitHub and import into **Vercel** (zero config for Next.js).

---

## Project structure

```
spectra-site/
├─ app/
│  ├─ layout.jsx        # <html> shell, metadata, imports global CSS
│  └─ page.jsx          # renders the site
├─ public/
│  ├─ SpectraSite.jsx   # ← the entire site (all pages) lives here
│  ├─ globals.css       # design tokens, Inter font, all keyframe animations
│  ├─ assets/logo.png   # Spectra Assets logo
│  ├─ preview.html      # dev preview harness (served, no build step)
│  └─ vendor/           # React/ReactDOM copies used only by the preview
├─ spectra-standalone.html   # single-file, double-clickable preview
├─ design-source/       # the original design HTML, runtime, and content doc (reference)
└─ package.json
```

## Where to edit content

Everything is in **`public/SpectraSite.jsx`**:

- Home copy — the `Home()` component.
- Solutions (Wealth Creation, Financial Planning, Insurance, Loans, Securities) — the `CATS` data object near the top. Edit product names / headlines / descriptions there and every page updates.
- Team / leadership — the `TEAM` array.
- Principles — the `PRINCIPLES` array.
- Calculators — `ToolSip` / `ToolLump` / `ToolSwp` / `ToolLoan`.
- Contact details, footer — the `Contact()` and `Footer()` components.

## Pages included

Home · About · Solutions (tabbed overview) · Wealth Creation · Financial Planning ·
Insurance (retail + business/corporate) · Loans · Securities ·
SIP / Lumpsum / SWP / Loan-EMI calculators · Forms · Contact.

Navigation is a single-page app (instant transitions, matching the original design).

## Notes / to finish later

- **Testimonials** and **downloadable form PDFs** are placeholders — drop in real quotes/photos and PDF links when ready.
- The contact form currently shows a success state on submit; wire it to email / a backend (e.g. Formspree, or a Next.js API route) to actually receive enquiries.
- Google Maps embed points at CP Tank Circle, Girgaon — adjust the exact pin if needed.
