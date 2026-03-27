<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Blog" description="Thinking on enterprise AI, automation, and the future of knowledge work." />

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
	<header class="mb-14">
		<h1 class="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
		<p class="text-gray-500 text-lg">Thinking on enterprise AI, automation, and the future of work.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="text-gray-500">No posts yet — check back soon.</p>
	{:else}
		<ul class="divide-y divide-gray-100">
			{#each data.posts as post}
				<li class="py-8">
					<a href="/blog/{post.slug}" class="group block">
						<div class="flex flex-wrap gap-2 mb-2">
							{#each post.tags ?? [] as tag}
								<span class="text-xs font-medium px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full">{tag}</span>
							{/each}
						</div>
						<h2 class="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
							{post.title}
						</h2>
						<p class="text-gray-500 text-sm leading-relaxed mb-3">{post.description}</p>
						<time class="text-xs text-gray-400" datetime={post.date}>{formatDate(post.date)}</time>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
