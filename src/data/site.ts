export const site = {
  nazev: 'Klub Komenský, z. s.',
  kratce: 'Klub Komenský',
  popis:
    'Klub Komenský je aktivní sdružení pracovníků školství z Brna a okolí. Pořádáme zahraniční exkurze do škol, semináře a setkání – i pro nečleny.',
  email: 'klubkomensky@seznam.cz',
  ico: '270 51 072',
  datovaSchranka: 'uw29nnk',
  citat: 'Všichni na jednom jevišti velikého světa stojíme, a cokoliv se tu koná, všech se týče.',
};

export const menu = [
  { href: '/o-klubu/', text: 'O klubu' },
  { href: '/akce/', text: 'Akce' },
  { href: '/aktuality/', text: 'Aktuality' },
  { href: '/fotogalerie/', text: 'Fotogalerie' },
  { href: '/dokumenty/', text: 'Dokumenty' },
  { href: '/kontakt/', text: 'Kontakt' },
];

export const spravniRada = [
  { jmeno: 'Mgr. Luděk Balcařík', funkce: 'prezident klubu', pusobiste: 'základní škola' },
  { jmeno: 'Mgr. Nikol Minářová', funkce: 'viceprezidentka', pusobiste: 'mateřská škola' },
  { jmeno: 'Dr. Jaroslava Bělková', funkce: 'viceprezidentka', pusobiste: 'fyzická osoba' },
  { jmeno: 'Mgr. Dan Růžička', funkce: 'člen výboru', pusobiste: 'základní škola' },
  { jmeno: 'Michaela Mašková', funkce: 'členka výboru', pusobiste: 'mateřská škola' },
];

export const zapisy = [
  { rok: 2023, nazev: 'Mimořádná valná hromada', soubor: 'zapis-mimoradna-valna-hromada-2023.doc' },
  { rok: 2023, nazev: 'Valná hromada', soubor: 'zapis-valna-hromada-2023.doc' },
  { rok: 2022, nazev: 'Valná hromada', soubor: 'zapis-valna-hromada-2022.pdf' },
  { rok: 2021, nazev: 'Valná hromada', soubor: 'zapis-valna-hromada-2021.docx' },
  { rok: 2020, nazev: 'Valná hromada 24. 6. 2020', soubor: 'zapis-valna-hromada-2020.doc' },
  { rok: 2019, nazev: 'Valná hromada 11. 3. 2019', soubor: 'zapis-valna-hromada-2019.doc' },
  { rok: 2018, nazev: 'Valná hromada 26. 3. 2018', soubor: 'zapis-valna-hromada-2018.doc' },
  { rok: 2017, nazev: 'Valná hromada 6. 4. 2017', soubor: 'zapis-valna-hromada-2017.doc' },
  { rok: 2016, nazev: 'Valná hromada 26. 4. 2016', soubor: 'zapis-valna-hromada-2016.doc' },
  { rok: 2015, nazev: 'Valná hromada 13. 5. 2015', soubor: 'zapis-valna-hromada-2015.docx' },
  { rok: 2014, nazev: 'Zasedání správní rady, únor 2014', soubor: 'zapis-spravni-rada-2014.docx' },
  { rok: 2013, nazev: 'Vánoční setkání – mikulášské posezení', soubor: 'zapis-mikulasske-posezeni-2013.docx' },
  { rok: 2012, nazev: 'Valná hromada 5. 12. 2012', soubor: 'zapis-valna-hromada-2012.doc' },
];

// Materiály do výuky, které členové sdílejí pro kolegy. Nový soubor stačí přidat
// do public/soubory/ a sem doplnit řádek.
export const materialy = [
  { tema: 'Občanská válka v USA', nazev: 'Výklad a úkoly k tématu', soubor: 'obcanska-valka-v-usa-vyklad-a-ukoly.docx' },
  { tema: 'Občanská válka v USA', nazev: 'Řešení úkolů', soubor: 'obcanska-valka-v-usa-reseni.docx' },
];

// Výroční zprávy: až je klub bude mít, přidejte soubor do public/soubory/
// a řádek { rok: 2025, soubor: 'vyrocni-zprava-2025.pdf' }. Prázdný seznam
// zobrazí v Dokumentech poznámku, že se zprávy připravují.
export const vyrocniZpravy: { rok: number; soubor: string }[] = [];

/* ── Údaje k doplnění ──────────────────────────────────────────────────────
   Dokud jsou prázdné (null / []), ukazuje web na jejich místě viditelné
   „doplnit“. Nikdy tam nesmí být vymyšlené číslo, cena ani citace. */

// Počet členů klubu – doplňte číslo, např. 45.
export const pocetClenu: number | null = null;

// Ceník. Doplňte cenu jako text, např. '300 Kč' nebo 'od 9 000 Kč'.
export const cenik: { co: string; pozn: string; cena: string | null }[] = [
  { co: 'Členský příspěvek', pozn: 'na kalendářní rok', cena: null },
  { co: 'Zahraniční exkurze – člen', pozn: 'orientačně, podle destinace', cena: null },
  { co: 'Zahraniční exkurze – nečlen', pozn: 'orientačně', cena: null },
];

// Ohlasy účastníků. Doplňte { text: 'citace', kdo: 'Ředitelka MŠ, Brno – Lublaň 2025' }.
export const ohlasy: { text: string; kdo: string }[] = [];

// Partneři. Logo (480 × 160 px) uložte do public/obrazky/partneri/ a uveďte název souboru.
export const partneri: { nazev: string; logo?: string }[] = [];

const mesice = ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];
export const datum = (d: Date) => `${d.getUTCDate()}. ${mesice[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const pripona = (s: string) => (s.split('.').pop() || '').toUpperCase();
