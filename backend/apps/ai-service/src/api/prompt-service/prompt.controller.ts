import { Body, Controller, Param, Post } from '@nestjs/common';
import { PromptRequestDTO } from 'shared/dtos/body.dto';
import { PromptProviderParam } from 'shared/dtos/parameter.dto';

import { PromptService } from './prompt.service';

@Controller('prompt')
export class PromptController {
	constructor(private readonly promptService: PromptService) {}

	@Post(':promptProvider')
	async createPrompt(
		@Param() _: PromptProviderParam,
		@Body() data: PromptRequestDTO,
	): Promise<Record<string, any>> {
		return await this.promptService.requestPrompt(data);
	}
}
