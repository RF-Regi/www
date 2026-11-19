# RF-Regi rebuild — end-to-end verification report

Verified: 2026-11-12, /opt/data/rf-regi-www-v2, Astro 7 static build (`npm run build`), preview server on port 4321.

## Check 1 — Build exits 0 — PASS

```
cd /opt/data/rf-regi-www-v2 && npm run build
→ exit code 0, "13 page(s) built in 2.24s", "Complete!"
```
Zero errors or warnings in build output. Content synced, types generated, all 13 static routes generated.

## Check 2 — dist/ contains all legacy routes — PASS

All 15 required files exist in dist/:

| File | Status |
|---|---|
| index.html | PASS |
| om/index.html | PASS |
| om/styret/index.html | PASS |
| frivillig/index.html | PASS |
| frivillig/verv/index.html | PASS |
| frivillig/blimed/index.html | PASS |
| utleie/index.html | PASS |
| utleie/lydpakker/index.html | PASS |
| utleie/lyspakker/index.html | PASS |
| utleie/scene-teknisk/index.html | PASS |
| utleie/utleiebetingelser/index.html | PASS |
| kontakt/index.html | PASS |
| 404.html | PASS |
| admin/index.html | PASS |
| admin/config.yml | PASS |

## Check 3 — Netlify forms and contact emails in dist — PASS

Forms (`data-netlify`):
- `data-netlify="true"` found in 3 files: frivillig/index.html, frivillig/blimed/index.html, kontakt/index.html
- `<form name="JoinUs">` ×2 (frivillig, frivillig/blimed — fields navn/email/nummer)
- `<form name="contact">` ×1 (kontakt — fields navn/email/tekst)

Emails (grep over dist/, file counts):
| Email | Files |
|---|---|
| post@… (obfuskert i kilden) | 13 |
| utleie@… (obfuskert i kilden) | 13 |
| regiformann@… (obfuskert i kilden) | 3 |
| forretningsforer@… (obfuskert i kilden) | 2 |
| dj-sjef@… (obfuskert i kilden) | 3 |
| rf-formann@… (obfuskert i kilden) | 2 |

All six addresses present.

## Check 4 — Served site screenshots — PASS

Server: `npx astro preview --port 4321` → HTTP 200 on `/`. Captured with a real browser at both viewports:

Desktop 1440×900:
- /opt/data/cache/scratch/rf-regi-screenshots/home-desktop.png
- /opt/data/cache/scratch/rf-regi-screenshots/utleie-lydpakker-desktop.png
- /opt/data/cache/scratch/rf-regi-screenshots/om-styret-desktop.png
- /opt/data/cache/scratch/rf-regi-screenshots/kontakt-desktop.png

Mobile 390×844:
- /opt/data/cache/scratch/rf-regi-screenshots/home-mobile.png
- /opt/data/cache/scratch/rf-regi-screenshots/utleie-lydpakker-mobile.png
- /opt/data/cache/scratch/rf-regi-screenshots/om-styret-mobile.png
- /opt/data/cache/scratch/rf-regi-screenshots/kontakt-mobile.png

Visual spot-check (home desktop, kontakt desktop): dark theme CSS loads, hero + CTA buttons + card grid with images render correctly, contact form fields (Ditt navn / Din e-post / Hva kan vi hjelpe deg med? + Send) and post@… (obfuskert i kilden) link render correctly. No unstyled content, broken images, or placeholder text. Titles verified in dist HTML: "Velkommen til RF-Regi", "Kontakt oss - RF-Regi" (no errors).

## Check 5 — This report — PASS

## Summary

| Check | Result |
|---|---|
| 1. Build exit 0 | PASS |
| 2. All 15 legacy route files in dist | PASS |
| 3. Forms (JoinUs, contact) + 6 emails | PASS |
| 4. 8 screenshots (4 pages × 2 viewports) | PASS |
| 5. Report written | PASS |

No FAILs. Nothing fixed during verification (verify-only scope).

### Out of scope / observed, not verified here
- Netlify Identity / Git Gateway enablement and the git-gateway backend in config.yml can only be confirmed after actual Netlify deploy (documented in README.md per cms.md handoff).
- Form submissions end-to-end require a live Netlify deploy with form detection enabled; static HTML form markup is verified only.

---

# Re-verification after fixes (2026-11-13)

Re-ran the full goal checklist against a **fresh `npm run build`** (not the dist left by the fixes node), serving `dist/` via `astro preview` on port 4321. Screenshots re-captured fresh into `/opt/data/cache/scratch/rf-regi-screenshots/` (old ones overwritten). No code was changed during this verification.

## Check 1 — `npm run build` exit 0, zero errors — PASS

```
cd /opt/data/rf-regi-www-v2 && npm run build
→ exit code 0, "13 page(s) built in 1.57s", "Complete!", "[@astrojs/sitemap] sitemap-index.xml created"
```
No errors or warnings in output.

