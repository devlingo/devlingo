import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProjectModule } from 'project-service/api/project';
import { AppModule } from 'project-service/app';
import type { SuperTest } from 'supertest';
import { ProjectFactory } from 'testing/testing.factories';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

describe('Project Controller Tests', () => {
	const prisma = new PrismaClient();
	let app: INestApplication;
	let request: SuperTest<any>;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, ProjectModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
	});

	afterAll(async () => {
		await app.close();
	});

	afterEach(async () => {
		await prisma.project.deleteMany();
	});

	describe('POST projects', () => {
		it('creates a project', async () => {
			const { name } = await ProjectFactory.build();
			const response = await request.post('/projects').send({ name });

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			const project = JSON.parse(response.text);
			expect(project.name).toEqual(name);

			await prisma.project.delete({ where: { id: project.id } });
		});
	});

	describe('GET projects', () => {
		it('retrieves all projects', async () => {
			await prisma.project.createMany({
				data: await ProjectFactory.batch(3),
			});
			const response = await request.get('/projects');

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(JSON.parse(response.text)).toHaveLength(3);
		});
	});

	describe('GET projects/:projectId', () => {
		it('retrieves a project by ID', async () => {
			const project = await prisma.project.create({
				data: await ProjectFactory.build(),
			});
			const response = await request.get(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(project));
		});

		it('returns an informative error message', async () => {
			const response = await request.get(
				`/projects/${faker.datatype.uuid()}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(JSON.parse(response.text).message).toEqual(
				'No Project found',
			);
		});
	});

	describe('DELETE projects/:projectId', () => {
		it('deletes a project by ID', async () => {
			const project = await prisma.project.create({
				data: await ProjectFactory.build(),
			});
			const response = await request.delete(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
		});
	});
});
