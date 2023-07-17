const rules = {
	'testing-library/no-wait-for-side-effects': 0,
	'react-hooks/exhaustive-deps': 0,
	'@typescript-eslint/no-magic-numbers': 0,
	'@typescript-eslint/no-extraneous-class': 0,
	'sonarjs/elseif-without-else': 0,
};

const project = [
	'./tsconfig.json',
	'./backend/tsconfig.json',
	'./frontend/tsconfig.json',
];

const settings = {
	'import/parsers': {
		'@typescript-eslint/parser': ['.ts', '.tsx'],
	},
	'import/resolver': {
		typescript: {
			project,
		},
	},
};

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project,
	},
	settings,
	ignorePatterns: ['.eslintrc.js', '**/*.js', '*.js'],
	overrides: [
		{
			files: ['./frontend/**/*.ts', './frontend/**/*.tsx'],
			extends: [
				'@tool-belt/eslint-config/react',
				'plugin:@next/next/recommended',
			],
			rules: {
				...rules,
				'@next/next/no-html-link-for-pages': [
					'error',
					'frontend/src/pages/',
				],
				'react/react-in-jsx-scope': 0,
			},
		},
		{
			files: ['./frontend/**/*.spec.ts', './frontend/**/*.spec.tsx'],
			extends: [
				'@tool-belt/eslint-config/react',
				'plugin:vitest/recommended',
			],
			rules: { ...rules, 'react/react-in-jsx-scope': 0 },
		},
		{
			files: ['./backend/**/*.ts'],
			extends: ['@tool-belt/eslint-config'],
			rules,
		},
		{
			files: ['./backend/**/*.spec.ts'],
			extends: ['@tool-belt/eslint-config', 'plugin:vitest/recommended'],
			rules,
		},
	],
};
