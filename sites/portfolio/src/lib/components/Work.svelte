<script lang="ts">
	import { onMount } from 'svelte';
	import { videoConfig } from '../config/videos';

	// Dynamic views mapping video ID to formatted count string
	let dynamicViews = $state<Record<string, string>>({});

	// Active play states for video facades
	let activeVideos = $state<Record<string, boolean>>({});

	// Formatting utility (e.g. 453,000 -> 450K+)
	function formatViews(viewsNum: number): string {
		if (viewsNum >= 1_000_000) {
			const rounded = Math.round(viewsNum / 100_000) / 10;
			return `${rounded}M+ Views`;
		}
		if (viewsNum >= 1_000) {
			const rounded = Math.round(viewsNum / 10_000) * 10;
			return `${rounded}K+ Views`;
		}
		return `${viewsNum} Views`;
	}

	// Fetch from official Google YouTube Data API v3 if API key is provided
	async function fetchLiveViews(videoId: string, apiKey: string) {
		try {
			const res = await fetch(
				`https://www.googleapis.com/googleapis/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
			);
			if (!res.ok) throw new Error('API call failed');
			const data = await res.json();
			const rawCount = data.items?.[0]?.statistics?.viewCount;
			if (rawCount) {
				const countVal = parseInt(rawCount, 10);
				dynamicViews[videoId] = formatViews(countVal);
			}
		} catch (e) {
			console.error(`Failed to fetch live view count for ${videoId}`, e);
		}
	}

	// Parser to extract video or reel ID/slug directly from embed URLs
	function extractVideoId(urlStr: string): string {
		try {
			const url = new URL(urlStr);

			// YouTube embed or watch URLs
			if (url.hostname.includes('youtube') || url.hostname.includes('youtu.be')) {
				if (url.pathname.startsWith('/embed/')) {
					return url.pathname.substring(7);
				}
				if (url.searchParams.has('v')) {
					return url.searchParams.get('v') || 'UNKNOWN';
				}
				return url.pathname.substring(1);
			}

			// Instagram embeds
			if (url.hostname.includes('instagram')) {
				const parts = url.pathname.split('/').filter(Boolean);
				const idx = parts.findIndex((p) => p === 'p' || p === 'reel');
				if (idx !== -1 && parts[idx + 1]) {
					return parts[idx + 1];
				}
				const embedIdx = parts.indexOf('embed');
				if (embedIdx > 0) {
					return parts[embedIdx - 1];
				}
				return parts[parts.length - 1] || 'UNKNOWN';
			}

			return url.pathname.split('/').filter(Boolean).pop() || 'UNKNOWN';
		} catch {
			return 'UNKNOWN';
		}
	}

	onMount(() => {
		const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
		if (apiKey) {
			videoConfig.longform.forEach((item) => {
				fetchLiveViews(item.id, apiKey);
			});
		}
	});
</script>

<section id="work" class="work-showcase-section">
	<div class="wrap reveal">
		<div class="section-header">
			<h2>Showcase</h2>
		</div>
	</div>

	<!-- Long-Form Video Cuts -->
	<div class="wrap longform-wrap" id="work-longform">
		<div class="section-tag-row">
			<span class="label-telemetry">LONG-FORM CUTS</span>
		</div>

		<div class="embed-list">
			{#each videoConfig.longform as item (item.id)}
				<div class="work-card reveal">
					<div class="embed-workspace-frame">
						<div class="ratio-box">
							{#if activeVideos[item.id]}
								<iframe
									src="{item.embedUrl}?autoplay=1"
									title={item.title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							{:else}
								<button
									class="facade-btn"
									onclick={() => (activeVideos[item.id] = true)}
									aria-label="Play {item.title}"
								>
									<picture>
										<source
											media="(max-width: 480px)"
											srcset="https://img.youtube.com/vi/{item.id}/mqdefault.jpg"
										/>
										<source
											media="(max-width: 900px)"
											srcset="https://img.youtube.com/vi/{item.id}/hqdefault.jpg"
										/>
										<source
											media="(min-width: 901px)"
											srcset="https://img.youtube.com/vi/{item.id}/maxresdefault.jpg"
										/>
										<img
											class="facade-img"
											src="https://img.youtube.com/vi/{item.id}/sddefault.jpg"
											alt={item.title}
											loading="lazy"
										/>
									</picture>
									<div class="play-overlay">
										<div class="play-circle">
											<svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
												<polygon points="6 3 20 12 6 21 6 3"></polygon>
											</svg>
										</div>
									</div>
								</button>
							{/if}
						</div>

						<div class="frame-footer">
							<span class="frame-title">SOURCE_MONITOR: {extractVideoId(item.embedUrl)}.MP4</span>
							<span class="footer-views">{dynamicViews[item.id] || item.views}</span>
						</div>
					</div>

					<div class="card-copy">
						<span class="role-tag">{item.role}</span>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Short-Form Video Cuts -->
	<div class="wrap shorts-wrap" id="work-shortform">
		<div class="section-tag-row">
			<span class="label-telemetry">SHORT-FORM CUTS</span>
		</div>

		<div class="shorts-grid reveal">
			{#each videoConfig.shortform as item (item.src)}
				<div class="short-card">
					<div class="embed-workspace-frame vertical-frame">
						<div class="vertical-embed-container">
							<iframe
								src={item.src}
								title={item.title}
								loading="lazy"
								allowfullscreen
								scrolling="no"
							></iframe>
						</div>

						<div class="frame-footer">
							<span class="frame-title">REEL: {extractVideoId(item.src)}.MP4</span>
							<span class="footer-views">{item.views}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.work-showcase-section {
		padding: 2.5rem 0 5rem;
	}
	.section-tag-row {
		margin-bottom: 3rem;
	}
	.longform-wrap {
		margin-bottom: 6.25rem;
	}

	.embed-list {
		display: flex;
		flex-direction: column;
		gap: 4.5rem;
	}

	/* Alternating side-by-side grid for longform elements */
	.work-card {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 4rem;
		align-items: center;
	}

	.work-card:nth-child(even) {
		grid-template-columns: 0.85fr 1.15fr;
	}

	.work-card:nth-child(even) .embed-workspace-frame {
		order: 2;
	}
	.work-card:nth-child(even) .card-copy {
		order: 1;
	}

	@media (max-width: 56.25em) {
		.work-card,
		.work-card:nth-child(even) {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.work-card:nth-child(even) .embed-workspace-frame,
		.work-card:nth-child(even) .card-copy {
			order: initial;
		}
	}

	/* industrial workspace frame */
	.embed-workspace-frame {
		border: 1px solid var(--border);
		border-radius: 6px;
		overflow: hidden;
		background: #000;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
		transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.work-card:hover .embed-workspace-frame,
	.short-card:hover .embed-workspace-frame {
		border-color: var(--gold);
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.75),
			0 0 15px var(--gold-glow);
	}

	.frame-title {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--text-muted);
		letter-spacing: 0.05em;
	}

	.ratio-box {
		position: relative;
		width: 100%;
		padding-top: 56.25%; /* 16:9 aspect ratio */
	}

	.ratio-box iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.frame-footer {
		background: var(--surface);
		height: 3em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		font-size: 0.8rem;
		border-top: 1px solid var(--border);
	}

	.frame-footer span {
		font-family: var(--font-mono);
		color: var(--text-muted);
	}

	.frame-footer .footer-views {
		color: var(--gold) !important;
		font-weight: 700;
		font-size: 1rem !important;
		letter-spacing: 0.02em;
	}

	/* Copy block styling */
	.card-copy {
		padding: 0.625rem 0;
	}

	.role-tag {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--gold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.875rem;
	}

	.card-copy h3 {
		font-size: clamp(1.375rem, 3vw, 2rem);
		line-height: 1.2;
		margin-bottom: 1.125rem;
		color: var(--text);
	}

	.card-copy p {
		color: var(--text-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
		max-width: 44ch;
	}

	/* Short-form Grid system */
	.shorts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	@media (max-width: 56.25em) {
		.shorts-grid {
			grid-template-columns: 1fr;
			max-width: 25rem;
			margin: 0 auto;
		}
	}

	.vertical-embed-container {
		width: 100%;
		height: 32.5rem;
		background: #000;
		position: relative;
	}

	.vertical-embed-container iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	/* Video Facades Styles */
	.facade-btn {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
		padding: 0;
		margin: 0;
		background: #000;
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
		overflow: hidden;
		outline: none;
	}

	.facade-btn picture {
		display: block;
		width: 100%;
		height: 100%;
	}

	.facade-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.facade-btn:hover .facade-img {
		transform: scale(1.04);
	}

	.play-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(6, 6, 8, 0.4);
		transition: background 0.3s ease;
		gap: 0.75rem;
	}

	.facade-btn:hover .play-overlay {
		background: rgba(6, 6, 8, 0.2);
	}

	.play-circle {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: rgba(22, 22, 28, 0.85);
		border: 1px solid var(--border);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
		transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.facade-btn:hover .play-circle {
		background: var(--gold);
		border-color: var(--gold);
		color: #000;
		transform: scale(1.1);
		box-shadow:
			0 0 25px var(--gold-glow),
			0 8px 30px rgba(0, 0, 0, 0.6);
	}

	.play-icon {
		width: 1.25rem;
		height: 1.25rem;
		margin-left: 0.25rem; /* Align triangle center */
		transition: transform 0.3s ease;
	}

	.facade-btn:hover .play-icon {
		transform: scale(1.05);
	}
</style>
