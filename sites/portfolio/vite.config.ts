import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

declare const process: {
	env: {
		BASE_PATH?: string;
		VITEST?: string;
		[key: string]: string | undefined;
	};
};

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			paths: {
				base: (process.env.BASE_PATH || '') as '' | `/${string}`
			}
		})
	],
	resolve: {
		conditions: process.env.VITEST ? ['browser'] : undefined
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts']
	}
});
