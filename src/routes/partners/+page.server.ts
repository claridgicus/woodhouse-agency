import { getPartners } from '$lib/content';

export const prerender = true;

export async function load() {
	return { partners: await getPartners() };
}
