import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain';
import { DesignData } from 'shared/types';

import { PromptCommand } from '@/api/prompt/constants';
import { promptTemplate } from '@/api/prompt/template';
import {
	addEdge,
	addNode,
	parsePromptResponseIntoCommands,
	removeEdge,
	removeNode,
	updateEdge,
	updateNode,
} from '@/api/prompt/utils';
import { PromptRequestDTO } from '@/dtos/body';
import { DesignIdParam } from '@/dtos/parameter';
import { PrismaService } from '@/modules/prisma/service';
import { EnvironmentVariables } from '@/utils/env';

const commandMapping: Record<
	PromptCommand,
	(parameters: string[], designData: DesignData) => void
> = {
	[PromptCommand.AddNode]: addNode,
	[PromptCommand.RemoveNode]: removeNode,
	[PromptCommand.UpdateNode]: updateNode,
	[PromptCommand.AddEdge]: addEdge,
	[PromptCommand.RemoveEdge]: removeEdge,
	[PromptCommand.UpdateEdge]: updateEdge,
};

@Injectable()
export class PromptService {
	private readonly logger = new Logger(PromptService.name);
	private model: OpenAI;

	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
		private prisma: PrismaService,
	) {
		this.model = new OpenAI({
			modelName: 'gpt-3.5-turbo',
			temperature: 0.2,
			openAIApiKey: this.configService.get<string>('OPENAI_KEY'),
		});
	}

	private async makePromptRequest(
		designData: DesignData,
		userInput: string,
	): Promise<string> {
		const prompt = await promptTemplate.format({
			designData: JSON.stringify(designData),
			userInput,
		});
		try {
			return await this.model.call(prompt);
		} catch (e) {
			this.logger.error('communication error with OpenAPI %o', e);
			throw new HttpException(
				'error communicating with OpenAPI',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async requestPrompt({
		designId,
		useInput,
	}: PromptRequestDTO & DesignIdParam): Promise<DesignData> {
		const { versions } = await this.prisma.design.findUniqueOrThrow({
			where: { id: designId },
			select: {
				versions: {
					select: {
						data: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
		});
		const designData = (
			versions.length && versions[0].data
				? JSON.parse(versions[0].data as string) ?? {}
				: {}
		) as DesignData;

		const promptResponse = await this.makePromptRequest(
			designData,
			useInput,
		);

		for (const [command, parameters] of parsePromptResponseIntoCommands(
			promptResponse,
		)) {
			const handler = commandMapping[command];
			handler(parameters, designData);
		}

		return designData;
	}
}
