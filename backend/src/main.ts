import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app';
import { ApiVersions } from './constants';
import { PrismaExceptionFilter } from './exception-filters/prisma-exceptino.filter';
import { PrismaService } from './modules/prisma/prisma.service';
import { ConfigurationVars } from './types';
import { setupValidationPipe } from './utils/configuration.utils';

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(Logger));

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: ApiVersions.V1,
	});
	app.enableCors();

	setupValidationPipe(app);

	app.useGlobalFilters(new PrismaExceptionFilter());

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	const configService = app.get(ConfigService<ConfigurationVars, true>);
	const port = configService.get<number>('SERVER_PORT')!;

	await app.listen(port);
})();
