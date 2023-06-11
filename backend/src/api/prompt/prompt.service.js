'use strict';
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (
			typeof Reflect === 'object' &&
			typeof Reflect.decorate === 'function'
		)
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r =
						(c < 3
							? d(r)
							: c > 3
							? d(target, key, r)
							: d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (
			typeof Reflect === 'object' &&
			typeof Reflect.metadata === 'function'
		)
			return Reflect.metadata(k, v);
	};
var PromptService_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.PromptService = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const prompt_utils_1 = require('../../utils/prompt.utils');
let PromptService =
	(exports.PromptService =
	PromptService_1 =
		class PromptService {
			configService;
			logger = new common_1.Logger(PromptService_1.name);
			constructor(configService) {
				this.configService = configService;
			}
			async requestPrompt({ designData, promptContent, ...rest }) {
				const chain = (0, prompt_utils_1.getOrCreateOpenAIChain)({
					...rest,
					openAIApiKey: this.configService.get('OPENAI_KEY'),
					redisConnectionString: this.configService.get(
						'REDIS_CONNECTION_STRING',
					),
				});
				try {
					const { response } = await chain.call({
						input: `This is the existing design JSON ${JSON.stringify(
							designData,
						)}. ${promptContent}`,
					});
					return (0, prompt_utils_1.cleanResponse)(response);
				} catch (e) {
					this.logger.error('communication error with OpenAPI %o', e);
					throw new common_1.HttpException(
						'error communicating with OpenAPI',
						common_1.HttpStatus.INTERNAL_SERVER_ERROR,
					);
				}
			}
		});
exports.PromptService =
	PromptService =
	PromptService_1 =
		__decorate(
			[
				(0, common_1.Injectable)(),
				__metadata('design:paramtypes', [config_1.ConfigService]),
			],
			PromptService,
		);
//# sourceMappingURL=prompt.service.js.map
