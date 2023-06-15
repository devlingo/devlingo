import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import type { SuperTest } from 'supertest';
import { ProjectFactory } from 'tests/testing.factories';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import { DeepMockProxy } from 'vitest-mock-extended';

import { ProjectModule } from '@/api/project';
import { AppModule } from '@/app';

describe('Project Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, ProjectModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
		prisma = bootstrap.prisma;
	});

	afterAll(async () => {
		await app.close();
	});

	describe('POST projects', () => {
		it('creates a project', async () => {
			const project = await ProjectFactory.build();
			prisma.project.create.mockResolvedValueOnce(project);
			const response = await request
				.post('/projects')
				.send({ name: project.name });

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body.name).toEqual(project.name);
		});
	});

	describe('GET projects', () => {
		it('retrieves all projects', async () => {
			const projects = await ProjectFactory.batch(3);
			prisma.project.findMany.mockResolvedValueOnce(projects);
			const response = await request.get('/projects');

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toHaveLength(3);
		});
	});

	describe('GET projects/:projectId', () => {
		it('retrieves a project by ID', async () => {
			const project = await ProjectFactory.build();
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			const response = await request.get(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(project));
		});

		it('returns an informative error message', async () => {
			prisma.project.findUniqueOrThrow.mockImplementationOnce(() => {
				throw new Prisma.NotFoundError('No Project found');
			});
			const response = await request.get(
				`/projects/${faker.string.uuid()}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Project found');
		});
	});

	describe('DELETE projects/:projectId', () => {
		it('deletes a project by ID', async () => {
			const project = await ProjectFactory.build();
			const response = await request.delete(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
		});
	});
});
