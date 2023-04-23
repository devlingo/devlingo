import { Module } from '@nestjs/common';

import { ConfigurationOptionController } from './configuration-option.controller';
import { ConfigurationOptionService } from './configuration-option.service';

@Module({
	imports: [],
	controllers: [ConfigurationOptionController],
	providers: [ConfigurationOptionService],
})
export class ConfigurationOptionModule {}
