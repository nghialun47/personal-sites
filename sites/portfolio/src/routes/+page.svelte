<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	// Import components
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import VelocityTicker from '$lib/components/VelocityTicker.svelte';
	import Work from '$lib/components/Work.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import Testimony from '$lib/components/Testimony.svelte';
	import About from '$lib/components/About.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	onMount(() => {
		// Intersection Observer to trigger scroll reveal animations
		const reveals = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in');
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		reveals.forEach((el) => io.observe(el));

		return () => {
			io.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Video Editor Portfolio - Ethan Van</title>
	<meta
		name="description"
		content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Video Editor Portfolio - Ethan Van" />
	<meta
		property="og:description"
		content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."
	/>
	<meta property="og:image" content="{base}/ethan-photo.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Video Editor Portfolio - Ethan Van" />
	<meta
		property="twitter:description"
		content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."
	/>
	<meta property="twitter:image" content="{base}/ethan-photo.jpg" />

	<!-- Schema.org JSON-LD Structured Data for Person / ProfessionalService -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Ethan Van",
			"jobTitle": "Professional Video Editor",
			"description": "Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling.",
			"image": "{base}/ethan-photo.jpg",
			"url": "https://www.linkedin.com/in/ethan-van/",
			"sameAs": ["https://www.linkedin.com/in/ethan-van/"],
			"knowsAbout": [
				"Video Editing",
				"Pacing",
				"Sound Design",
				"Audience Retention",
				"Storytelling",
				"Short-form Video Creation",
				"Multicam Editing"
			]
		}
	</script>
</svelte:head>

<!-- Global Nav -->
<Nav logoFirst="Ethan" logoLast="Van" />

<div class="viewport-wrap">
	<!-- Sections -->
	<Hero />
	<VelocityTicker />

	<Work />

	<Clients />
	<Testimony />
	<About />
	<Footer />
</div>

<!-- Global Bottom Scrubber Timeline -->
<Timeline />
