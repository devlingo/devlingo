import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PermissionType, Prisma, PrismaClient, Project } from '@prisma/client';
import { DesignFactory, ProjectFactory } from 'shared/testing';
import { DesignsModule } from 'src/api/designs';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import type { DeepMockProxy } from 'vitest-mock-extended';

import { AppModule } from '@/app';

describe('Designs Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, DesignsModule],
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

	describe('POST :projectId/designs/', () => {
		it('creates a design', async () => {
			const data = await DesignFactory.build();

			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);

			prisma.design.create.mockResolvedValueOnce(data);

			const response = await request.post(`/${project.id}/designs`).send({
				name: data.name,
				description: data.description,
				isDefault: data.isDefault,
			});

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(prisma.design.create).toHaveBeenCalledWith({
				data: {
					name: data.name,
					description: data.description,
					isDefault: data.isDefault,
					projectId: project.id,
				},
			});
		});

		it("forbids operation for users with 'viewer' permission", async () => {
			const data = await DesignFactory.build();

			prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
				() => {
					throw new Prisma.NotFoundError(
						'No UserProjectPermission found',
					);
				},
			);

			const response = await request
				.post(`/${project.id}/designs`)
				.send(data);

			expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
		});
	});

	describe('GET :projectId/designs/', () => {
		it('retrieves a list of available designs and versions for a given project', async () => {
			const designs = await DesignFactory.batch(3, {
				projectId: project.id,
			});

			prisma.design.findMany.mockResolvedValueOnce(designs);
			const response = await request.get(`/${project.id}/designs`);

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

			const response = await request.get(`/${project.id}/designs`);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Designs found');
		});
	});

	describe('GET :projectId/designs/:designId', () => {
		it('retrieves a design by ID', async () => {
			const design = await DesignFactory.build();

			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				...design,
			});

			const response = await request.get(
				`/${project.id}/designs/${design.id}`,
			);

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
					isDefault: true,
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

			const response = await request.get(
				`/${project.id}/designs/${faker.string.uuid()}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Design found');
		});
	});

	describe('DELETE :projectId/designs/:designId', () => {
		it('deletes a design by id', async () => {
			const design = await DesignFactory.build();

			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);

			const response = await request.delete(
				`/${project.id}/designs/${design.id}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(prisma.design.delete).toHaveBeenCalledWith({
				where: { id: design.id },
			});
		});

		it.each([PermissionType.EDITOR, PermissionType.VIEWER])(
			'forbids operation for users with permission %s',
			async (_) => {
				const design = await DesignFactory.build();

				prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
					() => {
						throw new Prisma.NotFoundError(
							'No UserProjectPermission found',
						);
					},
				);

				const response = await request.delete(
					`/${project.id}/designs/${design.id}`,
				);
				expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
			},
		);
	});
});
