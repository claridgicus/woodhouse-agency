import adapter from '@sveltejs/adapter-static';
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
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'warn',
			entries: ['*', '/robots.txt', '/sitemap.xml', '/llms.txt']
		}
	}
};

export default config;
