import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'firebase-admin';
import { testEnv } from 'tests/testing.utils';
import { Mock } from 'vitest';

import { AuthGuard } from '@/guards/auth.guard';
import { FirebaseService } from '@/modules/firebase/firebase.service';
import { EnvironmentVariables } from '@/utils/env.utils';

vi.mock('firebase-admin/app', () => {
	return {
		initializeApp: vi.fn(() => ({})),
		cert: vi.fn(() => ({})),
	};
});
vi.mock('firebase-admin', () => {
	return {
		auth: vi.fn().mockReturnValue({
			verifyIdToken: vi.fn((value: string) => ({ uid: value })),
		}),
	};
});

describe('AuthGuard tests', () => {
	it('returns true for valid token', async () => {
		const configService = new ConfigService<EnvironmentVariables, true>(
			testEnv,
		);
		const firebaseService = new FirebaseService(configService);
		firebaseService.onModuleInit();
		const authGuard = new AuthGuard(firebaseService);

		const request = {
			headers: {
				authorization: `Bearer valid_token`,
			},
		};

		const result = await authGuard.canActivate({
			switchToHttp: () => ({ getRequest: () => request }),
		} as ExecutionContext);

		// Assert
		expect(result).toBe(true);

		expect(Reflect.get(request, 'firebaseId')).toBe('valid_token');
	});

	it('throws UnauthorizedException when authorization header is missing', async () => {
		const configService = new ConfigService<EnvironmentVariables, true>(
			testEnv,
		);
		const firebaseService = new FirebaseService(configService);
		firebaseService.onModuleInit();
		const authGuard = new AuthGuard(firebaseService);
		const request = {
			headers: {},
		};

		await expect(
			authGuard.canActivate({
				switchToHttp: () => ({ getRequest: () => request }),
			} as ExecutionContext),
		).rejects.toThrow(UnauthorizedException);
	});

	it('throws an UnauthorizedException when the token is invalid', async () => {
		const configService = new ConfigService<EnvironmentVariables, true>(
			testEnv,
		);
		const firebaseService = new FirebaseService(configService);
		firebaseService.onModuleInit();
		const authGuard = new AuthGuard(firebaseService);
		const request = {
			headers: {
				authorization: `invalid_token`,
			},
		};

		await expect(
			authGuard.canActivate({
				switchToHttp: () => ({ getRequest: () => request }),
			} as ExecutionContext),
		).rejects.toThrow(UnauthorizedException);
	});

	it('throws an UnauthorizedException when the token is empty', async () => {
		const configService = new ConfigService<EnvironmentVariables, true>(
			testEnv,
		);
		const firebaseService = new FirebaseService(configService);
		firebaseService.onModuleInit();
		const authGuard = new AuthGuard(firebaseService);
		const request = {
			headers: {
				authorization: `Bearer `,
			},
		};

		await expect(
			authGuard.canActivate({
				switchToHttp: () => ({ getRequest: () => request }),
			} as ExecutionContext),
		).rejects.toThrow(UnauthorizedException);
	});

	it('throws UnauthorizedException when an error is raised by firebase verifyIdToken', async () => {
		(auth as Mock).mockReturnValueOnce({
			verifyIdToken: vi.fn().mockImplementationOnce(() => {
				throw new Error();
			}),
		});
		const configService = new ConfigService<EnvironmentVariables, true>(
			testEnv,
		);
		const firebaseService = new FirebaseService(configService);
		firebaseService.onModuleInit();

		const authGuard = new AuthGuard(firebaseService);
		const request = {
			headers: {
				authorization: `Bearer invalid_token`,
			},
		};

		await expect(
			authGuard.canActivate({
				switchToHttp: () => ({ getRequest: () => request }),
			} as ExecutionContext),
		).rejects.toThrow(UnauthorizedException);
	});
});
