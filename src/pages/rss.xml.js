import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const vse = (await getCollection('aktuality')).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: `${site.nazev} – aktuality`,
    description: site.popis,
    site: context.site,
    items: vse.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.perex,
      link: `/aktuality/${n.id}/`,
    })),
    customData: '<language>cs</language>',
  });
}
