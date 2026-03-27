import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	try {
		const lp = await import(`../../../../content/landing-pages/${params.slug}.md`);
		return { content: lp.default, meta: lp.metadata };
	} catch {
		error(404, `Landing page "${params.slug}" not found`);
	}
}
