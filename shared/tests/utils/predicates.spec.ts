import { Environment } from 'shared/constants';
import { isDevelopment, isProduction, isTest } from 'shared/utils/predicates';

describe('predicate utils tests', () => {
	afterEach(() => {
		process.env.NODE_ENV = Environment.Test;
	});
	describe('isDevelopment tests', () => {
		it("returns true when env is 'development'", () => {
			process.env.NODE_ENV = Environment.Development;
			expect(isDevelopment()).toBe(true);
		});

		it.each([Environment.Production, Environment.Test, 'staging'])(
			"returns false when env is '%s'",
			(env: string) => {
				process.env.NODE_ENV = env;
				expect(isDevelopment()).toBe(false);
			},
		);
	});
	describe('isProduction tests', () => {
		it("returns true when env is 'production'", () => {
			process.env.NODE_ENV = Environment.Production;
			expect(isProduction()).toBe(true);
		});

		it.each([Environment.Development, Environment.Test, 'staging'])(
			"returns false when env is '%s'",
			(env: string) => {
				process.env.NODE_ENV = env;
				expect(isProduction()).toBe(false);
			},
		);
	});
	describe('isTest tests', () => {
		it("returns true when env is 'production'", () => {
			process.env.NODE_ENV = Environment.Test;
			expect(isTest()).toBe(true);
		});

		it.each([Environment.Development, Environment.Production, 'staging'])(
			"returns false when env is '%s'",
			(env: string) => {
				process.env.NODE_ENV = env;
				expect(isTest()).toBe(false);
			},
		);
	});
});
