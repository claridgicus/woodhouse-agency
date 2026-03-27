<script lang="ts">
	import { SITE } from '$lib/site';
</script>

<footer class="bg-gray-900 text-gray-300 mt-24">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
		<div class="md:col-span-2">
			<p class="font-bold text-xl text-white mb-3">{SITE.name}</p>
			<p class="text-sm leading-relaxed max-w-sm">{SITE.description}</p>
			<a href="mailto:{SITE.email}" class="mt-4 inline-block text-brand-500 hover:text-brand-400 text-sm">
				{SITE.email}
			</a>
		</div>

		<div>
			<p class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</p>
			<ul class="space-y-2 text-sm">
				<li><a href="/about" class="hover:text-white transition-colors">About</a></li>
				<li><a href="/services" class="hover:text-white transition-colors">Services</a></li>
				<li><a href="/partners" class="hover:text-white transition-colors">Partners</a></li>
				<li><a href="/blog" class="hover:text-white transition-colors">Blog</a></li>
			</ul>
		</div>

		<div>
			<p class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Tools</p>
			<ul class="space-y-2 text-sm">
				<li><a href="/tools/ai-readiness" class="hover:text-white transition-colors">AI Readiness Assessment</a></li>
				<li><a href="/tools/roi-calculator" class="hover:text-white transition-colors">ROI Calculator</a></li>
				<li><a href="/tools/book" class="hover:text-white transition-colors">Book a Discovery Call</a></li>
				<li><a href="/case-studies" class="hover:text-white transition-colors">Case Studies</a></li>
			</ul>
		</div>
	</div>

	<div class="border-t border-gray-800">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
			<p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
			<div class="flex gap-4">
				<a href="/sitemap.xml" class="hover:text-gray-300">Sitemap</a>
			</div>
		</div>
	</div>
</footer>
