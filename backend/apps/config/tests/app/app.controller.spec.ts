import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'config/app';
import { Messages } from 'shared/constants';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

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

	it('/ (GET)', async () => {
		const response = await request.get('/');
		expect(response.statusCode).toBe(HttpStatus.OK);
		expect(response.text).toBe(Messages.HEALTH_CHECK);
	});
});
