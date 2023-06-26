import { Environment } from 'shared/constants';

import { validateEnv } from '@/utils/env.utils';

describe('ENV utils tests', () => {
	describe('validateEnv tests', () => {
		const validConfig = {
			NODE_ENV: Environment.Development,
			REDIS_CONNECTION_STRING: 'redis://localhost:6379',
			OPENAI_KEY: 'my_openai_key',
			SERVER_PORT: 3000,
			FIREBASE_PROJECT_ID: 'my_firebase_project_id',
			FIREBASE_CLIENT_EMAIL: 'my_firebase_client_email',
			FIREBASE_PRIVATE_KEY: 'my_firebase_private_key',
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
