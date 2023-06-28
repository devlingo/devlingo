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
import { Design, DesignVersion } from '@prisma/client';

import { DesignVersionDTO } from '@/dtos/body';
import {
	DesignIdParam,
	ProjectIdParam,
	VersionIdParam,
} from '@/dtos/parameter';

import {
	CreateDesignResponse,
	DesignService,
	RetrieveDesignResponse,
} from './service';

@Controller('designs')
export class DesignController {
	constructor(private readonly designService: DesignService) {}

	@Post(':projectId')
	async createDesignVersion(
		@Body() data: DesignVersionDTO,
	): Promise<CreateDesignResponse> {
		return await this.designService.createDesignVersion(data);
	}

	@Get(':projectId')
	async getDesigns(@Param() projectId: ProjectIdParam): Promise<Design[]> {
		return await this.designService.retrieveDesignsByProjectId(projectId);
	}

	@Get(':projectId/:designId')
	async getDesignById(
		@Param() _: ProjectIdParam,
		@Param() designId: DesignIdParam,
	): Promise<RetrieveDesignResponse> {
		return await this.designService.retrieveDesignById(designId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/:designId')
	async deleteDesign(@Param() designId: DesignIdParam): Promise<void> {
		await this.designService.deleteDesignById(designId);
	}

	@Get(':projectId/versions/:versionId')
	async getDesignVersion(
		@Param() versionId: VersionIdParam,
	): Promise<DesignVersion> {
		return await this.designService.retrieveDesignVersionById(versionId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/versions/:versionId')
	async deleteDesignVersion(
		@Param() versionId: VersionIdParam,
	): Promise<void> {
		await this.designService.deleteDesignVersionById(versionId);
	}
}
