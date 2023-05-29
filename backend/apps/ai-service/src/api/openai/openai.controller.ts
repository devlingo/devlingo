import { Controller } from '@nestjs/common';

import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
	constructor(private readonly openAIService: OpenAIService) {}
}
