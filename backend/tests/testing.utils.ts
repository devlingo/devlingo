import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import type { SuperTest } from 'supertest';
import supertest from 'supertest';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { PrismaExceptionFilter } from '@/exception-filters/prisma-exceptino.filter';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { setupValidationPipe } from '@/utils/configuration.utils';

export async function bootstrapIntegrationTest(
	moduleMetadata: Partial<ModuleMetadata>,
): Promise<{
	app: INestApplication;
	request: SuperTest<any>;
	prisma: DeepMockProxy<PrismaClient>;
}> {
	const mockPrisma = mockDeep<PrismaClient>();
	const moduleFixture = await Test.createTestingModule(moduleMetadata)
		.overrideProvider(PrismaService)
		.useValue(mockPrisma)
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
