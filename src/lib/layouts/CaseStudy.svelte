<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SITE } from '$lib/site';
	import { formatDate } from '$lib/content';

	interface Props {
		title: string;
		description: string;
		date: string;
		client: string;
		industry: string;
		outcome: string;
		image?: string;
		children?: import('svelte').Snippet;
	}

	let { title, description, date, client, industry, outcome, image, children }: Props = $props();

	const caseStudySchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		datePublished: date,
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url
		}
	});
</script>

<SEO {title} {description} {image} type="article" jsonLd={caseStudySchema} />

<article class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
	<header class="mb-10">
		<span class="text-xs font-semibold uppercase tracking-wider text-brand-600">{industry}</span>
		<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">{title}</h1>
		<p class="text-lg text-gray-500 mb-6">{description}</p>

		<div class="grid sm:grid-cols-3 gap-4 p-6 bg-brand-50 rounded-xl border border-brand-100">
			<div>
				<p class="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-1">Client</p>
				<p class="font-semibold text-gray-900">{client}</p>
			</div>
			<div>
				<p class="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-1">Industry</p>
				<p class="font-semibold text-gray-900">{industry}</p>
			</div>
			<div>
				<p class="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-1">Key Outcome</p>
				<p class="font-semibold text-gray-900">{outcome}</p>
			</div>
		</div>
	</header>

	{#if image}
		<img src={image} alt={title} class="w-full rounded-xl mb-10 aspect-video object-cover" />
	{/if}

	<div class="prose">
		{@render children?.()}
	</div>
</article>
