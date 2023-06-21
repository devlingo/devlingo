import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { isDevelopment } from '@/utils/env.utils';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		const log: Prisma.LogLevel[] = ['error'];

		if (isDevelopment()) {
			log.push(...(['query', 'info', 'warn'] as Prisma.LogLevel[]));
		}

		super({ log });
	}
	// noinspection JSUnusedGlobalSymbols
	async onModuleInit() {
		await this.$connect();
	}

	// noinspection JSUnusedGlobalSymbols
	async onModuleDestroy() {
		await this.$disconnect();
	}

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
