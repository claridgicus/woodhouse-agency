export interface PostMeta {
	title: string;
	description: string;
	date: string;
	author?: string;
	tags?: string[];
	image?: string;
	slug: string;
	layout?: string;
}

export interface CaseStudyMeta extends PostMeta {
	client: string;
	industry: string;
	outcome: string;
}

export interface PartnerMeta {
	name: string;
	description: string;
	logo?: string;
	url?: string;
	slug: string;
}

/** Load all blog posts sorted newest first */
export async function getBlogPosts(): Promise<PostMeta[]> {
	const modules = import.meta.glob('/content/blog/*.md', { eager: true });
	const posts: PostMeta[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const m = mod as { metadata: Omit<PostMeta, 'slug'> };
		const slug = path.split('/').at(-1)!.replace(/\.md$/, '');
		posts.push({ ...m.metadata, slug });
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Load all case studies sorted newest first */
export async function getCaseStudies(): Promise<CaseStudyMeta[]> {
	const modules = import.meta.glob('/content/case-studies/*.md', { eager: true });
	const studies: CaseStudyMeta[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const m = mod as { metadata: Omit<CaseStudyMeta, 'slug'> };
		const slug = path.split('/').at(-1)!.replace(/\.md$/, '');
		studies.push({ ...m.metadata, slug });
	}

	return studies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Load all partners */
export async function getPartners(): Promise<PartnerMeta[]> {
	const modules = import.meta.glob('/content/partners/*.md', { eager: true });
	const partners: PartnerMeta[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const m = mod as { metadata: Omit<PartnerMeta, 'slug'> };
		const slug = path.split('/').at(-1)!.replace(/\.md$/, '');
		partners.push({ ...m.metadata, slug });
	}

	return partners;
}

/** Format a date string to human-readable */
export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
