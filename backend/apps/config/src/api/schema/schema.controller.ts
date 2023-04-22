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
import { ConfigSchema } from '@prisma/client';
import { ProjectId, SchemaBody, Version } from 'shared/parameters/schema.dto';

import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
	constructor(private readonly schemaService: SchemaService) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':projectId/:version')
	async deleteConfigSchema(
		@Param() projectId: ProjectId,
		@Param() version: Version,
	) {
		await this.schemaService.deleteConfigSchema({
			...projectId,
			...version,
		});
	}

	@Get(':projectId/:version')
	async getConfigSchemaByVersion(
		@Param() projectId: ProjectId,
		@Param() version: Version,
	): Promise<ConfigSchema> {
		return await this.schemaService.retrieveConfigSchema({
			...projectId,
			...version,
		});
	}

	@Get(':projectId')
	async getConfigSchemasByProjectId(
		@Param() projectId: ProjectId,
	): Promise<ConfigSchema[]> {
		return await this.schemaService.retrieveProjectConfigSchemas(projectId);
	}

	@Post(':projectId')
	async createConfigSchema(
		@Param() projectId: ProjectId,
		@Body() data: SchemaBody,
	) {
		return await this.schemaService.createConfigSchema({
			...projectId,
			...data,
		});
	}
}
