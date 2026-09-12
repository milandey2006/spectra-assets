# Spectra Assets — Project Context (read this first)

This file gives Claude (and any developer) the full context for this project. Claude Code
loads it automatically when the project is opened, so the "context" travels with the code.

## What this is
A marketing website for **Spectra Assets**, a Mumbai financial-advisory firm
("Your investment partner for life"). Built with **Next.js 14 (App Router, JavaScript)**.
It was recreated from a Claude Design canvas + the client's `WEBSITE CONTENT.docx`
(both kept in `design-source/` for reference).

## How to run (any PC)
Requires **Node.js 18+** (https://nodejs.org). Then, in the project folder:
```
npm install
npm run dev        # http://localhost:3000
```
Build / deploy: `npm run build` then `npm start`, or import the folder into Vercel (zero-config).
Quick no-Node preview: double-click `spectra-standalone.html` (self-contained sample-data version).

> Note: the original PC used a *portable* Node at `C:\Users\HP\nodejs\...` and a
> `start-site.cmd` that points to it. On a different PC, install Node normally and use
> `npm run dev` (or edit `start-site.cmd`'s PATH line to your Node location).

## Architecture (important)
- **The entire site is ONE client component:** `public/SpectraSite.jsx`
  (imported by `app/page.jsx`; `"use client"`). It's a state-driven SPA — navigation is
  React state (`page`), not routes; nav clicks call `go(page, tab, anchor)`.
- **Global styles / fonts / keyframes:** `public/globals.css` (imported in `app/layout.jsx`).
- **Live market data API (server-side):** `app/api/market/route.js` — fetches real quotes
  from Yahoo Finance (no key). The hero marquee reads `/api/market`; falls back to sample
  values if unavailable (e.g. the offline standalone).
- **Content data** lives in consts near the top of `SpectraSite.jsx`:
  `CATS` (solutions + products), `TEAM`, `PRINCIPLES`, `FORMS`, `NETWORK`, `INTERESTS`.
- `spectra-standalone.html` is a generated single-file preview (built from a script in the
  original session's scratchpad; not required to run the site).

## Pages (all in SpectraSite.jsx)
home · about · solutions (tabbed overview) · sol-wealth / sol-planning / sol-insurance /
sol-loans / sol-securities · tool-invest (SIP + Lumpsum toggle) · tool-swp · tool-loan ·
forms · contact.

## Brand
Navy `#0F1729` / darker `#0A1929` · teal `#009B8D` (hover `#007D72`) · gold `#C9A84C` ·
grays `#6B7280 / #374151 / #9CA3AF`. Font: **Poppins** (headings + body).

## Design decisions & client preferences (honor these)
- **Font is Poppins** everywhere (was Inter, then Playfair — client chose Poppins).
- **No em-dashes (—) in copy** — client dislikes the "AI" look; use commas/periods.
- **Keep the existing animations** — do not remove them when making layout tweaks:
  strip-reveal page loader, hero live-market marquee, parallax glows, animated hero chart,
  scroll-reveal (`Reveal`), count-up stats, the **scroll-driven "Our approach" timeline**
  and the **stacking "What we believe" cards**, the leadership cascade accordion, the
  3-stage **Protect→Build→Grow pyramid** (top tier is a real triangle apex).
- **Calculators:** donut chart (invested vs returns), editable amount inputs, sliders;
  amount fields are **uncapped** (type any value); SIP/Lumpsum share one page with a toggle.
- **Spacing:** keep clear space between sections (96px spacers around the two big scroll
  sections). Sections should not feel cramped/glued.
- **Verify visual changes** by rendering at real desktop width before declaring done
  (the preview pane blanks on scrolled captures).

## Status — done
Full site with all client content, responsive (mobile hamburger), floating WhatsApp button
(set the number via the `WHATSAPP` const in SpectraSite.jsx to enable direct chat), favicon,
Next 14.2.35 (security-patched).

## Status — pending / to finish
- **Testimonials:** placeholder — needs real quotes + photos.
- **Forms page:** the 6 download cards need real PDF links (or remove them).
- **Contact form:** currently opens a mailto to spectraassets@gmail.com; wire to a real
  backend/service (Formspree or a Next API route) to capture enquiries server-side.
- **Deploy:** not yet deployed (Vercel recommended).

## Contact details in the site
Email `spectraassets@gmail.com` · Office: 102, Shreepati Jewels D Wing, Khattar Ali Lane,
Near CP Tank Circle, Girgaon, Mumbai 400004.
