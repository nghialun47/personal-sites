import { execSync } from 'child_process';

async function auditPackage(pkgName) {
	console.log(`\x1b[36m=== Auditing Package: ${pkgName} ===\x1b[0m`);

	let actualPkgName = pkgName;
	let requestedVersion = null;

	if (pkgName.startsWith('@')) {
		const parts = pkgName.slice(1).split('@');
		actualPkgName = '@' + parts[0];
		requestedVersion = parts[1] || null;
	} else {
		const parts = pkgName.split('@');
		actualPkgName = parts[0];
		requestedVersion = parts[1] || null;
	}

	try {
		const res = await fetch(`https://registry.npmjs.org/${actualPkgName}`);
		if (!res.ok) {
			if (res.status === 404) {
				console.error(
					`\x1b[31mError: Package '${actualPkgName}' not found on npm registry.\x1b[0m`
				);
				process.exit(1);
			}
			throw new Error(`Registry responded with status ${res.status}`);
		}

		const data = await res.json();
		const targetVersion = requestedVersion || data['dist-tags']?.latest;
		if (!targetVersion) {
			console.warn('\x1b[33mWarning: No target version found.\x1b[0m');
			return;
		}

		const versionData = data.versions[targetVersion];
		if (!versionData) {
			console.error(
				`\x1b[31mError: Version '${targetVersion}' of package '${actualPkgName}' not found in registry.\x1b[0m`
			);
			process.exit(1);
		}

		const timeData = data.time;
		const publishTime = timeData[targetVersion];
		const publishDate = new Date(publishTime);
		const now = new Date();
		const ageDays = (now - publishDate) / (1000 * 60 * 60 * 24);

		console.log(`Audited version: ${targetVersion}`);
		console.log(`Published on:    ${publishDate.toISOString()} (${ageDays.toFixed(1)} days ago)`);
		console.log(`Author/Maintainer count: ${data.maintainers?.length || 0}`);

		// Rule 1: Release age threshold
		if (ageDays < 7) {
			console.warn(
				`\x1b[31m[CRITICAL WARNING] SGP-01: Version ${targetVersion} was published less than 7 days ago (${ageDays.toFixed(1)} days ago).\x1b[0m`
			);
			console.warn(
				'\x1b[33mThis could indicate a recent supply chain attack (hijacked package). Inspect before installing!\x1b[0m'
			);
		} else {
			console.log('\x1b[32m[SAFE] Package release age is older than 7 days.\x1b[0m');
		}

		// Rule 2: Package deprecation status
		if (versionData.deprecated) {
			console.warn(
				`\x1b[31m[WARNING] Package is marked as DEPRECATED: ${versionData.deprecated}\x1b[0m`
			);
		}

		// Run npm audit / pnpm audit on current project
		console.log('\x1b[34mRunning npm/pnpm audit security check...\x1b[0m');
		try {
			execSync(`pnpm audit --json`, { stdio: 'pipe' });
			console.log('\x1b[32m[SAFE] No active CVE vulnerabilities reported for workspace.\x1b[0m');
		} catch (auditError) {
			// pnpm audit returns non-zero exit code if vulnerabilities are found
			try {
				const auditOutput = JSON.parse(auditError.stdout.toString());
				console.warn('\x1b[31m[WARNING] Vulnerabilities found in workspace dependencies:\x1b[0m');
				console.warn(JSON.stringify(auditOutput, null, 2));
			} catch {
				console.warn('\x1b[31m[WARNING] Vulnerability check reported errors during audit.\x1b[0m');
			}
		}

		console.log('\x1b[36m=== Audit Complete ===\x1b[0m\n');
	} catch (error) {
		console.error(`\x1b[31mAudit failed: ${error.message}\x1b[0m`);
	}
}

const pkg = process.argv[2];
if (!pkg) {
	console.error('Usage: node scripts/audit-dep.js <package-name>');
	process.exit(1);
}

auditPackage(pkg);
