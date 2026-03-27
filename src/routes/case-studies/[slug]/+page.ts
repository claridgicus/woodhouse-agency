import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	try {
		const cs = await import(`../../../../content/case-studies/${params.slug}.md`);
		return { content: cs.default, meta: cs.metadata };
	} catch {
		error(404, `Case study "${params.slug}" not found`);
	}
}
