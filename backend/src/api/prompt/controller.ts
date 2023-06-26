import { Body, Controller, Logger, Param, Post } from '@nestjs/common';

import { PromptService } from '@/api/prompt/service';
import { DesignData } from '@/api/prompt/types';
import { PromptRequestDTO } from '@/dtos/body';
import { DesignIdParam, ProjectIdParam } from '@/dtos/parameter';

@Controller('prompt')
export class PromptController {
	private readonly logger = new Logger(PromptController.name);

	constructor(private readonly promptService: PromptService) {}

	@Post(':projectId/:designId')
	async createPrompt(
		@Param() projectId: ProjectIdParam,
		@Param() designId: DesignIdParam,
		@Body() data: PromptRequestDTO,
	): Promise<DesignData> {
		this.logger.log(projectId, designId, data);
		return await this.promptService.requestPrompt(data);
	}
}
