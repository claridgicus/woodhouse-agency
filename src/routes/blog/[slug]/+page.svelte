<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	// The layout (BlogPost.svelte) is applied by MDsveX via frontmatter `layout: blog`
</script>

<data.content />
