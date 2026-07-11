import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

declare const process: {
	env: {
		VITEST?: string;
		[key: string]: string | undefined;
	};
};

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		conditions: process.env.VITEST ? ['browser'] : undefined
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts']
	}
});
