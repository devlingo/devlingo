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
import { Design } from '@prisma/client';

import { DesignVersionDTO } from '../../dtos/body.dto';
import {
	NameParam,
	ProjectIdParam,
	VersionParam,
} from '../../dtos/parameter.dto';
import { DesignService } from './design.service';

@Controller('design')
export class DesignController {
	constructor(private readonly designService: DesignService) {}

	@Post(':projectId')
	async createDesignVersion(
		@Param() projectId: ProjectIdParam,
		@Body() data: DesignVersionDTO,
	): Promise<Design> {
		return await this.designService.createDesignVersion({
			...projectId,
			...data,
		});
	}

	@Get(':projectId')
	async getProjectDesignVersions(
		@Param() projectId: ProjectIdParam,
	): Promise<{ name: string; version: number }[]> {
		return await this.designService.retrieveProjectDesignVersions(
			projectId,
		);
	}

	@Get(':projectId/:name/:version')
	async getDesignVersion(
		@Param() projectId: ProjectIdParam,
		@Param() name: NameParam,
		@Param() version: VersionParam,
	): Promise<Design> {
		return await this.designService.retrieveDesignVersion({
			...projectId,
			...name,
			...version,
		});
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/:name/:version')
	async deleteDesignVersion(
		@Param() projectId: ProjectIdParam,
		@Param() name: NameParam,
		@Param() version: VersionParam,
	): Promise<void> {
		await this.designService.deleteDesignVersion({
			...projectId,
			...name,
			...version,
		});
	}
}
