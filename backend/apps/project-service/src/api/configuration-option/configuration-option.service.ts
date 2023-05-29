import { Injectable } from '@nestjs/common';
import { ConfigurationOption } from '@prisma/client';
import { PrismaService } from 'shared/modules/prisma.service';

@Injectable()
export class ConfigurationOptionService {
	constructor(private prisma: PrismaService) {}

	async deleteConfigurationOption({
		projectId,
		key,
	}: {
		projectId: string;
		key: string;
	}): Promise<void> {
		await this.prisma.configurationOption.delete({
			where: { key_projectId: { key, projectId } },
		});
	}

	async retrieveConfigurationOption({
		projectId,
		key,
	}: {
		projectId: string;
		key: string;
	}): Promise<ConfigurationOption> {
		return await this.prisma.configurationOption.findFirstOrThrow({
			where: { projectId, key },
		});
	}

	async retrieveProjectConfigurationOptions({
		projectId,
	}: {
		projectId: string;
	}): Promise<ConfigurationOption[]> {
		return await this.prisma.configurationOption.findMany({
			orderBy: {
				key: 'asc',
			},
			where: { projectId },
		});
	}

	async createConfigurationOption(data: {
		projectId: string;
		schema: Record<string, any>;
		key: string;
		description?: string;
	}) {
		return await this.prisma.configurationOption.create({
			data,
		});
	}
}
