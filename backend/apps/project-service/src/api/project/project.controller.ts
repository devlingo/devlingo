import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { ProjectCreateDTO } from 'shared/dtos/body.dto';
import { ProjectId } from 'shared/dtos/parameter.dto';

import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	async createProject(@Body() data: ProjectCreateDTO): Promise<Project> {
		return await this.projectService.createProject(data);
	}

	@Get()
	async getAllProjects(): Promise<Project[]> {
		return await this.projectService.retrieveProjects();
	}

	@Get(':projectId')
	async getProject(@Param() projectId: ProjectId): Promise<Project> {
		return await this.projectService.retrieveProject(projectId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId')
	async deleteProject(@Param() projectId: ProjectId): Promise<void> {
		await this.projectService.deleteProject(projectId);
	}
}
