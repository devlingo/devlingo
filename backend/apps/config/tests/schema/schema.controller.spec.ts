import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigSchema, PrismaClient, Project } from '@prisma/client';
import { SchemaModule } from 'config/api/schema';
import { AppModule } from 'config/app';
import type { SuperTest } from 'supertest';
import { ConfigSchemaFactory, ProjectFactory } from 'testing/testing.factories';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

describe('Schema Controller Tests', () => {
	const prisma = new PrismaClient();
	let app: INestApplication;
	let request: SuperTest<any>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, SchemaModule],
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
		await prisma.configSchema.deleteMany();
	});

	describe('DELETE schema/:projectId/:version', () => {
		it('deletes a config schema using the version parameter', async () => {
			const configSchema = await prisma.configSchema.create({
				data: (await ConfigSchemaFactory.build({
					projectId: project.id,
				})) as unknown as any,
			});

			expect(await prisma.configSchema.findFirst()).toBeTruthy();

			const response = await request.delete(
				`/schema/${project.id}/${configSchema.version}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(await prisma.configSchema.findFirst()).toBeFalsy();
		});
	});

	describe('GET schema/:projectId/:version', () => {
		it('retrieves a config schema using the version parameter', async () => {
			const configSchema = await prisma.configSchema.create({
				data: (await ConfigSchemaFactory.build({
					projectId: project.id,
				})) as unknown as any,
			});
			const response = await request.get(
				`/schema/${project.id}/${configSchema.version}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(configSchema));
		});

		it('returns an informative error message when no matches are found for the version', async () => {
			const response = await request.get(`/schema/${project.id}/1`);
			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(JSON.parse(response.text).message).toEqual(
				'No ConfigSchema found',
			);
		});
	});

	describe('GET schema/:projectId', () => {
		it('retrieves the config schemas for a project using the projectId', async () => {
			const configSchemas = await ConfigSchemaFactory.batch(3, {
				projectId: project.id,
			});

			await prisma.configSchema.createMany({
				data: configSchemas as unknown as any,
			});
			const response = await request.get(`/schema/${project.id}/`);
			expect(response.statusCode).toEqual(HttpStatus.OK);

			const responseData = JSON.parse(response.text);
			expect(
				(responseData as ConfigSchema[]).map(
					(schema) => schema.version,
				),
			).toEqual(configSchemas.map((schema) => schema.version).sort());
		});
	});

	describe('POST schema/:projectId', () => {
		it('creates and returns a config schema', async () => {
			const schema = {
				type: 'object',
				required: ['foo'],
				properties: {
					bar: { type: 'string' },
					foo: { type: 'integer' },
				},
				additionalProperties: false,
			};
			const response = await request
				.post(`/schema/${project.id}/`)
				.send({ schema });
			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			const configSchema = JSON.parse(response.text) as ConfigSchema;
			expect(configSchema.version).toBeTruthy();
			expect(JSON.stringify(configSchema.schema)).toEqual(
				JSON.stringify(schema),
			);
		});
	});
});
