import { SITE } from '$lib/site';

export const prerender = true;

export function GET() {
	return new Response(
		`User-agent: *
Allow: /
Disallow: /lp/

Sitemap: ${SITE.url}/sitemap.xml
`,
		{ headers: { 'Content-Type': 'text/plain' } }
	);
}
