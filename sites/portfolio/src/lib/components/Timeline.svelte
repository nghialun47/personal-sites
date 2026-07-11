<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { editorState } from '$lib/editorState.svelte';

	// State runes
	let scrollPct = $state(0);
	let timecode = $state('00:00:00:00');
	let isDragging = $state(false);
	let timelineElement = $state<HTMLDivElement | null>(null);
	let scrollHeight = $state(2000);

	// V1 and V2 track clips represented as reactive states
	let v1Clips = $state<Array<{ id: string; name: string; start: number; end: number }>>([]);
	let v2Clips = $state<Array<{ id: string; name: string; start: number; end: number }>>([]);

	// State runes for cached layout boundaries (in pixels)
	let y_work = $state(0);
	let y_about = $state(0);

	let v2_long_start = $state(0);
	let v2_long_end = $state(0);
	let v2_short_start = $state(0);
	let v2_short_end = $state(0);
	let v2_client_start = $state(0);
	let v2_client_end = $state(0);
	let v2_testi_start = $state(0);
	let v2_testi_end = $state(0);

	// Nav offset matching the CSS scroll-margin-top
	const NAV_OFFSET = 80;

	// Convert scroll position to timeline playhead percentage
	function scrollYToPercent(y: number): number {
		const docH = Math.max(1, scrollHeight - window.innerHeight);

		// Timeline percentages corresponding to these key scroll positions
		const t0 = 0;
		const t2 = v1Clips[0]?.end || 25;
		const t6 = v1Clips[1]?.end || 75;
		const t7 = 100;

		// Apply a small tolerance (2px) to prevent subpixel rounding glitches from falling into the wrong section
		const tolerance = 2;

		if (y + tolerance >= y_about || y >= docH - tolerance) {
			const progress = Math.min(1, Math.max(0, (y - y_about) / (docH - y_about || 1)));
			return t6 + progress * (t7 - t6);
		} else if (y + tolerance >= y_work) {
			const progress = Math.min(1, Math.max(0, (y - y_work) / (y_about - y_work || 1)));
			return t2 + progress * (t6 - t2);
		} else {
			const progress = Math.min(1, Math.max(0, y / (y_work || 1)));
			return t0 + progress * (t2 - t0);
		}
	}

	// Convert timeline playhead percentage to scroll position
	function percentToScrollY(pct: number): number {
		const docH = Math.max(1, scrollHeight - window.innerHeight);

		const t2 = v1Clips[0]?.end || 25;
		const t6 = v1Clips[1]?.end || 75;
		const t7 = 100;

		if (pct <= t2) {
			return (pct / (t2 || 1)) * y_work;
		} else if (pct <= t6) {
			return y_work + ((pct - t2) / (t6 - t2 || 1)) * (y_about - y_work);
		} else {
			return y_about + ((pct - t6) / (t7 - t6 || 1)) * (docH - y_about);
		}
	}

	// Format percent to timecode based on active FPS config
	function formatPercentToTimecode(pct: number): string {
		const totalSeconds = scrollHeight / 100;
		const fps = 24;
		const totalFrames = Math.floor((pct / 100) * totalSeconds * fps);
		const frames = totalFrames % fps;
		const seconds = Math.floor(totalFrames / fps) % 60;
		const minutes = Math.floor(totalFrames / (fps * 60)) % 60;
		const hours = Math.floor(totalFrames / (fps * 3600));

		const fStr = String(frames).padStart(2, '0');
		const sStr = String(seconds).padStart(2, '0');
		const mStr = String(minutes).padStart(2, '0');
		const hStr = String(hours).padStart(2, '0');

		return `${hStr}:${mStr}:${sStr}:${fStr}`;
	}

	// Calculate scroll percentage
	function updateScroll() {
		if (isDragging || editorState.isPlaying) return;
		const y = window.scrollY;
		scrollPct = scrollYToPercent(y);
		timecode = formatPercentToTimecode(scrollPct);
	}

	function getElementScrollTop(id: string): number {
		const el = document.getElementById(id);
		if (!el) return 0;
		return window.scrollY + el.getBoundingClientRect().top;
	}

	function getElementScrollBounds(id: string): { start: number; end: number } {
		const el = document.getElementById(id);
		if (!el) return { start: 0, end: 0 };
		const top = window.scrollY + el.getBoundingClientRect().top;
		const height = el.getBoundingClientRect().height;
		return { start: top, end: top + height };
	}

	function updateSectionBounds() {
		scrollHeight = document.documentElement.scrollHeight;

		// Cache all absolute offsets (minus NAV_OFFSET)
		y_work = Math.max(0, getElementScrollTop('work') - NAV_OFFSET);
		y_about = Math.max(0, getElementScrollTop('about') - NAV_OFFSET);

		// Physical bounds queries for V2 tracks
		const workLongform = getElementScrollBounds('work-longform');
		const workShortform = getElementScrollBounds('work-shortform');
		const clientSection = getElementScrollBounds('clients-wrap');
		const testimonySection = getElementScrollBounds('testimony-wrap');

		v2_long_start = Math.max(0, workLongform.start - NAV_OFFSET);
		v2_long_end = Math.max(0, workLongform.end - NAV_OFFSET);

		v2_short_start = Math.max(0, workShortform.start - NAV_OFFSET);
		v2_short_end = Math.max(0, workShortform.end - NAV_OFFSET);

		v2_client_start = Math.max(0, clientSection.start - NAV_OFFSET);
		v2_client_end = Math.max(0, clientSection.end - NAV_OFFSET);

		v2_testi_start = Math.max(0, testimonySection.start - NAV_OFFSET);
		v2_testi_end = Math.max(0, testimonySection.end - NAV_OFFSET);

		const pct = (val: number) => Math.max(0, Math.min(100, (val / scrollHeight) * 100));

		v1Clips = [
			{ id: 'hero', name: 'INTRO', start: 0, end: pct(y_work) },
			{ id: 'work', name: 'SHOWCASE', start: pct(y_work), end: pct(y_about) },
			{ id: 'about', name: 'BIO', start: pct(y_about), end: 100 }
		];

		// V2 is mapped to physical bounding layout bounds with gaps
		v2Clips = [
			{
				id: 'work-longform',
				name: 'LONG-FORM',
				start: pct(v2_long_start),
				end: pct(v2_long_end)
			},
			{
				id: 'work-shortform',
				name: 'SHORT-FORM',
				start: pct(v2_short_start),
				end: pct(v2_short_end)
			},
			{
				id: 'clients-section',
				name: 'CLIENTS',
				start: pct(v2_client_start),
				end: pct(v2_client_end)
			},
			{
				id: 'testimony-section',
				name: 'TESTIMONIALS',
				start: pct(v2_testi_start),
				end: pct(v2_testi_end)
			}
		];
	}

	// Handle playhead scrubbing (dragging/clicking on timeline)
	function handleTimelineInteract(clientX: number) {
		if (!timelineElement) return;
		editorState.isPlaying = false; // Stop playback on manual interaction
		const rect = timelineElement.getBoundingClientRect();
		const x = clientX - rect.left;
		const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
		scrollPct = pct;
		timecode = formatPercentToTimecode(pct);

		const targetY = percentToScrollY(pct);
		window.scrollTo({
			top: targetY,
			behavior: 'auto'
		});
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		isDragging = true;
		handleTimelineInteract(e.clientX);
	}

	function onMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		handleTimelineInteract(e.clientX);
	}

	function onMouseUp() {
		isDragging = false;
	}

	function onTouchStart(e: TouchEvent) {
		isDragging = true;
		handleTimelineInteract(e.touches[0].clientX);
	}

	function onTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		handleTimelineInteract(e.touches[0].clientX);
	}

	function onTouchEnd() {
		isDragging = false;
	}

	// Scroll to a specific section element
	function scrollToSection(id: string) {
		editorState.isPlaying = false; // Pause playback on manual navigation
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		} else if (id === 'hero') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	// Snapping Jumps for Arrow Keys (Edit Cuts)
	function jumpToAdjacentClip(dir: number) {
		const boundaries = new SvelteSet<number>([0, 100]);
		v1Clips.forEach((c) => {
			boundaries.add(c.start);
			boundaries.add(c.end);
		});
		v2Clips.forEach((c) => {
			boundaries.add(c.start);
			boundaries.add(c.end);
		});

		const sorted = Array.from(boundaries).sort((a, b) => a - b);

		if (dir === -1) {
			// Find previous boundary (with a tiny threshold)
			const target = sorted
				.slice()
				.reverse()
				.find((b) => b < scrollPct - 0.5);
			if (target !== undefined) {
				const targetY = percentToScrollY(target);
				window.scrollTo({ top: targetY, behavior: 'smooth' });
			}
		} else {
			// Find next boundary
			const target = sorted.find((b) => b > scrollPct + 0.5);
			if (target !== undefined) {
				const targetY = percentToScrollY(target);
				window.scrollTo({ top: targetY, behavior: 'smooth' });
			}
		}
	}

	// Premiere Keyboard Shortcuts
	function handleKeyDown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
			return;
		}

		const key = e.key.toLowerCase();

		// Option + X or just X to clear In/Out Range
		if ((e.altKey && key === 'x') || key === 'x') {
			editorState.clearSelection();
			e.preventDefault();
			return;
		}

		// Spacebar to Play/Pause
		if (e.code === 'Space') {
			editorState.isPlaying = !editorState.isPlaying;
			e.preventDefault();
			return;
		}

		// In point shortcuts
		if (key === 'i') {
			if (e.shiftKey) {
				// Shift + I: Jump playhead to In
				if (editorState.inPoint !== null) {
					const targetY = percentToScrollY(editorState.inPoint);
					window.scrollTo({ top: targetY, behavior: 'smooth' });
				}
			} else {
				// I: Mark In
				editorState.inPoint = scrollPct;
				if (editorState.outPoint !== null && editorState.outPoint < editorState.inPoint) {
					editorState.outPoint = null;
				}
			}
			e.preventDefault();
			return;
		}

		// Out point shortcuts
		if (key === 'o') {
			if (e.shiftKey) {
				// Shift + O: Jump playhead to Out
				if (editorState.outPoint !== null) {
					const targetY = percentToScrollY(editorState.outPoint);
					window.scrollTo({ top: targetY, behavior: 'smooth' });
				}
			} else {
				// O: Mark Out
				editorState.outPoint = scrollPct;
				if (editorState.inPoint !== null && editorState.inPoint > editorState.outPoint) {
					editorState.inPoint = null;
				}
			}
			e.preventDefault();
			return;
		}

		// Up/Down Arrows: Prev/Next edit cut
		if (e.key === 'ArrowUp') {
			jumpToAdjacentClip(-1);
			e.preventDefault();
			return;
		}
		if (e.key === 'ArrowDown') {
			jumpToAdjacentClip(1);
			e.preventDefault();
			return;
		}
	}

	// Pause playback if user manually scrolls with wheel or touch
	function onUserScrollInteraction() {
		if (editorState.isPlaying) {
			editorState.isPlaying = false;
		}
	}

	// Smooth scroll loop for Spacebar playback simulation
	let elapsedSeconds = 0;
	let lastFrameTime = 0;
	function playbackLoop(timestamp: number) {
		if (!editorState.isPlaying) {
			lastFrameTime = 0;
			return;
		}

		if (!lastFrameTime) lastFrameTime = timestamp;
		const deltaSec = (timestamp - lastFrameTime) / 1000;
		lastFrameTime = timestamp;

		const totalSeconds = Math.max(0.1, scrollHeight / 100);
		elapsedSeconds += deltaSec;
		if (elapsedSeconds >= totalSeconds) {
			elapsedSeconds = 0; // Loop back to top
		}

		scrollPct = (elapsedSeconds / totalSeconds) * 100;
		timecode = formatPercentToTimecode(scrollPct);

		const targetY = percentToScrollY(scrollPct);
		window.scrollTo(0, targetY);

		if (editorState.isPlaying) {
			requestAnimationFrame(playbackLoop);
		}
	}

	// Keep timecode and ruler ticks in sync when editor settings toggle
	$effect(() => {
		updateScroll();
	});

	// Handle Playback Loop activation
	$effect(() => {
		if (editorState.isPlaying) {
			if (typeof document !== 'undefined') {
				document.documentElement.classList.add('playback-active');
			}
			const totalSeconds = Math.max(0.1, scrollHeight / 100);
			elapsedSeconds = (scrollPct / 100) * totalSeconds;
			lastFrameTime = 0;
			const animId = requestAnimationFrame(playbackLoop);
			return () => {
				cancelAnimationFrame(animId);
				if (typeof document !== 'undefined') {
					document.documentElement.classList.remove('playback-active');
				}
			};
		}
	});

	onMount(() => {
		updateSectionBounds();
		updateScroll();

		window.addEventListener('scroll', updateScroll);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('resize', updateSectionBounds);

		// Global editing hotkeys
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('wheel', onUserScrollInteraction, { passive: true });
		window.addEventListener('touchstart', onUserScrollInteraction, { passive: true });

		// Set up ResizeObserver to watch for layout shifts
		let resizeObserver: ResizeObserver | null = null;
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				updateSectionBounds();
			});
			resizeObserver.observe(document.body);
		}

		// Dynamic measurements load timeouts as elements might adjust heights
		const timeouts = [100, 500, 1000, 2000].map((delay) => setTimeout(updateSectionBounds, delay));

		return () => {
			window.removeEventListener('scroll', updateScroll);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('resize', updateSectionBounds);

			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('wheel', onUserScrollInteraction);
			window.removeEventListener('touchstart', onUserScrollInteraction);

			if (resizeObserver) {
				resizeObserver.disconnect();
			}
			timeouts.forEach(clearTimeout);
		};
	});
