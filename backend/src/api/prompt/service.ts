import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain';
import { DesignData, VersionData } from 'shared/types';

import {
	ExampleInterface,
	OpenAPIModelName,
	PromptCommand,
} from '@/api/prompt/constants';
import { promptTemplate } from '@/api/prompt/template';
import {
	addEdge,
	addNode,
	mapDesignDataToPromptInterface,
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
			modelName: OpenAPIModelName,
			openAIApiKey: this.configService.get<string>('OPENAI_KEY'),
			temperature: 0.2,
		});
	}

	private async makePromptRequest(
		designData: DesignData,
		userInput: string,
	): Promise<string> {
		const prompt = await promptTemplate.format({
			designData: JSON.stringify(
				mapDesignDataToPromptInterface(designData),
			),
			example: ExampleInterface,
			userInput,
		});
		try {
			return await this.model.call(prompt);
		} catch (error) {
			this.logger.error('communication error with OpenAPI %o', error);
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
			select: {
				versions: {
					orderBy: {
						createdAt: 'desc',
					},
					select: {
						data: true,
					},
					take: 1,
				},
			},
			where: { id: designId },
		});
		const { nodes, edges } = (
			versions.length > 0 && versions[0].data
				? typeof versions[0].data === 'string'
					? JSON.parse(versions[0].data)
					: versions[0].data
				: {}
		) as VersionData;

		const designData = structuredClone({
			edges,
			nodes,
		}) satisfies DesignData;

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
