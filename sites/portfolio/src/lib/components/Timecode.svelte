<script lang="ts">
	let { label = '00:00:00:00' } = $props();
</script>

<div class="telemetry-timecode">
	<span class="pulse-dot"></span>
	<span class="timecode-text">{label}</span>
</div>

<style>
	.telemetry-timecode {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.12em;
		color: var(--gold);
		text-transform: uppercase;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(223, 177, 91, 0.05);
		border: 1px solid rgba(223, 177, 91, 0.15);
		padding: 0.25rem 0.625rem;
		border-radius: 4px;
		width: fit-content;
	}

	.pulse-dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
		background: var(--gold);
		box-shadow: 0 0 8px var(--gold);
		animation: pulse 1.8s infinite ease-in-out;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.35;
			transform: scale(0.85);
		}
	}

	.timecode-text {
		font-weight: 700;
	}
</style>
