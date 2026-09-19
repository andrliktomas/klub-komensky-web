# Klub Komenský, z. s. – web

Statický web v [Astro](https://astro.build). Obsah je v Markdownu, nasazuje se z GitHubu na Cloudflare Pages.

## Nasazení (GitHub → Cloudflare Pages)

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
Skript běží i automaticky před každým buildem a přeskakuje, co už existuje.

**Doporučení:** spusťte ho jednou lokálně a výsledek commitněte. Web pak nebude záviset na tom,
jestli starý Webnode ještě běží. Seznam souborů: `src/data/soubory.json`, alba: `src/data/galerie.json`.

## Správa obsahu

| Co | Kde |
| --- | --- |
| Aktualita (blog) | nový `.md` v `src/content/aktuality/` |
| Akce / zpráva z cesty | nový `.md` v `src/content/akce/` (budoucí datum `od` = zobrazí se v „Připravujeme“) |
| Bod na mapě na úvodu | v akci vyplnit `mapa: { popisek, lat, lon }` – číslování a klíč se dopočítají |
| Správní rada, zápisy, kontakty | `src/data/site.ts` |
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
