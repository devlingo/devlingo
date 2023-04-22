import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiVersions } from 'shared/constants';
import { isProduction } from 'shared/utils/predicate.utils';

type SyncSetupFunction = (app: INestApplication) => void;

export function setupSwagger({
	version,
	title,
	description,
}: {
	version: ApiVersions;
	title: string;
	description: string;
}): SyncSetupFunction {
	return function (app: INestApplication) {
		const config = new DocumentBuilder()
			.setTitle(title)
			.setDescription(description)
			.setVersion(version)
			.addBearerAuth()
			.build();

		SwaggerModule.setup(
			'api/doc',
			app,
			SwaggerModule.createDocument(app, config),
		);
	};
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
