import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import magicalSvg from 'vite-plugin-magical-svg';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react(), magicalSvg({ target: 'react' })],
	test: {
		globals: true,
		environment: 'jsdom',
		alias: {
			'@': resolve(__dirname, './src'),
			'tests': resolve(__dirname, './tests'),
		},
		setupFiles: './tests/setup.ts',
	},
});
