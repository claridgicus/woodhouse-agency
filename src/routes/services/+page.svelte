<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const services = [
		{
			icon: '🗺️',
			title: 'AI Agent Strategy',
			price: 'From £15k',
			desc: 'A 4-week engagement that maps your highest-leverage workflows, scores each for agent suitability, and delivers a board-ready ROI model and deployment roadmap.',
			bullets: [
				'Workflow discovery and mapping',
				'Agent suitability scoring (47-point framework)',
				'Conservative and optimistic ROI modelling',
				'Prioritised deployment roadmap',
				'Board presentation deck'
			]
		},
		{
			icon: '⚙️',
			title: 'Agent Build & Deployment',
			price: 'From £50k',
			desc: 'End-to-end implementation of your first AI agent pipeline. We architect, build, test, and deploy — integrated with your existing systems.',
			bullets: [
				'Multi-agent pipeline architecture',
				'Integration with your existing tech stack',
				'Human-in-the-loop escalation design',
				'Testing and QA against your workflows',
				'Production deployment and handover'
			]
		},
		{
			icon: '📊',
			title: 'Ongoing Optimisation',
			price: 'From £8k/month',
			desc: 'After deployment, agents need tuning. We monitor performance, retrain on edge cases, and continuously improve coverage and accuracy.',
			bullets: [
				'Monthly performance reporting',
				'Edge case analysis and retraining',
				'Coverage and accuracy improvement',
				'New workflow identification',
				'Quarterly board reporting'
			]
		}
	];
</script>

<SEO title="Services" description="Enterprise AI agent strategy, build, and deployment. We handle everything from workflow mapping to production deployment." />

<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
	<header class="text-center mb-20">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
		<p class="text-gray-500 text-lg max-w-2xl mx-auto">
			We work with enterprises of 50+ knowledge workers to implement AI agents that deliver measurable, board-reportable productivity gains.
		</p>
	</header>

	<div class="grid md:grid-cols-3 gap-8 mb-20">
		{#each services as svc}
			<div class="flex flex-col p-8 rounded-2xl border-2 border-gray-200 hover:border-brand-400 transition-all">
				<div class="text-4xl mb-4">{svc.icon}</div>
				<h2 class="text-xl font-bold text-gray-900 mb-1">{svc.title}</h2>
				<p class="text-brand-600 font-semibold text-sm mb-4">{svc.price}</p>
				<p class="text-gray-500 text-sm leading-relaxed mb-6">{svc.desc}</p>
				<ul class="space-y-2 mt-auto">
					{#each svc.bullets as bullet}
						<li class="flex items-start gap-2 text-sm text-gray-600">
							<span class="text-brand-500 mt-0.5">✓</span>
							{bullet}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="text-center p-14 bg-gradient-to-br from-brand-900 to-brand-700 rounded-3xl text-white">
		<h2 class="text-3xl font-bold mb-4">Not sure where to start?</h2>
		<p class="text-brand-200 mb-8 max-w-lg mx-auto">
			Most clients begin with a Strategy engagement. It gives you the data to make the right build decision — and pays for itself in the first deployment.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/tools/book" class="px-8 py-4 bg-white text-brand-800 font-bold rounded-xl hover:bg-brand-50 transition-colors inline-block">
				Book a Free Discovery Call
			</a>
			<a href="/tools/roi-calculator" class="px-8 py-4 border border-brand-400 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors inline-block">
				Calculate Your ROI →
			</a>
		</div>
	</div>
</div>
