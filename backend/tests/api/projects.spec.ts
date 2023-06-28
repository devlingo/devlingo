import { HttpStatus, INestApplication } from '@nestjs/common';
import { PermissionType, Prisma, PrismaClient } from '@prisma/client';
import { ProjectFactory, UserFactory } from 'shared/testing';
import { ProjectsModule } from 'src/api/projects';
import type { SuperTest } from 'supertest';
import { bootstrapIntegrationTest } from 'tests/testing.utils';
import { beforeEach } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockReset } from 'vitest-mock-extended';

import { AppModule } from '@/app';

describe('Projects Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, ProjectsModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
		prisma = bootstrap.prisma;
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(() => {
		mockReset(prisma);
	});

	describe('POST projects', () => {
		it('creates a project', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();
			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.create.mockImplementationOnce(
				({ data }) =>
					({
						...project,
						...data,
					} as any),
			);
			const response = await request
				.post('/projects')
				.send({ name: project.name });

			expect(response.statusCode).toEqual(HttpStatus.CREATED);
			expect(response.body.name).toEqual(project.name);
			expect(prisma.project.create).toHaveBeenCalledWith({
				data: {
					description: undefined,
					designs: {
						create: {
							isDefault: true,
							name: 'Untitled Design',
						},
					},
					name: project.name,
					userPermissions: {
						create: {
							type: 'OWNER',
							userId: user.id,
						},
					},
				},
				select: {
					createdAt: true,
					description: true,
					designs: {
						select: {
							createdAt: true,
							description: true,
							id: true,
							isDefault: true,
							name: true,
							projectId: true,
							updatedAt: true,
						},
						where: {
							isDefault: true,
						},
					},
					id: true,
					name: true,
					updatedAt: true,
					userPermissions: {
						select: {
							type: true,
							userId: true,
						},
						where: {
							user: { is: { firebaseId: 'test' } },
						},
					},
				},
			});
		});
	});

	describe('GET projects', () => {
		it('retrieves all projects a user has access to', async () => {
			const projects = await ProjectFactory.batch(3);
			const user = await UserFactory.build();
			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findMany.mockResolvedValueOnce(projects);
			const response = await request.get('/projects');

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toHaveLength(3);
			expect(prisma.project.findMany).toHaveBeenCalledWith({
				orderBy: {
					createdAt: 'asc',
				},
				select: {
					createdAt: true,
					description: true,
					designs: {
						select: {
							createdAt: true,
							description: true,
							id: true,
							isDefault: true,
							name: true,
							projectId: true,
							updatedAt: true,
						},
						where: {
							isDefault: true,
						},
					},
					id: true,
					name: true,
					updatedAt: true,
					userPermissions: {
						select: {
							type: true,
							userId: true,
						},
						where: {
							user: { is: { firebaseId: 'test' } },
						},
					},
				},
				where: {
					userPermissions: {
						some: {
							user: { is: { firebaseId: 'test' } },
						},
					},
				},
			});
		});
	});

	describe('PATCH projects', () => {
		it('updates a project', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();

			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);
			prisma.project.update.mockImplementationOnce(
				({ data }) =>
					({
						...project,
						...data,
					} as any),
			);

			const response = await request
				.patch(`/projects/${project.id}`)
				.send({ name: project.name });

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body.name).toEqual(project.name);
		});
	});

	describe('GET projects/:projectId', () => {
		it('retrieves a project by ID', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();

			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);
			const response = await request.get(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.text).toEqual(JSON.stringify(project));
		});

		it.each(Object.values(PermissionType) as PermissionType[])(
			'allows access for users with permission %s',
			async (permissionType: PermissionType) => {
				const user = await UserFactory.build();
				const project = await ProjectFactory.build();

				prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
				prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
				prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
					{ type: permissionType } as any,
				);
				const response = await request.get(`/projects/${project.id}`);

				expect(response.statusCode).toEqual(HttpStatus.OK);
			},
		);

		it('returns a permission denied error when no permission is found', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();

			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
				() => {
					throw new Prisma.NotFoundError(
						'No UserProjectPermission found',
					);
				},
			);
			const response = await request.get(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
		});
	});

	describe('DELETE projects/:projectId', () => {
		it('deletes a project by ID', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();

			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			prisma.userProjectPermission.findUniqueOrThrow.mockResolvedValueOnce(
				{ type: PermissionType.OWNER } as any,
			);

			const response = await request.delete(`/projects/${project.id}`);
			expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
		});

		it.each(
			Object.values(PermissionType).filter(
				(p) => p !== PermissionType.OWNER,
			) as PermissionType[],
		)(
			'forbids operation for users with permission %s',
			async (_: PermissionType) => {
				const user = await UserFactory.build();
				const project = await ProjectFactory.build();

				prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
				prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
				prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
					() => {
						throw new Prisma.NotFoundError(
							'No UserProjectPermission found',
						);
					},
				);
				const response = await request.delete(
					`/projects/${project.id}`,
				);
				expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
				expect(
					prisma.userProjectPermission.findFirstOrThrow,
				).toHaveBeenCalledWith({
					where: {
						projectId: project.id,
						type: {
							in: [PermissionType.OWNER],
						},
						user: {
							is: {
								firebaseId: 'test',
							},
						},
					},
				});
			},
		);

		it('returns a permission denied error when no permission is found', async () => {
			const user = await UserFactory.build();
			const project = await ProjectFactory.build();

			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			prisma.project.findUniqueOrThrow.mockResolvedValueOnce(project);
			prisma.userProjectPermission.findFirstOrThrow.mockImplementationOnce(
				() => {
					throw new Prisma.NotFoundError(
						'No UserProjectPermission found',
					);
				},
			);
			const response = await request.delete(`/projects/${project.id}`);

			expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
		});
	});
});
