module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
	},
	extends: ['@tool-belt/eslint-config'],
	ignorePatterns: ['.eslintrc.js'],
	overrides: [
		{
			files: ['**/*.spec.ts'],
			extends: ['@tool-belt/eslint-config', 'plugin:jest/recommended'],
		},
	],
	settings: {
		'import/resolver': {
			typescript: {
				project: '.',
			},
		},
	},
	rules: {
		'@typescript-eslint/no-extraneous-class': 0,
	},
};
