import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getOpenAIChain } from 'ai-service/utils/prompt.utils';
import { PromptRequestDTO } from 'shared/dtos/body.dto';
import { DesignIdParam, ProjectIdParam } from 'shared/dtos/parameter.dto';
import { ConfigurationVars } from 'shared/types';

export type RequestPromptParams = PromptRequestDTO &
	DesignIdParam &
	ProjectIdParam;

@Injectable()
export class PromptService {
	private readonly logger = new Logger(PromptService.name);

	constructor(
		private configService: ConfigService<ConfigurationVars, true>, // private prisma: PrismaService,
	) {}

	async requestPrompt({
		designData,
		designId,
		edgeTypes,
		nodeTypes,
		projectId,
		promptContent,
	}: RequestPromptParams): Promise<{
		answer: string;
		design: Record<string, any>;
	}> {
		const chain = getOpenAIChain({
			designId,
			nodeTypes,
			edgeTypes,
			projectId,
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
			const answer = response.slice(0, response.indexOf('\n\n')).trim();
			const design = JSON.parse(
				response.slice(
					response.indexOf('{'),
					response.lastIndexOf('}') + 1,
				),
			) as Record<string, any>;
			return { answer, design };
		} catch (e) {
			this.logger.error('communication error with OpenAPI %o', e);
			throw new HttpException(
				'error communicating with OpenAPI',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
