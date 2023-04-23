import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiVersions } from 'shared/constants';
import { PrismaExceptionFilter } from 'shared/exception-filters/prisma-exceptino.filter';
import { PrismaService } from 'shared/modules/prisma.service';
import {
	setupSwagger,
	setupValidationPipe,
} from 'shared/utils/configuration.utils';

import { AppModule } from './app';

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: ApiVersions.V1,
	});
	app.enableCors();

	setupValidationPipe(app);
	setupSwagger({
		version: ApiVersions.V1,
		title: 'Config Service API',
		description: 'An HTTP Service to handle configuration',
	})(app);

	app.useGlobalFilters(new PrismaExceptionFilter());

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	const configService = app.get(ConfigService);
	const port = configService.get<number>('SERVER_PORT')!;

	await app.listen(port);
})();
