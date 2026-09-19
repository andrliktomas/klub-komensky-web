// Přenese dokumenty a fotografie ze starého webu (Webnode) do složky public/.
// Soubory, které už existují, přeskočí – po prvním stažení je proto commitněte do repozitáře,
// ať web nezávisí na tom, jestli starý Webnode ještě běží.
//
//   npm run assets
//
// Skript nikdy neshodí build: co se nepodaří stáhnout, jen vypíše.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cti = async (p) => JSON.parse(await fs.readFile(path.join(root, p), 'utf8'));

const { zdroj, soubory } = await cti('src/data/soubory.json');
const { alba } = await cti('src/data/galerie.json');

const url = (cesta) => zdroj + cesta.split('/').map(encodeURIComponent).join('/');
const existuje = (p) => fs.access(p).then(() => true, () => false);

async function stahni(kandidati, cil) {
  if (await existuje(cil)) return 'je';
  for (const u of kandidati) {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(30000) });
      if (!r.ok) continue;
      const data = Buffer.from(await r.arrayBuffer());
      if (data.length < 200) continue;
      await fs.mkdir(path.dirname(cil), { recursive: true });
      await fs.writeFile(cil, data);
      return 'ok';
    } catch {
      /* zkusíme další variantu */
    }
  }
  return 'chyba';
}

const ulohy = [
  ...soubory.map((s) => ({
    cil: path.join(root, 'public/soubory', s.cil),
    kandidati: [url(s.cesta)],
  })),
  ...alba.flatMap((a) =>
    a.fotky.map((f) => ({
      cil: path.join(root, 'public/fotky', f.cil),
      // webová velikost → originál → náhled
      kandidati: [
        url(`system_preview_detail_${f.id}/${f.soubor}`),
        url(`${f.id}/${f.soubor}`),
        url(`system_preview_small_${f.id}/${f.soubor}`),
      ],
    })),
  ),
];

const stav = { je: 0, ok: 0, chyba: 0 };
const chyby = [];
const fronta = [...ulohy];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (fronta.length) {
      const u = fronta.shift();
      const v = await stahni(u.kandidati, u.cil);
      stav[v]++;
      if (v === 'chyba') chyby.push(path.relative(root, u.cil));
    }
  }),
);

console.log(`[soubory] staženo ${stav.ok}, už bylo ${stav.je}, nepodařilo se ${stav.chyba} (z ${ulohy.length})`);
if (chyby.length) console.log('[soubory] chybí:\n  ' + chyby.join('\n  '));
