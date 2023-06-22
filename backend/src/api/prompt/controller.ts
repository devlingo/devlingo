import { Body, Controller, Post } from '@nestjs/common';

import { PromptService } from '@/api/prompt/service';
import { DesignData } from '@/api/prompt/types';
import { PromptRequestDTO } from '@/dtos/body';

@Controller('prompt')
export class PromptController {
	constructor(private readonly promptService: PromptService) {}

	@Post(':projectId/:designId')
	async createPrompt(
		// @Param() projectId: ProjectIdParam,
		// @Param() designId: DesignIdParam,
		@Body() data: PromptRequestDTO,
	): Promise<DesignData> {
		return await this.promptService.requestPrompt(data);
	}
}
