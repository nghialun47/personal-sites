<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { editorState } from '$lib/editorState.svelte';

	// Props using Svelte 5 standard runes
	let { logoFirst = 'Ethan', logoLast = 'Van' } = $props();
	let isScrolled = $state(false);

	function onScroll() {
		isScrolled = window.scrollY > 20;
	}

	onMount(() => {
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<nav class="nav-bar" class:scrolled={isScrolled}>
	<div class="nav-container">
		<a href="{base}/" class="logo">
			<span class="logo-dot"></span>
			<span class="logo-text">{logoFirst}<span class="last-name">{logoLast}</span></span>
		</a>

		<div class="nav-telemetry">
			<span class="telemetry-badge">{dev ? 'ROUGH CUT' : 'FINAL CUT'}</span>

			<span class="telemetry-sep">|</span>

			<button
				type="button"
				class="log-badge"
				class:active-log={editorState.isLogMode}
				onclick={editorState.toggleLogMode}
				title="Toggle color grading LUT (REC.709 vs raw flat LOG)"
			>
				LUT: {editorState.isLogMode ? 'LOG' : 'REC.709'}
			</button>
		</div>
	</div>
</nav>

<style>
	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 90;
		padding: 1.25rem 2rem;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.nav-bar.scrolled {
		background: rgba(6, 6, 8, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
		padding: 0.875rem 2rem;
	}

	.nav-container {
		max-width: 73.75rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.9375rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.logo-dot {
		width: 0.4375rem;
		height: 0.4375rem;
		border-radius: 50%;
		background: var(--gold);
		box-shadow: 0 0 10px var(--gold);
	}

	.last-name {
		color: var(--gold);
		margin-left: 0.25rem;
	}

	.nav-telemetry {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
	}

	.telemetry-badge {
		background: rgba(223, 177, 91, 0.08);
		border: 1px solid rgba(223, 177, 91, 0.2);
		color: var(--gold);
		padding: 0.125rem 0.5rem;
		border-radius: 3px;
		font-weight: 700;
		font-size: 0.6875rem;
		font-family: var(--font-mono);
		transition: all 0.2s ease;
	}

	.log-badge {
		cursor: pointer;
		background: rgba(56, 139, 253, 0.08);
		border: 1px solid rgba(56, 139, 253, 0.2);
		color: #388bfd;
		padding: 0.125rem 0.5rem;
		border-radius: 3px;
		font-weight: 700;
		font-size: 0.6875rem;
		font-family: var(--font-mono);
		transition: all 0.2s ease;
	}

	.log-badge:hover {
		background: rgba(56, 139, 253, 0.16);
		border-color: #388bfd;
		box-shadow: 0 0 8px rgba(56, 139, 253, 0.25);
	}

	.log-badge.active-log {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.4);
		color: var(--text);
	}

	.log-badge.active-log:hover {
		background: rgba(255, 255, 255, 0.16);
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
	}

	.telemetry-sep {
		opacity: 0.2;
	}

	@media (max-width: 37.5em) {
		.nav-bar {
			padding: 1rem 1.25rem;
		}
		.nav-bar.scrolled {
			padding: 0.75rem 1.25rem;
		}
		.nav-telemetry {
			display: none; /* Hide telemetry on mobile for clean screen space */
		}
	}
</style>
