module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
	},
	extends: [
		'@tool-belt/eslint-config/react',
		'next/core-web-vitals',
		'plugin:jest/recommended',
	],
	ignorePatterns: ['.eslintrc.js', '*.js'],
	settings: {
		'import/resolver': {
			typescript: {
				project: '.',
			},
		},
		'react': { version: '18' },
	},
	env: {
		'jest/globals': true,
	},
	rules: {
		'testing-library/no-wait-for-side-effects': 0,
	},
};
