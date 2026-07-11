<section class="testimony-header-section">
	<div class="wrap reveal">
		<div class="section-tag-row">
			<span class="label-telemetry">TESTIMONIALS</span>
		</div>
	</div>
</section>

<section class="testi-banner" id="testimony-section">
	<div class="wrap testi-banner-inner reveal" id="testimony-wrap">
		<div class="testi-avatar-badge">ND</div>
		<div class="testi-quote-wrap">
			<p class="testi-quote">"Fuck yeah, you killed it — this is perfect."</p>
			<span class="testi-author">— Noel Deyzel</span>
		</div>
	</div>
</section>

<style>
	.testimony-header-section {
		padding-top: 3.75rem;
		padding-bottom: 1.25rem;
		background: var(--bg-alt);
	}

	.testi-banner {
		padding: 0;
		background: var(--gold);
		color: #000;
		border-top: 2px solid #000;
		border-bottom: 2px solid #000;
		position: relative;
		overflow: hidden;
	}

	.testi-banner::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			-45deg,
			rgba(0, 0, 0, 0.03),
			rgba(0, 0, 0, 0.03) 1.25rem,
			transparent 1.25rem,
			transparent 2.5rem
		);
		pointer-events: none;
	}

	.testi-banner-inner {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		padding: 4rem 2rem;
		position: relative;
		z-index: 2;
	}

	.testi-avatar-badge {
		flex-shrink: 0;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		background: #000;
		color: var(--gold);
		border: 2px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 900;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
	}

	.testi-quote-wrap {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.testi-quote {
		font-family: var(--font-display);
		font-weight: 800;
		font-style: italic;
		font-size: clamp(1.375rem, 3.2vw, 2.25rem);
		line-height: 1.25;
		letter-spacing: -0.01em;
		text-transform: uppercase;
	}

	.testi-author {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		opacity: 0.8;
	}

	@media (max-width: 45em) {
		.testi-banner-inner {
			flex-direction: column;
			text-align: center;
			gap: 1.5rem;
		}
	}
</style>
