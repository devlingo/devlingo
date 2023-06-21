import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Options } from 'pino-http';

import { FirebaseModule } from '@/modules/firebase/firebase.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { isTest, validateEnv } from '@/utils/env.utils';

const DEFAULT_MODULES = [
	PrismaModule,
	ConfigModule.forRoot({
		validate: !isTest() ? validateEnv : undefined,
		isGlobal: true,
		ignoreEnvFile: true,
		cache: true,
	}),
	FirebaseModule,
];

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

export { DEFAULT_MODULES, PrismaModule };
