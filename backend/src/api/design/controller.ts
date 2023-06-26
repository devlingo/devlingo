import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
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

	@Post()
	async createDesignVersion(
		@Body() data: DesignVersionDTO,
	): Promise<CreateDesignResponse> {
		return await this.designService.createDesignVersion(data);
	}

	@Get()
	async getDesigns(@Query() projectId: ProjectIdParam): Promise<Design[]> {
		return await this.designService.retrieveDesignsByProjectId(projectId);
	}

	@Get(':designId')
	async getDesignById(
		@Param() designId: DesignIdParam,
	): Promise<RetrieveDesignResponse> {
		return await this.designService.retrieveDesignById(designId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':designId')
	async deleteDesign(@Param() designId: DesignIdParam): Promise<void> {
		await this.designService.deleteDesignById(designId);
	}

	@Get('versions/:versionId')
	async getDesignVersion(
		@Param() versionId: VersionIdParam,
	): Promise<DesignVersion> {
		return await this.designService.retrieveDesignVersionById(versionId);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('versions/:versionId')
	async deleteDesignVersion(
		@Param() versionId: VersionIdParam,
	): Promise<void> {
		await this.designService.deleteDesignVersionById(versionId);
	}
}
