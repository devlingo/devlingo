import { HttpStatus, INestApplication } from '@nestjs/common';
import { Design, PrismaClient, Project } from '@prisma/client';
import { PromptModule } from 'ai-service/api/prompt-service';
import { AppModule } from 'ai-service/app';
import type { SuperTest } from 'supertest';
import { ProjectFactory } from 'testing/testing.factories';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

describe('Prompt Controller Tests', () => {
	const prisma = new PrismaClient();
	let app: INestApplication;
	let request: SuperTest<any>;

	let project: Project;
	let design: Design;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, PromptModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		project = await prisma.project.create({
			data: await ProjectFactory.build(),
		});

		design = await prisma.design.create({
			data: { name: 'abc', data: { a: 'b' }, projectId: project.id },
		});
	});

	afterEach(async () => {
		await prisma.project.deleteMany();
		await prisma.design.deleteMany();
	});

	describe('POST prompt/', () => {
		it('sends a prompt request to %s', async () => {
			const response = await request.post(`/prompt`).send({
				name: design.name,
				version: design.version,
				projectId: project.id,
				promptContent: 'please create xyz',
			});

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
		});
	});
});
