import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		globals: true,
		alias: {
			shared: resolve(__dirname, 'src'),
		},
	},
});
