---
name: svelte-monorepo
description: |
  Provides architecture context, build scripts, testing procedures, and deployment workflows for Svelte/SvelteKit monorepo workspaces.
  Trigger when editing applications under sites/, shared components under packages/, editing build/deploy workflows, running tests, or performing dependency safety checks.
---

# Svelte Monorepo Skill Guide

This skill provides context on how this multi-site monorepo is set up and how to maintain it.

## Codebase Architecture

- **Root**: Workspace scripts, configs, and workflow definitions.
- **packages/shared-components**: Shared Svelte 5 component library using TypeScript.
- **sites/<site-name>**: SvelteKit applications using Svelte 5 and TypeScript.
- **scripts/audit-dep.js**: Safety audit CLI tool.

## Key Workflows

### 1. Dependency Installation & Safety Audits

All dependencies must be audited:

1. Run `node scripts/audit-dep.js <pkg>`.
2. Review warning outputs (flagged if published under 7 days ago).
3. If safe, add dependency using pnpm (e.g., `pnpm add <pkg> --filter <workspace-name>`).
4. Update the `security_audit.md` log file.

### 2. Testing

Run the Vitest unit tests in the workspace:
`pnpm test`

### 3. Deployments (GitHub Pages Branch Previews)

CI/CD runs on push to any branch:

- **main:** Builds production sites under `sites/` to `build_output/<site-name>` and handles root redirection.
- **feature branches:** Builds branch previews to `build_output/preview/<branch-name>/<site-name>`.
- All outputs are synced to the `gh-pages` branch.
