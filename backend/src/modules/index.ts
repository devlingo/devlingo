import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

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
