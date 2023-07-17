import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Options } from 'pino-http';
import { isTest } from 'shared/utils/predicates';

import { FirebaseModule } from '@/modules/firebase/module';
import { PrismaModule } from '@/modules/prisma/module';
import { validateEnv } from '@/utils/env';

const DEFAULT_MODULES = [
	PrismaModule,
	ConfigModule.forRoot({
		validate: isTest() ? undefined : validateEnv,
		isGlobal: true,
		ignoreEnvFile: true,
		cache: true,
	}),
	FirebaseModule,
];

/* c8 ignore next */
if (!isTest()) {
	const redact = {
		paths: ['req.headers.authorization'],
	};
	const pinoHttp: Options =
		process.env.NODE_ENV === 'production'
			? {
					level: 'info',
					redact,
			  }
			: {
					level: 'debug',
					transport: {
						target: 'pino-pretty',
						options: { singleLine: true },
					},
					redact,
			  };

	DEFAULT_MODULES.push(
		LoggerModule.forRoot({
			pinoHttp,
		}),
	);
}

export { DEFAULT_MODULES };

export { PrismaModule } from '@/modules/prisma/module';
