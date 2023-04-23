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
import { ConfigurationOption } from '@prisma/client';
import { Key, ProjectId, SchemaBody } from 'shared/parameters/schema.dto';

import { ConfigurationOptionsService } from './configuration-options.service';

@Controller('configuration-options')
export class ConfigurationOptionsController {
	constructor(private readonly schemaService: ConfigurationOptionsService) {}

	@Post(':projectId')
	async createConfigurationOption(
		@Param() projectId: ProjectId,
		@Body() data: SchemaBody,
	) {
		return await this.schemaService.createConfigurationOption({
			...projectId,
			...data,
		});
	}

	@Get(':projectId')
	async getProjectConfigurationOptions(
		@Param() projectId: ProjectId,
	): Promise<ConfigurationOption[]> {
		return await this.schemaService.retrieveProjectConfigurationOptions(
			projectId,
		);
	}

	@Get(':projectId/:key')
	async getConfigurationOption(
		@Param() projectId: ProjectId,
		@Param() key: Key,
	): Promise<ConfigurationOption> {
		return await this.schemaService.retrieveConfigurationOption({
			...projectId,
			...key,
		});
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/:key')
	async deleteConfigurationOption(
		@Param() projectId: ProjectId,
		@Param() key: Key,
	) {
		await this.schemaService.deleteConfigurationOption({
			...projectId,
			...key,
		});
	}
}
