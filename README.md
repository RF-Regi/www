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
| **Nettsted** | `src/data/site.yaml` | `site.title`, `site.slogan`, `site.description`, `site.facebook` | objekt under `site`-nøkkelen (kreves av Astro `file()`-loader) |

Media lastes opp til `public/images/` og refereres som `/images/…` på
nettstedet (`media_folder` / `public_folder` i `config.yml`).

## Filstruktur

```
public/admin/          Sveltia CMS (index.html + config.yml)
src/content/pages/     Sider
src/content/styret/    Styremedlemmer
src/content/pakker/    Utleiepakker (lyd/lys)
src/data/site.yaml     Nettstedsinformasjon (tittel, slagord, osv.)
netlify.toml           Bygg- og hostingkonfigurasjon for Netlify
```

## Innlogging til CMS-et (backend)

CMS-et bruker **GitHub-backend**: alle som har skriverettigheter til
`RF-Regi/www` kan logge inn på `/admin/` med GitHub-kontoen sin.

**På Netlify (nåværende hosting):** Sveltia bruker Netlifys innebygde
OAuth-klient automatisk (default `base_url: https://api.netlify.com`).
Krever at **Netlify Identity er aktivert** på Netlify-siden

1. *Netlify Dashboard → Site configuration → Identity → Enable Identity*,
   registreringsmodus «Invite only» (styrt av hvem som har repo-tilgang).
2. Ferdig — redaktører logger inn på `https://<domene>/admin/` med
   GitHub-konto. Ingen e-postinvitasjoner, ingen Git Gateway.

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
