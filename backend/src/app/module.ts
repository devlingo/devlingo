import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { API_MODULES } from '@/api';
import { AuthGuard } from '@/guards/auth';
import { DEFAULT_MODULES } from '@/modules';

import { AppController } from './controller';
import { AppService } from './service';

@Module({
	controllers: [AppController],
	imports: [...DEFAULT_MODULES, ...API_MODULES],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
