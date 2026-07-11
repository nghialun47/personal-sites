<section class="clients-section" id="clients-section">
	<div class="wrap reveal" id="clients-wrap">
		<div class="sub-section-header">
			<span class="label-telemetry">CLIENTS</span>
			<h3>Worked with creators like</h3>
		</div>

		<div class="clients-grid">
			<div class="client-item">
				<div class="avatar-initials">ND</div>
				<div class="client-info">
					<div class="name">Noel Deyzel</div>
					<div class="meta">7 Million Subscribers</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.clients-section {
		text-align: center;
		padding: 3.75rem 0 6.25rem;
		background: linear-gradient(180deg, transparent, var(--bg-alt));
	}

	.clients-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2.5rem;
	}

	.client-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--surface);
		border: 1px solid var(--border);
		padding: 1.5rem 2.5rem;
		border-radius: 6px;
		transition: all 0.3s ease;
	}

	.client-item:hover {
		border-color: var(--gold);
		box-shadow: 0 8px 24px var(--gold-glow);
		transform: translateY(-2px);
	}

	.avatar-initials {
		position: relative;
		width: 5.625rem;
		height: 5.625rem;
		border-radius: 50%;
		background: #000;
		border: 1px solid var(--gold);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--gold);
	}

	.client-info {
		margin-top: 1rem;
	}

	.client-item .name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1rem;
		text-transform: uppercase;
		color: var(--text);
	}

	.client-item .meta {
		margin-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--gold);
		font-weight: 700;
	}
</style>
