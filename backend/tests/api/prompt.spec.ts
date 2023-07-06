import { HttpStatus, INestApplication } from '@nestjs/common';
import { Design, Project } from '@prisma/client';
import { OpenAI } from 'langchain';
import { DesignFactory, ProjectFactory } from 'shared/testing';
import type { SuperTest } from 'supertest';
import { OpenAIResponse } from 'tests/test-data';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import { Mock } from 'vitest';

import { PromptModule } from '@/api/prompt';
import { AppModule } from '@/app';

vi.mock(
	'langchain',
	async (originalModule: () => Promise<Record<string, any>>) => {
		const actual = await originalModule();
		const OpenAI = vi.fn();
		OpenAI.prototype.call = vi.fn();

		return { ...actual, OpenAI: OpenAI };
	},
);

describe('Prompt Controller Tests', () => {
	const mockOpenAICall = OpenAI.prototype.call as Mock;
	const env = process.env;
	let app: INestApplication;
	let request: SuperTest<any>;

	let project: Project;
	let design: Design;

	beforeAll(async () => {
		process.env = {
			...env,
			OPENAI_KEY: 'abc123',
			REDIS_CONNECTION_STRING: 'redis://localhost:6379',
		};

		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, PromptModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
		project = await ProjectFactory.build();
		design = await DesignFactory.build({ projectId: project.id });
	});

	afterAll(async () => {
		process.env = env;

		await app.close();
	});

	describe('POST prompt/:projectId/:designId', () => {
		const requestData = {
			promptContent:
				'Please add a mysql database connected to my backend.',
			designData: {
				nodes: [
					{
						data: {
							nodeType: 'NextJS',
							formData: {
								nodeName: 'Frontend',
							},
							childNodes: [],
						},
						id: 'QMGfvyzBBhF-2BiDdIOGe',
						position: {
							x: 1300,
							y: 50,
						},
						type: 'CanvasNodeComponent',
					},
					{
						data: {
							nodeType: 'NestJS',
							formData: {
								nodeName: 'Backend',
							},
						},
						id: 'KZA-U5dr_r7L4AJK4A9Xd',
						position: {
							x: 700,
							y: 50,
						},
						type: 'CanvasNodeComponent',
					},
				],
				edges: [
					{
						id: 'edge-1',
						source: 'QMGfvyzBBhF-2BiDdIOGe',
						target: 'KZA-U5dr_r7L4AJK4A9Xd',
						type: 'smoothstep',
					},
				],
			},
			nodeTypes: [
				'NestJS',
				'NextJS',
				'MongoDB',
				'Firestore',
				'Cassandra',
				'DynamoDB',
				'Redis',
				'Hbase',
				'CosmosDB',
				'MySQL',
				'PostgresSQL',
				'SQL Server',
				'MariaDB',
				'Firebird',
				'SQLite',
				'Oracle',
				'Express.js',
				'Koa.js',
				'Hapi.js',
				'Fastify',
				'Litestar',
				'Django',
				'Flask',
				'FastAPI',
				'Angular',
				'React',
				'Solid',
				'Svelte',
				'Vue',
				'Android',
				'IOS',
				'Flutter',
				'ReactNative',
			],
			edgeTypes: [
				'default',
				'straight',
				'step',
				'smoothstep',
				'simplebezier',
			],
		};
		it('sends a prompt request and returns the expected response', async () => {
			mockOpenAICall.mockResolvedValueOnce(OpenAIResponse);
			const response = await request
				.post(`/prompt/${project.id}/${design.id}`)
				.send(requestData);

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body).toEqual({
				nodes: [
					{
						data: {
							nodeType: 'NextJS',
							formData: {
								nodeName: 'Frontend',
							},
							childNodes: [],
						},
						id: 'QMGfvyzBBhF-2BiDdIOGe',
						position: {
							x: 1300,
							y: 50,
						},
						type: 'CanvasNodeComponent',
					},
					{
						data: {
							nodeType: 'NestJS',
							formData: {
								nodeName: 'Backend',
							},
						},
						id: 'KZA-U5dr_r7L4AJK4A9Xd',
						position: {
							x: 700,
							y: 50,
						},
						type: 'CanvasNodeComponent',
					},
					{
						data: {
							nodeType: 'MongoDB',
							formData: { nodeName: 'Database' },
						},
						id: '5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						position: { x: 700, y: 500 },
						type: 'MongoDB',
					},
				],
				edges: [
					{
						id: 'edge-1',
						source: 'QMGfvyzBBhF-2BiDdIOGe',
						target: 'KZA-U5dr_r7L4AJK4A9Xd',
						type: 'smoothstep',
					},
					{
						id: '9f4c2e95-d916-4a5d-9afc-caa405396d4c',
						source: '5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						target: '54b111d0-9c3a-4687-8199-c2ba25f480a2',
						type: 'default',
					},
				],
			});
		});
		it('returns a 500 status response on receiving an error', async () => {
			mockOpenAICall.mockImplementationOnce(() => {
				throw new Error();
			});
			const response = await request
				.post(`/prompt/${project.id}/${design.id}`)
				.send(requestData);

			expect(response.statusCode).toEqual(
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		});
	});
});
