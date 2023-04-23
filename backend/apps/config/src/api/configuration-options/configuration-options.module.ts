import { Module } from '@nestjs/common';

import { ConfigurationOptionsController } from './configuration-options.controller';
import { ConfigurationOptionsService } from './configuration-options.service';

@Module({
	imports: [],
	controllers: [ConfigurationOptionsController],
	providers: [ConfigurationOptionsService],
})
export class ConfigurationOptionsModule {}
