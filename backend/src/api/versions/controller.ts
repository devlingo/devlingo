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
import { PermissionType, Version } from '@prisma/client';

import { UserPermissions } from '@/decorators';
import { VersionDTO } from '@/dtos/body';
import { DesignIdParam, VersionIdParam } from '@/dtos/parameter';
import { UserPermissionsGuard } from '@/guards/user-permission';

import { VersionsService } from './service';

@UseGuards(UserPermissionsGuard)
@Controller(':projectId/:designId/versions')
export class VersionsController {
	constructor(private readonly designService: VersionsService) {}

	@Post()
	@UserPermissions(PermissionType.OWNER, PermissionType.EDITOR)
	async createVersion(
		@Param() designId: DesignIdParam,
		@Body() data: VersionDTO,
	): Promise<Version> {
		return await this.designService.createVersion({ ...data, ...designId });
	}

	@Get(':versionId')
	@UserPermissions(
		PermissionType.OWNER,
		PermissionType.EDITOR,
		PermissionType.VIEWER,
	)
	async getVersionById(@Param() versionId: VersionIdParam): Promise<Version> {
		return await this.designService.retrieveVersionById(versionId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':versionId')
	@UserPermissions(PermissionType.OWNER)
	async deleteVersionById(@Param() versionId: VersionIdParam): Promise<void> {
		await this.designService.deleteVersionById(versionId);
	}
}
