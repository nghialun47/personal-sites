<header class="hero" id="hero">
	<div class="wrap hero-inner">
		<h1>
			Editing that turns raw footage into stories that <span class="highlight">resonate</span>
		</h1>

		<div class="hero-ctas">
			<a href="https://www.linkedin.com/in/ethan-van/" target="_blank" rel="noopener" class="btn">
				Work with me
				<svg
					class="btn-arrow"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</a>
		</div>
	</div>
</header>

<style>
	.hero {
		min-height: 85vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		padding-top: 8.125rem;
		padding-bottom: 1.25rem;
		overflow: hidden;
	}

	/* Grid backdrop styling representing editing grids */
	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(223, 177, 91, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(223, 177, 91, 0.03) 1px, transparent 1px);
		background-size: 2.5rem 2.5rem;
		background-position: center top;
		pointer-events: none;
	}

	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle 37.5rem at 80% 30%,
			rgba(223, 177, 91, 0.07),
			transparent 70%
		);
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		z-index: 2;
	}
	.hero h1 {
		font-family: var(--font-display);
		font-size: clamp(2.375rem, 5.8vw, 4.75rem);
		line-height: 1.1;
		max-width: 17ch;
		text-transform: uppercase;
		font-weight: 800;
	}

	.hero h1 .highlight {
		color: var(--gold);
		text-shadow: 0 0 20px var(--gold-glow);
		display: block;
		margin-top: 0.5rem;
	}

	.hero-ctas {
		margin-top: 2.75rem;
		display: flex;
		justify-content: flex-start;
	}

	.btn-arrow {
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
	}

	.btn:hover .btn-arrow {
		transform: translateX(0.25rem);
	}
</style>
