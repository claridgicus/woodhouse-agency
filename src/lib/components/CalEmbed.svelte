<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		calLink?: string;
		namespace?: string;
	}

	let { calLink = 'woodhouse-agency/discovery', namespace = 'discovery' }: Props = $props();

	let mounted = $state(false);

	onMount(() => {
		// Load Cal.com embed script
		(function (C: any, A: string, L: string) {
			const p = function (a: any, ar: any) {
				a.q.push(ar);
			};
			const d = C.document;
			C.Cal =
				C.Cal ||
				function () {
					const cal = C.Cal;
					const ar = arguments;
					if (!cal.loaded) {
						cal.ns = {};
						cal.q = cal.q || [];
						d.head.appendChild(d.createElement('script')).src = A;
						cal.loaded = true;
					}
					if (ar[0] === L) {
						const api: any = function () {
							p(api, arguments);
						};
						const namespace = ar[1];
						api.q = api.q || [];
						if (typeof namespace === 'string') {
							cal.ns[namespace] = cal.ns[namespace] || api;
							p(cal.ns[namespace], ar);
							return;
						}
						p(cal, ar);
						return;
					}
					p(cal, ar);
				};
		})(window, 'https://app.cal.com/embed/embed.js', 'init');

		const w = window as any;
		w.Cal('init', namespace, { origin: 'https://app.cal.com' });
		w.Cal.ns[namespace]('inline', {
			elementOrSelector: `#cal-inline-${namespace}`,
			calLink,
			layout: 'month_view'
		});
		w.Cal.ns[namespace]('ui', {
			theme: 'light',
			styles: { branding: { brandColor: '#4f46e5' } },
			hideEventTypeDetails: false,
			layout: 'month_view'
		});

		mounted = true;
	});
</script>

<div
	id="cal-inline-{namespace}"
	style="width:100%;height:600px;overflow:scroll"
	class="rounded-2xl border border-gray-200 bg-white"
></div>
