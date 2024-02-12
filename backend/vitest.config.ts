import { resolve } from 'node:path';

import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [swc.vite()],
	test: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'shared': resolve(__dirname, '../shared/src'),
			'tests': resolve(__dirname, 'tests'),
		},
		environment: 'node',
		globals: true,
	},
});
