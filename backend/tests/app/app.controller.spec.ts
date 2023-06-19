import { HttpStatus, INestApplication } from '@nestjs/common';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'tests/testing.utils';

import { AppModule } from '@/app';
import { Messages } from '@/constants';

vi.mock('firebase-admin', () => {
	return {
		initializeApp: vi.fn(() => ({})),
		auth: vi.fn().mockReturnValue({
			verifyIdToken: vi.fn((value = 'abc') => ({ uid: value })),
		}),
	};
});

vi.mock('@/utils/request.utils.ts', () => {
	return {
		getTokenFromRequest: () => 'abc',
	};
});

describe('App Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
	});

	afterAll(async () => {
		await app.close();
	});

	describe('GET /', () => {
		it('returns a health check message', async () => {
			const response = await request.get('/');
			expect(response.statusCode).toBe(HttpStatus.OK);
			expect(response.text).toBe(Messages.HEALTH_CHECK);
		});
	});
});
