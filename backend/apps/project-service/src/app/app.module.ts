import { Module } from '@nestjs/common';
import { API_MODULES } from 'project-service/api';
import { DEFAULT_MODULES } from 'shared/modules';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [...DEFAULT_MODULES, ...API_MODULES],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
