import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain';

import { executeCommands } from '@/api/prompt/dsl-service';
import { promptTemplate } from '@/api/prompt/template';
import { DesignData } from '@/api/prompt/types';
import { PromptRequestDTO } from '@/dtos/body';
import { EnvironmentVariables } from '@/utils/env';

@Injectable()
export class PromptService {
	private readonly logger = new Logger(PromptService.name);

	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
	) {}

	async requestPrompt(promptRequest: PromptRequestDTO): Promise<DesignData> {
		const model = new OpenAI({
			modelName: promptRequest.modelName,
			temperature: 0.2,
			openAIApiKey: this.configService.get<string>('OPENAI_KEY'),
		});
		const prompt = await promptTemplate.format({
			edgeTypes: promptRequest.edgeTypes.toString(),
			nodeTypes: promptRequest.nodeTypes.toString(),
			designData: JSON.stringify(promptRequest.designData),
			userInput: promptRequest.promptContent,
		});
		try {
			const response = await model.call(prompt);
			return executeCommands(
				promptRequest.designData,
				promptRequest.edgeTypes,
				promptRequest.nodeTypes,
				response,
			);
		} catch (e) {
			this.logger.error('communication error with OpenAPI %o', e);
			this.logger.error(e);
			throw new HttpException(
				'error communicating with OpenAPI',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
