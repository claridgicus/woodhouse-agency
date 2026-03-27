<script lang="ts">
	import { SITE } from '$lib/site';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		canonicalUrl?: string;
		jsonLd?: Record<string, unknown>;
		noindex?: boolean;
	}

	let {
		title,
		description = SITE.description,
		image,
		type = 'website',
		canonicalUrl,
		jsonLd,
		noindex = false
	}: Props = $props();

	const fullTitle = $derived(title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`);
	const ogImage = $derived(image ?? `${SITE.url}/og-default.png`);
	const canonical = $derived(canonicalUrl ?? '');

	const orgSchema = {
		'@context': 'https://schema.org',
		'@type': SITE.org.type,
		name: SITE.org.name,
		description: SITE.org.description,
		url: SITE.url
	};
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex,nofollow" />
	{/if}
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImage} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:site_name" content={SITE.name} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={SITE.twitter} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd ?? orgSchema)}</script>`}
</svelte:head>
