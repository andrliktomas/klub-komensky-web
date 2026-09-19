// Složí z dist/ jednosouborový náhled (všechny stránky v jednom HTML s mini-routerem).
// Slouží jen k rychlému ukázání designu mimo hosting; produkční web je normální dist/.
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const stranky = [];
(function projdi(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) projdi(p);
    else if (f.name === 'index.html') stranky.push(p);
  }
})(dist);

const styly = new Set();
const hlavni = [];
let hlavicka = '', paticka = '';
for (const p of stranky) {
  const html = fs.readFileSync(p, 'utf8');
  const url = '/' + path.relative(dist, path.dirname(p)).replace(/\\/g, '/') + '/';
  const cesta = url === '/./' || url === '//' ? '/' : url;
  for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) styly.add(fs.readFileSync(path.join(dist, m[1]), 'utf8'));
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styly.add(m[1]);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  hlavni.push(`<main data-cesta="${cesta}" data-titulek="${title}"${cesta === '/' ? ' id="obsah"' : ' hidden'}>${main}</main>`);
  if (cesta === '/') {
    hlavicka = html.match(/<header[\s\S]*?<\/header>/)[0];
    paticka = html.match(/<footer class="paticka[\s\S]*?<\/footer>\s*(?=<script|<\/body)/)[0];
  }
}
const css = [...styly].join('\n').replace(/@font-face\s*{[^}]*}/g, '');
const skripty = [];
for (const p of stranky) {
  const html = fs.readFileSync(p, 'utf8');
  const telo = html.slice(html.indexOf('<body'));
  for (const m of telo.matchAll(/<script(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) if (!skripty.includes(m[1])) skripty.push(m[1]);
}

const out = `<!doctype html>
<html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Klub Komenský – náhled nového webu</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Hanken+Grotesk:wght@400..700&display=swap">
<style>${css}
main[hidden]{display:none}
.nahled-info{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:99;background:#0a221d;color:#f6f5ef;border:1px solid #cba95f;font:500 .9rem/1.3 'Hanken Grotesk',system-ui,sans-serif;padding:.7rem 1rem;border-radius:2px;max-width:calc(100vw - 2rem);opacity:0;pointer-events:none;transition:opacity .2s}
.nahled-info[data-videt]{opacity:1}
</style></head><body>
<a class="preskocit" href="#obsah">Přeskočit na obsah</a>
${hlavicka}
${hlavni.join('\n')}
${paticka}
<div class="nahled-info" role="status"></div>
${skripty.map((s) => `<script>${s}</script>`).join('\n')}
<script>
(function(){
  var mains=[].slice.call(document.querySelectorAll('main[data-cesta]')),info=document.querySelector('.nahled-info'),t;
  function rekni(x){info.textContent=x;info.setAttribute('data-videt','');clearTimeout(t);t=setTimeout(function(){info.removeAttribute('data-videt')},2600)}
  function jdi(cesta,kotva){
    var cil=mains.filter(function(m){return m.dataset.cesta===cesta})[0]; if(!cil){rekni('Tato stránka v náhledu není.');return}
    mains.forEach(function(m){m.hidden=m!==cil;m.removeAttribute('id')}); cil.id='obsah'; document.title=cil.dataset.titulek;
    [].forEach.call(document.querySelectorAll('.menu a'),function(a){var h=a.getAttribute('href');if(cesta.indexOf(h)===0)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    var menu=document.getElementById('menu'),b=document.querySelector('.menu-spinac'); if(menu.hasAttribute('data-otevrene')){menu.removeAttribute('data-otevrene');b.setAttribute('aria-expanded','false');b.textContent='Menu'}
    var el=kotva&&document.getElementById(kotva); if(el)el.scrollIntoView();else window.scrollTo(0,0);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]'); if(!a)return; var h=a.getAttribute('href');
    if(h.indexOf('/soubory/')===0||h==='/rss.xml'){e.preventDefault();rekni('Soubory ke stažení budou až na ostrém webu.');return}
    if(h.charAt(0)==='/'){e.preventDefault();var c=h.split('#');jdi(c[0],c[1])}
    else if(h.charAt(0)==='#'&&h.length>1){var el=document.getElementById(h.slice(1));if(el){e.preventDefault();el.scrollIntoView()}}
  });
})();
</script>
</body></html>`;
fs.mkdirSync('nahled', { recursive: true });
fs.writeFileSync('nahled/index.html', out);
console.log('nahled/index.html', (out.length / 1024).toFixed(0) + ' kB,', hlavni.length, 'stránek');
