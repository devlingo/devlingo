import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Test } from '@nestjs/testing';
import type { SuperTest } from 'supertest';
import supertest from 'supertest';

import { PrismaExceptionFilter } from '../src/exception-filters/prisma-exceptino.filter';
import { setupValidationPipe } from '../src/utils/configuration.utils';

export async function bootstrapIntegrationTest(
	moduleMetadata: Partial<ModuleMetadata>,
): Promise<{
	app: INestApplication;
	request: SuperTest<any>;
}> {
	const moduleFixture = await Test.createTestingModule(
		moduleMetadata,
	).compile();

	const app = moduleFixture
		.createNestApplication()
		.useGlobalFilters(new PrismaExceptionFilter());

	setupValidationPipe(app);

	await app.init();

	return {
		app,
		request: supertest(app.getHttpServer()),
	};
}
