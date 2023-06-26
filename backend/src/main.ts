import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { ApiVersions } from 'shared/constants';

import { EnvironmentVariables } from '@/utils/env';

import { AppModule } from './app';
import { PrismaExceptionFilter } from './exception-filters/prisma-exception';
import { Service } from './modules/prisma/service';
import { setupValidationPipe } from './utils/configuration';

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

	const prismaService = app.get(Service);
	await prismaService.enableShutdownHooks(app);

	const configService = app.get(ConfigService<EnvironmentVariables, true>);
	const port = configService.get<number>('SERVER_PORT')!;

	await app.listen(port);
})();
