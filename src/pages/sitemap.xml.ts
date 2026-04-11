import { getCollection } from 'astro:content';

export async function GET() {
  const allTracks = await getCollection('tracks');
  const domain = 'https://shouldirace.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/partner',
    '/100m-wind-correction-calculator'
  ];

  // Get unique country/region combinations that actually exist
  const countryRegionPairs = [...new Set(allTracks.map(t => `${t.data.country}/${t.data.region}`))];
  const countries = [...new Set(allTracks.map(t => t.data.country))];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${domain}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${countries.map(country => `
  <url>
    <loc>${domain}/${country}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${countryRegionPairs.map(pair => `
  <url>
    <loc>${domain}/${pair}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${allTracks.map(track => {
    const path = track.data.subRegion === 'all'
      ? `/${track.data.country}/${track.data.region}/${track.data.slug}`
      : `/${track.data.country}/${track.data.region}/${track.data.subRegion}/${track.data.slug}`;
    return `
  <url>
    <loc>${domain}${path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  }).join('')}
</urlset>`;

  return new Response(sitemap.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
