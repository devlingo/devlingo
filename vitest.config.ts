import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			reporter: ['text', 'json-summary', 'json'],
			exclude: [
				...(configDefaults.coverage.exclude ?? []),
				'backend/src/main.ts',
				'backend/src/modules/prisma/*.ts',
				'backend/tests/**/*.*',
				'frontend/src/pages/_app.tsx',
				'frontend/src/pages/_document.tsx',
				'frontend/tests/**/*.*',
				'shared/src/testing/**/*.*',
				'shared/tests/**/*.*',
			],
		},
		alias: {
			shared: resolve(__dirname, 'shared/src'),
		},
	},
});
