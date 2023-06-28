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
	UseGuards,
} from '@nestjs/common';
import { PermissionType, Project } from '@prisma/client';
import type { Request } from 'express';

import { UserPermissions } from '@/decorators';
import { ProjectCreateDTO } from '@/dtos/body';
import { ProjectIdParam } from '@/dtos/parameter';
import { UserPermissionsGuard } from '@/guards/user-permission';

import { ProjectsService } from './service';

const PROJECT_ID_PARAM = ':projectId';

@UseGuards(UserPermissionsGuard)
@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) {}

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
	@UserPermissions(
		PermissionType.OWNER,
		PermissionType.EDITOR,
		PermissionType.VIEWER,
	)
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
	@UserPermissions(PermissionType.OWNER, PermissionType.EDITOR)
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
	@UserPermissions(PermissionType.OWNER)
	async deleteProject(@Param() projectId: ProjectIdParam): Promise<void> {
		await this.projectService.deleteProject(projectId);
	}
}
