import { Environment } from 'shared/constants';

import { validateEnv } from '@/utils/env';

describe('ENV utils tests', () => {
	describe('validateEnv tests', () => {
		const validConfig = {
			FIREBASE_CLIENT_EMAIL: 'my_firebase_client_email',
			FIREBASE_PRIVATE_KEY: 'my_firebase_private_key',
			FIREBASE_PROJECT_ID: 'my_firebase_project_id',
			NODE_ENV: Environment.Development,
			OPENAI_KEY: 'my_openai_key',
			REDIS_CONNECTION_STRING: 'redis://localhost:6379',
			SERVER_PORT: 3000,
		};
		it('passes for valid config', () => {
			expect(() => validateEnv(validConfig)).not.toThrow();
		});

		it.each(Object.keys(validConfig))(
			'throws for missing %s value',
			(key: unknown) => {
				const config: typeof validConfig = structuredClone(validConfig);
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete config[key as keyof typeof validConfig];
				expect(() => validateEnv(config)).toThrow();
			},
		);
	});
});
