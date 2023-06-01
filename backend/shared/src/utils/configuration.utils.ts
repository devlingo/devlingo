import {
	INestApplication,
	ValidationPipe,
	VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ApiVersions } from 'shared/constants';
import { PrismaExceptionFilter } from 'shared/exception-filters/prisma-exceptino.filter';
import { PrismaService } from 'shared/modules/prisma.service';
import { isProduction } from 'shared/utils/predicate.utils';

interface SetupSwaggerOptions {
	version: ApiVersions;
	title: string;
	description: string;
}

export function setupValidationPipe(app: INestApplication) {
	app.useGlobalPipes(
		new ValidationPipe({
			enableDebugMessages: !isProduction,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			forbidNonWhitelisted: true,
		}),
	);
}

export async function createNestApp({
	appModule,
	title,
	description,
	version,
}: {
	appModule: any;
} & SetupSwaggerOptions) {
	const app = await NestFactory.create<NestExpressApplication>(appModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(Logger));

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: ApiVersions.V1,
	});
	app.enableCors();

	setupValidationPipe(app);

	SwaggerModule.setup(
		'/doc',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setTitle(title)
				.setDescription(description)
				.setVersion(version)
				.addBearerAuth()
				.build(),
		),
	);

	app.useGlobalFilters(new PrismaExceptionFilter());

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	return app;
}
