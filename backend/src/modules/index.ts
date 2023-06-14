import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { isTest, validateEnv } from '@/utils/env.utils';

import { PrismaModule } from './prisma/prisma.module';

const DEFAULT_MODULES = [
	PrismaModule,
	ConfigModule.forRoot({
		validate: !isTest() ? validateEnv : undefined,
		isGlobal: true,
		ignoreEnvFile: true,
		cache: true,
	}),
];

if (!isTest()) {
	const pinoHttp =
		process.env.NODE_ENV === 'production'
			? {
					level: 'info',
			  }
			: {
					level: 'debug',
					transport: {
						target: 'pino-pretty',
						options: { singleLine: true },
					},
			  };

	DEFAULT_MODULES.push(
		LoggerModule.forRoot({
			pinoHttp,
		}),
	);
}

export { DEFAULT_MODULES, PrismaModule };
