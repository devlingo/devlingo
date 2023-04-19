import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { API_MODULES } from 'config/api';
import { PrismaModule } from 'shared/modules/prisma.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		...API_MODULES,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
