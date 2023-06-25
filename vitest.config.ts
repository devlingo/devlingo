import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
			exclude: [
				...(configDefaults.coverage.exclude ?? []),
				'frontend/tests/**/*.*',
				'backend/tests/**/*.*',
			],
		},
		alias: {
			shared: resolve(__dirname, 'shared'),
		},
	},
});
