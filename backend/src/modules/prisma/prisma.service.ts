import {
	INestApplication,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
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
