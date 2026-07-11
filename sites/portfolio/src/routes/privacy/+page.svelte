<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Privacy Policy - Ethan Van</title>
	<meta
		name="description"
		content="Privacy Policy for Ethan Van's video editing portfolio website."
	/>
</svelte:head>

<Nav logoFirst="Ethan" logoLast="Van" />

<main class="privacy-main">
	<div class="wrap reveal in">
		<div class="privacy-header">
			<span class="label-telemetry">COMPLIANCE // DOCUMENTATION</span>
			<h1>Privacy Policy</h1>
			<p class="last-updated">Last Updated: July 11, 2026</p>
		</div>

		<div class="privacy-content">
			<section>
				<h2>1. Introduction</h2>
				<p>
					Welcome to the professional video editing portfolio of Ethan Van ("we", "our", or "us").
					We are committed to protecting your privacy. This Privacy Policy explains how information
					is processed when you visit our website.
				</p>
			</section>

			<section>
				<h2>2. Third-Party Embeds & Services</h2>
				<p>
					Our website displays portfolio work using third-party embeds. When you view pages
					containing these embeds, your browser automatically establishes a direct connection to the
					third-party servers.
				</p>
				<ul>
					<li>
						<strong>YouTube:</strong> We embed video players hosted on YouTube to showcase long-form
						editing work. We also query the Google YouTube Data API to display live, up-to-date
						video view counts. By interacting with these videos, YouTube/Google may collect
						technical identifiers, including your IP address, device specifications, and cookie
						data. You can review
						<a href="https://policies.google.com/privacy" target="_blank" rel="noopener"
							>Google's Privacy Policy</a
						> for details.
					</li>
					<li>
						<strong>Instagram:</strong> We embed reels and posts hosted on Instagram to showcase
						short-form editing work. Meta Platforms, Inc. may collect data regarding your visit,
						device details, and play interactions. You can review
						<a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener"
							>Instagram's Privacy Policy</a
						> for details.
					</li>
				</ul>
			</section>

			<section>
				<h2>3. Content Delivery & Security (Cloudflare)</h2>
				<p>
					We use Cloudflare, Inc. as our Content Delivery Network (CDN) and security provider to
					optimize page loading speeds, protect our infrastructure from Distributed Denial of
					Service (DDoS) attacks, and mitigate automated bot abuse.
				</p>
				<p>
					In doing so, Cloudflare processes request metadata (including your IP address, request
					timestamp, browser configurations, and HTTP headers). Cloudflare may also set essential
					cookies (such as <code>__cf_bm</code> or security tokens) that are strictly necessary to
					verify client requests and maintain network security. These cookies do not harvest
					personal credentials or index browsing histories. For more information, please read the
					<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener"
						>Cloudflare Privacy Policy</a
					>.
				</p>
			</section>

			<section>
				<h2>4. Data Collection & Analytics</h2>
				<p>
					We do not directly collect, harvest, or sell personal identifiers or search behaviors on
					this site. We do not use proprietary analytical databases or registration portals.
				</p>
				<p>
					Any statistical data displayed (e.g. view counts, video telemetry metrics) is derived
					either from public metrics or retrieved dynamically via official developer APIs
					representing video performance on external host sites.
				</p>
			</section>

			<section>
				<h2>5. Cookies & Local Storage</h2>
				<p>
					This website does not store proprietary tracking cookies. However, the third-party embeds
					(YouTube and Instagram) may set tracking cookies or write to local storage on your browser
					to measure playback stats, maintain quality standards, or deliver personalized
					recommendations. Additionally, Cloudflare may place essential cookies for security and
					bot-detection. You can manage or disable these cookies using your web browser's built-in
					privacy configurations.
				</p>
			</section>

			<section>
				<h2>6. External Links</h2>
				<p>
					Our website links to social media and professional networking sites, specifically
					LinkedIn. We are not responsible for the privacy practices or contents of these external
					sites.
				</p>
			</section>

			<section>
				<h2>7. Contact</h2>
				<p>
					If you have questions regarding this Privacy Policy, please contact us via our LinkedIn
					profile page.
				</p>
			</section>
		</div>
	</div>
</main>

<Footer />

<style>
	.privacy-main {
		min-height: 100vh;
		padding-top: 8.75rem; /* Space for the fixed navbar */
		padding-bottom: 5rem;
		background: var(--bg);
		color: var(--text);
	}

	.privacy-header {
		border-bottom: 1px solid var(--border);
		padding-bottom: 2rem;
		margin-bottom: 3rem;
	}

	.privacy-header h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		margin-top: 0.75rem;
		color: var(--text);
		line-height: 1.15;
	}

	.last-updated {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		color: var(--gold);
		margin-top: 0.5rem;
		letter-spacing: 0.05em;
	}

	.privacy-content {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		max-width: 50rem;
	}

	.privacy-content section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.privacy-content h2 {
		font-size: 1.25rem;
		color: var(--text);
		border-left: 2px solid var(--gold);
		padding-left: 0.75rem;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.privacy-content p {
		color: var(--text-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.privacy-content ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-left: 0.75rem;
	}

	.privacy-content li {
		color: var(--text-muted);
		font-size: 0.9375rem;
		line-height: 1.6;
		position: relative;
		padding-left: 1rem;
	}

	.privacy-content li::before {
		content: '•';
		color: var(--gold);
		position: absolute;
		left: 0;
		top: 0;
		font-weight: bold;
	}

	.privacy-content a {
		color: var(--gold);
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: opacity 0.2s ease;
	}

	.privacy-content a:hover {
		opacity: 0.8;
	}
</style>
