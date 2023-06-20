import { configDefaults, defineConfig } from 'vitest/config';

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
	},
});
