import { HttpStatus, INestApplication } from '@nestjs/common';
import { Design, PrismaClient, Project } from '@prisma/client';
import { OpenAI } from 'langchain';
import { DesignFactory, ProjectFactory, VersionFactory } from 'shared/testing';
import { DesignData } from 'shared/types';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import { Mock } from 'vitest';
import { DeepMockProxy } from 'vitest-mock-extended';

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
	let prisma: DeepMockProxy<PrismaClient>;

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
		prisma = bootstrap.prisma;
		project = await ProjectFactory.build();
		design = await DesignFactory.build({ projectId: project.id });
	});

	afterAll(async () => {
		process.env = env;

		await app.close();
	});

	describe('POST :projectId/:designId/prompt', () => {
		const requestData = {
			useInput: 'Please add a mysql database connected to my backend.',
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
						type: 'CustomNode',
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
						type: 'CustomNode',
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
			mockOpenAICall.mockResolvedValueOnce(
				'A_N 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 MongoDB Database 700 500',
			);
			const versions = await VersionFactory.batch(1);
			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				versions,
			} as any);

			const response = await request
				.post(`/${project.id}/${design.id}/prompt`)
				.send(requestData);

			const { nodes, edges } = versions[0].data as unknown as DesignData;

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body).toEqual({
				nodes: [
					...nodes,
					{
						data: {
							nodeType: 'MongoDB',
							formData: { nodeName: 'Database' },
						},
						id: '5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						position: { x: 700, y: 500 },
						type: 'CustomNode',
					},
				],
				edges,
			});
		});
		it('returns a 500 status response on receiving an error', async () => {
			const versions = await VersionFactory.batch(1);
			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				versions,
			} as any);
			mockOpenAICall.mockImplementationOnce(() => {
				throw new Error();
			});
			const response = await request
				.post(`/${project.id}/${design.id}/prompt`)
				.send(requestData);

			expect(response.statusCode).toEqual(
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		});
	});
});
