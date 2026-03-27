<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import CalEmbed from '$lib/components/CalEmbed.svelte';
</script>

<SEO
	title="Book a Discovery Call | Woodhouse Agency"
	description="Book a free 30-minute discovery call with the Woodhouse Agency team. We'll map your highest-leverage AI opportunities and share a no-obligation roadmap."
/>

<div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
	<div class="text-center mb-12">
		<span class="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">Free 30 minutes</span>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Book a Discovery Call</h1>
		<p class="text-gray-500 text-lg max-w-xl mx-auto">
			Walk us through your biggest knowledge-worker bottlenecks. We'll identify which are agent-ready and share a no-obligation roadmap.
		</p>
	</div>

	<div class="grid sm:grid-cols-3 gap-6 mb-10">
		{#each [
			{ icon: '🗺️', title: 'Workflow mapping', desc: 'We identify your top 3 agent-ready processes.' },
			{ icon: '📊', title: 'ROI estimate', desc: 'You leave with a realistic savings projection.' },
			{ icon: '🤝', title: 'No obligation', desc: 'No pitch, no pressure. Just useful advice.' }
		] as item}
			<div class="p-5 rounded-2xl border border-gray-200 text-center">
				<p class="text-3xl mb-3">{item.icon}</p>
				<p class="font-semibold text-gray-900 mb-1">{item.title}</p>
				<p class="text-sm text-gray-500">{item.desc}</p>
			</div>
		{/each}
	</div>

	<CalEmbed calLink="woodhouse-agency/discovery" namespace="discovery" />

	<p class="text-xs text-gray-400 text-center mt-6">
		Prefer email? Reach us at <a href="mailto:hello@woodhouseagency.com" class="underline text-brand-500">hello@woodhouseagency.com</a>
	</p>
</div>
