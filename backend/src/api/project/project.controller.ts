import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Req,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { Request } from 'express';

import { ProjectCreateDTO } from '@/dtos/body.dto';
import { ProjectIdParam } from '@/dtos/parameter.dto';

import { ProjectService } from './project.service';

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

	@Get(':projectId')
	async getProject(@Param() projectId: ProjectIdParam): Promise<Project> {
		return await this.projectService.retrieveProject(projectId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId')
	async deleteProject(@Param() projectId: ProjectIdParam): Promise<void> {
		await this.projectService.deleteProject(projectId);
	}
}
