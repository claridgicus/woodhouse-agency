<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Case Studies" description="See how we've helped enterprises implement AI agents that multiply knowledge-worker output." />

<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
	<header class="mb-14">
		<h1 class="text-4xl font-bold text-gray-900 mb-3">Case Studies</h1>
		<p class="text-gray-500 text-lg">Real results from real enterprise AI deployments.</p>
	</header>

	{#if data.studies.length === 0}
		<p class="text-gray-500">Case studies coming soon.</p>
	{:else}
		<div class="grid md:grid-cols-2 gap-8">
			{#each data.studies as cs}
				<a href="/case-studies/{cs.slug}" class="block p-8 bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all group">
					<span class="text-xs font-semibold uppercase tracking-wider text-brand-600">{cs.industry}</span>
					<h2 class="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-brand-600 transition-colors">{cs.title}</h2>
					<p class="text-gray-500 text-sm leading-relaxed mb-4">{cs.description}</p>
					<div class="flex items-center justify-between text-sm">
						<span class="font-semibold text-brand-600">Outcome: {cs.outcome}</span>
						<time class="text-gray-400 text-xs" datetime={cs.date}>{formatDate(cs.date)}</time>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
