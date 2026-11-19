# rf-regi-www v2 — rfregi.no

Astro 7-rebuild av rfregi.no, hostet på **Netlify** med **Sveltia CMS** for
innholdsadministrasjon. Innholdet ligger i `src/content/` og datene i
`src/data/`; CMS-et committer endringer rett til GitHub-repoet `RF-Regi/www`.

## For endringer på siden:

Det er satt opp CMS for å gjøre det litt lettere å redigere sider enn å endre direkte i github for ikke kodere/utviklere/IT personer
CMS-et bruker **GitHub-backend**: alle som har skriverettigheter til
`RF-Regi/www` kan logge inn på `/admin/` med GitHub-kontoen sin.

Den bør være nåbar på rfregi.no/admin/

## Lokal utvikling

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # statisk bygg til dist/
```

Merk: admin-grensesnittet (`/admin/`) krever backend-oppsett (se under) og
fungerer ikke mot lokal dev — det er ment brukt mot Netlify/GitHub.

## Innlogging til CMS-et (backend)

CMS-et bruker **GitHub-backend**: alle som har skriverettigheter til
`RF-Regi/www` kan logge inn på `/admin/` med GitHub-kontoen sin.

**På Netlify (nåværende hosting):** Sveltia bruker Netlify som OAuth-klient
automatisk (default `base_url: https://api.netlify.com`). Det krever en
engangs registrering av en GitHub **OAuth App** som installeres på
Netlify-siden - Dette er allerede satt opp og skal fungere greit.

**Vert-uavhengig alternativ — Sveltia CMS Authenticator** (bruk dette hvis
Netlify Identity forsvinner, eller hvis nettstedet flyttes, f.eks. til
GitHub Pages): en liten Cloudflare Worker som OAuth-klient mot en GitHub App.

1. **Deploy authenticatoren**: <https://github.com/sveltia/sveltia-cms-auth>
   → «Deploy to Cloudflare Workers»-knappen. Noter worker-URL-en,
   f.eks. `https://sveltia-cms-auth.<subdomene>.workers.dev`.
2. **Registrer en GitHub App** (ikke OAuth App):
   <https://github.com/settings/apps/new> — pre-fyllt lenke i README-en til
   sveltia-cms-auth. Callback URL: `https://<din-worker>.workers.dev/callback`.
   Permissions: Contents read/write, Pull requests read/write (kreves for
   redigeringsarbeidsflyten). Installer appen på `RF-Regi/www` (Only select
   repositories).
3. **Sett worker-variabler**: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
   (fra GitHub App-en), og `ALLOWED_DOMAINS: rfregi.no, www.rfregi.no`
   (anbefalt — hindrer at andre bruker worker-en din).
4. **Sett `base_url`** i `public/admin/config.yml` til worker-URL-en
   (se den kommenterte blokken i filen).

Slik fungerer det i praksis uansett backend: CMS-et lagrer endringer som
commits i `RF-Regi/www`. Med `publish_mode: editorial_workflow` går
endringene først til et kladdetre (draft → in review → ready → publish) og
publiseres til `main` når de godkjennes; Netlify bygger da nettstedet
automatisk.

## Innholdssamlinger (CMS ↔ filstruktur)

| CMS-samling | Filsti | Frontmatter-felt | Widget |
|---|---|---|---|
| **Sider** | `src/content/pages/*.md` | `title` | tekst |
| | | `teaser` | tekst (valgfritt) |
| | | `permalink` | tekst |
| | | `showForm` | valg: `none` / `join` / `contact` |
| | | *brødtekst* | markdown (implisitt felt) |
| **Styret** | `src/content/styret/*.md` | `name` | tekst |
| | | `role` | tekst |
| | | `email` | tekst |
| | | `order` | tall (sorteringsrekkefølge) |
| | | `image` | bilde (valgfritt) |
| **Pakker** | `src/content/pakker/*.md` | `type` | valg: `lyd` / `lys` |
| | | `title` | tekst |
| | | `order` | tall (sorteringsrekkefølge) |
| | | `items` | liste med tekstpunkter |
| | | *brødtekst* | markdown (implisitt felt) |
| **Nettsted** | `src/data/site.yaml` | `site.title`, `site.slogan`, `site.description`, `site.facebook`, `site.footer_text` | objekt under `site`-nøkkelen (kreves av Astro `file()`-loader) |
| **Nettsted → Forsiden** | `src/data/forside.yaml` | `forside.hero` (kicker/tittel/intro/CTA-knapper), `forside.section_title`, `forside.cards` (liste: tittel/tekst/lenke/bilde/alt) | hele forsiden |
| **Nettsted → Meny** | `src/data/meny.yaml` | `meny.items` (liste: tekst/lenke/undermeny) | toppmenyen + bunntekst-snarveier |
| **Nettsted → Sidetekster** | `src/data/undersider.yaml` | `undersider.styret`, `.lydpakker`, `.lyspakker`, `.kontakt`, `.ikke_funnet` (tittel/undertekst per side) | sidetitler og tekster på undersidene |

Media lastes opp til `public/media/images/` og refereres som `/media/images/…` på
nettstedet (`media_folder` / `public_folder` i `config.yml`).

## E-postobfuskering (mot scrapere)

Alle e-postadresser obfuskeres automatisk ved bygging — redaktører trenger
ikke å tenke på det:

- Adressene er lagret **reversert** i kildefilene (`src/content/styret/*.md`,
  `kontakt.astro`, `Footer.astro`, `frivillig.md`) — repoet er offentlig, så
  står det aldri en lesbar e-postadresse der heller.
- Bygget stripper i tillegg `mailto:` fra markdown og skriver adressen
  reversert inn i HTML-en (`data-epost` + reversert tekst); CSS viser den
  leselig for mennesker, og et lite script bygger `mailto:`-lenken ved klikk.
- Konsekvens: verken repoet eller den statiske HTML-en inneholder lesbar
  e-post eller `mailto:`-href, så scraper-roboter får ikke med seg adressene.
  Skriver du nye e-postlenker i CMS-en (vanlig markdown), obfuskeres de
  automatisk ved bygging — men da står de lesbart i repoet til neste bygg,
  så bruk heller `EpostLenke`-komponenten med `encoded`-verdien.
- Styret-filene bruker verv-navn som filnavn (f.eks. `regiformann.md`) —
  ved vervskifte endres bare Navn/E-post i samme fil (e-posten forblir
  den obfuskerte verv-adressen).

## Filstruktur

```
public/admin/          Sveltia CMS (index.html + config.yml)
src/content/pages/     Sider
src/content/styret/    Styremedlemmer
src/content/pakker/    Utleiepakker (lyd/lys)
src/data/site.yaml     Nettstedsinformasjon (tittel, slagord, osv.)
netlify.toml           Bygg- og hostingkonfigurasjon for Netlify
```
