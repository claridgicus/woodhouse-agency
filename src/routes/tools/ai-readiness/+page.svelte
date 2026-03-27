<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const questions: { id: number; category: string; text: string }[] = [
		// Data & Infrastructure (4 questions)
		{ id: 1, category: 'Data & Infrastructure', text: 'How structured and accessible is your organisation\'s data (CRM, ERP, documents)?' },
		{ id: 2, category: 'Data & Infrastructure', text: 'Do you have APIs or integrations connecting your key business systems?' },
		{ id: 3, category: 'Data & Infrastructure', text: 'How confident are you in the quality and consistency of your business data?' },
		{ id: 4, category: 'Data & Infrastructure', text: 'Does your organisation have dedicated IT or data engineering capacity?' },
		// Process Maturity (4 questions)
		{ id: 5, category: 'Process Maturity', text: 'How well-documented are your core knowledge-worker workflows?' },
		{ id: 6, category: 'Process Maturity', text: 'Do your teams follow repeatable, rule-based processes that could be described step-by-step?' },
		{ id: 7, category: 'Process Maturity', text: 'How much time do employees spend on high-volume, repetitive decision-making tasks?' },
		{ id: 8, category: 'Process Maturity', text: 'Are your processes relatively stable, or do they change frequently?' },
		// Leadership & Culture (4 questions)
		{ id: 9, category: 'Leadership & Culture', text: 'How strong is executive sponsorship for AI and automation initiatives?' },
		{ id: 10, category: 'Leadership & Culture', text: 'Is there a clear owner or champion for AI/digital transformation in your organisation?' },
		{ id: 11, category: 'Leadership & Culture', text: 'How open is your workforce to adopting new AI-assisted tools and workflows?' },
		{ id: 12, category: 'Leadership & Culture', text: 'Has leadership clearly communicated a vision for how AI will benefit employees?' },
		// Technical Capability (4 questions)
		{ id: 13, category: 'Technical Capability', text: 'Does your organisation currently use any AI or machine learning tools?' },
		{ id: 14, category: 'Technical Capability', text: 'How capable is your internal team at evaluating and integrating new software?' },
		{ id: 15, category: 'Technical Capability', text: 'Do you have the budget and appetite for a 6–12 month AI transformation programme?' },
		{ id: 16, category: 'Technical Capability', text: 'Is your current tech stack cloud-based or easily accessible via APIs?' },
		// Workforce Readiness (4 questions)
		{ id: 17, category: 'Workforce Readiness', text: 'How digitally proficient are your knowledge workers on average?' },
		{ id: 18, category: 'Workforce Readiness', text: 'Do employees already use AI tools (e.g. ChatGPT, Copilot) in their daily work?' },
		{ id: 19, category: 'Workforce Readiness', text: 'How much time could be freed up if routine tasks were automated (per person per week)?' },
		{ id: 20, category: 'Workforce Readiness', text: 'Are there clear KPIs or performance metrics your teams track regularly?' }
	];

	const options = [
		{ value: 0, label: 'Not at all' },
		{ value: 1, label: 'Very little' },
		{ value: 2, label: 'Somewhat' },
		{ value: 3, label: 'Moderately' },
		{ value: 4, label: 'Quite a lot' },
		{ value: 5, label: 'Fully / Very much' }
	];

	const QUESTIONS_PER_PAGE = 4;

	let answers = $state<Record<number, number>>({});
	let currentPage = $state(0);
	let showResults = $state(false);
	let email = $state('');
	let firstName = $state('');
	let company = $state('');
	let emailSubmitting = $state(false);
	let emailSubmitted = $state(false);
	let emailError = $state('');
	let pdfGenerating = $state(false);

	const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
	const pageQuestions = $derived(
		questions.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE)
	);
	const allCurrentAnswered = $derived(pageQuestions.every((q) => answers[q.id] !== undefined));
	const progress = $derived(Math.round((Object.keys(answers).length / questions.length) * 100));

	const totalScore = $derived(
		Object.values(answers).reduce((sum, v) => sum + v, 0)
	);
	const maxScore = questions.length * 5; // 100
	const percentScore = $derived(Math.round((totalScore / maxScore) * 100));

	const readinessLevel = $derived(
		percentScore >= 70
			? { label: 'High Readiness', colour: 'text-success', bg: 'bg-green-50 border-green-200', recommendation: 'Your organisation is well-positioned to deploy AI agents at scale. We recommend starting with a focused Agent Build engagement targeting your highest-leverage workflow.' }
			: percentScore >= 40
			? { label: 'Medium Readiness', colour: 'text-warning', bg: 'bg-amber-50 border-amber-200', recommendation: 'You have solid foundations but gaps in data, process, or culture that need addressing first. An AI Agent Strategy engagement will map exactly what needs fixing before you build.' }
			: { label: 'Early Stage', colour: 'text-error', bg: 'bg-red-50 border-red-200', recommendation: 'Your organisation needs foundational work before deploying AI agents. Start with a Strategy engagement to identify the quickest wins and build the right foundations.' }
	);

	const categoryScores = $derived(() => {
		const cats: Record<string, { total: number; max: number }> = {};
		for (const q of questions) {
			if (!cats[q.category]) cats[q.category] = { total: 0, max: 0 };
			cats[q.category].max += 5;
			cats[q.category].total += answers[q.id] ?? 0;
		}
		return Object.entries(cats).map(([name, { total, max }]) => ({
			name,
			pct: Math.round((total / max) * 100)
		}));
	});

	function next() {
		if (currentPage < totalPages - 1) {
			currentPage++;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			showResults = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	function back() {
		if (currentPage > 0) currentPage--;
	}

	async function submitEmail() {
		emailError = '';
		if (!email || !firstName) {
			emailError = 'Please enter your first name and email.';
			return;
		}
		emailSubmitting = true;
		try {
			emailSubmitted = true;
			await generatePdf();
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

			// Title
			doc.setFillColor(13, 27, 42);
			doc.rect(0, 0, w, 40, 'F');
			doc.setTextColor(255, 255, 255);
			doc.setFontSize(22);
			doc.setFont('helvetica', 'bold');
			doc.text('AI Readiness Assessment', margin, 20);
			doc.setFontSize(11);
			doc.setFont('helvetica', 'normal');
			doc.text(`${firstName} — ${company || 'Your Organisation'}`, margin, 30);
			doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), margin, 37);
			y = 55;

			// Score
			doc.setTextColor(13, 27, 42);
			doc.setFontSize(14);
			doc.setFont('helvetica', 'bold');
			doc.text(`Overall Score: ${percentScore}/100 — ${readinessLevel.label}`, margin, y);
			y += 10;
			doc.setFontSize(10);
			doc.setFont('helvetica', 'normal');
			doc.setTextColor(80, 80, 80);
			const lines = doc.splitTextToSize(readinessLevel.recommendation, w - margin * 2) as string[];
			doc.text(lines, margin, y);
			y += lines.length * 5 + 10;

			// Category breakdown
			doc.setTextColor(13, 27, 42);
			doc.setFontSize(12);
			doc.setFont('helvetica', 'bold');
			doc.text('Category Breakdown', margin, y);
			y += 8;
			for (const cat of categoryScores()) {
				doc.setFont('helvetica', 'normal');
				doc.setFontSize(10);
				doc.setTextColor(60, 60, 60);
				doc.text(`${cat.name}: ${cat.pct}%`, margin, y);
				// Bar
				doc.setFillColor(220, 220, 235);
				doc.rect(margin + 60, y - 4, 80, 5, 'F');
				doc.setFillColor(79, 70, 229);
				doc.rect(margin + 60, y - 4, (cat.pct / 100) * 80, 5, 'F');
				y += 9;
			}
			y += 8;

			// CTA
			doc.setFillColor(79, 70, 229);
			doc.rect(margin, y, w - margin * 2, 25, 'F');
			doc.setTextColor(255, 255, 255);
			doc.setFontSize(12);
			doc.setFont('helvetica', 'bold');
			doc.text('Ready to take the next step?', margin + 5, y + 9);
			doc.setFontSize(9);
			doc.setFont('helvetica', 'normal');
			doc.text('Book a free 30-minute discovery call: woodhouseagency.com/tools/book', margin + 5, y + 18);

			doc.save(`woodhouse-ai-readiness-${firstName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
		} finally {
			pdfGenerating = false;
		}
	}
</script>

<SEO
	title="AI Readiness Assessment | Woodhouse Agency"
	description="Take our free 20-question AI readiness scorecard. Find out how ready your enterprise is to deploy AI agents — and get a personalised PDF report."
/>

<div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">

	{#if !showResults}
		<!-- Header -->
		<div class="text-center mb-12">
			<span class="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">Free Tool</span>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">AI Readiness Assessment</h1>
			<p class="text-gray-500 text-lg max-w-xl mx-auto">
				20 questions. 5 minutes. Get your organisation's AI readiness score and a personalised PDF report — free.
			</p>
		</div>

		<!-- Progress bar -->
		<div class="mb-8">
			<div class="flex justify-between text-xs text-gray-400 mb-1">
				<span>{Object.keys(answers).length} of {questions.length} answered</span>
				<span>{progress}%</span>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2">
				<div class="bg-brand-500 h-2 rounded-full transition-all duration-500" style="width:{progress}%"></div>
			</div>
		</div>

		<!-- Category badge -->
		<p class="text-xs font-semibold uppercase tracking-wider text-brand-500 mb-6">
			{pageQuestions[0]?.category}
		</p>

		<!-- Questions -->
		<div class="space-y-8 mb-10">
			{#each pageQuestions as q (q.id)}
				<div class="p-6 rounded-2xl border border-gray-200 hover:border-brand-200 transition-colors">
					<p class="font-semibold text-gray-800 mb-4">
						<span class="text-brand-400 mr-2 text-sm">Q{q.id}.</span>{q.text}
					</p>
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
						{#each options as opt}
							<button
								onclick={() => (answers[q.id] = opt.value)}
								class="px-3 py-2.5 rounded-xl text-sm font-medium border transition-all
									{answers[q.id] === opt.value
										? 'bg-brand-600 text-white border-brand-600 shadow-sm'
										: 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-600'}"
							>
								{opt.label}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Navigation -->
		<div class="flex justify-between items-center">
			{#if currentPage > 0}
				<button onclick={back} class="text-sm text-gray-500 hover:text-gray-700 font-medium">
					← Back
				</button>
			{:else}
				<div></div>
			{/if}
			<button
				onclick={next}
				disabled={!allCurrentAnswered}
				class="px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
			>
				{currentPage === totalPages - 1 ? 'See My Results →' : 'Next →'}
			</button>
		</div>

	{:else}
		<!-- Results -->
		<div id="results-section">
			<div class="text-center mb-10">
				<h1 class="text-4xl font-bold text-gray-900 mb-2">Your AI Readiness Score</h1>
				<p class="text-gray-500">Based on your responses across 5 key dimensions</p>
			</div>

			<!-- Score ring -->
			<div class="flex flex-col items-center mb-10">
				<div class="relative w-40 h-40">
					<svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
						<circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" stroke-width="10" />
						<circle
							cx="60" cy="60" r="50" fill="none"
							stroke={percentScore >= 70 ? '#10b981' : percentScore >= 40 ? '#f59e0b' : '#ef4444'}
							stroke-width="10"
							stroke-dasharray="{(percentScore / 100) * 314} 314"
							stroke-linecap="round"
						/>
					</svg>
					<div class="absolute inset-0 flex flex-col items-center justify-center">
						<span class="text-4xl font-extrabold text-gray-900">{percentScore}</span>
						<span class="text-xs text-gray-400 font-medium">out of 100</span>
					</div>
				</div>
				<p class="mt-4 text-xl font-bold {readinessLevel.colour}">{readinessLevel.label}</p>
			</div>

			<!-- Recommendation -->
			<div class="p-6 rounded-2xl border {readinessLevel.bg} mb-8">
				<h3 class="font-bold text-gray-900 mb-2">Our recommendation</h3>
				<p class="text-gray-700 text-sm leading-relaxed">{readinessLevel.recommendation}</p>
			</div>

			<!-- Category breakdown -->
			<div class="mb-10">
				<h3 class="font-bold text-gray-900 mb-4">Breakdown by dimension</h3>
				<div class="space-y-4">
					{#each categoryScores() as cat}
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="font-medium text-gray-700">{cat.name}</span>
								<span class="text-gray-500">{cat.pct}%</span>
							</div>
							<div class="w-full bg-gray-100 rounded-full h-2.5">
								<div
									class="h-2.5 rounded-full transition-all duration-700"
									style="width:{cat.pct}%; background-color:{cat.pct >= 70 ? '#10b981' : cat.pct >= 40 ? '#f59e0b' : '#ef4444'}"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Email gate for PDF -->
			{#if !emailSubmitted}
				<div class="p-8 rounded-2xl border border-brand-200 bg-brand-50">
					<h3 class="text-xl font-bold text-gray-900 mb-2">Get your full PDF report</h3>
					<p class="text-gray-500 text-sm mb-6">
						We'll email you a personalised report with your scores, recommendations, and a roadmap — free.
					</p>
					<div class="grid sm:grid-cols-2 gap-4 mb-4">
						<div>
							<label for="first-name" class="text-sm font-medium text-gray-700 block mb-1">First name *</label>
							<input
								id="first-name"
								type="text"
								bind:value={firstName}
								placeholder="Jane"
								class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
							/>
						</div>
						<div>
							<label for="email" class="text-sm font-medium text-gray-700 block mb-1">Work email *</label>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="jane@company.com"
								class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
							/>
						</div>
					</div>
					<div class="mb-4">
						<label for="company" class="text-sm font-medium text-gray-700 block mb-1">Company (optional)</label>
						<input
							id="company"
							type="text"
							bind:value={company}
							placeholder="Acme Corp"
							class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
						/>
					</div>
					{#if emailError}
						<p class="text-error text-sm mb-3">{emailError}</p>
					{/if}
					<button
						onclick={submitEmail}
						disabled={emailSubmitting}
						class="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
					>
						{emailSubmitting ? 'Sending…' : 'Download My PDF Report →'}
					</button>
					<p class="text-xs text-gray-400 mt-3 text-center">No spam. Unsubscribe any time.</p>
				</div>
			{:else}
				<div class="p-8 rounded-2xl border border-green-200 bg-green-50 text-center">
					<p class="text-2xl mb-2">✓</p>
					<h3 class="text-xl font-bold text-gray-900 mb-2">Your report is on its way</h3>
					<p class="text-gray-500 text-sm mb-4">Check your inbox. In the meantime, book a free discovery call with our team.</p>
					{#if pdfGenerating}
						<p class="text-sm text-gray-400">Generating PDF…</p>
					{/if}
					<a
						href="/tools/book"
						class="mt-2 inline-block px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
					>
						Book a Free Discovery Call →
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
