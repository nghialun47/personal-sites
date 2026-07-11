import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Timeline from './Timeline.svelte';

describe('Timeline Component', () => {
	beforeEach(() => {
		// Reset DOM and scroll mocks
		document.body.innerHTML = '';
		vi.stubGlobal('scrollTo', vi.fn());

		// Mock scroll height and inner height
		Object.defineProperty(document.documentElement, 'scrollHeight', {
			value: 2000,
			writable: true,
			configurable: true
		});

		vi.stubGlobal('innerHeight', 1000);

		const elNames = [
			'ticker',
			'work',
			'work-longform',
			'work-shortform',
			'clients-wrap',
			'testimony-wrap',
			'about',
			'about-container'
		];

		elNames.forEach((id, index) => {
			const el = document.createElement('div');
			el.id = id;
			// Setup mock positions:
			// hero is at 0
			// ticker is at 200
			// work (longform) is at 500
			// work-shortform is at 800
			// clients-wrap is at 1000
			// testimony-wrap is at 1200
			// about-container is at 1500
			const heights = [200, 500, 800, 1000, 1200, 1500, 1600];
			const topVal = index === 0 ? 0 : heights[index - 1];

			el.getBoundingClientRect = vi.fn(() => ({
				top: topVal - window.scrollY,
				bottom: topVal + 100 - window.scrollY,
				left: 0,
				right: 100,
				width: 100,
				height: 100,
				x: 0,
				y: topVal - window.scrollY,
				toJSON: () => {}
			}));

			document.body.appendChild(el);
		});
	});

	it('renders track labels V1 and V2', () => {
		const { getByText } = render(Timeline);
		expect(getByText('V1')).toBeInTheDocument();
		expect(getByText('V2')).toBeInTheDocument();
	});

	it('initializes playhead at 0%', () => {
		render(Timeline);
		const playhead = document.querySelector('.playhead');
		expect(playhead).toBeInTheDocument();
		expect(playhead).toHaveStyle({ left: '0%' });
	});

	it('calculates section positions dynamically based on mock elements', async () => {
		// Svelte 5 processes mounting and updates in Microtasks.
		// Wait for the next tick for onMount callbacks to complete
		render(Timeline);
		await new Promise((resolve) => setTimeout(resolve, 0));

		// Verify clips have been rendered
		const heroClip = screen.getByText('INTRO');
		const showcaseClip = screen.getByText('SHOWCASE');
		const bioClips = screen.getAllByText('BIO');

		expect(heroClip).toBeInTheDocument();
		expect(showcaseClip).toBeInTheDocument();
		expect(bioClips[0]).toBeInTheDocument();

		// Verify dynamic positioning calculation:
		// scrollHeight = 2000
		// s0 = 0 (hero)
		// s2 = Math.max(0, 200 - 80) = 120 (work offset)
		// p2 = (120 / 2000) * 100 = 6%
		// intro end should be 6%
		// showcase start should be 6%

		// Let's check clip button styles:
		const heroBtn = heroClip.closest('button');
		const showcaseBtn = showcaseClip.closest('button');

		expect(heroBtn).toHaveStyle({ left: '0%', width: '6%' });
		expect(showcaseBtn).toHaveStyle({ left: '6%', width: '65%' });
	});

	it('scrolls page when dragging the scrubber', async () => {
		const { container } = render(Timeline);
		await new Promise((resolve) => setTimeout(resolve, 0));

		const activeArea = container.querySelector('.timeline-active-area');
		expect(activeArea).toBeInTheDocument();

		// Mock bounding rectangle of active area
		activeArea!.getBoundingClientRect = vi.fn(() => ({
			left: 100,
			right: 1100,
			width: 1000,
			top: 0,
			bottom: 100,
			height: 100,
			x: 100,
			y: 0,
			toJSON: () => {}
		}));

		// Trigger drag starting halfway (clientX = 600)
		// pct should be (600 - 100) / 1000 * 100 = 50%
		await fireEvent.mouseDown(activeArea!, { button: 0, clientX: 600 });

		const playhead = document.querySelector('.playhead');
		expect(playhead).toHaveStyle({ left: '50%' });
		expect(window.scrollTo).toHaveBeenCalledWith({
			top: 1000, // 50% timeline mapped between 500px and 1500px y
			behavior: 'auto'
		});
	});

	it('handles Premiere keyboard shortcuts for setting In and Out points', async () => {
		render(Timeline);
		await new Promise((resolve) => setTimeout(resolve, 0));

		// Import editorState to inspect and mutate for verification
		const { editorState } = await import('../editorState.svelte');
		editorState.clearSelection();
		editorState.isPlaying = false;

		// Simulate keydown 'i' to set In point
		await fireEvent.keyDown(window, { key: 'i' });
		expect(editorState.inPoint).toBeCloseTo(0);

		// Simulate keydown 'Space' to toggle play state
		await fireEvent.keyDown(window, { code: 'Space' });
		expect(editorState.isPlaying).toBe(true);

		// Toggle back
		await fireEvent.keyDown(window, { code: 'Space' });
		expect(editorState.isPlaying).toBe(false);

		// Simulate keydown 'x' to clear
		await fireEvent.keyDown(window, { key: 'x' });
		expect(editorState.inPoint).toBeNull();
		expect(editorState.outPoint).toBeNull();
	});
});
