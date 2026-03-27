<script lang="ts">
	import { page } from '$app/state';
	import { SITE } from '$lib/site';

	const links = [
		{ href: '/services', label: 'Services' },
		{ href: '/case-studies', label: 'Case Studies' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/partners', label: 'Partners' }
	];

	let mobileOpen = $state(false);
</script>

<header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
	<nav class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
		<a href="/" class="font-bold text-xl text-gray-900 hover:text-brand-600 transition-colors">
			{SITE.name}
		</a>

		<!-- Desktop nav -->
		<ul class="hidden md:flex items-center gap-6">
			{#each links as link}
				<li>
					<a
						href={link.href}
						class="text-sm font-medium transition-colors {page.url.pathname.startsWith(link.href)
							? 'text-brand-600'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<a
			href="/lp/get-started"
			class="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors"
		>
			Get Started
		</a>

		<!-- Mobile toggle -->
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
			aria-label="Toggle menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if mobileOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
			<ul class="flex flex-col gap-3 pt-4">
				{#each links as link}
					<li>
						<a
							href={link.href}
							onclick={() => (mobileOpen = false)}
							class="block text-sm font-medium text-gray-700 hover:text-brand-600"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li class="pt-2">
					<a
						href="/lp/get-started"
						class="block text-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg"
					>
						Get Started
					</a>
				</li>
			</ul>
		</div>
	{/if}
</header>
