import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [swc.vite()],
	test: {
		globals: true,
		environment: 'node',
		alias: {
			'@': resolve(__dirname, 'src'),
			'tests': resolve(__dirname, 'tests'),
			'shared': resolve(__dirname, '../shared/src'),
		},
	},
});
