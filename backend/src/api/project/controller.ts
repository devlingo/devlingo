import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Req,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import type { Request } from 'express';

import { ProjectCreateDTO } from '@/dtos/body';
import { ProjectIdParam } from '@/dtos/parameter';

import { ProjectService } from './service';

const PROJECT_ID_PARAM = ':projectId';
@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	async createProject(
		@Req() request: Request,
		@Body() data: ProjectCreateDTO,
	): Promise<Project> {
		return await this.projectService.createProject({ request, data });
	}

	@Get()
	async getUserProjects(@Req() request: Request): Promise<Project[]> {
		return await this.projectService.retrieveUserProjects({ request });
	}

	@Get(PROJECT_ID_PARAM)
	async getProject(
		@Req() request: Request,
		@Param() projectId: ProjectIdParam,
	): Promise<Project> {
		return await this.projectService.retrieveProject({
			request,
			...projectId,
		});
	}

	@Patch(PROJECT_ID_PARAM)
	async updateProject(
		@Req() request: Request,
		@Body() data: Partial<ProjectCreateDTO>,
		@Param() projectId: ProjectIdParam,
	): Promise<Project> {
		return await this.projectService.updateProject({
			...projectId,
			request,
			data,
		});
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(PROJECT_ID_PARAM)
	async deleteProject(
		@Req() request: Request,
		@Param() projectId: ProjectIdParam,
	): Promise<void> {
		await this.projectService.deleteProject({ request, ...projectId });
	}
}
