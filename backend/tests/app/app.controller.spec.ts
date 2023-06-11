import { HttpStatus, INestApplication } from '@nestjs/common';
import type { SuperTest } from 'supertest';

import { AppModule } from '../../src/app';
import { Messages } from '../../src/constants';
import { bootstrapIntegrationTest } from '../testing.utils';

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
