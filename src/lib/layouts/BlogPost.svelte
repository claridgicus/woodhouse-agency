<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SITE } from '$lib/site';
	import { formatDate } from '$lib/content';

	interface Props {
		title: string;
		description: string;
		date: string;
		author?: string;
		tags?: string[];
		image?: string;
		children?: import('svelte').Snippet;
	}

	let { title, description, date, author, tags = [], image, children }: Props = $props();

	const articleSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		datePublished: date,
		author: {
			'@type': 'Person',
			name: author ?? SITE.name
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url
		},
		...(image ? { image: `${SITE.url}${image}` } : {})
	});
</script>

<SEO {title} {description} {image} type="article" jsonLd={articleSchema} />

<article class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
	<header class="mb-10">
		{#if tags.length}
			<div class="flex flex-wrap gap-2 mb-4">
				{#each tags as tag}
					<span class="text-xs font-medium px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full">{tag}</span>
				{/each}
			</div>
		{/if}
		<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
		<p class="text-lg text-gray-500 mb-6">{description}</p>
		<div class="flex items-center gap-4 text-sm text-gray-400">
			{#if author}
				<span>{author}</span>
				<span>·</span>
			{/if}
			<time datetime={date}>{formatDate(date)}</time>
		</div>
	</header>

	{#if image}
		<img src={image} alt={title} class="w-full rounded-xl mb-10 aspect-video object-cover" />
	{/if}

	<div class="prose">
		{@render children?.()}
	</div>
</article>
