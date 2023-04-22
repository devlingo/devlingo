import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig = {
	roots: ['<rootDir>'],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
	),
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: ['.*\\.spec\\.ts$'],
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['apps/**/src/**/*.ts', 'apps/shared/**/*.ts'],
	coveragePathIgnorePatterns: ['main.ts', 'prisma.service.ts'],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	cacheDirectory: '.jest/cache',
	testTimeout: 10000,
} satisfies Config;

export default jestConfig;