</script>

<div
	class="timeline-dock"
	class:dragging={isDragging}
	role="slider"
	aria-label="Video Editor Scrubber Timeline"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={scrollPct}
>
	<div class="timeline-meta">
		<div class="telemetry">
			<span class="status-dot" class:playing={editorState.isPlaying}></span>
			<span class="status-txt">{editorState.isPlaying ? 'PLAYBACK' : 'SCRUBBING'}</span>

			{#if editorState.inPoint !== null || editorState.outPoint !== null}
				<span class="telemetry-sep">|</span>
				<span class="range-telemetry" title="Marked In/Out range duration">
					IN {formatPercentToTimecode(editorState.inPoint ?? 0)} &rarr; OUT {formatPercentToTimecode(
						editorState.outPoint ?? 100
					)} (DUR {formatPercentToTimecode(
						Math.max(0, (editorState.outPoint ?? 100) - (editorState.inPoint ?? 0))
					)})
				</span>
			{/if}
		</div>
		<div class="timecode-display" title="Current playhead timecode">
			{timecode} <span class="fps-indicator">[60fps]</span>
		</div>
	</div>

	<div class="timeline-workspace">
		<!-- Static Track Labels Column -->
		<div class="timeline-labels-column">
			<div class="track-label-row label-ruler" title="Personal capture: 60fps"></div>
			<div class="track-label-row label-v2">V2</div>
			<div class="track-label-row label-v1">V1</div>
		</div>

		<!-- Active Lanes & Scrubbing Area -->
		<div
			class="timeline-active-area"
			bind:this={timelineElement}
			onmousedown={onMouseDown}
			ontouchstart={onTouchStart}
			ontouchmove={onTouchMove}
			ontouchend={onTouchEnd}
			role="presentation"
		>
			<!-- Ruler/Tick Marks -->
			<div class="timeline-ruler">
				{#each Array(11) as _, i (i)}
					<div class="ruler-tick" style="left: {i * 10}%">
						<span>{Math.floor(((i * 10) / 100) * (scrollHeight / 100))}s</span>
					</div>
				{/each}
			</div>

			<!-- In/Out Range Highlight Overlay -->
			{#if editorState.inPoint !== null || editorState.outPoint !== null}
				{@const start = editorState.inPoint ?? 0}
				{@const end = editorState.outPoint ?? 100}
				<div class="in-out-range" style="left: {start}%; width: {Math.max(0, end - start)}%">
					{#if editorState.inPoint !== null}
						<div class="in-bracket">&lbrace;</div>
					{/if}
					{#if editorState.outPoint !== null}
						<div class="out-bracket">&rbrace;</div>
					{/if}
				</div>
			{/if}

			<!-- Video Track (V2) -->
			<div class="timeline-track video-track-v2">
				<div class="track-lane">
					{#each v2Clips as clip (clip.id)}
						<button
							type="button"
							class="timeline-clip clip-v2"
							style="left: {clip.start}%; width: {clip.end - clip.start}%"
							onclick={() => scrollToSection(clip.id)}
							class:active={scrollPct >= clip.start && scrollPct < clip.end}
						>
							<span class="clip-name">{clip.name}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Video Track (V1) -->
			<div class="timeline-track video-track-v1">
				<div class="track-lane">
					{#each v1Clips as sec (sec.id)}
						<button
							type="button"
							class="timeline-clip clip-v1"
							style="left: {sec.start}%; width: {sec.end - sec.start}%"
							onclick={() => scrollToSection(sec.id)}
							class:active={scrollPct >= sec.start && scrollPct < sec.end}
						>
							<span class="clip-name">{sec.name}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Playhead Needle -->
			<div class="playhead" style="left: {scrollPct}%">
				<div class="playhead-handle"></div>
				<div class="playhead-line"></div>
			</div>
		</div>
	</div>
</div>

<style>
	.timeline-dock {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 8.125rem;
		background: var(--bg-alt);
		border-top: 1px solid var(--border);
		z-index: 100;
		display: flex;
		flex-direction: column;
		padding: 0 1rem 0.5rem;
		box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
		user-select: none;
		-webkit-user-select: none;
	}

	.timeline-meta {
		height: 1.875rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--border);
		padding: 0 0.5rem;
	}

	.telemetry {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		color: var(--text-muted);
		letter-spacing: 0.1em;
	}

	.status-dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
		background: var(--gold);
		box-shadow: 0 0 8px var(--gold);
		transition: all 0.3s ease;
	}

	.status-dot.playing {
		background: #2ea043;
		box-shadow: 0 0 8px rgba(46, 160, 67, 0.8);
		animation: none; /* Solid green during active playback */
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.timecode-display {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--gold);
		letter-spacing: 0.1em;
		font-weight: 700;
	}

	.timeline-workspace {
		flex: 1;
		position: relative;
		margin-top: 0.375rem;
		display: flex;
		border: 1px solid var(--border);
		border-radius: 6px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.2);
	}

	/* Static Track Labels Column */
	.timeline-labels-column {
		width: 2.75rem;
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.35);
		flex-shrink: 0;
	}

	.track-label-row {
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 700;
		color: var(--text-muted);
		border-bottom: 1px solid rgba(35, 35, 44, 0.5);
		background: rgba(0, 0, 0, 0.1);
	}

	.label-ruler {
		height: 1.125rem;
		border-bottom: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.25);
	}

	.label-v1 {
		border-bottom: none;
	}

	/* Active Lanes & Scrubbing Area */
	.timeline-active-area {
		flex: 1;
		position: relative;
		cursor: ew-resize;
	}

	/* Ruler ticks */
	.timeline-ruler {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1.125rem;
		border-bottom: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.1);
		pointer-events: none;
	}

	.ruler-tick {
		position: absolute;
		height: 0.3125rem;
		width: 1px;
		background: var(--border);
		bottom: 0;
	}

	.ruler-tick span {
		position: absolute;
		bottom: 0.375rem;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--text-muted);
		opacity: 0.75;
		font-weight: 500;
	}

	/* Track lanes */
	.timeline-track {
		position: absolute;
		left: 0;
		right: 0;
		height: 2rem;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(35, 35, 44, 0.5);
		background: rgba(0, 0, 0, 0.05);
	}

	.video-track-v2 {
		top: 1.125rem;
	}

	.video-track-v1 {
		top: 3.125rem;
		border-bottom: none;
	}

	.track-lane {
		flex: 1;
		height: 100%;
		position: relative;
	}

	/* Clip items */
	.timeline-clip {
		position: absolute;
		top: 0.1875rem;
		bottom: 0.1875rem;
		border-radius: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 0 0.5rem;
	}

	/* V1 clip styles (gold) */
	.clip-v1 {
		background: rgba(223, 177, 91, 0.06);
		border: 1px solid rgba(223, 177, 91, 0.2);
		color: var(--text);
	}

	.clip-v1:hover {
		background: rgba(223, 177, 91, 0.14);
		border-color: var(--gold);
		box-shadow: 0 0 8px var(--gold-glow);
	}

	.clip-v1.active {
		background: rgba(223, 177, 91, 0.18);
		border-color: var(--gold);
		box-shadow: 0 0 12px var(--gold-glow);
	}

	/* V2 clip styles (cyan/blue) */
	.clip-v2 {
		background: rgba(56, 139, 253, 0.06);
		border: 1px solid rgba(56, 139, 253, 0.2);
		color: var(--text);
	}

	.clip-v2:hover {
		background: rgba(56, 139, 253, 0.14);
		border-color: #388bfd;
		box-shadow: 0 0 8px rgba(56, 139, 253, 0.25);
	}

	.clip-v2.active {
		background: rgba(56, 139, 253, 0.18);
		border-color: #388bfd;
		box-shadow: 0 0 12px rgba(56, 139, 253, 0.35);
	}

	.clip-name {
		font-family: var(--font-mono);
		font-size: 0.53125rem;
		font-weight: 700;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		letter-spacing: 0.05em;
	}

	/* Playhead */
	.playhead {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		pointer-events: none;
		transform: translateX(-50%);
		z-index: 100;
	}

	.playhead-handle {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0.75rem;
		height: 1.125rem;
		background: var(--gold);
		clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%);
		box-shadow: 0 0 10px var(--gold);
	}

	.playhead-line {
		width: 1px;
		height: 100%;
		background: var(--gold);
		box-shadow: 0 0 6px var(--gold);
	}

	.timeline-dock.dragging {
		border-top-color: var(--gold);
	}

	.timeline-dock.dragging .playhead-handle {
		transform: translateX(-50%) scale(1.15);
	}

	/* In/Out Range Styles */
	.in-out-range {
		position: absolute;
		top: 1.125rem;
		bottom: 0;
		background: rgba(223, 177, 91, 0.09);
		border-left: 1px dashed var(--gold);
		border-right: 1px dashed var(--gold);
		pointer-events: none;
		z-index: 80;
	}

	.in-bracket,
	.out-bracket {
		position: absolute;
		top: 0px;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 900;
		color: var(--gold);
		line-height: 1;
		text-shadow: 0 0 4px var(--gold-glow);
	}

	.in-bracket {
		left: 0.1875rem;
	}

	.out-bracket {
		right: 0.1875rem;
	}

	.telemetry-sep {
		opacity: 0.25;
		margin: 0 0.25rem;
	}

	.range-telemetry {
		color: var(--gold);
		opacity: 0.95;
		font-weight: 700;
	}

	.fps-indicator {
		font-size: 0.59375rem;
		color: var(--text-muted);
		font-weight: 700;
		letter-spacing: 0.05em;
		margin-left: 0.25rem;
		vertical-align: middle;
	}
</style>
