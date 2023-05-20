import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		alias: {
			'@': resolve(__dirname, './src'),
		},
		setupFiles: './tests/setup.ts',
	},
});
