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
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex);
		};
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.PromptController = void 0;
const common_1 = require('@nestjs/common');
const body_dto_1 = require('../../dtos/body.dto');
const parameter_dto_1 = require('../../dtos/parameter.dto');
const prompt_service_1 = require('./prompt.service');
let PromptController = (exports.PromptController = class PromptController {
	promptService;
	constructor(promptService) {
		this.promptService = promptService;
	}
	async createPrompt(projectId, designId, data) {
		return await this.promptService.requestPrompt({
			...data,
			...projectId,
			...designId,
		});
	}
});
__decorate(
	[
		(0, common_1.Post)(':projectId/:designId'),
		__param(0, (0, common_1.Param)()),
		__param(1, (0, common_1.Param)()),
		__param(2, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [
			parameter_dto_1.ProjectIdParam,
			parameter_dto_1.DesignIdParam,
			body_dto_1.PromptRequestDTO,
		]),
		__metadata('design:returntype', Promise),
	],
	PromptController.prototype,
	'createPrompt',
	null,
);
exports.PromptController = PromptController = __decorate(
	[
		(0, common_1.Controller)('prompt'),
		__metadata('design:paramtypes', [prompt_service_1.PromptService]),
	],
	PromptController,
);
//# sourceMappingURL=prompt.controller.js.map
