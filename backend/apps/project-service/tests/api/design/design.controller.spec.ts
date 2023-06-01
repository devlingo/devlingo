import { HttpStatus, INestApplication } from '@nestjs/common';
import { Design, PrismaClient, Project } from '@prisma/client';
import { DesignModule } from 'project-service/api/design';
import { AppModule } from 'project-service/app';
import type { SuperTest } from 'supertest';
import { DesignFactory, ProjectFactory } from 'testing/testing.factories';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

describe('Design Controller Tests', () => {
	const prisma = new PrismaClient();
	let app: INestApplication;
	let request: SuperTest<any>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, DesignModule],
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
	});

	afterEach(async () => {
		await prisma.project.deleteMany();
		await prisma.design.deleteMany();
	});

	describe('POST design/:projectId', () => {
		it('creates and returns a design', async () => {
			const name = 'abc';
			const data = { a: 'b' };

			const response = await request
				.post(`/design/${project.id}`)
				.send({ name, data });

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			const design = response.body as Design;

			expect(design.name).toEqual(name);
			expect(JSON.stringify(design.data)).toEqual(JSON.stringify(data));
		});
	});

	describe('GET design/:projectId', () => {
		it('retrieves a list of available designs and versions for a given project', async () => {
			const designs = await DesignFactory.batch(3, {
				projectId: project.id,
			});

			await prisma.design.createMany({
				data: designs as unknown as any,
			});
			const response = await request.get(`/design/${project.id}/`);

			expect(response.statusCode).toEqual(HttpStatus.OK);

			const responseData = response.body;
			expect(
				(responseData as { name: string; version: number }[]).map(
					({ name }) => name,
				),
			).toEqual(designs.map(({ name }) => name).sort());
			expect(
				(responseData as { name: string; version: number }[]).map(
					({ version }) => version,
				),
			).toEqual(designs.map(({ version }) => version).sort());
		});
	});

	describe('GET design/:projectId/:name/:version', () => {
		it('retrieves a design using the name and version parameters', async () => {
			const name = 'abc';
			const data = { a: 'b' };
			const design = await prisma.design.create({
				data: { data, name, projectId: project.id },
			});
			const response = await request.get(
				`/design/${project.id}/${design.name}/${design.version}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(design));
		});

		it('returns an informative error message', async () => {
			const response = await request.get(`/design/${project.id}/abc/2`);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toEqual('No Design found');
		});
	});

	describe('DELETE design/:projectId/:name/:version', () => {
		it('deletes a design version using the name and version parameters', async () => {
			const name = 'abc';
			const data = { a: 'b' };
			const design = await prisma.design.create({
				data: { data, name, projectId: project.id },
			});

			expect(await prisma.design.findFirst()).toBeTruthy();
			const response = await request.delete(
				`/design/${project.id}/${design.name}/${design.version}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(await prisma.design.findFirst()).toBeFalsy();
		});
	});
});
