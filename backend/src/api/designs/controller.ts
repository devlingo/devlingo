import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { Design, PermissionType } from '@prisma/client';

import { UserPermissions } from '@/decorators';
import { DesignDTO } from '@/dtos/body';
import { DesignIdParam, ProjectIdParam } from '@/dtos/parameter';
import { UserPermissionsGuard } from '@/guards/user-permission';

import { DesignService, RetrieveDesignResponse } from './service';

@UseGuards(UserPermissionsGuard)
@Controller(':projectId/designs')
export class DesignController {
	constructor(private readonly designService: DesignService) {}

	@Post()
	@UserPermissions(PermissionType.OWNER, PermissionType.EDITOR)
	async createDesign(
		@Param() projectId: ProjectIdParam,
		@Body() data: DesignDTO,
	): Promise<Design> {
		return await this.designService.createDesign({ ...data, ...projectId });
	}

	@Get()
	@UserPermissions(
		PermissionType.OWNER,
		PermissionType.EDITOR,
		PermissionType.VIEWER,
	)
	async getDesignsByProjectId(
		@Param() projectId: ProjectIdParam,
	): Promise<Design[]> {
		return await this.designService.retrieveDesignsByProjectId(projectId);
	}

	@Get(':designId')
	@UserPermissions(
		PermissionType.OWNER,
		PermissionType.EDITOR,
		PermissionType.VIEWER,
	)
	async getDesignById(
		@Param() _: ProjectIdParam,
		@Param() designId: DesignIdParam,
	): Promise<RetrieveDesignResponse> {
		return await this.designService.retrieveDesignById(designId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':designId')
	@UserPermissions(PermissionType.OWNER)
	async deleteDesign(@Param() designId: DesignIdParam): Promise<void> {
		await this.designService.deleteDesignById(designId);
	}
}
