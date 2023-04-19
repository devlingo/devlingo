import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'config/app';
import { Messages } from 'shared/constants';
import request from 'supertest';

describe('App Controller Tests', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', async () => {
		const response = await request(app.getHttpServer()).get('/');
		expect(response.statusCode).toBe(HttpStatus.OK);
		expect(response.text).toBe(Messages.HEALTH_CHECK);
	});
});
