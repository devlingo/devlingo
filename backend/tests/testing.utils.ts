import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { Environment } from 'shared/constants';
import type { SuperTest } from 'supertest';
import supertest from 'supertest';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { PrismaExceptionFilter } from '@/exception-filters/prisma-exceptino.filter';
import { FirebaseService } from '@/modules/firebase/firebase.service';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { setupValidationPipe } from '@/utils/configuration.utils';
import { EnvironmentVariables } from '@/utils/env.utils';

export const testPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
-----END RSA PRIVATE KEY-----`;

export const testEnv: EnvironmentVariables = {
	NODE_ENV: Environment.Development,
	REDIS_CONNECTION_STRING: 'redis://localhost:6379',
	OPENAI_KEY: 'my_openai_key',
	SERVER_PORT: 3000,
	FIREBASE_PROJECT_ID: 'my_firebase_project_id',
	FIREBASE_CLIENT_EMAIL: 'my_firebase_client_email',
	FIREBASE_PRIVATE_KEY: testPrivateKey,
};

export const mockPrisma = mockDeep<PrismaClient>();
export const mockFirebaseService = mockDeep<FirebaseService>();
mockFirebaseService.decodeBearerToken.mockResolvedValue({ uid: 'test' } as any);

export async function bootstrapIntegrationTest(
	moduleMetadata: Partial<ModuleMetadata>,
): Promise<{
	app: INestApplication;
	request: SuperTest<any>;
	prisma: DeepMockProxy<PrismaClient>;
}> {
	const moduleFixture = await Test.createTestingModule(moduleMetadata)
		.overrideProvider(PrismaService)
		.useValue(mockPrisma)
		.overrideProvider(ConfigService)
		.useValue({
			get: (param: keyof EnvironmentVariables) => testEnv[param],
		})
		.overrideProvider(FirebaseService)
		.useValue(mockFirebaseService)
		.compile();

	const app = moduleFixture
		.createNestApplication()
		.useGlobalFilters(new PrismaExceptionFilter());

	setupValidationPipe(app);

	await app.init();

	return {
		app,
		request: supertest(app.getHttpServer()),
		prisma: mockPrisma,
	};
}
