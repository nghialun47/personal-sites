# Svelte Monorepo Developer Rules

- **Dependency Security**: You MUST run `node scripts/audit-dep.js <package>` and update `security_audit.md` before installing any dependency or executing any utility via `npx`.
- **TypeScript & Svelte**: Standard Svelte 5 runes and TypeScript strict checking are enforced across all workspaces.
- **Unit Testing**: Every new shared UI component added to `packages/shared-components` must have a corresponding `.test.ts` file covering basic prop configurations and window-event interactions.
- **Paths base resolution**: Always resolve static assets inside Svelte components relative to the SvelteKit base path using `{base}/asset-name`.
