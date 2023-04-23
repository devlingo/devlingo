import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigurationOption, PrismaClient, Project } from '@prisma/client';
import { ConfigurationOptionModule } from 'apps/config/src/api/configuration-option';
import { AppModule } from 'config/app';
import type { SuperTest } from 'supertest';
import {
	ConfigurationOptionFactory,
	ProjectFactory,
} from 'testing/testing.factories';
import { bootstrapIntegrationTest } from 'testing/testing.utils';

describe('Configuration Options Controller Tests', () => {
	const prisma = new PrismaClient();
	let app: INestApplication;
	let request: SuperTest<any>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, ConfigurationOptionModule],
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
		await prisma.configurationOption.deleteMany();
	});

	describe('POST configuration-option/:projectId', () => {
		it('creates and returns a configuration option', async () => {
			const key = 'test';
			const description = 'a b c';
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
				.post(`/configuration-options/${project.id}`)
				.send({ schema, key, description });

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			const configurationOption = JSON.parse(
				response.text,
			) as ConfigurationOption;

			expect(configurationOption.key).toEqual(key);
			expect(configurationOption.description).toEqual(description);
			expect(JSON.stringify(configurationOption.schema)).toEqual(
				JSON.stringify(schema),
			);
		});
	});

	describe('GET configuration-option/:projectId', () => {
		it('retrieves the configuration options for a project', async () => {
			const configurationOptions = await ConfigurationOptionFactory.batch(
				3,
				{
					projectId: project.id,
				},
			);

			await prisma.configurationOption.createMany({
				data: configurationOptions as unknown as any,
			});
			const response = await request.get(
				`/configuration-options/${project.id}/`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);

			const responseData = JSON.parse(response.text);
			expect(
				(responseData as ConfigurationOption[]).map(
					(schema) => schema.key,
				),
			).toEqual(configurationOptions.map((schema) => schema.key).sort());
		});
	});

	describe('GET configuration-option/:projectId/:key', () => {
		it('retrieves a configuration option using the key parameter', async () => {
			const configurationOption = await prisma.configurationOption.create(
				{
					data: (await ConfigurationOptionFactory.build({
						projectId: project.id,
					})) as unknown as any,
				},
			);
			const response = await request.get(
				`/configuration-options/${project.id}/${configurationOption.key}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(configurationOption));
		});

		it('returns an informative error message', async () => {
			const response = await request.get(
				`/configuration-options/${project.id}/1`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(JSON.parse(response.text).message).toEqual(
				'No ConfigurationOption found',
			);
		});
	});

	describe('DELETE configuration-option/:projectId/:key', () => {
		it('deletes a configuration option using the key parameter', async () => {
			const configurationOption = await prisma.configurationOption.create(
				{
					data: (await ConfigurationOptionFactory.build({
						projectId: project.id,
					})) as unknown as any,
				},
			);

			expect(await prisma.configurationOption.findFirst()).toBeTruthy();
			const response = await request.delete(
				`/configuration-options/${project.id}/${configurationOption.key}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(await prisma.configurationOption.findFirst()).toBeFalsy();
		});
	});
});
