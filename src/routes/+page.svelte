<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SITE } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const stats = [
		{ value: '3×', label: 'Average output increase per employee' },
		{ value: '50+', label: 'Enterprise clients served' },
		{ value: '90 days', label: 'Typical deployment time' },
		{ value: '£2M+', label: 'Average annual savings per client' }
	];

	const services = [
		{
			icon: '🤖',
			title: 'AI Agent Strategy',
			desc: 'We map your highest-leverage knowledge-worker workflows and identify where autonomous agents can replace manual effort — delivering a business case before a single line of code is written.'
		},
		{
			icon: '⚙️',
			title: 'Agent Build & Deployment',
			desc: 'End-to-end implementation of AI agent pipelines using battle-tested orchestration frameworks. We build, test, and deploy agents that run autonomously in your existing tech stack.'
		},
		{
			icon: '📈',
			title: 'Productivity Measurement',
			desc: 'We instrument every deployment with measurable KPIs — headcount equivalent, throughput, error rate — so you can report real ROI to your board.'
		}
	];
</script>

<SEO />

<!-- Hero -->
<section class="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-36 relative z-10">
		<div class="max-w-3xl">
			<p class="text-brand-200 text-sm font-semibold uppercase tracking-widest mb-4">Enterprise AI Agent Orchestration</p>
			<h1 class="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
				Make your best people 3× more productive
			</h1>
			<p class="text-lg sm:text-xl text-brand-100 mb-10 leading-relaxed">
				{SITE.description}
			</p>
			<div class="flex flex-col sm:flex-row gap-4">
				<a href="/lp/get-started" class="px-8 py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors text-center">
					Get a Free Assessment
				</a>
				<a href="/case-studies" class="px-8 py-4 border border-brand-300 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-center">
					See Case Studies
				</a>
			</div>
		</div>
	</div>
	<!-- Background pattern -->
	<div class="absolute inset-0 opacity-10" aria-hidden="true">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>
</section>

<!-- Stats -->
<section class="bg-gray-50 border-b border-gray-200">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
		{#each stats as stat}
			<div class="text-center">
				<p class="text-3xl sm:text-4xl font-extrabold text-brand-600 mb-1">{stat.value}</p>
				<p class="text-sm text-gray-500">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Services -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
	<div class="text-center mb-14">
		<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How we multiply your output</h2>
		<p class="text-gray-500 max-w-xl mx-auto">
			We handle strategy, build, and deployment — you get measurable productivity gains without the guesswork.
		</p>
	</div>
	<div class="grid md:grid-cols-3 gap-8">
		{#each services as svc}
			<div class="p-8 rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all">
				<div class="text-4xl mb-4">{svc.icon}</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
				<p class="text-gray-500 leading-relaxed">{svc.desc}</p>
			</div>
		{/each}
	</div>
	<div class="text-center mt-10">
		<a href="/services" class="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700">
			See all services →
		</a>
	</div>
</section>

<!-- Case Studies teaser -->
{#if data.caseStudies.length}
<section class="bg-gray-50 py-24">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="flex items-end justify-between mb-12">
			<div>
				<h2 class="text-3xl font-bold text-gray-900 mb-2">Real results, real enterprises</h2>
				<p class="text-gray-500">See how we've transformed knowledge-worker teams.</p>
			</div>
			<a href="/case-studies" class="text-brand-600 font-semibold hover:text-brand-700 hidden sm:block">
				All case studies →
			</a>
		</div>
		<div class="grid md:grid-cols-2 gap-8">
			{#each data.caseStudies.slice(0, 2) as cs}
				<a href="/case-studies/{cs.slug}" class="block p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
					<span class="text-xs font-semibold uppercase tracking-wider text-brand-600">{cs.industry}</span>
					<h3 class="text-xl font-bold text-gray-900 mt-2 mb-3">{cs.title}</h3>
					<p class="text-gray-500 text-sm leading-relaxed">{cs.description}</p>
					<p class="mt-4 text-sm font-semibold text-brand-600">Outcome: {cs.outcome}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- Blog teaser -->
{#if data.posts.length}
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
	<div class="flex items-end justify-between mb-12">
		<div>
			<h2 class="text-3xl font-bold text-gray-900 mb-2">From the blog</h2>
			<p class="text-gray-500">Thinking on enterprise AI, automation, and the future of work.</p>
		</div>
		<a href="/blog" class="text-brand-600 font-semibold hover:text-brand-700 hidden sm:block">All posts →</a>
	</div>
	<div class="grid md:grid-cols-3 gap-8">
		{#each data.posts.slice(0, 3) as post}
			<a href="/blog/{post.slug}" class="block group">
				<h3 class="text-lg font-bold text-gray-900 group-hover:text-brand-600 mb-2 transition-colors">{post.title}</h3>
				<p class="text-gray-500 text-sm leading-relaxed mb-3">{post.description}</p>
				<time class="text-xs text-gray-400" datetime={post.date}>
					{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
				</time>
			</a>
		{/each}
	</div>
</section>
{/if}

<!-- CTA -->
<section class="bg-brand-900 text-white py-24">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
		<h2 class="text-3xl sm:text-4xl font-bold mb-6">Ready to multiply your team's output?</h2>
		<p class="text-brand-200 mb-10 text-lg">
			We work with enterprises of 50+ knowledge workers. If that's you, let's talk.
		</p>
		<a href="/lp/get-started" class="px-10 py-4 bg-white text-brand-800 font-bold rounded-xl hover:bg-brand-50 transition-colors inline-block">
			Book a Free Assessment
		</a>
	</div>
</section>
