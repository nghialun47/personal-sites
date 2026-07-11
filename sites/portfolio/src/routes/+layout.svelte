<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { editorState } from '$lib/editorState.svelte';

	let { children } = $props();

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('log-mode', editorState.isLogMode);
		}
	});

	$effect(() => {
		if (typeof document !== 'undefined' && 'fonts' in document) {
			const fallback = setTimeout(() => {
				document.documentElement.classList.add('fonts-loaded');
			}, 2000); // 2-second timeout safety fallback

			// Explicitly load critical web fonts and resolve layout transition only when ready
			Promise.all([
				document.fonts.load('800 12px "Syne"'),
				document.fonts.load('800 12px "Unbounded"'),
				document.fonts.load('400 12px "Plus Jakarta Sans"'),
				document.fonts.load('400 12px "Share Tech Mono"')
			])
				.then(() => {
					clearTimeout(fallback);
					document.documentElement.classList.add('fonts-loaded');
				})
				.catch(() => {
					clearTimeout(fallback);
					document.documentElement.classList.add('fonts-loaded');
				});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
