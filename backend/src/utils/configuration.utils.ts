import { INestApplication, ValidationPipe } from '@nestjs/common';

import { isProduction } from '@/utils/env.utils';

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
