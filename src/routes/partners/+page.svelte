<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SITE } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Partners" description="Our network of technology and implementation partners delivering enterprise AI solutions." />

<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
	<header class="mb-14 text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-3">Our Partners</h1>
		<p class="text-gray-500 text-lg max-w-xl mx-auto">
			We work with best-in-class technology providers to deliver AI agent solutions your enterprise can trust.
		</p>
	</header>

	{#if data.partners.length === 0}
		<p class="text-center text-gray-500">Partner information coming soon.</p>
	{:else}
		<div class="grid md:grid-cols-3 gap-8">
			{#each data.partners as partner}
				<div class="p-8 rounded-2xl border border-gray-200 hover:border-brand-200 hover:shadow-md transition-all text-center">
					{#if partner.logo}
						<img src={partner.logo} alt="{partner.name} logo" class="h-12 mx-auto mb-4 object-contain" />
					{/if}
					<h2 class="text-lg font-bold text-gray-900 mb-2">{partner.name}</h2>
					<p class="text-gray-500 text-sm leading-relaxed mb-4">{partner.description}</p>
					{#if partner.url}
						<a href={partner.url} target="_blank" rel="noopener noreferrer" class="text-brand-600 text-sm font-medium hover:text-brand-700">
							Learn more →
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Partner CTA -->
	<div class="mt-20 text-center p-12 bg-brand-50 rounded-3xl border border-brand-100">
		<h2 class="text-2xl font-bold text-gray-900 mb-3">Become a Partner</h2>
		<p class="text-gray-500 mb-6 max-w-lg mx-auto">
			If you're a technology provider or consultancy serving enterprise clients, we'd love to explore how we can deliver better outcomes together.
		</p>
		<a href="mailto:{SITE.partnersEmail}" class="px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors inline-block">
			Get in Touch
		</a>
	</div>
</div>
