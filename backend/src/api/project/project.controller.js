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
exports.ProjectController = void 0;
const common_1 = require('@nestjs/common');
const body_dto_1 = require('../../dtos/body.dto');
const parameter_dto_1 = require('../../dtos/parameter.dto');
const project_service_1 = require('./project.service');
let ProjectController = (exports.ProjectController = class ProjectController {
	projectService;
	constructor(projectService) {
		this.projectService = projectService;
	}
	async createProject(data) {
		return await this.projectService.createProject(data);
	}
	async getAllProjects() {
		return await this.projectService.retrieveProjects();
	}
	async getProject(projectId) {
		return await this.projectService.retrieveProject(projectId);
	}
	async deleteProject(projectId) {
		await this.projectService.deleteProject(projectId);
	}
});
__decorate(
	[
		(0, common_1.Post)(),
		__param(0, (0, common_1.Body)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [body_dto_1.ProjectCreateDTO]),
		__metadata('design:returntype', Promise),
	],
	ProjectController.prototype,
	'createProject',
	null,
);
__decorate(
	[
		(0, common_1.Get)(),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', []),
		__metadata('design:returntype', Promise),
	],
	ProjectController.prototype,
	'getAllProjects',
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
	ProjectController.prototype,
	'getProject',
	null,
);
__decorate(
	[
		(0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
		(0, common_1.Delete)(':projectId'),
		__param(0, (0, common_1.Param)()),
		__metadata('design:type', Function),
		__metadata('design:paramtypes', [parameter_dto_1.ProjectIdParam]),
		__metadata('design:returntype', Promise),
	],
	ProjectController.prototype,
	'deleteProject',
	null,
);
exports.ProjectController = ProjectController = __decorate(
	[
		(0, common_1.Controller)('projects'),
		__metadata('design:paramtypes', [project_service_1.ProjectService]),
	],
	ProjectController,
);
//# sourceMappingURL=project.controller.js.map
