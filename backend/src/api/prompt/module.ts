import { Module } from '@nestjs/common';

import { PromptController } from './controller';
import { PromptService } from './service';

@Module({
	imports: [],
	controllers: [PromptController],
	providers: [PromptService],
})
export class PromptModule {}
