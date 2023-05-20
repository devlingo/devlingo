module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
	},
	extends: ['@tool-belt/eslint-config/react', 'next/core-web-vitals'],
	ignorePatterns: ['.eslintrc.js', '*.js'],
	settings: {
		'import/resolver': {
			typescript: {
				project: '.',
			},
		},
		'react': { version: '18' },
	},
	overrides: [
		{
			files: [
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/tests/*.*',
				'__mocks__/**/*.*',
			],
			extends: ['@tool-belt/eslint-config', 'plugin:vitest/recommended'],
		},
	],
	rules: {
		'testing-library/no-wait-for-side-effects': 0,
		'react-hooks/exhaustive-deps': 0,
	},
};
