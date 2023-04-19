import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiVersions } from 'shared/constants';
import { PrismaService } from 'shared/modules/prisma.service';

import { AppModule } from './app';

function setupSwagger(app: NestExpressApplication, version: ApiVersions) {
	const config = new DocumentBuilder()
		.setTitle('Config Service API')
		.setDescription('An HTTP Service to handle configuration')
		.setVersion(version)
		.addTag('config-api')
		.addBearerAuth()
		.build();

	SwaggerModule.setup(
		'api/doc',
		app,
		SwaggerModule.createDocument(app, config),
	);
}

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			forbidNonWhitelisted: true,
		}),
	);
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: ApiVersions.V1,
	});
	app.enableCors();

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	const configService = app.get(ConfigService);
	const port = configService.get<number>('SERVER_PORT')!;

	setupSwagger(app, ApiVersions.V1);

	await app.listen(port);
})();
