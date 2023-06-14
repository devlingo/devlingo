import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PromptRequestDTO } from '@/dtos/body.dto';
import { DesignIdParam, ProjectIdParam } from '@/dtos/parameter.dto';
import { EnvironmentVariables } from '@/utils/env.utils';
import { cleanResponse, getOrCreateOpenAIChain } from '@/utils/prompt.utils';

export type RequestPromptParams = PromptRequestDTO &
	DesignIdParam &
	ProjectIdParam;

@Injectable()
export class PromptService {
	private readonly logger = new Logger(PromptService.name);

	constructor(
		private configService: ConfigService<EnvironmentVariables, true>, // private prisma: PrismaService,
	) {}

	async requestPrompt({
		designData,
		promptContent,
		...rest
	}: RequestPromptParams): Promise<{
		answer: string;
		design: Record<string, any>;
	}> {
		const chain = getOrCreateOpenAIChain({
			...rest,
			openAIApiKey: this.configService.get<string>('OPENAI_KEY'),
			redisConnectionString: this.configService.get<string>(
				'REDIS_CONNECTION_STRING',
			),
		});

		try {
			const { response } = (await chain.call({
				input: `This is the existing design JSON ${JSON.stringify(
					designData,
				)}. ${promptContent}`,
			})) as { response: 'string' };
			return cleanResponse(response);
		} catch (e) {
			this.logger.error('communication error with OpenAPI %o', e);
			throw new HttpException(
				'error communicating with OpenAPI',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
