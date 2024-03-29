import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PermissionType, Prisma, PrismaClient, Project } from '@prisma/client';
import { DesignFactory, ProjectFactory, VersionFactory } from 'shared/testing';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import type { DeepMockProxy } from 'vitest-mock-extended';

import { VersionsModule } from '@/api/versions';
import { AppModule } from '@/app';

describe('Versions Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;

	let project: Project;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, VersionsModule],
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

	describe('POST :projectId/:designId/versions', () => {
		it('creates a version', async () => {
			const version = await VersionFactory.build();

			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);
			prisma.design.findUniqueOrThrow.mockResolvedValueOnce({
				id: version.designId,
			} as any);
			prisma.version.create.mockResolvedValueOnce(version);

			const response = await request
				.post(`/${project.id}/${version.designId}/versions`)
				.send(version.data);

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(prisma.version.create).toHaveBeenCalledWith({
				data: {
					data: JSON.stringify(version.data),
					designId: version.designId,
				},
				select: {
					createdAt: true,
					designId: true,
					id: true,
				},
			});
		});

		it('returns an informative error when no design is found', async () => {
			const version = await VersionFactory.build();

			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);

			prisma.design.findUniqueOrThrow.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No Design found', '');
			}) as any);

			const response = await request
				.post(`/${project.id}/${version.designId}/versions`)
				.send(version.data);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Design found');
		});

		it("forbids operation for users with 'viewer' permission", async () => {
			const version = await VersionFactory.build();

			prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
				() => {
					throw new Prisma.NotFoundError(
						'No UserProjectPermission found',
						'',
					);
				},
			);

			const response = await request
				.post(`/${project.id}/designs`)
				.send(version.data);

			expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
		});
	});

	describe('GET :projectId/:designId/versions/:versionId', () => {
		it('retrieves a version by ID', async () => {
			const version = await VersionFactory.build();

			prisma.version.findUniqueOrThrow.mockResolvedValueOnce({
				...version,
				data: JSON.stringify(version.data),
			});

			const response = await request.get(
				`/${project.id}/${version.designId}/versions/${version.id}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toEqual({
				...version,
				createdAt: version.createdAt.toISOString(),
			});
			expect(prisma.version.findUniqueOrThrow).toHaveBeenCalledWith({
				where: { id: version.id },
			});
		});
		it('returns an informative error when no design version is found', async () => {
			prisma.version.findUniqueOrThrow.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No Version found', '');
			}) as any);

			const response = await request.get(
				`/${
					project.id
				}/${faker.string.uuid()}/versions/${faker.string.uuid()}`,
			);

			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
			expect(response.body.message).toBe('No Version found');
		});
	});

	describe('DELETE :projectId/:designId/versions/:versionId', () => {
		it('deletes a design version by ID', async () => {
			const version = await VersionFactory.build();

			const response = await request.delete(
				`/${project.id}/${version.designId}/versions/${version.id}`,
			);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
			expect(prisma.version.delete).toHaveBeenCalledWith({
				where: { id: version.id },
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
							'',
						);
					},
				);

				const response = await request.delete(
					`/${project.id}/${
						design.id
					}/versions/${faker.string.uuid()}`,
				);
				expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
			},
		);
	});
});
