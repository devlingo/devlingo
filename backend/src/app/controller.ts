import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

import { AppService } from './service';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHealthCheck(): string {
		return this.appService.healthCheck();
	}
}
