import { getBlogPosts, getCaseStudies } from '$lib/content';

export const prerender = true;

export async function load() {
	const [posts, caseStudies] = await Promise.all([getBlogPosts(), getCaseStudies()]);
	return { posts, caseStudies };
}
