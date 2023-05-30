import { Injectable } from '@nestjs/common';
import { Design } from '@prisma/client';
import { getOpenAIChain } from 'ai-service/utils/prompt.utils';
import { PromptRequestDTO } from 'shared/dtos/body.dto';
import { PromptProviderParam } from 'shared/dtos/parameter.dto';
import { PrismaService } from 'shared/modules/prisma.service';
import { Configuration } from 'shared/types';

@Injectable()
export class PromptService {
	constructor(
		private configuration: Configuration,
		private prisma: PrismaService,
	) {}

	async requestPrompt({
		name,
		version,
		projectId,
		promptContent,
	}: PromptRequestDTO & PromptProviderParam): Promise<Record<string, any>> {
		const design = await this.prisma.design.findUniqueOrThrow({
			where: { name_version_projectId: { name, projectId, version } },
		});

		return this.handleOpenAIChain(design, promptContent);
	}

	async handleOpenAIChain(design: Design, promptContent: string) {
		const chain = getOpenAIChain({
			sessionId: `${design.projectId}-${design.name}`,
			openAIApiKey: this.configuration.get<string>('OPENAI_KEY'),
			redisConnectionString: this.configuration.get<string>(
				'REDIS_CONNECTION_STRING',
			),
		});

		return await chain.call({
			designData: design.data,
			promptContent,
			nodeOptions: JSON.stringify([]),
			edgeOptions: JSON.stringify([]),
			exampleData: JSON.stringify([]),
		});
	}
}
