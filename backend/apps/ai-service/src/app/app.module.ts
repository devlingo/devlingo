import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { API_MODULES } from 'ai-service/api';
import { PrismaModule } from 'shared/modules/prisma.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		PrismaModule,
		ConfigModule.forRoot({ isGlobal: true }),
		...API_MODULES,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
