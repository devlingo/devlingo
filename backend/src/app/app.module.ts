import { Module } from '@nestjs/common';
import { DEFAULT_MODULES } from 'src/modules';

import { API_MODULES } from '../api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [...DEFAULT_MODULES, ...API_MODULES],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
