import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

const layoutDir = fileURLToPath(new URL('./src/lib/layouts', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			smartypants: true,
			layout: {
				blog: `${layoutDir}/BlogPost.svelte`,
				'case-study': `${layoutDir}/CaseStudy.svelte`
			}
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'warn',
			entries: ['*', '/robots.txt', '/sitemap.xml']
		}
	}
};

export default config;
