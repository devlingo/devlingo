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
import { DesignVersionDTO } from 'shared/dtos/body.dto';
import { Name, ProjectId, Version } from 'shared/dtos/parameter.dto';

import { DesignService } from './design.service';

@Controller('configuration-options')
export class DesignController {
	constructor(private readonly designService: DesignService) {}

	@Post(':projectId')
	async createDesignVersion(
		@Param() projectId: ProjectId,
		@Body() data: DesignVersionDTO,
	): Promise<Design> {
		return await this.designService.createDesignVersion({
			...projectId,
			...data,
		});
	}

	@Get(':projectId')
	async getProjectDesignVersion(
		@Param() projectId: ProjectId,
	): Promise<{ name: string; version: number }[]> {
		return await this.designService.retrieveProjectDesignVersions(
			projectId,
		);
	}

	@Get(':projectId/:name:/:version')
	async getDesignVersion(
		@Param() projectId: ProjectId,
		@Param() name: Name,
		@Param() version: Version,
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
		@Param() projectId: ProjectId,
		@Param() name: Name,
		@Param() version: Version,
	): Promise<void> {
		await this.designService.deleteDesignVersion({
			...projectId,
			...name,
			...version,
		});
	}
}
