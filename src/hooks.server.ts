import type { Handle } from '@sveltejs/kit';
import { SITE } from '$lib/site';

// Raw markdown content, bundled at build time by Vite
const blogRaw = import.meta.glob('/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const caseStudiesRaw = import.meta.glob('/content/case-studies/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const landingPagesRaw = import.meta.glob('/content/landing-pages/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

// Metadata for listing pages
const blogMeta = import.meta.glob('/content/blog/*.md', { eager: true }) as Record<
	string,
	{ metadata: Record<string, string> }
>;
const caseStudiesMeta = import.meta.glob('/content/case-studies/*.md', {
	eager: true
}) as Record<string, { metadata: Record<string, string> }>;

const BROWSER_UA = [/mozilla/i, /chrome/i, /safari/i, /firefox/i, /edge/i, /opera/i];
const AGENT_UA = [
	/claude/i,
	/gpt/i,
	/openai/i,
	/anthropic/i,
	/llm/i,
	/bot/i,
	/crawler/i,
	/spider/i,
	/python-requests/i,
	/httpx/i,
	/aiohttp/i,
	/go-http/i,
	/curl/i,
	/wget/i,
	/axios/i,
	/fetch/i
];

function isAgentRequest(request: Request, url: URL): boolean {
	// Explicit markdown format request — searchParams restricted during prerendering
	try {
		if (url.searchParams.get('format') === 'markdown') return true;
	} catch {
		// Prerendering context — don't intercept
		return false;
	}

	const accept = request.headers.get('accept') ?? '';
	if (accept.includes('text/markdown')) return true;

	const ua = request.headers.get('user-agent') ?? '';
	if (!ua) return false; // No UA = prerender crawler, not a real agent request

	if (AGENT_UA.some((p) => p.test(ua))) return true;
	if (!BROWSER_UA.some((p) => p.test(ua))) return true; // Non-browser UA

	return false;
}

function mdResponse(body: string): Response {
	return new Response(body, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

export const handle: Handle = async ({ event, resolve }) => {
	if (!isAgentRequest(event.request, event.url)) {
		return resolve(event);
	}

	const path = event.url.pathname.replace(/\/$/, '') || '/';

	// /blog/[slug]
	const blogSlug = path.match(/^\/blog\/([^/]+)$/)?.[1];
	if (blogSlug) {
		const raw = blogRaw[`/content/blog/${blogSlug}.md`];
		if (raw) return mdResponse(raw);
	}

	// /case-studies/[slug]
	const caseSlug = path.match(/^\/case-studies\/([^/]+)$/)?.[1];
	if (caseSlug) {
		const raw = caseStudiesRaw[`/content/case-studies/${caseSlug}.md`];
		if (raw) return mdResponse(raw);
	}

	// /lp/[slug]
	const lpSlug = path.match(/^\/lp\/([^/]+)$/)?.[1];
	if (lpSlug) {
		const raw = landingPagesRaw[`/content/landing-pages/${lpSlug}.md`];
		if (raw) return mdResponse(raw);
	}

	// /blog index
	if (path === '/blog') {
		const posts = Object.entries(blogMeta)
			.map(([p, mod]) => ({ slug: p.split('/').at(-1)!.replace(/\.md$/, ''), ...mod.metadata }))
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const lines = posts
			.map((p) => `## [${p.title}](/blog/${p.slug})\n\n${p.description}\n\n_${p.date}_`)
			.join('\n\n---\n\n');

		return mdResponse(`# Blog — ${SITE.name}\n\n${lines || 'No posts yet.'}`);
	}

	// /case-studies index
	if (path === '/case-studies') {
		const studies = Object.entries(caseStudiesMeta)
			.map(([p, mod]) => ({ slug: p.split('/').at(-1)!.replace(/\.md$/, ''), ...mod.metadata }))
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const lines = studies
			.map(
				(s) =>
					`## [${s.title}](/case-studies/${s.slug})\n\n**Client:** ${s.client} | **Industry:** ${s.industry}\n\n${s.description}`
			)
			.join('\n\n---\n\n');

		return mdResponse(`# Case Studies — ${SITE.name}\n\n${lines || 'No case studies yet.'}`);
	}

	// /partners
	if (path === '/partners') {
		return mdResponse(
			`# Partners — ${SITE.name}\n\n${SITE.name} works with a curated network of technology partners to deliver end-to-end AI agent solutions.\n\n**Contact:** ${SITE.partnersEmail}`
		);
	}

	// /services
	if (path === '/services') {
		return mdResponse(`# Services — ${SITE.name}

## AI Agent Strategy — From £15k

A 4-week engagement that maps your highest-leverage workflows, scores each for agent suitability, and delivers a board-ready ROI model and deployment roadmap.

- Workflow discovery and mapping
- Agent suitability scoring (47-point framework)
- Conservative and optimistic ROI modelling
- Prioritised deployment roadmap
- Board presentation deck

## Agent Build & Deployment — From £50k

End-to-end implementation of your first AI agent pipeline. We architect, build, test, and deploy — integrated with your existing systems.

- Multi-agent pipeline architecture
- Integration with your existing tech stack
- Human-in-the-loop escalation design
- Testing and QA against your workflows
- Production deployment and handover

## Productivity Measurement — From £10k

Ongoing instrumentation and reporting so you can show measurable ROI every quarter.

---

**Contact:** ${SITE.email}
`);
	}

	// / homepage
	if (path === '/') {
		return mdResponse(`# ${SITE.name}

> ${SITE.tagline}

${SITE.description}

## Services

- [AI Agent Strategy](/services#strategy) — Workflow mapping, business case, ROI modelling
- [Agent Build & Deployment](/services#build) — End-to-end implementation on your existing stack
- [Productivity Measurement](/services#measurement) — KPI instrumentation, board-ready reporting

## Key Stats

- 3× average output increase per employee
- 50+ enterprise clients served
- 90 days typical deployment time
- £2M+ average annual savings per client

## Content

- [Blog](/blog)
- [Case Studies](/case-studies)
- [Partners](/partners)

## Get Started

- [Book a discovery call](/lp/get-started)
- [ROI Calculator](/lp/roi-calculator)

**Contact:** ${SITE.email}
`);
	}

	// Unknown path — fall through to normal rendering
	return resolve(event);
};
