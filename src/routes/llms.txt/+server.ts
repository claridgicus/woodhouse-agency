import { SITE } from '$lib/site';
import { getBlogPosts, getCaseStudies } from '$lib/content';

export const prerender = true;

export async function GET() {
	const [posts, caseStudies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

	const blogLines = posts.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`).join('\n');
	const caseLines = caseStudies.map((cs) => `- [${cs.title}](${SITE.url}/case-studies/${cs.slug}): ${cs.description}`).join('\n');

	const body = `# ${SITE.name}

> ${SITE.description}

## About

${SITE.name} is an enterprise AI agent orchestration consultancy. We help organisations with 50+ knowledge workers implement autonomous AI agents that measurably reduce headcount-equivalent costs while multiplying output per employee.

## Services

- AI Agent Strategy: workflow mapping, business case, ROI modelling
- Agent Build & Deployment: end-to-end implementation on your existing stack
- Productivity Measurement: KPI instrumentation, board-ready reporting

## Blog Posts

${blogLines || 'No posts yet.'}

## Case Studies

${caseLines || 'No case studies yet.'}

## Contact

Email: ${SITE.email}
Website: ${SITE.url}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
