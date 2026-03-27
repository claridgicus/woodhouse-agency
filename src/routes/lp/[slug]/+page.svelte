<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title={data.meta?.title} description={data.meta?.description} noindex={data.meta?.noindex ?? false} />

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
	<div class="prose max-w-none">
		<data.content />
	</div>
</div>
