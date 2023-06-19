import { Module } from '@nestjs/common';

import { PromptController } from './prompt.controller';
import { PromptService } from './prompt.service';

@Module({
	imports: [],
	controllers: [PromptController],
	providers: [PromptService],
})
export class PromptModule {}
