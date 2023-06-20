const rules = {
	'testing-library/no-wait-for-side-effects': 0,
	'react-hooks/exhaustive-deps': 0,
	'@typescript-eslint/no-magic-numbers': 0,
	'@typescript-eslint/no-extraneous-class': 0,
};

const project = ['./backend/tsconfig.json', './frontend/tsconfig.json'];

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				project,
			},
		},
		'react': { version: '18' },
	},
	ignorePatterns: ['.eslintrc.js', '**/*.js', '*.js'],
	overrides: [
		{
			files: ['./frontend/**/*.ts', './frontend/**/*.tsx'],
			extends: ['@tool-belt/eslint-config/react', 'next/core-web-vitals'],
			rules,
		},
		{
			files: ['./frontend/**/*.spec.ts', './frontend/**/*.spec.tsx'],
			extends: [
				'@tool-belt/eslint-config/react',
				'plugin:vitest/recommended',
			],
			rules,
			parser: '@typescript-eslint/parser',
			parserOptions: {
				tsconfigRootDir: __dirname + '/frontend',
				project: './tsconfig.json',
			},
		},
		{
			files: ['./backend/**/*.ts'],
			extends: ['@tool-belt/eslint-config'],
			rules,
			parser: '@typescript-eslint/parser',
			parserOptions: {
				tsconfigRootDir: __dirname + '/backend',
				project: './tsconfig.json',
			},
		},
		{
			files: ['./backend/**/*.spec.ts'],
			extends: ['@tool-belt/eslint-config', 'plugin:vitest/recommended'],
			rules,
			parser: '@typescript-eslint/parser',
			parserOptions: {
				tsconfigRootDir: __dirname + '/backend',
				project: './tsconfig.json',
			},
		},
	],
};
