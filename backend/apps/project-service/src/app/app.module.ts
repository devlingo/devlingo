import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { API_MODULES } from 'project-service/api';
import { PrismaModule } from 'shared/modules/prisma.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		LoggerModule.forRoot(),
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: true,
			cache: true,
		}),
		...API_MODULES,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
