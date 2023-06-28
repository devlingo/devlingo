import { HttpStatus, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserFactory } from 'shared/testing';
import { UsersModule } from 'src/api/users';
import type { SuperTest } from 'supertest';
import {
	bootstrapIntegrationTest,
	mockFirebaseService,
} from 'tests/testing.utils';
import type { DeepMockProxy } from 'vitest-mock-extended';

import { AppModule } from '@/app';
import { UserUpdateDTO } from '@/dtos/body';

describe('Users Controller Tests', () => {
	let app: INestApplication;
	let request: SuperTest<any>;
	let prisma: DeepMockProxy<PrismaClient>;
	let user: User;

	beforeAll(async () => {
		const bootstrap = await bootstrapIntegrationTest({
			imports: [AppModule, UsersModule],
		});
		request = bootstrap.request;
		app = bootstrap.app;
		prisma = bootstrap.prisma;

		user = await UserFactory.build();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('GET /users/:userId', () => {
		it('retrieves a user by ID', async () => {
			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			const response = await request.get(`/users/${user.id}`);

			expect(response.statusCode).toBe(HttpStatus.OK);
			expect(response.body).toEqual({
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			});
		});

		it('returns an informative error when the user does not exist', async () => {
			prisma.user.findUniqueOrThrow.mockImplementationOnce((() => {
				throw new Prisma.NotFoundError('No User found');
			}) as any);
			const response = await request.get(`/users/${user.id}`);
			expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
		});
	});

	describe('DELETE /users/:userId', () => {
		it('deletes a user by ID', async () => {
			prisma.user.delete.mockResolvedValueOnce(user);
			const response = await request.delete(`/users/${user.id}`);
			expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
			expect(mockFirebaseService.auth.deleteUser).toHaveBeenCalledWith(
				user.firebaseId,
			);
		});
	});

	describe('PATCH /users/:userId', () => {
		it('updates a user by ID', async () => {
			const data: UserUpdateDTO = {
				name: 'New Name',
				avatarUrl: 'https://example.com/avatar.png',
			};
			prisma.user.update.mockImplementationOnce(
				({ data }) => Promise.resolve({ ...user, ...data }) as any,
			);
			const response = await request
				.patch(`/users/${user.id}`)
				.send(data);
			expect(response.statusCode).toBe(HttpStatus.OK);
			expect(response.body).toEqual({
				...user,
				...data,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			});
			expect(mockFirebaseService.auth.updateUser).toHaveBeenCalledWith(
				user.firebaseId,
				{ displayName: data.name, photoURL: data.avatarUrl },
			);
		});
	});

	describe('GET /users/profile', () => {
		it('returns the current user if it exists', async () => {
			prisma.user.findUniqueOrThrow.mockResolvedValueOnce(user);
			const response = await request.get('/users/profile');
			expect(response.statusCode).toBe(HttpStatus.OK);
			expect(response.body).toEqual({
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			});
		});
	});

	it('creates the current user if it doesnt exist', async () => {
		const prismaUser = {
			displayName: 'moishe zuchmir',
			email: 'x@y.com',
			photoURL: 'https://example.com/avatar.png',
		};
		prisma.user.findUniqueOrThrow.mockImplementationOnce((() => {
			throw new Prisma.NotFoundError('No User found');
		}) as any);
		mockFirebaseService.auth.getUser.mockResolvedValueOnce(
			prismaUser as any,
		);

		prisma.user.create.mockImplementationOnce(
			// @ts-expect-error
			async ({ data }: { data: Record<string, any> }): Promise<unknown> =>
				(await UserFactory.build(data as any)) as any,
		);
		const response = await request.get('/users/profile');
		expect(response.statusCode).toBe(HttpStatus.OK);
		expect(response.body.name).toEqual(prismaUser.displayName);
		expect(response.body.email).toEqual(prismaUser.email);
		expect(response.body.avatarUrl).toEqual(prismaUser.photoURL);
		expect(mockFirebaseService.auth.getUser).toHaveBeenCalledWith('test');
	});
});
