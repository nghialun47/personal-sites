<script lang="ts">
	import { onMount } from 'svelte';

	let velocity = $state(0);
	let offset = $state(0);
	let phraseWidth = $state(0);
	let lastScrollY = 0;

	const phrase =
		'RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • ';

	function onScroll() {
		const currentScrollY = window.scrollY;
		const diff = currentScrollY - lastScrollY;

		if (diff !== 0) {
			// Map pixel delta to speed multiplier (cap at 25px per frame equivalent)
			const scrollSpeed = Math.min(25, Math.abs(diff) * 0.15);
			velocity = Math.max(velocity, scrollSpeed);
		}

		lastScrollY = currentScrollY;
	}

	onMount(() => {
		lastScrollY = window.scrollY;
		window.addEventListener('scroll', onScroll);

		let animationFrameId: number;

		function animate() {
			// Decay velocity towards 0
			velocity *= 0.5;
			if (velocity < 0.001) velocity = 0;

			// Total movement per tick is base + scroll velocity (always scrolling leftwards)
			const baseSpeed = 0.5;
			const speed = baseSpeed + velocity;
			offset -= speed;

			// Keep offset in bounds of the phrase width seamlessly
			if (phraseWidth > 0 && offset <= -phraseWidth) {
				offset += phraseWidth;
			}

			animationFrameId = requestAnimationFrame(animate);
		}

		animate();

		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div class="ticker-wrapper" id="ticker" aria-hidden="true">
	<div class="caution-tape">
		<div class="ticker-track" style="transform: translate3d({offset}px, 0, 0)">
			<div class="ticker-text" bind:clientWidth={phraseWidth}>{phrase}</div>
			<div class="ticker-text">{phrase}</div>
			<div class="ticker-text">{phrase}</div>
		</div>
	</div>
</div>

<style>
	.ticker-wrapper {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		overflow: hidden;
		padding: 1.875rem 0;
		z-index: 10;
	}

	.caution-tape {
		background: var(--gold);
		color: #000;
		height: 3rem;
		display: flex;
		align-items: center;
		transform: rotate(-1.2deg) scale(1.02);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		border-top: 2px solid #000;
		border-bottom: 2px solid #000;
		overflow: hidden;
		position: relative;
	}

	.caution-tape::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			-45deg,
			rgba(0, 0, 0, 0.05),
			rgba(0, 0, 0, 0.05) 0.9375rem,
			transparent 0.9375rem,
			transparent 1.875rem
		);
		pointer-events: none;
	}

	.ticker-track {
		display: flex;
		white-space: nowrap;
		will-change: transform;
	}

	.ticker-text {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 900;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		padding-right: 1.25rem;
		display: inline-block;
	}
</style>