## Check 2 — All legacy routes + admin + robots + sitemap in dist — PASS

All 16 required files exist: the 13 routes (`index.html`, `om/`, `om/styret/`, `frivillig/`, `frivillig/verv/`, `frivillig/blimed/`, `utleie/`, `utleie/lydpakker/`, `utleie/lyspakker/`, `utleie/scene-teknisk/`, `utleie/utleiebetingelser/`, `kontakt/`, `404.html`) + `admin/index.html` + `admin/config.yml` + `robots.txt`. Sitemap files present: `dist/sitemap-index.xml`, `dist/sitemap-0.xml`. No stray HTML files beyond these 14 pages + admin.

## Check 3 — data-netlify forms + six emails in dist — PASS

- `<form name="JoinUs" data-netlify="true">` ×2 (`frivillig/index.html`, `frivillig/blimed/index.html`)
- `<form name="contact" data-netlify="true">` ×1 (`kontakt/index.html`)
- `data-netlify` appears in exactly these 3 files.
- All six @rfregi.no addresses present in dist (file counts): post@ 13, utleie@ 13, regiformann@ 3, forretningsforer@ 2, dj-sjef@ 3, rf-formann@ 2.

## Check 4 — og:image, headings, iframe title — PASS

- `og:image` = `https://rfregi.no/images/banner.jpg` on all 13 content pages + 404; `dist/images/banner.jpg` exists (admin/index.html emits no og:image — CMS page, correct).
- Zero `<h4` in any dist HTML file.
- The single dist iframe (`utleie/lyspakker/index.html`) has `title="Eksempel: Martin T-Rex"`.

## Check 5 — All 11 fixes present in BUILT output — PASS

| # | Fix | Evidence in dist/ | Result |
|---|---|---|---|
| 1 | og:image → existing image | `banner.jpg` on all 13 pages + 404, file exists | PASS |
| 2 | Footer h4 → h2 | 3× `<h2 class="footer-heading">` per page; `.site-footer h2.footer-heading` in built CSS, `.site-footer h4` gone | PASS |
| 3 | frivillig heading order | dist/frivillig/: h1 → h2×9 (no h3/h4) | PASS |
| 4 | verv heading order | dist/frivillig/verv/: h1 → h2 → h3 (valid order, no h4) | PASS |
| 5 | styret person h2 + generell-kontakt filtered | 5 person cards (h2 names), "Generell kontakt" absent from /om/styret/; `.person h2` in built CSS | PASS |
| 6 | Placeholder contrast | `#7d8794` in built CSS, `#6b7482` gone | PASS |
| 7 | iframe title | `title="Eksempel: Martin T-Rex"` in dist/utleie/lyspakker/ | PASS |
| 8 | robots.txt + sitemap | dist/robots.txt + sitemap-index.xml + sitemap-0.xml | PASS |
| 9 | Descriptive alt | "Stemningsbelysning: lokal med dempet, fargerik lyssetting…" in dist/utleie/lyspakker/ | PASS |
| 10 | Sveltia pinned | `unpkg.com/@sveltia/cms@0.265.0/dist/sveltia-cms.js` in dist/admin/index.html (no SRI — noted optional in fixes.md) | PASS |
| 11 | site.yaml wired + styret filter | meta description matches site.yaml `description` verbatim; footer shows `facebook.com/rfregi` (from site.yaml `facebook`); generell-kontakt excluded from styret grid | PASS |

## Check 6 — Fresh screenshots (8) — PASS

Served `dist/` with `npx astro preview --port 4321` (HTTP 200 on all 4 pages), captured with a real browser:

- Desktop 1440×900: `home-desktop.png`, `utleie-lydpakker-desktop.png`, `om-styret-desktop.png`, `kontakt-desktop.png`
- Mobile 390×844: `home-mobile.png`, `utleie-lydpakker-mobile.png`, `om-styret-mobile.png`, `kontakt-mobile.png`

All 8 verified at exact pixel dimensions. Visual spot-check (home desktop, styret mobile): dark theme renders, hero + CTAs + 3-image card grid correct, person cards with avatar/name/role/email correct, no broken images or unstyled content.

## Summary

| Check | Result |
|---|---|
| 1. Build exit 0 | PASS |
| 2. 16 dist files + sitemap | PASS |
| 3. Forms ×3 + 6 emails | PASS |
| 4. og:image / h4 / iframe title | PASS |
| 5. 11 fixes in built output | PASS |
| 6. 8 fresh screenshots | PASS |

**All checks PASS. No unmet goal criteria found.** Known non-blocking leftovers (documented in fixes.md, out of scope): no SRI hash on the pinned Sveltia script; "Styret består av fire personer" wording in verv.md; dropped /search/ page; `pakke.image` field never rendered; netlify.toml comment typo. Netlify Identity/form-detection behavior remains verifiable only on a live deploy.
