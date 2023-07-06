import { Body, Controller, Param, Post } from '@nestjs/common';
import { DesignData } from 'shared/types';

import { PromptService } from '@/api/prompt/service';
import { PromptRequestDTO } from '@/dtos/body';
import { DesignIdParam } from '@/dtos/parameter';

@Controller(':projectId/:designId/prompt')
export class PromptController {
	constructor(private readonly promptService: PromptService) {}

	@Post()
	async createPrompt(
		@Param() designId: DesignIdParam,
		@Body() data: PromptRequestDTO,
	): Promise<DesignData> {
		return await this.promptService.requestPrompt({
			...designId,
			...data,
		});
	}
}
