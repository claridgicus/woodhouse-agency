import { getCaseStudies } from '$lib/content';

export const prerender = true;

export async function load() {
	return { studies: await getCaseStudies() };
}
