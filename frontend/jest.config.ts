import type { Config } from 'jest';

const jestConfig = {
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testRegex: ['.*\\.spec\\.ts[x]?$'],
	transform: {
		'^.+\\.ts[x]?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^tests/(.*)$': '<rootDir>/tests/$1',
		'^.+\\.(css|less|scss)$': '<rootDir>/config/cssStub.ts',
	},
	collectCoverageFrom: ['src'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	cacheDirectory: '.jest/cache',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
} satisfies Config;

export default jestConfig;
