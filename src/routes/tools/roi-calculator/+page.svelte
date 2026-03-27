<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	// HubSpot form config — update portalId and formGuid after creating the form in HubSpot
	const HUBSPOT_PORTAL_ID = '00000000';
	const HUBSPOT_FORM_GUID = 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy';

	// Inputs
	let headcount = $state(50);
	let avgSalary = $state(60000);
	let automatablePct = $state(30);
	let implMonths = $state(6);
	let implementationCost = $state(75000);

	// Derived calculations
	const annualLaborCost = $derived(headcount * avgSalary);
	const annualTimeSavings = $derived(annualLaborCost * (automatablePct / 100));

	// Year 1: partial year after implementation
	const y1ActiveMonths = $derived(Math.max(0, 12 - implMonths));
	const y1Savings = $derived((annualTimeSavings / 12) * y1ActiveMonths);
	const y1Net = $derived(y1Savings - implementationCost);

	// Year 2 & 3: full year savings
	const y2Savings = $derived(annualTimeSavings);
	const y3Savings = $derived(annualTimeSavings);

	const totalSavings3yr = $derived(y1Savings + y2Savings + y3Savings);
	const totalCost = $derived(implementationCost);
	const roi3yr = $derived(totalCost > 0 ? Math.round(((totalSavings3yr - totalCost) / totalCost) * 100) : 0);

	// Payback period in months
	const monthlySavings = $derived(annualTimeSavings / 12);
	const paybackMonths = $derived(
		monthlySavings > 0 ? Math.ceil(implementationCost / monthlySavings) : null
	);

	function fmt(n: number) {
		return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
	}

	// Email gate
	let showEmailGate = $state(false);
	let email = $state('');
	let firstName = $state('');
	let company = $state('');
	let emailSubmitting = $state(false);
	let emailSubmitted = $state(false);
	let emailError = $state('');
	let pdfGenerating = $state(false);

	async function submitEmail() {
		emailError = '';
		if (!email || !firstName) {
			emailError = 'Please enter your first name and email.';
			return;
		}
		emailSubmitting = true;
		try {
			const res = await fetch(
				`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						fields: [
							{ name: 'firstname', value: firstName },
							{ name: 'email', value: email },
							{ name: 'company', value: company },
							{ name: 'roi_3yr', value: String(roi3yr) },
							{ name: 'annual_savings', value: String(Math.round(annualTimeSavings)) }
						],
						context: { pageUri: window.location.href, pageName: 'ROI Calculator' }
					})
				}
			);
			if (!res.ok) throw new Error('Submission failed');
			emailSubmitted = true;
			showEmailGate = false;
			await generatePdf();
		} catch {
			emailError = 'Something went wrong. Please try again.';
		} finally {
			emailSubmitting = false;
		}
	}

	async function generatePdf() {
		pdfGenerating = true;
		try {
			const { default: jsPDF } = await import('jspdf');
			const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
			const w = 210;
			const margin = 20;
			let y = 20;

			// Header
			doc.setFillColor(13, 27, 42);
			doc.rect(0, 0, w, 42, 'F');
			doc.setTextColor(255, 255, 255);
			doc.setFontSize(20);
			doc.setFont('helvetica', 'bold');
			doc.text('AI Agent ROI Report', margin, 20);
			doc.setFontSize(10);
			doc.setFont('helvetica', 'normal');
			doc.text(`${firstName}${company ? ' — ' + company : ''}`, margin, 30);
			doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), margin, 37);
			y = 58;

			// Headline metrics
			const metrics = [
				{ label: '3-Year ROI', value: `${roi3yr}%` },
				{ label: 'Payback Period', value: paybackMonths ? `${paybackMonths} months` : 'N/A' },
				{ label: 'Annual Savings', value: fmt(annualTimeSavings) },
				{ label: '3-Year Net Savings', value: fmt(totalSavings3yr - totalCost) }
			];

			const boxW = (w - margin * 2 - 10) / 2;
			metrics.forEach((m, i) => {
				const col = i % 2;
				const row = Math.floor(i / 2);
				const x = margin + col * (boxW + 10);
				const boxY = y + row * 28;
				doc.setFillColor(col === 0 ? 79 : 240, col === 0 ? 70 : 240, col === 0 ? 229 : 250);
				doc.roundedRect(x, boxY, boxW, 22, 3, 3, 'F');
				doc.setTextColor(col === 0 ? 255 : 13, col === 0 ? 255 : 27, col === 0 ? 255 : 42);
				doc.setFontSize(14);
				doc.setFont('helvetica', 'bold');
				doc.text(m.value, x + 6, boxY + 10);
				doc.setFontSize(8);
				doc.setFont('helvetica', 'normal');
				doc.text(m.label, x + 6, boxY + 17);
			});
			y += 70;

			// Inputs used
			doc.setTextColor(13, 27, 42);
			doc.setFontSize(12);
			doc.setFont('helvetica', 'bold');
			doc.text('Assumptions', margin, y);
			y += 8;
			const inputs = [
				['Knowledge workers', String(headcount)],
				['Average annual salary', fmt(avgSalary)],
				['Automatable time', `${automatablePct}%`],
				['Implementation timeline', `${implMonths} months`],
				['Implementation investment', fmt(implementationCost)]
			];
			for (const [label, val] of inputs) {
				doc.setFontSize(9);
				doc.setFont('helvetica', 'normal');
				doc.setTextColor(80, 80, 80);
				doc.text(`${label}:`, margin, y);
				doc.setFont('helvetica', 'bold');
				doc.setTextColor(13, 27, 42);
				doc.text(val, margin + 70, y);
				y += 7;
			}
			y += 6;

			// Year-by-year
			doc.setFontSize(12);
			doc.setFont('helvetica', 'bold');
			doc.setTextColor(13, 27, 42);
			doc.text('Year-by-Year Savings', margin, y);
			y += 8;
			const years = [
				{ label: 'Year 1', savings: y1Savings, net: y1Net },
				{ label: 'Year 2', savings: y2Savings, net: y2Savings },
				{ label: 'Year 3', savings: y3Savings, net: y3Savings }
			];
			for (const yr of years) {
				doc.setFontSize(9);
				doc.setFont('helvetica', 'normal');
				doc.setTextColor(80, 80, 80);
				doc.text(`${yr.label}: Gross savings ${fmt(yr.savings)}, Net ${fmt(yr.net)}`, margin, y);
				y += 7;
			}
			y += 6;

			// CTA
			doc.setFillColor(79, 70, 229);
			doc.rect(margin, y, w - margin * 2, 25, 'F');
			doc.setTextColor(255, 255, 255);
			doc.setFontSize(11);
			doc.setFont('helvetica', 'bold');
			doc.text('Want us to validate this model for your organisation?', margin + 5, y + 9);
			doc.setFontSize(9);
			doc.setFont('helvetica', 'normal');
			doc.text('Book a free discovery call: woodhouseagency.com/tools/book', margin + 5, y + 18);

			doc.save(`woodhouse-roi-report-${firstName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
		} finally {
			pdfGenerating = false;
		}
	}
</script>

<SEO
	title="AI Agent ROI Calculator | Woodhouse Agency"
	description="Calculate the 3-year ROI of deploying AI agents in your enterprise. Free interactive calculator — get a personalised PDF report in under 2 minutes."
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">

	<!-- Header -->
	<div class="text-center mb-12">
		<span class="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">Free Tool</span>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">AI Agent ROI Calculator</h1>
		<p class="text-gray-500 text-lg max-w-xl mx-auto">
			Model the 3-year return on deploying AI agents across your knowledge workforce. Adjust the inputs and see your payback period instantly.
		</p>
	</div>

	<div class="grid lg:grid-cols-2 gap-10">

		<!-- Inputs panel -->
		<div class="space-y-6">
			<h2 class="text-lg font-bold text-gray-900">Your inputs</h2>

			<div>
				<label for="headcount" class="block text-sm font-semibold text-gray-700 mb-1">
					Knowledge workers
					<span class="font-normal text-gray-400 ml-1">({headcount})</span>
				</label>
				<input id="headcount" type="range" min="10" max="5000" step="10" bind:value={headcount} class="w-full accent-brand-600" />
				<div class="flex justify-between text-xs text-gray-400 mt-0.5"><span>10</span><span>5,000</span></div>
			</div>

			<div>
				<label for="avg-salary" class="block text-sm font-semibold text-gray-700 mb-1">
					Average annual salary
					<span class="font-normal text-gray-400 ml-1">({fmt(avgSalary)})</span>
				</label>
				<input id="avg-salary" type="range" min="20000" max="200000" step="5000" bind:value={avgSalary} class="w-full accent-brand-600" />
				<div class="flex justify-between text-xs text-gray-400 mt-0.5"><span>{fmt(20000)}</span><span>{fmt(200000)}</span></div>
			</div>

			<div>
				<label for="automatable-pct" class="block text-sm font-semibold text-gray-700 mb-1">
					Automatable time
					<span class="font-normal text-gray-400 ml-1">({automatablePct}%)</span>
				</label>
				<input id="automatable-pct" type="range" min="5" max="80" step="5" bind:value={automatablePct} class="w-full accent-brand-600" />
				<div class="flex justify-between text-xs text-gray-400 mt-0.5"><span>5%</span><span>80%</span></div>
				<p class="text-xs text-gray-400 mt-1">Industry benchmark for knowledge workers: 20–40%</p>
			</div>

			<div>
				<label for="impl-months" class="block text-sm font-semibold text-gray-700 mb-1">
					Implementation timeline
					<span class="font-normal text-gray-400 ml-1">({implMonths} months)</span>
				</label>
				<input id="impl-months" type="range" min="1" max="18" step="1" bind:value={implMonths} class="w-full accent-brand-600" />
				<div class="flex justify-between text-xs text-gray-400 mt-0.5"><span>1 month</span><span>18 months</span></div>
			</div>

			<div>
				<label class="block text-sm font-semibold text-gray-700 mb-1" for="impl-cost">
					Implementation investment (£)
				</label>
				<input
					id="impl-cost"
					type="number"
					bind:value={implementationCost}
					min="0"
					step="5000"
					class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
				/>
				<p class="text-xs text-gray-400 mt-1">Woodhouse Agency engagements start from £50k</p>
			</div>
		</div>

		<!-- Results panel -->
		<div class="space-y-4">
			<h2 class="text-lg font-bold text-gray-900">Your results</h2>

			<div class="grid grid-cols-2 gap-4">
				<div class="p-5 rounded-2xl bg-brand-600 text-white">
					<p class="text-3xl font-extrabold">{roi3yr}%</p>
					<p class="text-sm text-brand-200 mt-1">3-Year ROI</p>
				</div>
				<div class="p-5 rounded-2xl bg-brand-50 border border-brand-200">
					<p class="text-3xl font-extrabold text-brand-700">
						{paybackMonths ? paybackMonths + ' mo' : '–'}
					</p>
					<p class="text-sm text-brand-500 mt-1">Payback period</p>
				</div>
			</div>

			<div class="p-5 rounded-2xl border border-gray-200 bg-white">
				<p class="text-sm font-semibold text-gray-500 mb-3">Year-by-year savings</p>
				<div class="space-y-3">
					{#each [
						{ label: 'Year 1', val: y1Savings, net: y1Net },
						{ label: 'Year 2', val: y2Savings, net: y2Savings },
						{ label: 'Year 3', val: y3Savings, net: y3Savings }
					] as yr}
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium text-gray-700">{yr.label}</span>
								<span class="text-gray-900 font-semibold">{fmt(yr.val)}</span>
							</div>
							<div class="w-full bg-gray-100 rounded-full h-1.5">
								<div
									class="bg-brand-500 h-1.5 rounded-full"
									style="width:{Math.min(100, (yr.val / annualTimeSavings) * 100)}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
				<div class="border-t border-gray-100 mt-4 pt-4 flex justify-between">
					<span class="text-sm font-semibold text-gray-700">Total 3-year savings</span>
					<span class="text-sm font-bold text-brand-700">{fmt(totalSavings3yr)}</span>
				</div>
				<div class="flex justify-between mt-1">
					<span class="text-sm text-gray-500">Net after investment</span>
					<span class="text-sm font-semibold {totalSavings3yr - totalCost >= 0 ? 'text-success' : 'text-error'}">{fmt(totalSavings3yr - totalCost)}</span>
				</div>
			</div>

			<div class="p-5 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
				<p class="font-semibold text-gray-700 mb-1">Assumptions</p>
				<ul class="space-y-1">
					<li>Annual labour cost: {fmt(annualLaborCost)}</li>
					<li>Annual time savings: {fmt(annualTimeSavings)}</li>
					<li>Y1 active months post-implementation: {y1ActiveMonths}</li>
				</ul>
			</div>

			<!-- Download / Email gate -->
			{#if !emailSubmitted}
				<button
					onclick={() => (showEmailGate = true)}
					class="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
				>
					Download PDF Report →
				</button>
			{:else}
				<div class="p-5 rounded-2xl border border-green-200 bg-green-50 text-center">
					<p class="text-green-700 font-semibold">✓ Report downloaded!</p>
					{#if pdfGenerating}
						<p class="text-sm text-gray-400 mt-1">Generating PDF…</p>
					{/if}
					<a href="/tools/book" class="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
						Book a free discovery call →
					</a>
				</div>
			{/if}

			<p class="text-xs text-gray-400 text-center">
				This model is illustrative. Actual ROI depends on workflow complexity, data quality, and team adoption. <a href="/tools/book" class="underline">Talk to us</a> for a bespoke analysis.
			</p>
		</div>
	</div>
</div>

<!-- Email gate modal -->
{#if showEmailGate}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
		<div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
			<h2 class="text-xl font-bold text-gray-900 mb-2">Get your PDF report</h2>
			<p class="text-gray-500 text-sm mb-6">Enter your details and we'll generate your personalised ROI report instantly.</p>
			<div class="space-y-4">
				<div>
					<label for="modal-first-name" class="text-sm font-medium text-gray-700 block mb-1">First name *</label>
					<input
						id="modal-first-name"
						type="text"
						bind:value={firstName}
						placeholder="Jane"
						class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
					/>
				</div>
				<div>
					<label for="modal-email" class="text-sm font-medium text-gray-700 block mb-1">Work email *</label>
					<input
						id="modal-email"
						type="email"
						bind:value={email}
						placeholder="jane@company.com"
						class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
					/>
				</div>
				<div>
					<label for="modal-company" class="text-sm font-medium text-gray-700 block mb-1">Company (optional)</label>
					<input
						id="modal-company"
						type="text"
						bind:value={company}
						placeholder="Acme Corp"
						class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
					/>
				</div>
				{#if emailError}
					<p class="text-error text-sm">{emailError}</p>
				{/if}
				<button
					onclick={submitEmail}
					disabled={emailSubmitting}
					class="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
				>
					{emailSubmitting ? 'Submitting…' : 'Download My Report →'}
				</button>
				<button
					onclick={() => (showEmailGate = false)}
					class="w-full py-2 text-sm text-gray-400 hover:text-gray-600"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
