import { Injectable } from '@nestjs/common';
import { ConfigSchema } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma.service';

@Injectable()
export class SchemaService {
	constructor(private prisma: PrismaService) {}

	async deleteConfigSchema({
		projectId,
		version,
	}: {
		projectId: string;
		version: number;
	}): Promise<void> {
		await this.prisma.configSchema.delete({
			where: { version_projectId: { version, projectId } },
		});
	}

	async retrieveConfigSchema({
		projectId,
		version,
	}: {
		projectId: string;
		version: number;
	}): Promise<ConfigSchema> {
		return await this.prisma.configSchema.findFirstOrThrow({
			where: { projectId, version },
		});
	}

	async retrieveProjectConfigSchemas({
		projectId,
	}: {
		projectId: string;
	}): Promise<ConfigSchema[]> {
		return await this.prisma.configSchema.findMany({
			orderBy: {
				version: 'asc',
			},
			where: { projectId },
		});
	}

	async createConfigSchema({
		projectId,
		schema,
	}: {
		projectId: string;
		schema: Record<string, any>;
	}) {
		return await this.prisma.configSchema.create({
			data: { projectId, schema },
		});
	}
}
