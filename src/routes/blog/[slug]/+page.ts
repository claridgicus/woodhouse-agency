import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	try {
		const post = await import(`../../../../content/blog/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch {
		error(404, `Post "${params.slug}" not found`);
	}
}
