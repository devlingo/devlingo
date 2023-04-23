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
import { ConfigurationOptionCreateDTO } from 'shared/dtos/body.dto';
import { Key, ProjectId } from 'shared/dtos/parameter.dto';

import { ConfigurationOptionService } from './configuration-option.service';

@Controller('configuration-options')
export class ConfigurationOptionController {
	constructor(
		private readonly configurationOptionService: ConfigurationOptionService,
	) {}

	@Post(':projectId')
	async createConfigurationOption(
		@Param() projectId: ProjectId,
		@Body() data: ConfigurationOptionCreateDTO,
	): Promise<ConfigurationOption> {
		return await this.configurationOptionService.createConfigurationOption({
			...projectId,
			...data,
		});
	}

	@Get(':projectId')
	async getProjectConfigurationOptions(
		@Param() projectId: ProjectId,
	): Promise<ConfigurationOption[]> {
		return await this.configurationOptionService.retrieveProjectConfigurationOptions(
			projectId,
		);
	}

	@Get(':projectId/:key')
	async getConfigurationOption(
		@Param() projectId: ProjectId,
		@Param() key: Key,
	): Promise<ConfigurationOption> {
		return await this.configurationOptionService.retrieveConfigurationOption(
			{
				...projectId,
				...key,
			},
		);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/:key')
	async deleteConfigurationOption(
		@Param() projectId: ProjectId,
		@Param() key: Key,
	): Promise<void> {
		await this.configurationOptionService.deleteConfigurationOption({
			...projectId,
			...key,
		});
	}
}
