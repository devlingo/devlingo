import { Module } from '@nestjs/common';

import { PromptController } from './controller';
import { PromptService } from './service';

@Module({
	controllers: [PromptController],
	imports: [],
	providers: [PromptService],
})
export class PromptModule {}
