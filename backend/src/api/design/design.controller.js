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
exports.DesignController = void 0;
const common_1 = require('@nestjs/common');
const body_dto_1 = require('../../dtos/body.dto');
const parameter_dto_1 = require('../../dtos/parameter.dto');
const design_service_1 = require('./design.service');
let DesignController = (exports.DesignController = class DesignController {
	designService;
	constructor(designService) {
		this.designService = designService;
	}
	async createDesignVersion(projectId, data) {
		return await this.designService.createDesignVersion({
			...projectId,
			...data,
		});
	}
	async getProjectDesignVersions(projectId) {
		return await this.designService.retrieveProjectDesignVersions(
			projectId,
		);
	}
	async getDesignVersion(projectId, name, version) {
		return await this.designService.retrieveDesignVersion({
			...projectId,
			...name,
			...version,
		});
	}
	async deleteDesignVersion(projectId, name, version) {
		await this.designService.deleteDesignVersion({
			...projectId,
			...name,
			...version,
		});
	}
});
__decorate(
	[
		(0, common_1.Post)(':projectId'),
		__param(0, (0, common_1.Param)()),
		__param(1, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [
			parameter_dto_1.ProjectIdParam,
			body_dto_1.DesignVersionDTO,
		]),
		__metadata('design:returntype', Promise),
	],
	DesignController.prototype,
	'createDesignVersion',
	null,
);
__decorate(
	[
		(0, common_1.Get)(':projectId'),
		__param(0, (0, common_1.Param)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [parameter_dto_1.ProjectIdParam]),
		__metadata('design:returntype', Promise),
	],
	DesignController.prototype,
	'getProjectDesignVersions',
	null,
);
__decorate(
	[
		(0, common_1.Get)(':projectId/:name/:version'),
		__param(0, (0, common_1.Param)()),
		__param(1, (0, common_1.Param)()),
		__param(2, (0, common_1.Param)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [
			parameter_dto_1.ProjectIdParam,
			parameter_dto_1.NameParam,
			parameter_dto_1.VersionParam,
		]),
		__metadata('design:returntype', Promise),
	],
	DesignController.prototype,
	'getDesignVersion',
	null,
);
__decorate(
	[
		(0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
		(0, common_1.Delete)(':projectId/:name/:version'),
		__param(0, (0, common_1.Param)()),
		__param(1, (0, common_1.Param)()),
		__param(2, (0, common_1.Param)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [
			parameter_dto_1.ProjectIdParam,
			parameter_dto_1.NameParam,
			parameter_dto_1.VersionParam,
		]),
		__metadata('design:returntype', Promise),
	],
	DesignController.prototype,
	'deleteDesignVersion',
	null,
);
exports.DesignController = DesignController = __decorate(
	[
		(0, common_1.Controller)('design'),
		__metadata('design:paramtypes', [design_service_1.DesignService]),
	],
	DesignController,
);
//# sourceMappingURL=design.controller.js.map
