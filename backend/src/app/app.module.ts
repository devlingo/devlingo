import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { API_MODULES } from '@/api';
import { AuthGuard } from '@/guards/auth.guard';
import { DEFAULT_MODULES } from '@/modules';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [...DEFAULT_MODULES, ...API_MODULES],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
