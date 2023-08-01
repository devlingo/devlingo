import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
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
			'public': resolve(__dirname, './public'),
			'shared': resolve(__dirname, '../shared/src'),
		},
		setupFiles: ['./tests/vitest.setup.ts', './tests/mocks.ts'],
	},
});
