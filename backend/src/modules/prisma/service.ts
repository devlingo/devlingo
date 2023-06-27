import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { isDevelopment } from 'shared/utils/predicates';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		const log: Prisma.LogLevel[] = ['error'];

		/* c8 ignore next */
		if (isDevelopment()) {
			log.push(...(['query', 'info', 'warn'] as Prisma.LogLevel[]));
		}

		super({ log });
	}
	/* c8 ignore next */
	// noinspection JSUnusedGlobalSymbols
	async onModuleInit() {
		await this.$connect();
	}

	/* c8 ignore next */
	// noinspection JSUnusedGlobalSymbols
	async onModuleDestroy() {
		await this.$disconnect();
	}

	/* c8 ignore next */
	async enableShutdownHooks(app: INestApplication) {
		return new Promise((resolve) => {
			this.$on('beforeExit', () => {
				resolve(
					(async () => {
						await app.close();
					})(),
				);
			});
		});
	}
}
