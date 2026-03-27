import { SITE } from '$lib/site';
import { getBlogPosts, getCaseStudies, getPartners } from '$lib/content';

export const prerender = true;

const staticRoutes = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/services', priority: '0.9', changefreq: 'monthly' },
	{ path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
	{ path: '/blog', priority: '0.8', changefreq: 'daily' },
	{ path: '/partners', priority: '0.7', changefreq: 'monthly' },
	{ path: '/about', priority: '0.7', changefreq: 'monthly' },
	{ path: '/lp/get-started', priority: '0.9', changefreq: 'monthly' }
];

function urlEntry(loc: string, lastmod?: string, priority = '0.5', changefreq = 'monthly') {
	return `  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
	const [posts, caseStudies, partners] = await Promise.all([
		getBlogPosts(),
		getCaseStudies(),
		getPartners()
	]);

	const today = new Date().toISOString().split('T')[0];

	const entries = [
		...staticRoutes.map((r) => urlEntry(`${SITE.url}${r.path}`, today, r.priority, r.changefreq)),
		...posts.map((p) => urlEntry(`${SITE.url}/blog/${p.slug}`, p.date, '0.6', 'never')),
		...caseStudies.map((cs) => urlEntry(`${SITE.url}/case-studies/${cs.slug}`, cs.date, '0.7', 'never')),
		...partners.map((p) => urlEntry(`${SITE.url}/partners`, today, '0.5', 'monthly'))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
