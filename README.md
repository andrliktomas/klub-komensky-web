# Klub Komenský, z. s. – web

Statický web v [Astro](https://astro.build). Obsah je v Markdownu, nasazuje se z GitHubu na Cloudflare Pages.

Vizuál vychází z barev původního webu klubu: tmavě hnědá (`#3a1c10`), okr (`#d8a85c`),
terakota (`#a9491f`) a papír (`#f5efe6`). Barvy jsou na jednom místě v `src/styles/global.css`
(blok `:root`) – změna se propíše do celého webu včetně mapy, pečeti a záhlaví.

## Nasazení na Cloudflare Workers

Web je statický; `wrangler.toml` ho nasazuje jako Worker se statickými assety
(`[assets] directory = "./dist"`), stejně jako ostatní weby na tomhle účtu.

### A) Workers Builds – propojení s GitHubem (doporučeno)

Cloudflare → Workers & Pages → Worker `klub-komensky-web` → Settings → Build →
Connect to Git → repozitář `andrliktomas/klub-komensky-web`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Branch: `main`
- Proměnné: `NODE_VERSION` = `22`, po prvním nasazení `SITE_URL` = výsledná adresa

Každý push do `main` pak web sám postaví a nasadí.

### B) Z GitHub Actions (`.github/workflows/nasazeni.yml`)

Workflow staví web při každém pushi. Nasadí ho, jakmile jsou v repozitáři vyplněné
tajné proměnné (Settings → Secrets and variables → Actions → New repository secret);
dokud tam nejsou, krok nasazení se přeskočí:

| Proměnná | Kde ji vzít |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token → šablona „Edit Cloudflare Workers“ |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → Workers & Pages → vpravo „Account ID“ |

### C) Starší postup: Cloudflare Pages

1. Založte na GitHubu prázdný repozitář a nahrajte do něj tuto složku:
   ```bash
   git init && git add . && git commit -m "Nový web Klubu Komenský"
   git branch -M main && git remote add origin git@github.com:UCET/klub-komensky.git && git push -u origin main
   ```
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → vyberte repozitář.
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Proměnné prostředí: `NODE_VERSION=22`, volitelně `SITE_URL` a `PUBLIC_WEB3FORMS_KEY`
3. Web poběží na `https://<nazev-projektu>.pages.dev`. Tu adresu nastavte jako `SITE_URL`
   (používá se pro kanonické odkazy, sitemapu a RSS). Po získání domény ji přidejte v Pages → Custom domains
   a `SITE_URL` přepište.

## Fotky a dokumenty ze starého webu

`npm run assets` stáhne 22 dokumentů a 44 fotografií z Webnode do `public/soubory` a `public/fotky`.
Skript běží i automaticky před každým buildem (`prebuild`) a přeskakuje, co už existuje.

**Zatím nejsou v repozitáři.** Prostředí, ve kterém se web převáděl do této podoby, nemělo přístup
na doménu starého webu (`276551ea95.cbaul-cdnwnd.com`), takže se soubory nestáhly. Na Cloudflare
se stáhnou při buildu samy. **Doporučení:** spusťte `npm run assets` jednou lokálně a výsledek
commitněte – web pak nebude záviset na tom, jestli starý Webnode ještě běží.
Seznam souborů: `src/data/soubory.json`, alba: `src/data/galerie.json`.

Kde fotka chybí, ukáže web rámeček s popisem, co a v jakém rozměru na to místo patří.

## Co ještě doplnit

Na webu jsou místa označená přerušovaným rámečkem „doplnit“. Nejsou tam vymyšlené údaje –
dokud je nevyplníte, web nic netvrdí. Všechna se vyplňují v `src/data/site.ts`:

| Co | Kde | Poznámka |
| --- | --- | --- |
| Počet členů (číslo na úvodu) | `pocetClenu` | ostatní tři čísla se počítají z obsahu webu samy |
| Ceník členství a exkurzí | `cenik` | doplňte `cena: '300 Kč'` apod. |
| Ohlasy účastníků | `ohlasy` | `{ text, kdo }`; prázdný seznam = tři prázdná místa |
| Partneři | `partneri` | `{ nazev, logo }`, logo 480 × 160 px do `public/obrazky/partneri/` |
| Výroční zprávy | `vyrocniZpravy` | soubor do `public/soubory/` |
| Portréty správní rady | – | `public/obrazky/rada/1.jpg` … `5.jpg`, 400 × 400 px, v pořadí podle `spravniRada` |

Rubrika „Rok v klubu“ na úvodu (jaro / podzim / prosinec) je psaná obecně podle dosavadní
historie klubu – zkontrolujte, jestli sedí, případně upravte v `src/pages/index.astro`.

## Správa obsahu

| Co | Kde |
| --- | --- |
| Aktualita (blog) | nový `.md` v `src/content/aktuality/` |
| Akce / zpráva z cesty | nový `.md` v `src/content/akce/` (budoucí datum `od` = zobrazí se v „Připravujeme“) |
| Bod na mapě na úvodu | v akci vyplnit `mapa: { popisek, lat, lon }` – číslování a klíč se dopočítají |
| Správní rada, zápisy, kontakty, ceník | `src/data/site.ts` |
| Materiály do výuky | `materialy` v `src/data/site.ts` + soubor do `public/soubory/` |
| Fotoalbum | `src/data/galerie.json` + fotky do `public/fotky/<album>/` |
| Dokument ke stažení | soubor do `public/soubory/` |

Vzor aktuality:

```md
---
title: "Název"
date: 2026-10-01
rubrika: Exkurze        # Exkurze | Semináře | Ze života klubu
perex: "Jedna věta do přehledu."
prilohy:
  - nazev: "Zpráva (PDF)"
    soubor: zprava.pdf   # leží v public/soubory/
---
Text v Markdownu.
```

Úpravy jdou dělat i přímo v rozhraní GitHubu – po uložení se web sám přestaví.

## Kontaktní formulář

Bez nastavení otevře e-mailový program návštěvníka. Pro odesílání přímo z webu založte zdarma klíč
na web3forms.com (na adresu klubu) a vložte ho do Cloudflare jako `PUBLIC_WEB3FORMS_KEY`.

## Přesměrování starých adres

`public/_redirects` mapuje adresy z Webnode (`/o-nas/`, `/zapisy/`, `/news/...`) na nové. Začne platit,
až bude doména mířit na Cloudflare.

## Lokální vývoj

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # výstup v dist/
node scripts/nahled.mjs   # jednosouborový náhled do nahled/index.html
```
