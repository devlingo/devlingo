import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain';

import { DSLService } from '@/api/prompt/dsl/dsl-service';
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
		this.logger.log('requestPrompt is called');
		const dslService = new DSLService(
			promptRequest.designData,
			promptRequest.edgeTypes,
			promptRequest.nodeTypes,
		);
		this.logger.log('dslService design: ', dslService.design);
		const model = new OpenAI({
			modelName: promptRequest.modelName,
			temperature: 0.1,
			openAIApiKey: this.configService.get<string>('OPENAI_KEY'),
		});
		const prompt = await promptTemplate.format({
			edgeTypes: promptRequest.edgeTypes.toString(),
			nodeTypes: promptRequest.nodeTypes.toString(),
			designData: JSON.stringify(promptRequest.designData),
			userInput: promptRequest.promptContent,
		});
		this.logger.log('prompt: ', prompt);
		try {
			this.logger.log('calling openAI api');
			const response = await model.call(prompt);
			this.logger.log('going to dsl service with response: ', response);
			dslService.executeCommands(response);
			this.logger.log('dsl service executed successfully');
		} catch (e) {
			this.logger.error('communication error with OpenAPI %o', e);
			throw new HttpException(
				'error communicating with OpenAPI',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		this.logger.log('final design: ', dslService.design);
		return dslService.design;
	}
}
