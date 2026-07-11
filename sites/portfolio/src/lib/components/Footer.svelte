<script lang="ts">
	import { base } from '$app/paths';
	const year = new Date().getFullYear();
</script>

<footer class="footer-dock">
	<div class="wrap footer-container">
		<div class="footer-copy">
			© {year} ETHAN VAN <span class="footer-sep">•</span>
			<a href="{base}/privacy" class="privacy-link">PRIVACY POLICY</a>
		</div>
	</div>
</footer>

<style>
	.footer-dock {
		border-top: 1px solid var(--border);
		background: var(--bg-alt);
		padding: 2.25rem 0 10rem; /* Generous bottom padding to prevent timeline dock overlap */
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.footer-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-copy {
		font-weight: 700;
	}

	.privacy-link {
		color: var(--text-muted);
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.privacy-link:hover {
		color: var(--gold);
	}

	.footer-sep {
		color: var(--border);
		margin: 0 0.25rem;
	}

	@media (max-width: 37.5em) {
		.footer-container {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
