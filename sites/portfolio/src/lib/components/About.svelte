<script lang="ts">
	import { base } from '$app/paths';
</script>

<section id="about" class="about-section">
	<div class="wrap reveal">
		<div class="section-header">
			<h2>Ethan Van</h2>
		</div>
	</div>

	<div class="wrap about-container" id="about-container">
		<!-- Portrait photo column -->
		<div class="about-portrait reveal">
			<div class="portrait-frame">
				<span class="crosshair-tl">+</span>
				<span class="crosshair-tr">+</span>
				<span class="crosshair-bl">+</span>
				<span class="crosshair-br">+</span>
				<img src="{base}/ethan-photo.jpg" alt="Ethan Van Portrait" />
			</div>
		</div>

		<!-- Narrative / stats column -->
		<div class="about-copy reveal">
			<p class="about-bio">
				I am a professional editor dedicated to pacing, rhythm, sound design, and retention. I
				translate raw footage into narrative threads that keep audiences hooked from frame 00:00 to
				the final cut.
			</p>

			<div class="about-grid">
				<div class="stat-card">
					<div class="stat-num">4+</div>
					<div class="stat-label">Years Experience</div>
				</div>
				<div class="stat-card">
					<div class="stat-num">4M+</div>
					<div class="stat-label">Short-Form Views</div>
				</div>
				<div class="stat-card">
					<div class="stat-num">1M+</div>
					<div class="stat-label">Long-Form Views</div>
				</div>
			</div>

			<div class="contact-trigger">
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
	</div>
</section>

<style>
	.about-section {
		padding: 40px 0 140px;
		background: var(--bg);
		position: relative;
	}

	.about-container {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 72px;
		align-items: center;
	}

	@media (max-width: 860px) {
		.about-container {
			grid-template-columns: 1fr;
			gap: 48px;
		}
		.about-portrait {
			max-width: 400px;
			margin: 0 auto;
		}
	}

	/* Portrait photo frame with technical editor crosshairs */
	.portrait-frame {
		position: relative;
		aspect-ratio: 4 / 5;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--border);
		background: #000;
	}

	.portrait-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 58% center;
		filter: grayscale(0.2) contrast(1.1);
		transition:
			filter 0.4s ease,
			transform 0.4s ease;
	}

	.portrait-frame:hover img {
		filter: grayscale(0) contrast(1.05);
		transform: scale(1.02);
	}

	/* Structural UI markers */
	.crosshair-tl,
	.crosshair-tr,
	.crosshair-bl,
	.crosshair-br {
		position: absolute;
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--gold);
		z-index: 5;
		pointer-events: none;
		line-height: 1;
	}

	.crosshair-tl {
		top: 8px;
		left: 8px;
	}
	.crosshair-tr {
		top: 8px;
		right: 8px;
	}
	.crosshair-bl {
		bottom: 8px;
		left: 8px;
	}
	.crosshair-br {
		bottom: 8px;
		right: 8px;
	}

	.about-bio {
		color: var(--text-muted);
		font-size: 16px;
		line-height: 1.6;
		margin-bottom: 36px;
		max-width: 50ch;
	}

	.about-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		margin-bottom: 40px;
	}

	@media (max-width: 480px) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}

	.stat-card {
		background: var(--bg-alt);
		border: 1px solid var(--border);
		padding: 18px;
		border-radius: 4px;
		transition: border-color 0.3s ease;
	}

	.stat-card:hover {
		border-color: var(--gold);
	}

	.stat-num {
		font-family: var(--font-display);
		font-size: 32px;
		font-weight: 800;
		color: var(--gold);
		line-height: 1.1;
		margin-bottom: 4px;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		text-transform: uppercase;
	}

	.contact-trigger {
		display: flex;
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
