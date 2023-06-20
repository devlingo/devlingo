import { Body, Controller, Param, Post } from '@nestjs/common';

import { PromptRequestDTO } from '@/dtos/body.dto';
import { DesignIdParam, ProjectIdParam } from '@/dtos/parameter.dto';

import { PromptService } from './prompt.service';

@Controller('prompt')
export class PromptController {
	constructor(private readonly promptService: PromptService) {}

	@Post(':projectId/:designId')
	async createPrompt(
		@Param() projectId: ProjectIdParam,
		@Param() designId: DesignIdParam,
		@Body() data: PromptRequestDTO,
	): Promise<{
		answer: string;
		design: Record<string, any>;
	}> {
		return await this.promptService.requestPrompt({
			...data,
			...projectId,
			...designId,
		});
	}
}