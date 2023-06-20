import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient, Project } from '@prisma/client';
import type { SuperTest } from 'supertest';
import {
	DesignFactory,
	DesignVersionFactory,
	ProjectFactory,
} from 'tests/testing.factories';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import type { DeepMockProxy } from 'vitest-mock-extended';

import { DesignModule } from '@/api/design';
import { AppModule } from '@/app';
import { DesignVersionDTO } from '@/dtos/body.dto';

describe('Design Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, DesignModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
		prisma = bootstrap.prisma;
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		project = await ProjectFactory.build();
	});

	describe('POST designs/', () => {
		const versionId = faker.string.uuid();
		const designId = faker.string.uuid();
		it('creates and returns a design when designId is not provided', async () => {
			const data = {
				name: 'design name',
				description: 'design description',
				projectId: project.id,
				data: { version: 1 },
			} satisfies DesignVersionDTO;

			prisma.design.create.mockResolvedValueOnce({ id: designId } as any);
			prisma.designVersion.create.mockResolvedValueOnce({
				id: versionId,
			} as any);

			const response = await request.post(`/designs`).send(data);

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body.designId).toEqual(designId);
			expect(response.body.versionId).toEqual(versionId);
			expect(prisma.design.create).toHaveBeenCalledWith({
				data: {
					name: data.name,
					description: data.description,
					projectId: data.projectId,
				},
				select: { id: true },
			});
		});

		it('creates and returns a design when designId is provided', async () => {
			const data = {
				name: 'design name',
				description: 'design description',
				projectId: project.id,
				data: { version: 1 },
				designId,
			} satisfies DesignVersionDTO;

			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				id: designId,
			} as any);
			prisma.designVersion.create.mockResolvedValueOnce({
				id: versionId,
			} as any);

			const response = await request.post(`/designs`).send(data);

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body.designId).toEqual(designId);
			expect(response.body.versionId).toEqual(versionId);
			expect(prisma.design.findUniqueOrThrow).toHaveBeenCalledWith({
				where: {
					id: designId,
				},
				select: { id: true },
			});
		});

		it('returns an informative error when no design is found', async () => {
			const data = {
				name: 'design name',
				description: 'design description',
				projectId: project.id,
				data: { version: 1 },
				designId,
			} satisfies DesignVersionDTO;

			prisma.design.findUniqueOrThrow.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No Design found');
			}) as any);
			const response = await request.post(`/designs`).send(data);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Design found');
		});
	});

	describe('GET designs/', () => {
		it('retrieves a list of available designs and versions for a given project', async () => {
			const designs = await DesignFactory.batch(3, {
				projectId: project.id,
			});

			prisma.design.findMany.mockResolvedValueOnce(designs);
			const response = await request.get(
				`/designs?projectId=${project.id}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);

			expect(response.body).toEqual(
				designs.map((d) => ({
					...d,
					createdAt: d.createdAt.toISOString(),
					updatedAt: d.updatedAt.toISOString(),
				})),
			);
		});

		it('returns an informative error when no design is found', async () => {
			prisma.design.findMany.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No Designs found');
			}) as any);

			const response = await request.get(
				`/designs?projectId=${project.id}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Designs found');
		});
	});

	describe('GET designs/:designId', () => {
		it('retrieves a design by ID', async () => {
			const design = await DesignFactory.build();

			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				...design,
			});

			const response = await request.get(`/designs/${design.id}`);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toEqual({
				...design,
				createdAt: design.createdAt.toISOString(),
				updatedAt: design.updatedAt.toISOString(),
			});
			expect(prisma.design.findUniqueOrThrow).toHaveBeenCalledWith({
				where: { id: design.id },
				select: {
					id: true,
					name: true,
					description: true,
					projectId: true,
					createdAt: true,
					updatedAt: true,
					versions: {
						select: {
							id: true,
							createdAt: true,
						},
					},
				},
			});
		});

		it('returns an informative error when no design is found', async () => {
			prisma.design.findUniqueOrThrow.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No Design found');
			}) as any);

			const response = await request.get(`/designs/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Design found');
		});
	});

	describe('DELETE designs/:designId', () => {
		it('deletes a design version using the name and version parameters', async () => {
			const design = await DesignFactory.build();

			const response = await request.delete(`/designs/${design.id}`);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(prisma.design.delete).toHaveBeenCalledWith({
				where: { id: design.id },
			});
		});
	});

	describe('GET designs/versions/:versionId', () => {
		it('retrieves a design version by ID', async () => {
			const version = await DesignVersionFactory.build();

			prisma.designVersion.findUniqueOrThrow.mockResolvedValueOnce(
				version,
			);

			const response = await request.get(
				`/designs/versions/${version.id}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toEqual({
				...version,
				createdAt: version.createdAt.toISOString(),
			});
			expect(prisma.designVersion.findUniqueOrThrow).toHaveBeenCalledWith(
				{
					where: { id: version.id },
				},
			);
		});
		it('returns an informative error when no design version is found', async () => {
			prisma.designVersion.findUniqueOrThrow.mockImplementationOnce(
				(() => {
					throw new Prisma.NotFoundError('No DesignVersion found');
				}) as any,
			);

			const response = await request.get(
				`/designs/versions/${project.id}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No DesignVersion found');
		});
	});

	describe('DELETE designs/versions/:versionId', () => {
		it('deletes a design version by ID', async () => {
			const version = await DesignVersionFactory.build();

			const response = await request.delete(
				`/designs/versions/${version.id}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(prisma.designVersion.delete).toHaveBeenCalledWith({
				where: { id: version.id },
			});
		});
	});
});
