import { HttpStatus, INestApplication } from '@nestjs/common';
import { Design, Project } from '@prisma/client';
import { ConversationChain } from 'langchain/chains';
import { DesignFactory, ProjectFactory } from 'shared/testing';
import type { SuperTest } from 'supertest';
import { OpenAIResponse } from 'tests/test-data';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import { Mock } from 'vitest';

import { PromptModule } from '@/api/prompt';
import { AppModule } from '@/app';

vi.mock(
	'langchain/chains',
	async (originalModule: () => Promise<Record<string, any>>) => {
		const actual = await originalModule();
		const ConversationChain = vi.fn();
		ConversationChain.prototype.call = vi.fn();

		return { ...actual, ConversationChain };
	},
);

describe('Prompt Controller Tests', () => {
	const mockChainCall = ConversationChain.prototype.call as Mock;
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
			mockChainCall.mockResolvedValueOnce(OpenAIResponse);
			const response = await request
				.post(`/prompt/${project.id}/${design.id}`)
				.send(requestData);

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body).toEqual({
				answer: 'To add a MySQL database connected to the backend, we need to add a new node of type MySQL and connect it to the NestJS backend node using an edge of type default. This will allow the backend to communicate with the MySQL database and perform CRUD operations.',
				design: {
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
								nodeType: 'MySQL',
								formData: {
									nodeName: 'Database',
								},
							},
							id: 'JZa-U5dr_r7L4AJK4A9Xd',
							position: {
								x: 1000,
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
						{
							id: 'edge-2',
							source: 'KZA-U5dr_r7L4AJK4A9Xd',
							target: 'JZa-U5dr_r7L4AJK4A9Xd',
							type: 'default',
						},
					],
				},
			});
		});
		it('returns a 500 status response on receiving an error', async () => {
			mockChainCall.mockImplementationOnce(() => {
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
