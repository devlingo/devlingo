import { Injectable, Logger } from '@nestjs/common';
import { getOpenAIChain } from 'ai-service/utils/prompt.utils';
import { PromptRequestDTO } from 'shared/dtos/body.dto';
import { Configuration } from 'shared/types';

@Injectable()
export class PromptService {
	private readonly logger = new Logger(PromptService.name);
	constructor(
		private configuration: Configuration, // private prisma: PrismaService,
	) {}

	async requestPrompt({
		designData,
		edgeTypes,
		exampleData,
		name,
		nodeTypes,
		projectId,
		promptContent,
	}: PromptRequestDTO): Promise<Record<string, any>> {
		// const design = await this.prisma.design.findUniqueOrThrow({
		// 	where: { name_version_projectId: { name, projectId, version } },
		// });

		const getChainParams = {
			sessionId: `${projectId}-${name}`,
			openAIApiKey: this.configuration.get<string>('OPENAI_KEY'),
			redisConnectionString: this.configuration.get<string>(
				'REDIS_CONNECTION_STRING',
			),
		};
		this.logger.verbose(getChainParams);
		const chain = getOpenAIChain(getChainParams);

		return await chain.call({
			designData,
			promptContent,
			nodeOptions: JSON.stringify([nodeTypes]),
			edgeOptions: JSON.stringify([edgeTypes]),
			exampleData: JSON.stringify(exampleData),
		});
	}
}
