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
		<a href="/" class="flex items-center gap-2.5 group" aria-label="{SITE.name} home">
			<!-- Multiplier Mark logo -->
			<svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect width="32" height="32" rx="6" fill="#0d1b2a"/>
				<line x1="8" y1="22" x2="16" y2="14" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
				<line x1="16" y1="14" x2="24" y2="7" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"/>
				<circle cx="8" cy="22" r="3" fill="#818cf8"/>
				<circle cx="16" cy="14" r="3" fill="#4f46e5"/>
				<circle cx="24" cy="7" r="3.5" fill="white"/>
			</svg>
			<span class="font-bold text-lg text-gray-900 group-hover:text-brand-600 transition-colors">
				{SITE.name}
			</span>
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
